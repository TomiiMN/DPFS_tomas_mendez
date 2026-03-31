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
// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
});
document.querySelectorAll('.PS_filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const parentLi = btn.closest('.PS_filter-item');
        parentLi.classList.toggle('open');
    });
});