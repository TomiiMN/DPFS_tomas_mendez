// Acceso a los elementos del DOM
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
const brandSelect = document.getElementById("brandSelect");
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
    subs.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub.id;
        opt.textContent = sub.name;
        if (selectedSubId && sub.id == selectedSubId) opt.selected = true;
        subcategorySelect.appendChild(opt);
    });
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

const btnEdit = document.getElementById("btnEdit")
if (btnEdit) {
    btnEdit.addEventListener("click", () => {
        window.location.href = "/admin/products/edit-product";
    });
}
// subcategorySelect.addEventListener("change", () => markChanged(subcategorySelect));

document.addEventListener("DOMContentLoaded", () => {
    categories = window.categoriesData || [];
    const brands = window.brandsData || [];
    initCategories(categories);
    initBrands(brands);
});