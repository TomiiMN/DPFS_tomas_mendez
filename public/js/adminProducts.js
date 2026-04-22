function renderData(product) {
    const statTotal = document.getElementById("statTotal")
    const statPublished = document.getElementById("statPublished")
    const statSale = document.getElementById("statSale")
    const statFeatured = document.getElementById("statFeatured")
    const totalAmount = product.length
    const publishedProduct = product.filter(product => product.state == "Publicado")
    const saleProduct = product.filter(product => product.flags?.onSale)
    const featuredProduct = product.filter(product => product.flags?.featured)
    statTotal.innerHTML = `${totalAmount || "-"}`
    statPublished.innerHTML = `${publishedProduct.length || "-"}`
    statSale.innerHTML = `${saleProduct.length || "-"}`
    statFeatured.innerHTML = `${featuredProduct.length || "-"}`
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
                                ${product.flags?.featured ? `<span class="flag featured">Destacado</span>` : ""}
                                ${product.flags?.onSale ? `<span class="flag on-sale">Oferta</span>` : ""}
                            </div>
                        </td>
                        <td class="col-price">$${product.price.toLocaleString()}</td>
                        <td class="col-brand">${product.brand}</td>
                        <td class="col-cat">${product.category[0].name}</td>
                        <td class="col-status">${product.state || "No publicado"}</td>
                        <td class="col-actions">
                            <div class="row-actions">
                                <a href="/admin/${product.id}/edit" class="action-a-btn">✏️</a>
                                <a href="/admin/${product.id}" class="action-a-btn">👁️</a>
                            </div>    
                        </td>
                        `;
        tableBody.appendChild(row);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const products = window.productsData || [];

    renderData(products);
    renderProducts(products);
});