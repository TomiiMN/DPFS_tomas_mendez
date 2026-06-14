const dataEl = document.getElementById("data");
let data = {};
try { data = JSON.parse(dataEl.textContent); } catch (e) { console.error("Error parseando data:", e); }
const categoriesData = data.categories || [];
const brandsData = data.brands || [];
const tagsData = data.tags || [];
const availableTags = tagsData.map(t => t.name);
const specsConfig = data.specsConfig || {};
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
const brandSelect = document.getElementById("brandSelect");
const imgInput = document.getElementById("imgInput");
const imgPreview = document.getElementById("imgPreview");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");
const uploadZone = document.getElementById("uploadZone");
const cardBody = document.getElementById("img-card-body");
const imgField = document.getElementById("img-field");
const inputName = document.getElementById("inputName");
const specsContainer = document.getElementById("specsContainer");
const productForm = document.querySelector('form[action="/admin/products"]');
function showAlertErrors(messages) {
    const container = document.getElementById('alertContainer');
    messages.forEach(m => {
        const div = document.createElement('div');
        div.className = 'alert alert-danger show alert-frontend';
        div.innerHTML = `${m}<button class="btn-close" onclick="closeAlert(this)">×</button>`;
        container.appendChild(div);
    });
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function closeFrontendAlert() {
    document.querySelectorAll('.alert-frontend').forEach(el => el.remove());
}
function getErrors() {
    const errors = [];
    const name = inputName.value.trim();
    if (validator.isEmpty(name))
        errors.push('El nombre del producto es obligatorio.');
    else if (!validator.isLength(name, { min: 5 }))
        errors.push('El nombre debe tener al menos 5 caracteres.');
    const img = imgInput.value.trim();
    if (validator.isEmpty(img))
        errors.push('La imagen es obligatoria.');
    else if (!validator.matches(img, /\.(jpg|jpeg|png|gif)$/i))
        errors.push('La imagen debe ser JPG, JPEG, PNG o GIF.');

    return errors;
}
let categories = [];
subcategorySelect.disabled = true;
function initCategories(cats) {
    cats.filter(c => c.parent_id === null).forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id; opt.textContent = cat.name;
        categorySelect.appendChild(opt);
    });
}
function loadSubcategories(parentId, selectedSubId = null) {
    subcategorySelect.innerHTML = '<option value="" disabled selected>Seleccionar...</option>';
    const subs = categories.filter(c => c.parent_id == parentId);
    if (!subs.length) { subcategorySelect.disabled = true; return; }
    subcategorySelect.disabled = false;
    subs.forEach((sub, i) => {
        const opt = document.createElement("option");
        opt.value = sub.id; opt.textContent = sub.name;
        if (i === 0) opt.selected = true;
        if (selectedSubId && sub.id == selectedSubId) opt.selected = true;
        subcategorySelect.appendChild(opt);
    });
    const firstSubId = subcategorySelect.value;
    if (firstSubId) renderSpecs(Number(firstSubId));
}
categorySelect.addEventListener("change", () => loadSubcategories(categorySelect.value));
function initBrands(brands) {
    brands.forEach(brand => {
        const opt = document.createElement("option");
        opt.value = brand.id; opt.textContent = brand.name;
        brandSelect.appendChild(opt);
    });
}
function updateImagePreview() {
    const v = imgInput.value.trim();
    if (!v || !v.match(/\.(jpeg|jpg|png|webp|gif)$/i)) { resetImage(); return; }
    const testImg = new Image();
    testImg.src = v;
    testImg.onload = () => {
        imgPreview.src = v;
        imgPreview.classList.add("has-image");
        uploadZone.classList.add("has-image");
        cardBody.classList.add("has-image");
        imgField.classList.add("has-image");
        uploadPlaceholder.classList.add("hidden");
    };
    testImg.onerror = resetImage;
}
function resetImage() {
    imgPreview.src = "";
    [imgPreview, uploadZone, cardBody, imgField].forEach(el => el.classList.remove("has-image"));
    uploadPlaceholder.classList.remove("hidden");
}
imgInput.addEventListener("input", updateImagePreview);
imgInput.addEventListener("blur", updateImagePreview);
uploadZone.addEventListener("click", () => imgInput.focus());
let selectedTags = [];
const container = document.getElementById("tagsContainer");
const hiddenInput = document.getElementById("tagsInput");
function updateHiddenInput() { hiddenInput.value = JSON.stringify(selectedTags); }
function renderTags() {
    container.innerHTML = "";
    selectedTags.forEach(tag => {
        const el = document.createElement("span");
        el.className = "tag";
        el.innerHTML = `${tag} <span class="tag-remove" data-tag="${tag}">x</span>`;
        container.appendChild(el);
    });
    const inp = document.createElement("input");
    inp.className = "tag-input"; inp.placeholder = "Agregar...";
    container.appendChild(inp);
    const dd = document.createElement("div");
    dd.className = "tags-dropdown"; dd.style.display = "none";
    container.appendChild(dd);
    inp.addEventListener("keydown", e => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const v = inp.value.trim().toLowerCase();
        if (!v || selectedTags.includes(v)) return;
        selectedTags.push(v); inp.value = "";
        renderTags(); updateHiddenInput();
    });
    inp.addEventListener("input", () => {
        const v = inp.value.toLowerCase();
        if (!v) { dd.style.display = "none"; return; }
        renderDropdown(availableTags.filter(t => t.includes(v) && !selectedTags.includes(t)), dd, inp);
    });
}
function renderDropdown(suggestions, dd, inp) {
    dd.innerHTML = "";
    if (!suggestions.length) { dd.style.display = "none"; return; }
    suggestions.forEach(tag => {
        const opt = document.createElement("div");
        opt.className = "tag-option"; opt.textContent = tag;
        opt.addEventListener("click", () => {
            if (!selectedTags.includes(tag)) selectedTags.push(tag);
            inp.value = ""; dd.style.display = "none";
            renderTags(); updateHiddenInput();
        });
        dd.appendChild(opt);
    });
    dd.style.display = "block";
}
document.addEventListener("click", e => {
    if (e.target.classList.contains("tag-remove")) {
        selectedTags = selectedTags.filter(t => t !== e.target.dataset.tag);
        renderTags(); updateHiddenInput();
    }
    if (!container.contains(e.target)) {
        const d = document.querySelector(".tags-dropdown");
        if (d) d.style.display = "none";
    }
});
function renderSpecs(subcategoryId, values = {}) {
    if (!specsContainer) return;
    if (!subcategoryId) { showSpecsMsg("Seleccioná una subcategoría para ver las especificaciones"); return; }
    const config = specsConfig[subcategoryId];
    if (!config || !config.length) { showSpecsMsg("Esta subcategoría no tiene especificaciones configuradas"); return; }
    specsContainer.innerHTML = "";
    let row = null;
    config.forEach(({ id, name, data_type, label }) => {
        const displayLabel = label || name;
        const inputName = `spec_id_${id}`;
        if (!row || row.children.length === 2) {
            if (row) { const s = document.createElement("div"); s.style.height = "14px"; specsContainer.appendChild(s); }
            row = document.createElement("div"); row.className = "input-row"; specsContainer.appendChild(row);
        }
        const fd = document.createElement("div"); fd.className = "field no-margin";
        const lb = document.createElement("label"); lb.textContent = displayLabel;
        if (data_type === "boolean") {
            const sel = document.createElement("select"); sel.name = inputName;
            const oY = document.createElement("option"); oY.value = "true"; oY.textContent = "Sí";
            const oN = document.createElement("option"); oN.value = "false"; oN.textContent = "No";
            const curr = values[id];
            if (curr === true || curr === "true") oY.selected = true; else oN.selected = true;
            sel.append(oY, oN); fd.append(lb, sel);
        } else {
            const inp = document.createElement("input");
            inp.type = data_type === "number" ? "number" : "text";
            inp.value = values[id] ?? ""; inp.name = inputName;
            fd.append(lb, inp);
        }
        row.appendChild(fd);
    });
}
function showSpecsMsg(msg) {
    specsContainer.innerHTML = "";
    const p = document.createElement("p"); p.className = "specs-message"; p.textContent = msg;
    specsContainer.appendChild(p);
}
subcategorySelect.addEventListener("change", () => {
    const v = subcategorySelect.value;
    if (v) renderSpecs(Number(v));
});
productForm.addEventListener('submit', function (e) {
    closeFrontendAlert();
    const errors = getErrors();
    if (errors.length > 0) {
        e.preventDefault();
        showAlertErrors(errors);
        return;
    }
    const btn = productForm.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
});
document.addEventListener("DOMContentLoaded", () => {
    categories = [
        ...(categoriesData || []),
        ...(categoriesData || []).flatMap(c => c.subcategories || []),
    ];
    initCategories(categories);
    initBrands(brandsData || []);
    renderTags();
    renderSpecs();
    updateHiddenInput();
});
