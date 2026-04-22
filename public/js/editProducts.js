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

const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
const brandSelect = document.getElementById("brandSelect");
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
});
