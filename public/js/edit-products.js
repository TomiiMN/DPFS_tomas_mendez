const dataEl = document.getElementById("data");
let data = {};
try { data = JSON.parse(dataEl.textContent); } catch (e) { console.error("Error parseando data:", e); }
const product = data.product || {};
const categoriesData = data.categories || [];
const brandsData = data.brands || [];
const tagsData = data.tags || [];
const productTags = data.productTags || [];
let selectedTags = [...productTags];
const availableTags = tagsData.map(t => t.name);
const specsConfig = data.specsConfig || {};
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
const brandSelect = document.getElementById("brandSelect");
const specsContainer = document.getElementById("specsContainer");
const tagsInput = document.getElementById("tagsInput");
const form = document.getElementById("editProductForm");
const btnSave = document.getElementById("btnSave");
const inputName = document.getElementById("inputName");
const imgInputEl = document.getElementById("imgInput");
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

    const img = imgInputEl.value.trim();
    if (validator.isEmpty(img))
        errors.push('La imagen es obligatoria.');
    else if (!validator.matches(img, /\.(jpg|jpeg|png|gif)$/i))
        errors.push('La imagen debe ser JPG, JPEG, PNG o GIF.');

    return errors;
}
function getFormData() {
    return {
        name: document.getElementById("inputName").value.trim(),
        brand: document.getElementById("brandSelect").value.trim(),
        model: document.getElementById("inputModel").value.trim(),
        category: document.getElementById("categorySelect").value,
        subcategory: document.getElementById("subcategorySelect").value,
        img: document.getElementById("imgInput").value.trim(),
        price: document.getElementById("inputPrice").value.trim(),
        oldPrice: document.getElementById("inputOriginalPrice").value.trim(),
        releaseDate: document.getElementById("inputReleaseDate").value,
        tier: document.getElementById("filterTier").value,
        featured: document.getElementById("togFeatured").checked,
        sale: document.getElementById("togSale").checked,
        public: document.getElementById("togPublic").checked,
        tags: [...selectedTags].sort(),
        specs: getSpecsData(),
    };
}
function getSpecsData() {
    const specs = {};
    specsContainer.querySelectorAll("[name^='spec_id_']").forEach(input => {
        const match = input.name.match(/^spec_id_(\d+)$/);
        if (!match) return;
        let v = input.value;
        if (v === "true") v = true; else if (v === "false") v = false;
        specs[match[1]] = v;
    });
    return specs;
}
let initialData;
function checkChanges() {
    btnSave.disabled = JSON.stringify(getFormData()) === initialData;
}
form.addEventListener("input", checkChanges);
form.addEventListener("change", checkChanges);
function updateHiddenInputs() { tagsInput.value = JSON.stringify(selectedTags); }
let categories = [];
subcategorySelect.disabled = true;
function initCategories(cats) {
    const mainCategories = cats.filter(c => c.parent_id === null);
    const productParent = product.categories?.find(c => c.parent_id === null);
    const productSub = product.categories?.find(c => c.parent_id !== null);
    mainCategories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id; opt.textContent = cat.name;
        if (cat.id == productParent?.id) opt.selected = true;
        categorySelect.appendChild(opt);
    });
    if (productParent?.id) loadSubcategories(productParent.id, productSub?.id);
}
function loadSubcategories(parentId, selectedSubId = null) {
    subcategorySelect.innerHTML = '<option value="" disabled selected>Seleccionar...</option>';
    const subs = categories.filter(c => c.parent_id == parentId);
    if (!subs.length) { subcategorySelect.disabled = true; renderSpecs(null); return; }
    subcategorySelect.disabled = false;
    subs.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub.id; opt.textContent = sub.name;
        subcategorySelect.appendChild(opt);
    });
    if (selectedSubId) subcategorySelect.value = selectedSubId;
    const selectedId = subcategorySelect.value;
    if (selectedId) {
        const specValues = {};
        (product.specs || []).forEach(s => { specValues[s.id] = s.value; });
        renderSpecs(Number(selectedId), specValues);
    } else {
        renderSpecs(null);
    }
}
categorySelect.addEventListener("change", () => loadSubcategories(categorySelect.value));
function initBrands(brands) {
    brands.forEach(brand => {
        const opt = document.createElement("option");
        opt.value = brand.id; opt.textContent = brand.name;
        if (brand.name == product.brand) opt.selected = true;
        brandSelect.appendChild(opt);
    });
}
const container = document.getElementById("tagsContainer");
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
        if (!v) return;
        if (!availableTags.includes(v)) { showAlertErrors(["Tag no válida."]); return; }
        if (!selectedTags.includes(v)) selectedTags.push(v);
        inp.value = ""; renderTags(); updateHiddenInputs(); checkChanges();
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
            renderTags(); updateHiddenInputs(); checkChanges();
        });
        dd.appendChild(opt);
    });
    dd.style.display = "block";
}
document.addEventListener("click", e => {
    if (e.target.classList.contains("tag-remove")) {
        selectedTags = selectedTags.filter(t => t !== e.target.dataset.tag);
        renderTags(); updateHiddenInputs(); checkChanges();
    }
    if (!container.contains(e.target)) {
        const d = document.querySelector(".tags-dropdown");
        if (d) d.style.display = "none";
    }
});
const imgPreviewEl = document.getElementById("imgPreview");
const placeholderEl = document.getElementById("uploadPlaceholder");
imgInputEl.addEventListener("input", function () {
    const v = this.value.trim();
    if (v) { imgPreviewEl.src = v; imgPreviewEl.style.display = "block"; placeholderEl.style.display = "none"; }
    else { imgPreviewEl.style.display = "none"; placeholderEl.style.display = "block"; }
});
function renderSpecs(subcategoryId, values = {}) {
    if (!specsContainer) return;
    const specsEditable = document.getElementById("specsEditable");
    if (!subcategoryId) { specsEditable.value = "0"; showSpecsMsg("Seleccioná una subcategoría para ver las especificaciones"); return; }
    const config = specsConfig[subcategoryId];
    if (!config || !config.length) { specsEditable.value = "0"; showSpecsMsg("Esta subcategoría no tiene especificaciones configuradas"); return; }
    specsEditable.value = "1";
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
    if (!v) return;
    const specValues = {};
    (product.specs || []).forEach(s => { specValues[s.id] = s.value; });
    renderSpecs(Number(v), specValues);
});
document.getElementById("btnDelete").addEventListener("click", () => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;
    const f = document.createElement("form");
    f.method = "POST"; f.action = `/admin/products/${product.id}?_method=DELETE`;
    document.body.appendChild(f); f.submit();
});
document.getElementById("btnDiscard").addEventListener("click", () => {
    if (confirm("¿Descartar cambios?")) window.location.href = "/admin/products";
});
specsContainer.addEventListener("input", () => { updateHiddenInputs(); checkChanges(); });
form.addEventListener("submit", function (e) {
    updateHiddenInputs();
    closeFrontendAlert();
    const errors = getErrors();
    if (errors.length > 0) {
        e.preventDefault();
        showAlertErrors(errors);
        return;
    }
});
document.addEventListener("DOMContentLoaded", () => {
    categories = [
        ...categoriesData,
        ...categoriesData.flatMap(c => c.subcategories || []),
    ];
    initCategories(categories);
    initBrands(brandsData || []);
    renderTags();
    document.getElementById("togFeatured").checked = !!product.featured;
    document.getElementById("togSale").checked = !!product.on_sale;
    document.getElementById("togPublic").checked = !!product.state;
    const tierSelect = document.getElementById("filterTier");
    if (product.tier) tierSelect.value = product.tier;
    initialData = JSON.stringify(getFormData());
    updateHiddenInputs();
    checkChanges();
});
