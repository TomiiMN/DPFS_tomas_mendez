const slides = [...document.querySelectorAll('.carrusel-slide')];
const dots = [...document.querySelectorAll('.carrusel .slide-tab .slide')];
let current = 0;
let autoTimer;
function goToSlide(index) {
    slides[current].classList.remove('carrusel-slide--active');
    dots[current].classList.remove('slide-active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('carrusel-slide--active');
    dots[current].classList.add('slide-active');
    dots[current].setAttribute('aria-selected', 'true');
}
function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(current + 1), 5000);
}
document.getElementById('carrusel_LeftArrow')
    ?.addEventListener('click', () => { goToSlide(current - 1); resetTimer(); });
document.getElementById('carrusel_RightArrow')
    ?.addEventListener('click', () => { goToSlide(current + 1); resetTimer(); });
dots.forEach((dot, i) =>
    dot.addEventListener('click', () => { goToSlide(i); resetTimer(); }));
resetTimer();
const catData = JSON.parse(document.getElementById('home-category-data').textContent);
const pdButtons = document.querySelectorAll('.PD_navigation-button');
const pdList = document.querySelector('.PD_products-list');
const pdEmptyMsg = document.getElementById('PD_empty-message');
function filterPD(slug) {
    const entry = catData.find(c => c.slug === slug);
    const allowedIds = entry ? entry.ids : null;
    const cards = pdList ? [...pdList.children] : [];
    let visible = 0;
    cards.forEach(card => {
        const catIds = (card.dataset.catIds || '').split(',').map(Number).filter(Boolean);
        const show = !allowedIds || allowedIds.some(id => catIds.includes(id));
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });
    const empty = visible === 0;
    if (pdList) pdList.style.display = empty ? 'none' : '';
    if (pdEmptyMsg) pdEmptyMsg.style.display = empty ? '' : 'none';
}
pdButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        pdButtons.forEach(b => b.classList.remove('PD_navigation-button-active'));
        btn.classList.add('PD_navigation-button-active');
        filterPD(btn.dataset.cat);
    });
});
const activePDBtn = document.querySelector('.PD_navigation-button-active');
filterPD(activePDBtn ? activePDBtn.dataset.cat : null);
const brButtons = document.querySelectorAll('.BR_navigation-button');
const brList = document.querySelector('.BR_brand-list-items');
const brEmptyMsg = document.getElementById('BR_empty-message');
function filterBR(brandName) {
    const cards = brList ? [...brList.children] : [];
    let visible = 0;
    cards.forEach(card => {
        const show = !brandName || card.dataset.brand === brandName;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });
    const empty = visible === 0;
    if (brList) brList.style.display = empty ? 'none' : '';
    if (brEmptyMsg) brEmptyMsg.style.display = empty ? '' : 'none';
}
brButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        brButtons.forEach(b => b.classList.remove('BR_navigation-button-active'));
        btn.classList.add('BR_navigation-button-active');
        filterBR(btn.textContent.trim());
    });
});
const activeBRBtn = document.querySelector('.BR_navigation-button-active');
filterBR(activeBRBtn ? activeBRBtn.textContent.trim() : null);
const pdNav = document.querySelector('.PD_ul-navigation');
document.querySelector('.PD_navigation > .buttonArrow:first-child')
    ?.addEventListener('click', () => pdNav?.scrollBy({ left: -250, behavior: 'smooth' }));
document.querySelector('.PD_navigation > .buttonArrow.arrowRight')
    ?.addEventListener('click', () => pdNav?.scrollBy({ left: 250, behavior: 'smooth' }));
document.querySelector('.PD_title-buttons .buttonArrow:first-child')
    ?.addEventListener('click', () => pdList?.scrollBy({ left: -310, behavior: 'smooth' }));
document.querySelector('.PD_title-buttons .buttonArrow.arrowRight')
    ?.addEventListener('click', () => pdList?.scrollBy({ left: 310, behavior: 'smooth' }));
const brNav = document.querySelector('.BR_ul-navigation');
document.getElementById('BR_arrow--left')
    ?.addEventListener('click', () => brNav?.scrollBy({ left: -250, behavior: 'smooth' }));
document.getElementById('BR_arrow--right')
    ?.addEventListener('click', () => brNav?.scrollBy({ left: 250, behavior: 'smooth' }));
document.querySelector('.BR_title-buttons .buttonArrow:first-child')
    ?.addEventListener('click', () => brList?.scrollBy({ left: -260, behavior: 'smooth' }));
document.querySelector('.BR_title-buttons .buttonArrow.arrowRight')
    ?.addEventListener('click', () => brList?.scrollBy({ left: 260, behavior: 'smooth' }));
