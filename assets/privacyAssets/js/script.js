// Функция для загрузки перевода страницы "Политика конфиденциальности"
function privacyLoadLanguage(languageCode) {
    let jsonPath = `../assets/privacyAssets/json/${languageCode}.json`;

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
                document.getElementById("policy-title").textContent = data["policy-title"];
                document.getElementById("policy-intro").textContent = data["policy-intro"];
                document.getElementById("policy-data-title").textContent = data["policy-data-title"];
                document.getElementById("policy-data-intro").textContent = data["policy-data-intro"];
                document.getElementById("policy-data-name").textContent = data["policy-data-name"];
                document.getElementById("policy-data-email").textContent = data["policy-data-email"];
                document.getElementById("policy-data-message").textContent = data["policy-data-message"];
                document.getElementById("policy-usage-title").textContent = data["policy-usage-title"];
                document.getElementById("policy-usage").textContent = data["policy-usage"];
                document.getElementById("policy-cookies-title").textContent = data["policy-cookies-title"];
                document.getElementById("policy-cookies").textContent = data["policy-cookies"];
                document.getElementById("policy-security-title").textContent = data["policy-security-title"];
                document.getElementById("policy-security").textContent = data["policy-security"];
                document.getElementById("policy-rights-title").textContent = data["policy-rights-title"];
                document.getElementById("policy-rights").textContent = data["policy-rights"];
                document.getElementById("policy-changes-title").textContent = data["policy-changes-title"];
                document.getElementById("policy-changes").textContent = data["policy-changes"];
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
    privacyLoadLanguage(languageCode);  // Обновляем контент страницы Политики конфиденциальности
}

// Проверяем, если функция privacyLoadLanguage существует и загружаем язык
if (typeof privacyLoadLanguage === "function") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        privacyLoadLanguage(savedLanguage);
    } else {
        privacyLoadLanguage('ru'); // Язык по умолчанию
    }
}
