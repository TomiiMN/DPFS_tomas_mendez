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
const infoForm      = document.getElementById('infoForm');
const infoActions   = document.getElementById('infoActions');
const editInfoBtn   = document.getElementById('editInfoBtn');
const cancelInfoBtn = document.getElementById('cancelInfoBtn');
const firstNameInput = infoForm.querySelector('[name="firstName"]');
const lastNameInput  = infoForm.querySelector('[name="lastName"]');
const emailInput     = infoForm.querySelector('[name="email"]');
const usernameInput  = infoForm.querySelector('[name="username"]');
function getInfoErrors() {
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
        errors.push('Ingresá un email válido.');

    const username = usernameInput.value.trim();
    if (validator.isEmpty(username))
        errors.push('El nombre de usuario es obligatorio.');
    else if (!validator.isLength(username, { min: 3 }))
        errors.push('El usuario debe tener al menos 3 caracteres.');
    else if (!validator.matches(username, /^[a-zA-Z0-9_.-]+$/))
        errors.push('El usuario solo puede contener letras, números, puntos y guiones.');

    return errors;
}
if (editInfoBtn) {
    editInfoBtn.addEventListener('click', () => {
        infoForm.querySelectorAll('input:not([readonly])').forEach(i => i.disabled = false);
        infoActions.style.display = 'flex';
        editInfoBtn.style.display = 'none';
    });
}
if (cancelInfoBtn) {
    cancelInfoBtn.addEventListener('click', () => {
        infoForm.querySelectorAll('input').forEach(i => i.disabled = true);
        infoActions.style.display = 'none';
        editInfoBtn.style.display = 'flex';
        closeFrontendAlert();
    });
}

infoForm.addEventListener('submit', function (e) {
    closeFrontendAlert();
    const errors = getInfoErrors();
    if (errors.length > 0) {
        e.preventDefault();
        showAlertErrors(errors);
    }
});
const securityForm    = document.getElementById('securityForm');
const currentPwdInput = securityForm.querySelector('[name="currentPassword"]');
const newPwdInput     = securityForm.querySelector('[name="newPassword"]');
const confirmPwdInput = securityForm.querySelector('[name="confirmPassword"]');
function getSecurityErrors() {
    const errors = [];
    if (validator.isEmpty(currentPwdInput.value))
        errors.push('La contraseña actual es obligatoria.');
    const newPwd = newPwdInput.value;
    if (validator.isEmpty(newPwd))
        errors.push('La nueva contraseña es obligatoria.');
    else if (!validator.isLength(newPwd, { min: 8 }))
        errors.push('La nueva contraseña debe tener al menos 8 caracteres.');
    else if (!/[A-Z]/.test(newPwd))
        errors.push('Debe contener al menos una mayúscula.');
    else if (!/[a-z]/.test(newPwd))
        errors.push('Debe contener al menos una minúscula.');
    else if (!/[0-9]/.test(newPwd))
        errors.push('Debe contener al menos un número.');
    else if (!/[^A-Za-z0-9]/.test(newPwd))
        errors.push('Debe contener al menos un carácter especial.');
    if (validator.isEmpty(confirmPwdInput.value))
        errors.push('Confirmá tu nueva contraseña.');
    else if (confirmPwdInput.value !== newPwd)
        errors.push('Las contraseñas no coinciden.');
    return errors;
}

securityForm.addEventListener('submit', function (e) {
    closeFrontendAlert();
    const errors = getSecurityErrors();
    if (errors.length > 0) {
        e.preventDefault();
        showAlertErrors(errors);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const avatarForm = document.querySelector('form[action*="update-avatar"]');
    const inputFile  = document.getElementById('file-avatar');
    const fileNameEl = document.getElementById('file-name');
    const label      = document.querySelector('.file-label');
    if (label && inputFile) label.addEventListener('click', () => inputFile.click());
    if (inputFile) {
        inputFile.addEventListener('change', () => {
            fileNameEl.textContent = inputFile.files.length > 0
                ? inputFile.files[0].name
                : 'Ningún archivo seleccionado';
        });
    }
    if (avatarForm) {
        avatarForm.addEventListener('submit', function (e) {
            closeFrontendAlert();
            const errors = [];
            const file = inputFile.files[0];
            if (!file) {
                errors.push('Seleccioná una imagen.');
            } else {
                const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!allowed.includes(file.type))
                    errors.push('La imagen debe ser JPG, JPEG, PNG o GIF.');
            }
            if (errors.length > 0) {
                e.preventDefault();
                showAlertErrors(errors);
            }
        });
    }
});
document.querySelectorAll('.profile-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.type  = input.type === 'password' ? 'text' : 'password';
    });
});
const navItems = document.querySelectorAll('.profile-nav-item:not(.profile-nav-logout)');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});