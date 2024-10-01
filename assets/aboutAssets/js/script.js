// Функция для плавного раскрытия формы
function toggleForm() {
    var form = document.getElementById("partnerForm");
    if (form.classList.contains("active")) {
        form.classList.remove("active");
    } else {
        form.classList.add("active");
    }
}

// Функция для загрузки перевода для страницы "О нас"
function aboutLoadLanguage(languageCode) {
    let jsonPath = `../assets/aboutAssets/json/${languageCode}.json`;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Обновляем заголовки и текст на странице
                document.getElementById("about-history-title").textContent = data["about-history-title"];
                document.getElementById("about-history-text-1").textContent = data["about-history-text-1"];
                document.getElementById("about-history-text-2").textContent = data["about-history-text-2"];

                document.getElementById("about-values-title").textContent = data["about-values-title"];
                document.getElementById("about-values-text").textContent = data["about-values-text"];

                document.getElementById("about-partners-title").textContent = data["about-partners-title"];
                document.getElementById("partner-1-text").textContent = data["partner-1-text"];
                document.getElementById("partner-2-text").textContent = data["partner-2-text"];
                document.getElementById("partner-3-text").textContent = data["partner-3-text"];

                document.getElementById("partners-cta-button").textContent = data["partners-cta"];

                // Обновляем форму для партнёров
                document.getElementById("partner-form-title").textContent = data["partner-form-title"];
                document.getElementById("form-name-label").textContent = data["partner-form-name"];
                document.getElementById("form-email-label").textContent = data["partner-form-email"];
                document.getElementById("form-message-label").textContent = data["partner-form-message"];
                document.getElementById("form-submit-button").textContent = data["partner-form-submit"];
                document.getElementById("form-error-message").textContent = data["partner-form-error"];
                document.getElementById("partner-form-name").placeholder = data["partner-form-name"];
                document.getElementById("partner-form-email").placeholder = data["partner-form-email"];
                document.getElementById("partner-form-message").placeholder = data["partner-form-message"];

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
    aboutLoadLanguage(languageCode);   // Обновляем контент страницы "О нас"
}


// Проверяем, если функция aboutLoadLanguage существует и загружаем язык
if (typeof aboutLoadLanguage === "function") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        aboutLoadLanguage(savedLanguage);
    } else {
        aboutLoadLanguage('ru'); // Язык по умолчанию
    }
}
