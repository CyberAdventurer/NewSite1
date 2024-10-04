document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');

        const answer = faqItem.querySelector('.faq-answer');
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Функция для загрузки перевода страницы "Требования и FAQ"
function faqLoadLanguage(languageCode) {
    let jsonPath = `../assets/faqAssets/json/${languageCode}.json`;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Обновляем заголовки
                document.getElementById("requirements-title").textContent = data["requirements-title"];
                document.getElementById("apply-process-title").textContent = data["apply-process-title"];
                document.getElementById("faq-title").textContent = data["faq-title"];
                document.getElementById("contact-form-title").textContent = data["contact-form-title"];

                // Обновляем пункты требований
                document.getElementById("requirement-1").textContent = data["requirement-1"];
                document.getElementById("requirement-2").textContent = data["requirement-2"];
                document.getElementById("requirement-3").textContent = data["requirement-3"];
                document.getElementById("requirement-4").textContent = data["requirement-4"];

                // Обновляем шаги подачи заявки
                document.getElementById("apply-step-1").textContent = data["apply-step-1"];
                document.getElementById("apply-step-2").textContent = data["apply-step-2"];
                document.getElementById("apply-step-3").textContent = data["apply-step-3"];
                document.getElementById("apply-step-4").textContent = data["apply-step-4"];

                // Обновляем вопросы и ответы FAQ
                for (let i = 1; i <= 11; i++) {
                    document.getElementById(`faq-question-${i}`).textContent = data[`faq-question-${i}`];
                    document.getElementById(`faq-answer-${i}`).textContent = data[`faq-answer-${i}`];
                }

                // Обновляем форму обратной связи
                document.getElementById("contact-name-label").textContent = data["contact-name-label"];
                document.getElementById("contact-name").placeholder = data["contact-name-placeholder"];
                document.getElementById("contact-email-label").textContent = data["contact-email-label"];
                document.getElementById("contact-email").placeholder = data["contact-email-placeholder"];
                document.getElementById("contact-message-label").textContent = data["contact-message-label"];
                document.getElementById("contact-message").placeholder = data["contact-message-placeholder"];
                document.getElementById("contact-submit-button").textContent = data["contact-submit-button"];
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
    faqLoadLanguage(languageCode);  // Обновляем контент страницы FAQ
}

// Проверяем, если функция faqLoadLanguage существует, и загружаем язык
if (typeof faqLoadLanguage === "function") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        faqLoadLanguage(savedLanguage);
    } else {
        faqLoadLanguage('ru'); // Язык по умолчанию
    }
}

