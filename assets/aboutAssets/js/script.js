// Функция для плавного раскрытия формы
function toggleForm() {
    var form = document.getElementById("partnerForm");
    if (form.classList.contains("active")) {
        form.classList.remove("active");
    } else {
        form.classList.add("active");
    }
}


