// ══════════════════════════════════════════════
//  DATOS INYECTADOS POR EL SERVIDOR (EJS)
// ══════════════════════════════════════════════
// product debe tener:
//   id, name, description, price, original_price,
//   category_id, subcategory_id,
//   images: [{ url, is_main }],
//   brand, socket, nucleos, freq_turbo,
//   seo_title, seo_description,
//   featured, on_sale, free_shipping, allow_reviews,
//   created_at, updated_at, status

// ══════════════════════════════════════════════
//  ESTADO
// ══════════════════════════════════════════════
let originalData = {};   // snapshot inicial
let changedFields = new Set();

// ══════════════════════════════════════════════
//  CATEGORÍAS
// ══════════════════════════════════════════════
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
subcategorySelect.disabled = true;

const mainCategories = categories.filter(c => c.parent_id === null);
mainCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.name;
    categorySelect.appendChild(opt);
});

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
    markChanged(categorySelect);
    updatePreview();
});
subcategorySelect.addEventListener("change", () => markChanged(subcategorySelect));

// ══════════════════════════════════════════════
//  POBLADO INICIAL
// ══════════════════════════════════════════════
function populate() {
    // Breadcrumb
    document.getElementById("breadcrumbName").textContent = product.name || "Producto";

    // Metadata
    document.getElementById("metaId").textContent = "#" + (product.id || "—");
    document.getElementById("metaCreated").textContent = product.created_at ? fmtDate(product.created_at) : "—";
    document.getElementById("metaUpdated").textContent = product.updated_at ? fmtDate(product.updated_at) : "—";
    const statusEl = document.getElementById("metaStatus");
    statusEl.textContent = product.status === "published" ? "Publicado" : "Borrador";
    statusEl.className = "meta-value " + (product.status === "published" ? "ok" : "warn");

    // Campos básicos
    setValue("inputName", product.name);
    setValue("inputDesc", product.description);
    setValue("inputPrice", product.price);
    setValue("inputOriginalPrice", product.original_price);
    setValue("inputMarca", product.brand);
    setValue("inputFreq", product.freq_turbo);
    setValue("inputSeoTitle", product.seo_title);
    setValue("inputSeoDesc", product.seo_description);

    // Categoría
    if (product.category_id) {
        categorySelect.value = product.category_id;
        loadSubcategories(product.category_id, product.subcategory_id);
    }

    // Toggles
    document.getElementById("togFeatured").checked = !!product.featured;
    document.getElementById("togSale").checked = !!product.on_sale;
    document.getElementById("togFreeShip").checked = !!product.free_shipping;
    document.getElementById("togReviews").checked = !!product.allow_reviews;

    // Tags
    if (product.socket) setTags("tagsSocket", Array.isArray(product.socket) ? product.socket : [product.socket]);
    if (product.nucleos) setTags("tagsNucleos", Array.isArray(product.nucleos) ? product.nucleos : [product.nucleos]);

    // Imágenes
    renderThumbs(product.images || []);

    // Contadores char
    updateCharCount("inputName", "countName", 120);
    updateCharCount("inputDesc", "countDesc", 2000);
    updateCharCount("inputSeoTitle", "countSeoTitle", 60);
    updateCharCount("inputSeoDesc", "countSeoDesc", 160);

    // SEO preview
    updateSeoPreview();

    // Vista previa
    updatePreview();

    // Snapshot
    takeSnapshot();
}

function setValue(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
}

