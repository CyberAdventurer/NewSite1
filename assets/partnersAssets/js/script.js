// Функция для загрузки переводов для страницы "Партнёры"
function partnersLoadLanguage(languageCode) {
    let jsonPath = `../assets/partnersAssets/json/${languageCode}.json`;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Обновляем заголовок страницы партнёров
                document.getElementById("partners-title").textContent = data["partners-title"];

                // Обновляем описание партнёров
                document.getElementById("partner-1-description").textContent = data["partner-1-description"];
                document.getElementById("partner-2-description").textContent = data["partner-2-description"];
                document.getElementById("partner-3-description").textContent = data["partner-3-description"];

                // Обновляем заголовок и текст возможностей для партнёров
                document.getElementById("opportunities-title").textContent = data["opportunities-title"];
                document.getElementById("opportunities-text").textContent = data["opportunities-text"];

                // Обновляем форму контактов партнёров
                document.getElementById("contact-title").textContent = data["contact-title"];
                document.getElementById("company-name-label").textContent = data["company-name-label"];
                document.getElementById("contact-person-label").textContent = data["contact-person-label"];
                document.getElementById("email-label").textContent = data["email-label"];
                document.getElementById("message-label").textContent = data["message-label"];
                document.getElementById("submit-button").textContent = data["submit-button"];

                // Обновляем плейсхолдеры формы
                document.getElementById("company-name").placeholder = data["company-name-placeholder"];
                document.getElementById("contact-person").placeholder = data["contact-person-placeholder"];
                document.getElementById("email").placeholder = data["email-placeholder"];
                document.getElementById("message").placeholder = data["message-placeholder"];
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
    partnersLoadLanguage(languageCode);   // Обновляем контент страницы "Партнёры"
}

// Проверяем, если функция partnersLoadLanguage существует и загружаем язык
if (typeof partnersLoadLanguage === "function") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        partnersLoadLanguage(savedLanguage);
    } else {
        partnersLoadLanguage('ru'); // Язык по умолчанию
    }
}
