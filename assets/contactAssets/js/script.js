// Функция для загрузки переводов для страницы "Контакты"
function contactLoadLanguage(languageCode) {
    let jsonPath = `../assets/contactAssets/json/${languageCode}.json`;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Обновляем заголовок с контактной информацией
                document.getElementById("contact-info-title").textContent = data["contact-info-title"];

                // Обновляем контактную информацию
                document.getElementById("contact-phone").textContent = data["contact-phone"];
                document.getElementById("contact-email").textContent = data["contact-email"];
                document.getElementById("contact-address").textContent = data["contact-address"];
                document.getElementById("contact-hours").textContent = data["contact-hours"];

                // Обновляем форму
                document.getElementById("contact-form-title").textContent = data["contact-form-title"];
                document.getElementById("form-name-label").textContent = data["form-name-label"];
                document.getElementById("form-email-label").textContent = data["form-email-label"];
                document.getElementById("form-message-label").textContent = data["form-message-label"];
                document.getElementById("form-submit-button").textContent = data["form-submit-button"];
                document.getElementById("text-form-name").placeholder = data["text-form-name"];
                document.getElementById("text-form-email").placeholder = data["text-form-email"];
                document.getElementById("text-form-message").placeholder = data["text-form-message"];

                // Обновляем социальные сети
                document.getElementById("social-media-title").textContent = data["social-media-title"];

                // Обновляем отзывы
                document.getElementById("testimonials-title").textContent = data["testimonials-title"];
                document.getElementById("testimonial-1-text").textContent = data["testimonial-1-text"];
                document.getElementById("testimonial-2-text").textContent = data["testimonial-2-text"];
                document.getElementById("testimonial-3-text").textContent = data["testimonial-3-text"];
            } else {
                console.error("Некорректные данные в JSON:", data);
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке JSON:", error);
        });
}

// Функция для сохранения выбранного языка и загрузки перевода
function commonSetLanguage(languageCode) {
    localStorage.setItem("language", languageCode);
    commonLoadLanguage(languageCode);  // Обновляем язык для шапки и футера
    contactLoadLanguage(languageCode);   // Обновляем контент страницы "Контакты"
}

// Проверяем, если функция contactLoadLanguage существует и загружаем язык
if (typeof contactLoadLanguage === "function") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        contactLoadLanguage(savedLanguage);
    } else {
        contactLoadLanguage('ru'); // Язык по умолчанию
    }
}
