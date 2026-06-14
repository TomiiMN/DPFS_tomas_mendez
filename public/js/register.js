const form           = document.getElementById('registerForm');
const emailInput     = document.getElementById('email');
const firstNameInput = document.getElementById('firstName');
const lastNameInput  = document.getElementById('lastName');
const passwordInput  = document.getElementById('password');
const confirmInput   = document.getElementById('confirmPassword');
const avatarInput    = document.getElementById('avatar');
const fileNameEl     = document.getElementById('fileName');
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
};
function getErrors() {
    const errors = [];
    const firstName = firstNameInput.value.trim();
    if (validator.isEmpty(firstName))
        errors.push('El nombre es obligatorio.');
    else if (!validator.isLength(firstName, { min: 2 }))
        errors.push('El nombre debe tener al menos 2 caracteres.');
    const lastName = lastNameInput.value.trim();
    if (validator.isEmpty(lastName))
        errors.push('El apellido es obligatorio.');
    else if (!validator.isLength(lastName, { min: 2 }))
        errors.push('El apellido debe tener al menos 2 caracteres.');
    const email = emailInput.value.trim();
    if (validator.isEmpty(email))
        errors.push('El email es obligatorio.');
    else if (!validator.isEmail(email))
        errors.push('Ingresá un email válido. Ej: usuario@mail.com');
    const password = passwordInput.value;
    if (validator.isEmpty(password))
        errors.push('La contraseña es obligatoria.');
    else if (!validator.isLength(password, { min: 8 }))
        errors.push('La contraseña debe tener al menos 8 caracteres.');
    else if (!/[A-Z]/.test(password))
        errors.push('La contraseña debe contener al menos una mayúscula.');
    else if (!/[a-z]/.test(password))
        errors.push('La contraseña debe contener al menos una minúscula.');
    else if (!/[0-9]/.test(password))
        errors.push('La contraseña debe contener al menos un número.');
    else if (!/[^A-Za-z0-9]/.test(password))
        errors.push('La contraseña debe contener al menos un carácter especial (!, @, #...).');
    const confirm = confirmInput.value;
    if (validator.isEmpty(confirm))
        errors.push('Confirmá tu contraseña.');
    else if (confirm !== password)
        errors.push('Las contraseñas no coinciden.');
    const file = avatarInput.files[0];
    if (file) {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowed.includes(file.type))
            errors.push('La imagen debe ser JPG, JPEG, PNG o GIF.');
    }
    return errors;
};
avatarInput.addEventListener('change', () => {
    fileNameEl.textContent = avatarInput.files.length > 0
        ? avatarInput.files[0].name
        : 'Ningún archivo seleccionado';
});
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
    const btn = form.querySelector("button[type='submit']");
    if (btn) btn.disabled = true;
});
