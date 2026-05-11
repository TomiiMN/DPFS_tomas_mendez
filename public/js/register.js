const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("registerForm");
form.addEventListener("submit", function (e) {
    if (password.value !== confirmPassword.value) {
        e.preventDefault();
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    };
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
})

const inputFile = document.getElementById("avatar");
const fileName = document.getElementById("fileName");

inputFile.addEventListener("change", () => {
    if (inputFile.files.length > 0) {
        fileName.textContent = inputFile.files[0].name;
    } else {
        fileName.textContent = "Ningún archivo seleccionado";
    }
});

document.querySelectorAll('.input-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});