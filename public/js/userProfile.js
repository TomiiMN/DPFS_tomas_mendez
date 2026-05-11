const editInfoBtn = document.getElementById('editInfoBtn');
const cancelInfoBtn = document.getElementById('cancelInfoBtn');
const infoForm = document.getElementById('infoForm');
const infoActions = document.getElementById('infoActions');
editInfoBtn.addEventListener('click', () => {
    const inputs = infoForm.querySelectorAll('input:not([readonly])');
    inputs.forEach(input => input.disabled = false);
    infoActions.style.display = 'flex';
    editInfoBtn.style.display = 'none';
});
cancelInfoBtn.addEventListener('click', () => {
    const inputs = infoForm.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
    infoActions.style.display = 'none';
    editInfoBtn.style.display = 'flex';
});
document.querySelectorAll('.profile-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});
const navItems = document.querySelectorAll('.profile-nav-item:not(.profile-nav-logout)');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});