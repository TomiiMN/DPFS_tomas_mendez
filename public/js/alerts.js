function closeAlert(button) {
    const alert = button.parentElement;
    alert.classList.remove("show");
    setTimeout(() => {
        alert.remove();
    }, 3000);
}