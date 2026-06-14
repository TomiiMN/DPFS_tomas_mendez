const toggleBtn = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('productsSidebar');
const overlay = document.getElementById('sidebarOverlay');
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-label', 'Cerrar filtros');
}
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-label', 'Abrir filtros');
}
toggleBtn.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
overlay.addEventListener('click', closeSidebar);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
});
let activeCatIds = null;
function applyFilters() {
    const grid = document.getElementById('productsGrid');
    const cards = [...grid.querySelectorAll('.product-card-wrapper')];
    let visible = 0;
    cards.forEach(card => {
        const catIds = (card.dataset.catIds || '').split(',').map(Number).filter(Boolean);
        const show = !activeCatIds || activeCatIds.some(id => catIds.includes(id));
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });
    const counter = document.getElementById('resultsCount');
    if (counter) counter.textContent = visible;

    document.getElementById('noResults').style.display = visible === 0 ? '' : 'none';
    const sortVal = document.getElementById('sortSelect')?.value || 'default';
    if (sortVal === 'default') return;
    const sorted = [...cards].sort((a, b) => {
        if (sortVal === 'price-asc')  return Number(a.dataset.price) - Number(b.dataset.price);
        if (sortVal === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
        if (sortVal === 'name-asc')   return a.dataset.name.localeCompare(b.dataset.name, 'es');
        if (sortVal === 'name-desc')  return b.dataset.name.localeCompare(a.dataset.name, 'es');
        return 0;
    });
    sorted.forEach(card => grid.appendChild(card));
}
const catParam = new URLSearchParams(window.location.search).get('cat');
if (catParam) {
    const catData = JSON.parse(document.getElementById('category-data').textContent);
    const match = catData.find(c => c.slug === catParam);
    if (match) {
        activeCatIds = match.ids;
        applyFilters();
        const btn = document.querySelector(`.PS_filter-btn[data-cat="${catParam}"]`);
        if (btn) btn.closest('.PS_filter-item').classList.add('open');
    }
}
document.getElementById('sortSelect').addEventListener('change', applyFilters);
document.querySelectorAll('.PS_filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const parentLi = btn.closest('.PS_filter-item');
        const wasOpen = parentLi.classList.contains('open');
        document.querySelectorAll('.PS_filter-item').forEach(li => li.classList.remove('open'));
        if (!wasOpen) parentLi.classList.add('open');
    });
});
document.querySelectorAll('.PS_subcategory-a').forEach(btn => {
    btn.addEventListener('click', () => {
        const catId = Number(btn.dataset.catId);
        const isActive = btn.classList.contains('active');
        document.querySelectorAll('.PS_filter-btn, .PS_subcategory-a').forEach(el => el.classList.remove('active'));
        if (isActive) {
            activeCatIds = null;
        } else {
            btn.classList.add('active');
            activeCatIds = [catId];
        }
        applyFilters();
    });
});