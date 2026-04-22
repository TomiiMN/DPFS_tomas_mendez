// Acceso a los elementos del DOM
// Category
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
// Brand
const brandSelect = document.getElementById("brandSelect");
// Img
const imgInput = document.getElementById("imgInput");
const imgPreview = document.getElementById("imgPreview");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");
const uploadZone = document.getElementById("uploadZone");
const cardBody = document.getElementById("img-card-body");
const field = document.getElementById("img-field");
// Specs
const specsContainer = document.getElementById("specsContainer");
// Data
const dataEl = document.getElementById("data");
if (!dataEl) {
    console.error("No se encontró el script con datos");
}
let data = {};
try {
    data = JSON.parse(dataEl.textContent);
} catch (error) {
    console.error("Error parseando data:", error);
}
const categoriesData = data.categories || [];
const brandsData = data.brands || [];
const tagsData = data.tags || [];
const availableTags = tagsData.map((t) => t.name);
const specsLabels = data.specsLabels || {};
const specsConfig = data.specsConfig || {};
// Categorias y subcategorías
let categories = [];
subcategorySelect.disabled = true;
function initCategories(categories) {
    const mainCategories = categories.filter(c => c.parent_id === null);

    mainCategories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        categorySelect.appendChild(opt);
    });
}
function loadSubcategories(parentId, selectedSubId = null) {
    subcategorySelect.innerHTML = '<option value="" disabled selected>Seleccionar...</option>';
    const subs = categories.filter(c => c.parent_id == parentId);
    if (subs.length === 0) {
        subcategorySelect.disabled = true;
        return;
    }
    subcategorySelect.disabled = false;
    subs.forEach((sub, index) => {
        const opt = document.createElement("option");
        opt.value = sub.id;
        opt.textContent = sub.name;
        if (index === 0) opt.selected = true;
        if (selectedSubId && sub.id == selectedSubId) opt.selected = true;
        subcategorySelect.appendChild(opt);
    });
    const firstSubId = subcategorySelect.value;
    if (firstSubId) {
        renderSpecs(Number(firstSubId));
    }
}
categorySelect.addEventListener("change", () => {
    loadSubcategories(categorySelect.value);
});
// Marcas
function initBrands(brands) {
    brands.forEach(brand => {
        const opt = document.createElement("option");
        opt.value = brand.id;
        opt.textContent = brand.name;
        brandSelect.appendChild(opt);
    });
}
// Imagen
function updateImagePreview() {
    const value = imgInput.value.trim();
    if (!value) {
        resetImage();
        return;
    }
    if (!value.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
        resetImage();
        return;
    }
    const testImg = new Image();
    testImg.src = value;
    testImg.onload = () => {
        imgPreview.src = value;
        imgPreview.classList.add("has-image");
        uploadZone.classList.add("has-image");
        cardBody.classList.add("has-image");
        field.classList.add("has-image");

        uploadPlaceholder.classList.add("hidden");
    };
    testImg.onerror = () => {
        resetImage();
    };
}
function resetImage() {
    imgPreview.src = "";
    imgPreview.classList.remove("has-image");
    uploadZone.classList.remove("has-image");
    cardBody.classList.remove("has-image");
    field.classList.remove("has-image");
    uploadPlaceholder.classList.remove("hidden");
}
imgInput.addEventListener("input", updateImagePreview);
imgInput.addEventListener("blur", updateImagePreview);
uploadZone.addEventListener("click", () => {
    imgInput.focus();
});
//Tags
let selectedTags = [];
const container = document.getElementById("tagsContainer");
const hiddenInput = document.getElementById("tagsInput");
function updateHiddenInput() {
    hiddenInput.value = JSON.stringify(selectedTags);
}
function renderTags() {
    container.innerHTML = "";

    selectedTags.forEach((tag) => {
        const el = document.createElement("span");
        el.className = "tag";
        el.innerHTML = `
      ${tag} <span class="tag-remove" data-tag="${tag}">x</span>
    `;
        container.appendChild(el);
    });

    const input = document.createElement("input");
    input.className = "tag-input";
    input.placeholder = "Agregar...";
    container.appendChild(input);

    const dropdown = document.createElement("div");
    dropdown.className = "tags-dropdown";
    dropdown.style.display = "none";
    container.appendChild(dropdown);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = input.value.trim().toLowerCase();
            if (!value) return;
            if (!availableTags.includes(value)) {
                alert("Tag no valida");
                return;
            }
            if (!selectedTags.includes(value)) {
                selectedTags.push(value);
            }
            input.value = "";
            renderTags();
            updateHiddenInput();
        }
    });
    input.addEventListener("input", () => {
        const value = input.value.toLowerCase();
        if (!value) {
            dropdown.style.display = "none";
            return;
        }
        const suggestions = availableTags.filter(
            (tag) => tag.includes(value) && !selectedTags.includes(tag),
        );
        renderDropdown(suggestions, dropdown, input);
    });
}
function renderDropdown(suggestions, dropdown, input) {
    dropdown.innerHTML = "";

    if (suggestions.length === 0) {
        dropdown.style.display = "none";
        return;
    }

    suggestions.forEach((tag) => {
        const option = document.createElement("div");
        option.className = "tag-option";
        option.textContent = tag;

        option.addEventListener("click", () => {
            if (!selectedTags.includes(tag)) {
                selectedTags.push(tag);
            }

            input.value = "";
            dropdown.style.display = "none";
            renderTags();
            updateHiddenInput(); // 🔥 clave
        });

        dropdown.appendChild(option);
    });

    dropdown.style.display = "block";
}
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("tag-remove")) return;

    const tag = e.target.dataset.tag;
    selectedTags = selectedTags.filter((t) => t !== tag);

    renderTags();
    updateHiddenInput(); // 🔥 clave
});
document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
        const dropdown = document.querySelector(".tags-dropdown");
        if (dropdown) dropdown.style.display = "none";
    }
});
// Specs
function renderSpecs(subcategoryId, values = {}) {
    if (!specsContainer) return;
    if (!subcategoryId) {
        showSpecsMessage("Seleccioná una subcategoría para ver las especificaciones");
        return;
    }
    const config = specsConfig[subcategoryId];
    if (!config) {
        showSpecsMessage("Esta subcategoría no tiene especificaciones configuradas");
        return;
    }
    specsContainer.innerHTML = "";
    let row = null;
    Object.entries(config).forEach(([key, type]) => {
        if (type === "boolean") {
            if (!row || row.children.length === 2) {
                if (row) {
                    const spacer = document.createElement("div");
                    spacer.style.height = "14px";
                    specsContainer.appendChild(spacer);
                }
                row = document.createElement("div");
                row.className = "input-row";
                specsContainer.appendChild(row);
            }
            const field = document.createElement("div");
            field.className = "field no-margin";
            const label = document.createElement("label");
            label.textContent = specsLabels[key] || key;
            const select = document.createElement("select");
            select.name = `specs[${key}]`;
            const optionYes = document.createElement("option");
            optionYes.value = "true";
            optionYes.textContent = "Sí";
            const optionNo = document.createElement("option");
            optionNo.value = "false";
            optionNo.textContent = "No";
            const currentValue = values[key];
            if (currentValue === true || currentValue === "true") {
                optionYes.selected = true;
            } else {
                optionNo.selected = true;
            }
            select.appendChild(optionYes);
            select.appendChild(optionNo);
            field.appendChild(label);
            field.appendChild(select);
            row.appendChild(field);
            return;
        }
        if (!row || row.children.length === 2) {
            if (row) {
                const spacer = document.createElement("div");
                spacer.style.height = "14px";
                specsContainer.appendChild(spacer);
            }
            row = document.createElement("div");
            row.className = "input-row";
            specsContainer.appendChild(row);
        }
        const field = document.createElement("div");
        field.className = "field no-margin";
        const label = document.createElement("label");
        label.textContent = specsLabels[key] || key;
        const input = document.createElement("input");
        input.type = type === "number" ? "number" : "text";
        input.value = values[key] || "";
        input.name = `specs[${key}]`;
        field.appendChild(label);
        field.appendChild(input);
        row.appendChild(field);
    });
    console.log("Renderizando specs para:", subcategoryId);
}
function showSpecsMessage(message) {
    specsContainer.innerHTML = "";

    const msg = document.createElement("p");
    msg.className = "specs-message";
    msg.textContent = message;

    specsContainer.appendChild(msg);
}
subcategorySelect.addEventListener("change", () => {
    const value = subcategorySelect.value;
    if (!value) return;
    renderSpecs(Number(value));
});
document.addEventListener("DOMContentLoaded", () => {
    categories = categoriesData || [];
    const brands = brandsData || [];
    initCategories(categories);
    initBrands(brands);
    renderTags();
    renderSpecs();
    updateHiddenInput();
});