function fmtDate(str) {
    const d = new Date(str);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

// ══════════════════════════════════════════════
//  THUMBNAILS
// ══════════════════════════════════════════════
let currentImages = [];  // { url, is_main, isNew?, file? }

function renderThumbs(images) {
    currentImages = images.map(img => ({ ...img }));
    _drawThumbs();
}

function _drawThumbs() {
    const row = document.getElementById("thumbRow");
    row.innerHTML = "";

    currentImages.forEach((img, i) => {
        const div = document.createElement("div");
        div.className = "thumb" + (img.is_main || i === 0 ? " main-thumb" : "");

        if (img.url) {
            const im = document.createElement("img");
            im.src = img.url;
            div.appendChild(im);
        } else {
            div.textContent = "🖼";
        }

        if (i === 0) {
            const badge = document.createElement("span");
            badge.className = "thumb-badge";
            badge.textContent = "MAIN";
            div.appendChild(badge);
        }

        const del = document.createElement("div");
        del.className = "thumb-delete";
        del.textContent = "✕";
        del.addEventListener("click", e => {
            e.stopPropagation();
            currentImages.splice(i, 1);
            _drawThumbs();
            trackChange("images");
        });
        div.appendChild(del);
        row.appendChild(div);
    });

    // Botón agregar
    const add = document.createElement("div");
    add.className = "thumb thumb-add";
    add.textContent = "+";
    add.addEventListener("click", () => document.getElementById("fileInput").click());
    row.appendChild(add);

    // Preview
    if (currentImages.length > 0 && currentImages[0].url) {
        const pi = document.getElementById("prevImg");
        pi.innerHTML = `<img src="${currentImages[0].url}" alt="">`;
    }
}

// Upload zone
const uploadZone = document.getElementById("uploadZone");
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.id = "fileInput";
fileInput.accept = "image/*";
fileInput.multiple = true;
fileInput.style.display = "none";
document.body.appendChild(fileInput);

uploadZone.addEventListener("click", () => fileInput.click());
uploadZone.addEventListener("dragover", e => { e.preventDefault(); uploadZone.style.borderColor = "var(--color-primary)"; });
uploadZone.addEventListener("dragleave", () => { uploadZone.style.borderColor = ""; });
uploadZone.addEventListener("drop", e => {
    e.preventDefault();
    uploadZone.style.borderColor = "";
    handleFiles(e.dataTransfer.files);
});
fileInput.addEventListener("change", () => handleFiles(fileInput.files));

function handleFiles(files) {
    Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        currentImages.push({ url, is_main: false, isNew: true, file });
    });
    _drawThumbs();
    trackChange("images");
}

// ══════════════════════════════════════════════
//  TAGS
// ══════════════════════════════════════════════
function setTags(containerId, values) {
    const wrap = document.getElementById(containerId);
    const input = wrap.querySelector(".tag-input");
    wrap.querySelectorAll(".tag").forEach(t => t.remove());
    values.forEach(v => addTagToWrap(wrap, input, v));
}

function addTagToWrap(wrap, input, value) {
    if (!value.trim()) return;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.innerHTML = `${value} <span class="tag-remove">×</span>`;
    tag.querySelector(".tag-remove").addEventListener("click", () => {
        tag.remove();
        trackChange(wrap.id);
    });
    wrap.insertBefore(tag, input);
}

function initTagInput(containerId) {
    const wrap = document.getElementById(containerId);
    const input = wrap.querySelector(".tag-input");
    input.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTagToWrap(wrap, input, input.value.replace(",", "").trim());
            input.value = "";
            trackChange(containerId);
        }
        if (e.key === "Backspace" && input.value === "") {
            const tags = wrap.querySelectorAll(".tag");
            if (tags.length) tags[tags.length - 1].remove();
            trackChange(containerId);
        }
    });
    wrap.addEventListener("click", () => input.focus());
}

initTagInput("tagsSocket");
initTagInput("tagsNucleos");

// ══════════════════════════════════════════════
//  CHAR COUNTS
// ══════════════════════════════════════════════
function updateCharCount(inputId, countId, max) {
    const el = document.getElementById(inputId);
    const cnt = document.getElementById(countId);
    if (!el || !cnt) return;
    const len = el.value.length;
    cnt.textContent = `${len} / ${max}`;
    cnt.className = "char-count" + (len > max ? " over" : len > max * 0.9 ? " warn" : "");
}

