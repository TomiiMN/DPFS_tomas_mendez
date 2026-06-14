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
const products = data.products || [];
let currentSortKey = null;
let currentSortDir = 'asc';
function renderData(products) {
    const statTotal = document.getElementById("statTotal");
    const statPublished = document.getElementById("statPublished");
    const statSale = document.getElementById("statSale");
    const statFeatured = document.getElementById("statFeatured");
    const totalAmount = products.length;
    const publishedProduct = products.filter(product => product.state);
    const saleProduct = products.filter(product => product.on_sale);
    const featuredProduct = products.filter(product => product.featured);
    statTotal.innerHTML = `${totalAmount || "-"}`;
    statPublished.innerHTML = `${publishedProduct.length || "-"}`;
    statSale.innerHTML = `${saleProduct.length || "-"}`;
    statFeatured.innerHTML = `${featuredProduct.length || "-"}`;
}
function renderProducts(products) {
    const tableBody = document.getElementById("tableBody");
    const emptyState = document.getElementById("emptyState");
    tableBody.innerHTML = "";
    if (!products.length) {
        emptyState.style.display = "block";
        return;
    }
    emptyState.style.display = "none";
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td class="col-id">#${product.id}</td>
                        <td class="col-product">
                            <div>
                                <strong>${product.name}</strong><br>
                                <span class="muted">${product.model || ""}</span>
                            </div>
                            <div class="flags">
                                ${(product.featured == 1) ? `<span class="flag featured">Destacado</span>` : ""}
                                ${(product.on_sale == 1) ? `<span class="flag on-sale">Oferta</span>` : ""}
                            </div>
                        </td>
                        <td class="col-price">$${product.price.toLocaleString()}</td>
                        <td class="col-brand">${product.brand}</td>
                        <td class="col-cat">${product.categories?.[0]?.name || "-"}</td>
                        <td class="col-status">${product.state ? "Publicado" : "No publicado"}</td>
                        <td class="col-actions">
                            <div class="row-actions">
                                <a href="/admin/products/${product.id}/edit" class="action-a-btn">✏️</a>
                                <a href="/admin/products/${product.id}" class="action-a-btn">👁️</a>
                            </div>    
                        </td>
                        `;
        tableBody.appendChild(row);
    });
}
function sortBy(key) {
    if (currentSortKey === key) {
        currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortKey = key;
        currentSortDir = 'asc';
    }
    applyFilters();
}
function getFilteredProducts() {
    const search = document.getElementById("searchInput").value.trim().toLowerCase();
    const categoryId = document.getElementById("filterCategory").value;
    const status = document.getElementById("filterStatus").value;

    let result = products.filter(p => {
        const brand = typeof p.brand === 'string' ? p.brand : p.brand?.name ?? '';
        const matchesSearch = !search ||
            p.name.toLowerCase().includes(search) ||
            String(p.id).includes(search) ||
            brand.toLowerCase().includes(search);

        const matchesCategory = !categoryId ||
            (p.categories ?? []).some(cat => String(cat.id) === categoryId);

        const matchesStatus = !status ||
            (status === 'published' && p.state) ||
            (status === 'not_published' && !p.state);

        return matchesSearch && matchesCategory && matchesStatus;
    });
    if (currentSortKey) {
        result = [...result].sort((a, b) => {
            const valA = currentSortKey === 'price' ? a.price : a.name.toLowerCase();
            const valB = currentSortKey === 'price' ? b.price : b.name.toLowerCase();
            if (valA < valB) return currentSortDir === 'asc' ? -1 : 1;
            if (valA > valB) return currentSortDir === 'asc' ? 1 : -1;
            return 0;
        });
    }
    return result;
}
function applyFilters() {
    renderProducts(getFilteredProducts());
}
document.addEventListener("DOMContentLoaded", () => {
    renderData(products);
    renderProducts(products);
    document.getElementById("searchInput").addEventListener("input", applyFilters);
    document.getElementById("filterCategory").addEventListener("change", applyFilters);
    document.getElementById("filterStatus").addEventListener("change", applyFilters);
});