// Функция для загрузки переводов для страницы "Услуги"
function servicesLoadLanguage(languageCode) {
    let jsonPath = `../assets/servicesAssets/json/${languageCode}.json`;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Обновляем заголовок вакансий
                document.getElementById("services-title").textContent = data["services-title"];

                // Обновляем карточки вакансий
                document.getElementById("vacancy-picker-title").textContent = data["vacancy-picker-title"];
                document.getElementById("vacancy-picker-text").textContent = data["vacancy-picker-text"];
                document.getElementById("vacancy-picker-link").textContent = data["vacancy-picker-link"];

                document.getElementById("vacancy-helper-title").textContent = data["vacancy-helper-title"];
                document.getElementById("vacancy-helper-text").textContent = data["vacancy-helper-text"];
                document.getElementById("vacancy-helper-link").textContent = data["vacancy-helper-link"];

                document.getElementById("vacancy-loader-title").textContent = data["vacancy-loader-title"];
                document.getElementById("vacancy-loader-text").textContent = data["vacancy-loader-text"];
                document.getElementById("vacancy-loader-link").textContent = data["vacancy-loader-link"];

                // Обновляем условия работы
                document.getElementById("conditions-title").textContent = data["conditions-title"];
                document.getElementById("salary-title").textContent = data["salary-title"];
                document.getElementById("salary-text").textContent = data["salary-text"];
                document.getElementById("schedule-title").textContent = data["schedule-title"];
                document.getElementById("schedule-text").textContent = data["schedule-text"];
                document.getElementById("bonuses-title").textContent = data["bonuses-title"];
                document.getElementById("bonuses-text").textContent = data["bonuses-text"];
                document.getElementById("accommodation-title").textContent = data["accommodation-title"];
                document.getElementById("accommodation-text").textContent = data["accommodation-text"];

                // Обновляем процесс трудоустройства
                document.getElementById("process-title").textContent = data["process-title"];
                document.getElementById("step-1-title").textContent = data["step-1-title"];
                document.getElementById("step-1-text").textContent = data["step-1-text"];
                document.getElementById("step-2-title").textContent = data["step-2-title"];
                document.getElementById("step-2-text").textContent = data["step-2-text"];
                document.getElementById("step-3-title").textContent = data["step-3-title"];
                document.getElementById("step-3-text").textContent = data["step-3-text"];

                // Обновляем ссылку на контакт
                document.getElementById("contact-link-to").textContent = data["contact-link-to"];
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
    servicesLoadLanguage(languageCode);   // Обновляем контент страницы "Услуги"
}


// Проверяем, если функция servicesLoadLanguage существует и загружаем язык
if (typeof servicesLoadLanguage === "function") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        servicesLoadLanguage(savedLanguage);
    } else {
        servicesLoadLanguage('ru'); // Язык по умолчанию
    }
}