["inputName", "inputDesc", "inputSeoTitle", "inputSeoDesc"].forEach(id => {
    const maxMap = { inputName: 120, inputDesc: 2000, inputSeoTitle: 60, inputSeoDesc: 160 };
    const cntMap = { inputName: "countName", inputDesc: "countDesc", inputSeoTitle: "countSeoTitle", inputSeoDesc: "countSeoDesc" };
    const el = document.getElementById(id);
    el.addEventListener("input", () => {
        updateCharCount(id, cntMap[id], maxMap[id]);
        markChanged(el);
        if (id === "inputName" || id === "inputDesc") updatePreview();
        if (id === "inputSeoTitle" || id === "inputSeoDesc") updateSeoPreview();
    });
});

// ══════════════════════════════════════════════
//  LIVE PREVIEW
// ══════════════════════════════════════════════
function updatePreview() {
    const name = document.getElementById("inputName").value || "—";
    const desc = document.getElementById("inputDesc").value || "—";
    const price = document.getElementById("inputPrice").value;
    const orig = document.getElementById("inputOriginalPrice").value;
    const catOpt = categorySelect.options[categorySelect.selectedIndex];
    const cat = catOpt && catOpt.value ? catOpt.text : "—";

    document.getElementById("prevName").textContent = name;
    document.getElementById("prevDesc").textContent = desc.substring(0, 90) + (desc.length > 90 ? "…" : "");
    document.getElementById("prevCategory").textContent = cat;

    if (price) {
        document.getElementById("prevPrice").textContent = "$" + Number(price).toLocaleString("es-AR");
    }
    if (orig && price && Number(orig) > Number(price)) {
        document.getElementById("prevOriginal").textContent = "$" + Number(orig).toLocaleString("es-AR");
        const disc = Math.round((1 - Number(price) / Number(orig)) * 100);
        const badge = document.getElementById("prevBadge");
        badge.textContent = `−${disc}%`;
        badge.style.display = "";
    } else {
        document.getElementById("prevOriginal").textContent = "";
        document.getElementById("prevBadge").style.display = "none";
    }
}

function updateSeoPreview() {
    const title = document.getElementById("inputSeoTitle").value;
    const desc = document.getElementById("inputSeoDesc").value;
    const slug = (document.getElementById("inputName").value || "")
        .toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    document.getElementById("seoUrl").textContent = "techbox.com › productos › " + (slug || "...");
    document.getElementById("seoTitle").textContent = title || "—";
    document.getElementById("seoDesc").textContent = desc || "—";
}

// ══════════════════════════════════════════════
//  CHANGE TRACKING
// ══════════════════════════════════════════════
function takeSnapshot() {
    originalData = {
        name: document.getElementById("inputName").value,
        description: document.getElementById("inputDesc").value,
        price: document.getElementById("inputPrice").value,
        original_price: document.getElementById("inputOriginalPrice").value,
        category_id: categorySelect.value,
        subcategory_id: subcategorySelect.value,
        brand: document.getElementById("inputMarca").value,
        freq_turbo: document.getElementById("inputFreq").value,
        seo_title: document.getElementById("inputSeoTitle").value,
        seo_description: document.getElementById("inputSeoDesc").value,
        featured: document.getElementById("togFeatured").checked,
        on_sale: document.getElementById("togSale").checked,
        free_shipping: document.getElementById("togFreeShip").checked,
        allow_reviews: document.getElementById("togReviews").checked,
    };
    changedFields.clear();
    refreshChangesUI();
}

function markChanged(el) {
    if (el.value !== (originalData[el.id] ?? "")) {
        el.classList.add("changed");
        trackChange(el.id);
    } else {
        el.classList.remove("changed");
        changedFields.delete(el.id);
        refreshChangesUI();
    }
}

function trackChange(fieldId) {
    changedFields.add(fieldId);
    refreshChangesUI();
}

function refreshChangesUI() {
    const count = changedFields.size;
    const btnSave = document.getElementById("btnSave");
    const pill = document.getElementById("changesPill");
    btnSave.disabled = count === 0;
    if (count > 0) {
        pill.classList.add("visible");
        document.getElementById("changesCount").textContent = count;
    } else {
        pill.classList.remove("visible");
    }
}

