const form          = document.querySelector('form.login');
const emailInput    = document.getElementById('email');
const passwordInput = document.getElementById('password');
function showAlertErrors(messages) {
    const container = document.getElementById('alertContainer');
    messages.forEach(m => {
        const div = document.createElement('div');
        div.className = 'alert alert-danger show alert-frontend';
        div.innerHTML = `${m}<button class="btn-close" onclick="closeAlert(this)">×</button>`;
        container.appendChild(div);
    });
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function closeFrontendAlert() {
    document.querySelectorAll('.alert-frontend').forEach(el => el.remove());
}
function getErrors() {
    const errors = [];

    const email = emailInput.value.trim();
    if (validator.isEmpty(email))
        errors.push('El email es obligatorio.');
    else if (!validator.isEmail(email))
        errors.push('Ingresá un email válido. Ej: usuario@mail.com');

    if (validator.isEmpty(passwordInput.value))
        errors.push('La contraseña es obligatoria.');

    return errors;
}
document.querySelectorAll('.input-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.type  = input.type === 'password' ? 'text' : 'password';
    });
});
form.addEventListener('submit', function (e) {
    closeFrontendAlert();
    const errors = getErrors();
    if (errors.length > 0) {
        e.preventDefault();
        showAlertErrors(errors);
        return;
    }
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
});
