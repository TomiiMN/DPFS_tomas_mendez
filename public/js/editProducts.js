// Acceso a los elementos del DOM
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
const product = data.product || {};
const categoriesData = data.categories || [];
const brandsData = data.brands || [];
const tagsData = data.tags || [];
const productTags = data.productTags || [];
let selectedTags = [...productTags];
const availableTags = tagsData.map((t) => t.name);
const specsLabels = data.specsLabels || {};
const specsConfig = data.specsConfig || {};
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
const brandSelect = document.getElementById("brandSelect");
const specsContainer = document.getElementById("specsContainer");
const tagsInput = document.getElementById("tagsInput");
// Detectar cambios dentro del formulario para habilitar el botón de guardar
const form = document.getElementById("editProductForm");
const btnSave = document.getElementById("btnSave");
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
  }
}
function getSpecsData() {
  const specs = {};
  const inputs = specsContainer.querySelectorAll("[name^='specs']");
  inputs.forEach(input => {
    const match = input.name.match(/specs\[(.*?)\]/);
    if (!match) return;
    const key = match[1];
    let value = input.value;
    if (value === "true") value = true;
    else if (value === "false") value = false;
    specs[key] = value;
  });
  return specs;
}
let initialData;
function checkChanges() {
  const currentData = JSON.stringify(getFormData());
  if (currentData !== initialData) {
    btnSave.disabled = false;
  } else {
    btnSave.disabled = true;
  }
}
form.addEventListener("input", checkChanges);
form.addEventListener("change", checkChanges);
// hiddenInputs
function updateHiddenInputs() {
  tagsInput.value = JSON.stringify(selectedTags);
}
// Categorias y subcategorías
let categories = [];
subcategorySelect.disabled = true;
function initCategories(categories) {
  const mainCategories = categories.filter((c) => c.parent_id === null);

  mainCategories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.name;
    if (cat.id == product.category?.[0]?.id) {
      opt.selected = true;
    }
    categorySelect.appendChild(opt);
  });
  if (product.category?.[0]?.id) {
    loadSubcategories(product.category[0].id, product.category[1]?.id);
  }
}
function loadSubcategories(parentId, selectedSubId = null) {
  subcategorySelect.innerHTML =
    '<option value="" disabled selected>Seleccionar...</option>';
  const subs = categories.filter((c) => c.parent_id == parentId);
  if (subs.length === 0) {
    subcategorySelect.disabled = true;
    return;
  }
  subcategorySelect.disabled = false;
  subs.forEach((sub) => {
    const opt = document.createElement("option");
    opt.value = sub.id;
    opt.textContent = sub.name;
    if (selectedSubId && sub.id == selectedSubId) opt.selected = true;
    subcategorySelect.appendChild(opt);
  });
  const selectedId = subcategorySelect.value;
  if (selectedId) {
    renderSpecs(Number(selectedId), product.specs || {});
  }
}
categorySelect.addEventListener("change", () => {
  loadSubcategories(categorySelect.value);
});
// Marcas
function initBrands(brands) {
  brands.forEach((brand) => {
    const opt = document.createElement("option");
    opt.value = brand.id;
    opt.textContent = brand.name;
    if (brand.name == product.brand) {
      opt.selected = true;
    }
    brandSelect.appendChild(opt);
  });
}
// Tags
const container = document.getElementById("tagsContainer");
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
      updateHiddenInputs();
      checkChanges();
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
      updateHiddenInputs();
      checkChanges();
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
  updateHiddenInputs();
  checkChanges();
});

document.addEventListener("click", (e) => {
  if (!container.contains(e.target)) {
    const dropdown = document.querySelector(".tags-dropdown");
    if (dropdown) dropdown.style.display = "none";
  }
});
// Imagenes
const input = document.getElementById("imgInput");
const preview = document.getElementById("imgPreview");
const placeholder = document.getElementById("uploadPlaceholder");
input.addEventListener("input", function () {
  const value = this.value.trim();
  if (value !== "") {
    preview.src = value;
    preview.style.display = "block";
    placeholder.style.display = "none";
  } else {
    preview.style.display = "none";
    placeholder.style.display = "block";
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
}
let currentSpecs = {};
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
  currentSpecs = getSpecsData();
  renderSpecs(Number(value), currentSpecs);
});
// Button delete
const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", () => {
  const confirmDelete = confirm("¿Seguro que querés eliminar este producto?");
  if (!confirmDelete) return;
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `/admin/products/${product.id}?_method=DELETE`;
  document.body.appendChild(form);
  form.submit();
});
// Button descartar
const btnDiscard = document.getElementById("btnDiscard");
btnDiscard.addEventListener("click", () => {
  const confirmDiscard = confirm("¿Descartar cambios?");
  if (!confirmDiscard) return;
  window.location.href = "/admin/products";
});

specsContainer.addEventListener("input", () => {
  updateHiddenInputs();
  checkChanges();
});
form.addEventListener("submit", () => {
  updateHiddenInputs();
});
document.addEventListener("DOMContentLoaded", () => {
  // Renders
  categories = categoriesData || [];
  const brands = brandsData || [];
  initCategories(categories);
  initBrands(brands);
  renderTags();
  // Options
  document.getElementById("togFeatured").checked = !!product.flags?.featured;
  document.getElementById("togSale").checked = !!product.flags?.onSale;
  document.getElementById("togPublic").checked = product.state === "Publicado";
  // Tier
  const tierSelect = document.getElementById("filterTier");
  if (product.tier) {
    tierSelect.value = product.tier;
  }
  initialData = JSON.stringify(getFormData());
  updateHiddenInputs();
  checkChanges();
});