// Escuchar cambios en campos simples
["inputName", "inputDesc", "inputPrice", "inputOriginalPrice", "inputMarca", "inputFreq"].forEach(id => {
    document.getElementById(id).addEventListener("input", function () {
        markChanged(this);
        updatePreview();
    });
});

// Toggles
["togFeatured", "togSale", "togFreeShip", "togReviews"].forEach(id => {
    document.getElementById(id).addEventListener("change", function () {
        if (this.checked !== originalData[id]) trackChange(id);
        else { changedFields.delete(id); refreshChangesUI(); }
    });
});

// ══════════════════════════════════════════════
//  BOTONES
// ══════════════════════════════════════════════
document.getElementById("btnSave").addEventListener("click", () => {
    // Aquí construís el body y hacés el fetch PUT/PATCH a tu API
    const body = {
        name: document.getElementById("inputName").value,
        description: document.getElementById("inputDesc").value,
        price: document.getElementById("inputPrice").value,
        original_price: document.getElementById("inputOriginalPrice").value,
        category_id: categorySelect.value,
        subcategory_id: subcategorySelect.value,
        brand: document.getElementById("inputMarca").value,
        freq_turbo: document.getElementById("inputFreq").value,
        seo_title: document.getElementById("inputSeoTitle").value,
        seo_description: document.getElementById("inputSeoDesc").value,
        featured: document.getElementById("togFeatured").checked,
        on_sale: document.getElementById("togSale").checked,
        free_shipping: document.getElementById("togFreeShip").checked,
        allow_reviews: document.getElementById("togReviews").checked,
    };
    console.log("PATCH /api/productos/" + product.id, body);
    // fetch(`/api/productos/${product.id}`, { method: "PATCH", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body) })
    //   .then(r => r.json()).then(() => takeSnapshot());
});

document.getElementById("btnDiscard").addEventListener("click", () => {
    if (changedFields.size === 0 || confirm("¿Descartar todos los cambios?")) {
        populate(); // re-poblamos desde los datos originales
    }
});

document.getElementById("btnDelete").addEventListener("click", () => {
    if (confirm(`¿Eliminar permanentemente "${product.name}"? Esta acción no se puede deshacer.`)) {
        console.log("DELETE /api/productos/" + product.id);
        // fetch(`/api/productos/${product.id}`, { method: "DELETE" }).then(() => window.location.href = "/admin/productos");
    }
});


// ══════════════════════════════════════════════
//  MODAL BUSCADOR DE PRODUCTOS
// ══════════════════════════════════════════════
// allProducts se inyecta desde EJS: todos los productos para el buscador
// Si no existe la variable, usamos array vacío (fallback)
const allProducts = (typeof products !== "undefined" ? products : []);

let modalCatFilter = "";
let modalHighlight = -1;
let modalFiltered = [];

// Construir filtros de categoría en el modal
function buildModalFilters() {
    const filtersEl = document.getElementById("modalFilters");
    const mainCats = categories.filter(c => c.parent_id === null);
    mainCats.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "modal-filter-btn";
        btn.dataset.cat = cat.id;
        btn.textContent = cat.name;
        btn.onclick = function () { setModalCat(this, cat.id); };
        filtersEl.appendChild(btn);
    });
}

function setModalCat(btn, catId) {
    document.querySelectorAll(".modal-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    modalCatFilter = catId;
    filterModalResults();
}

function openSearchModal() {
    document.getElementById("searchModal").classList.add("open");
    document.getElementById("modalSearchInput").value = "";
    modalCatFilter = "";
    modalHighlight = -1;
    document.querySelectorAll(".modal-filter-btn").forEach(b => b.classList.remove("active"));
    document.querySelector(".modal-filter-btn[data-cat=\'\']").classList.add("active");
    filterModalResults();
    setTimeout(() => document.getElementById("modalSearchInput").focus(), 60);
    document.body.style.overflow = "hidden";
}

function closeSearchModal() {
    document.getElementById("searchModal").classList.remove("open");
    document.body.style.overflow = "";
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById("searchModal")) closeSearchModal();
}

function filterModalResults() {
    const q = document.getElementById("modalSearchInput").value.toLowerCase().trim();
    modalFiltered = allProducts.filter(p => {
        if (p.id === product.id) return false; // excluir el actual
        const matchQ = !q || p.name.toLowerCase().includes(q) || String(p.id).includes(q) || (p.brand || "").toLowerCase().includes(q);
        const matchCat = !modalCatFilter || p.category_id == modalCatFilter;
        return matchQ && matchCat;
    });
    modalHighlight = -1;
    renderModalResults();
}

function renderModalResults() {
    const container = document.getElementById("modalResults");
    const countEl = document.getElementById("modalCount");
    container.innerHTML = "";

    if (modalFiltered.length === 0) {
        container.innerHTML = `
                    <div class="modal-empty">
                        <div class="modal-empty-icon">◈</div>
                        Sin resultados
                    </div>`;
        countEl.textContent = "0 productos";
        return;
    }

    countEl.textContent = modalFiltered.length + " producto" + (modalFiltered.length !== 1 ? "s" : "");

    // Mostrar máx 40 resultados
    modalFiltered.slice(0, 40).forEach((p, i) => {
        const mainImg = (p.images || []).find(im => im.is_main) || (p.images || [])[0];
        const imgHtml = mainImg ? `<img src="${mainImg.url}" alt="">` : "🖼";
        const price = p.price ? "$" + Number(p.price).toLocaleString("es-AR") : "—";
        const catName = categories.find(c => c.id == p.category_id)?.name || "";
        const brand = p.brand ? " · " + p.brand : "";

        const item = document.createElement("div");
        item.className = "modal-item";
        item.dataset.idx = i;
        item.innerHTML = `
                    <div class="modal-thumb">${imgHtml}</div>
                    <div class="modal-item-info">
                        <div class="modal-item-name">${p.name}</div>
                        <div class="modal-item-sub">#${p.id}${brand}${catName ? " · " + catName : ""}</div>
                    </div>
                    <div class="modal-item-price">${price}</div>
                    <div class="modal-item-arrow">→</div>`;

        item.addEventListener("click", () => selectProduct(p.id));
        item.addEventListener("mouseenter", () => {
            modalHighlight = i;
            highlightModalItem();
        });
        container.appendChild(item);
    });

    highlightModalItem();
}

function highlightModalItem() {
    document.querySelectorAll(".modal-item").forEach((el, i) => {
        el.style.background = i === modalHighlight ? "rgba(143,0,255,0.1)" : "";
    });
    // scroll into view
    const items = document.querySelectorAll(".modal-item");
    if (modalHighlight >= 0 && items[modalHighlight]) {
        items[modalHighlight].scrollIntoView({ block: "nearest" });
    }
}

function handleModalKey(e) {
    if (e.key === "Escape") { closeSearchModal(); return; }
    if (e.key === "ArrowDown") {
        e.preventDefault();
        modalHighlight = Math.min(modalHighlight + 1, Math.min(modalFiltered.length, 40) - 1);
        highlightModalItem();
    }
    if (e.key === "ArrowUp") {
        e.preventDefault();
        modalHighlight = Math.max(modalHighlight - 1, 0);
        highlightModalItem();
    }
    if (e.key === "Enter" && modalHighlight >= 0 && modalFiltered[modalHighlight]) {
        selectProduct(modalFiltered[modalHighlight].id);
    }
}

function selectProduct(id) {
    closeSearchModal();
    window.location.href = `/admin/productos/editar/${id}`;
}

// Atajo de teclado global: Ctrl+K / Cmd+K
document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearchModal();
    }
    if (e.key === "Escape" && document.getElementById("searchModal").classList.contains("open")) {
        closeSearchModal();
    }
});

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    const products = window.productsData || [];
    const categories = window.categoriesData || [];
    populate();
    buildModalFilters();
});