function commonToggleMenu() {
    var menu = document.getElementById("mobileMenu");

    if (menu.style.opacity === "0" || menu.style.opacity === "") {
        menu.style.display = "flex";
        setTimeout(function() {
            menu.style.opacity = "1";
        }, 10); // Нужно время для срабатывания анимации
    } else {
        menu.style.opacity = "0";
        setTimeout(function() {
            menu.style.display = "none";
        }, 500); // Скрыть меню после завершения анимации
    }
}

// Показать/скрыть новое меню с недостающими ссылками
function commonToggleExtraMenu() {
    var extraMenu = document.getElementById("extraMenu");

    if (extraMenu.classList.contains("show")) {
        extraMenu.style.opacity = "0";
        setTimeout(function() {
            extraMenu.classList.remove("show");
            extraMenu.style.display = "none";
        }, 500); // Задержка для завершения анимации
    } else {
        extraMenu.style.display = "flex";
        setTimeout(function() {
            extraMenu.style.opacity = "1";
        }, 10); // Задержка для плавного появления
        extraMenu.classList.add("show");
    }
}

// Скрытие нового меню при клике вне его области
document.addEventListener('click', function(event) {
    var extraMenu = document.getElementById("extraMenu");
    var extraMenuIcon = document.querySelector('.extra-menu-icon');

    // Если клик был вне меню и не на иконке, скрываем меню
    if (!extraMenu.contains(event.target) && !extraMenuIcon.contains(event.target)) {
        extraMenu.style.opacity = "0";
        setTimeout(function() {
            extraMenu.classList.remove("show");
            extraMenu.style.display = "none";
        }, 500); // Плавное скрытие с задержкой
    }
});

// Функция для получения языка браузера
function commonGetUserLanguage() {
    const userLanguage = navigator.language || navigator.userLanguage; // Получаем язык пользователя
    return userLanguage.slice(0, 2); // Возвращаем первые два символа (например, "en", "ru")
}

// Сохранение языка в localStorage и загрузка данных
function commonSetLanguage(languageCode) {
    localStorage.setItem("language", languageCode);
    commonLoadLanguage(languageCode);
    
    // Проверяем, определена ли функция loadHomeLanguage, перед вызовом
    if (typeof loadHomeLanguage === "function") {
        loadHomeLanguage(languageCode);
    } else {
        console.error("loadHomeLanguage не определена");
    }
}




// ТЕСТОВАЯ Загрузка JSON с переводами
function commonLoadLanguage(languageCode) {
    fetch(`assets/common/json/${languageCode}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            // Проверяем, что данные загружены правильно
            if (data && data.home) {
                document.getElementById("home-link").textContent = data.home;
                document.getElementById("about-link").textContent = data.about;
                document.getElementById("services-link").textContent = data.services;
                document.getElementById("contact-link").textContent = data.contact;
                document.getElementById("partners-link").textContent = data.partners;
                document.getElementById("faq-link").textContent = data.faq;
                document.getElementById("privacy-link").textContent = data.privacy;
                // Мобильные ссылки
                document.getElementById("mobile-home").textContent = data.home;
                document.getElementById("mobile-about").textContent = data.about;
                document.getElementById("mobile-services").textContent = data.services;
                document.getElementById("mobile-contact").textContent = data.contact;
                document.getElementById("mobile-partners").textContent = data.partners;
                document.getElementById("mobile-faq").textContent = data.faq;
                document.getElementById("mobile-privacy").textContent = data.privacy;
                // Title
                const currentPage = window.location.pathname;

                if (currentPage.includes("home")) {
                    document.title = data["title-home"];
                } else if (currentPage.includes("about")) {
                    document.title = data["title-about"];
                } else if (currentPage.includes("services")) {
                    document.title = data["title-services"];
                } else if (currentPage.includes("contact")) {
                    document.title = data["title-contact"];
                } else if (currentPage.includes("response")) {
                    document.title = data["title-response"];
                } else if (currentPage.includes("faq")) {
                    document.title = data["title-faq"];
                } else if (currentPage.includes("privacy")) {
                    document.title = data["title-privacy"];
                }
                // Footer
                document.getElementById("footer-link").textContent = data.footer;
            } else {
                console.error("Некорректные данные в JSON:", data);
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке JSON:", error);
        });
}

// ТЕСТОВАЯ Загрузка JSON с переводами
function commonLoadLanguage(languageCode) {
    fetch(`/assets/common/json/${languageCode}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            // Проверяем, что данные загружены правильно
            if (data && data.home) {
                document.getElementById("home-link").textContent = data.home;
                document.getElementById("about-link").textContent = data.about;
                document.getElementById("services-link").textContent = data.services;
                document.getElementById("contact-link").textContent = data.contact;
                document.getElementById("partners-link").textContent = data.partners;
                document.getElementById("faq-link").textContent = data.faq;
                document.getElementById("privacy-link").textContent = data.privacy;
                // Мобильные ссылки
                document.getElementById("mobile-home").textContent = data.home;
                document.getElementById("mobile-about").textContent = data.about;
                document.getElementById("mobile-services").textContent = data.services;
                document.getElementById("mobile-contact").textContent = data.contact;
                document.getElementById("mobile-partners").textContent = data.partners;
                document.getElementById("mobile-faq").textContent = data.faq;
                document.getElementById("mobile-privacy").textContent = data.privacy;
                // Title
                const currentPage = window.location.pathname;

                if (currentPage.includes("home")) {
                    document.title = data["title-home"];
                } else if (currentPage.includes("about")) {
                    document.title = data["title-about"];
                } else if (currentPage.includes("services")) {
                    document.title = data["title-services"];
                } else if (currentPage.includes("contact")) {
                    document.title = data["title-contact"];
                } else if (currentPage.includes("response")) {
                    document.title = data["title-response"];
                } else if (currentPage.includes("faq")) {
                    document.title = data["title-faq"];
                } else if (currentPage.includes("privacy")) {
                    document.title = data["title-privacy"];
                }
                // Footer
                document.getElementById("footer-link").textContent = data.footer;
            } else {
                console.error("Некорректные данные в JSON:", data);
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке JSON:", error);
        });
}











// Загрузка JSON с переводами
function commonLoadLanguage(languageCode) {
    fetch(`../json/${languageCode}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            // Проверяем, что данные загружены правильно
            if (data && data.home) {
                document.getElementById("home-link").textContent = data.home;
                document.getElementById("about-link").textContent = data.about;
                document.getElementById("services-link").textContent = data.services;
                document.getElementById("contact-link").textContent = data.contact;
                document.getElementById("partners-link").textContent = data.partners;
                document.getElementById("faq-link").textContent = data.faq;
                document.getElementById("privacy-link").textContent = data.privacy;
                // Мобильные ссылки
                document.getElementById("mobile-home").textContent = data.home;
                document.getElementById("mobile-about").textContent = data.about;
                document.getElementById("mobile-services").textContent = data.services;
                document.getElementById("mobile-contact").textContent = data.contact;
                document.getElementById("mobile-partners").textContent = data.partners;
                document.getElementById("mobile-faq").textContent = data.faq;
                document.getElementById("mobile-privacy").textContent = data.privacy;
                // Title
                const currentPage = window.location.pathname;

                if (currentPage.includes("home")) {
                    document.title = data["title-home"];
                } else if (currentPage.includes("about")) {
                    document.title = data["title-about"];
                } else if (currentPage.includes("services")) {
                    document.title = data["title-services"];
                } else if (currentPage.includes("contact")) {
                    document.title = data["title-contact"];
                } else if (currentPage.includes("response")) {
                    document.title = data["title-response"];
                } else if (currentPage.includes("faq")) {
                    document.title = data["title-faq"];
                } else if (currentPage.includes("privacy")) {
                    document.title = data["title-privacy"];
                }
                // Footer
                document.getElementById("footer-link").textContent = data.footer;
            } else {
                console.error("Некорректные данные в JSON:", data);
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке JSON:", error);
        });
}

// Проверка, сохранён ли язык в localStorage или определение языка браузера
window.onload = function() {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        commonLoadLanguage(savedLanguage); // Если язык был сохранён, используем его
    } else {
        const languageCode = commonGetUserLanguage(); // Получаем язык браузера
        const supportedLanguages = ["ru", "en", "pl", "ua"];
        const defaultLanguage = supportedLanguages.includes(languageCode) ? languageCode : "en"; // Если язык не поддерживается, используем "en"
        commonSetLanguage(defaultLanguage); // Загружаем язык по умолчанию
    }

    // Скрыть мобильное меню при загрузке страницы
    document.getElementById("mobileMenu").style.display = "none";
    document.getElementById("mobileMenu").style.opacity = "0";
};

// Показать/скрыть меню языка с анимацией
function commonToggleLanguageMenu() {
    var menu = document.getElementById("languageMenu");

    if (menu.classList.contains("show")) {
        menu.style.opacity = "0";
        setTimeout(function() {
            menu.classList.remove("show");
            menu.style.display = "none";
        }, 500); // Задержка для завершения анимации перед скрытием
    } else {
        menu.style.display = "block";
        setTimeout(function() {
            menu.style.opacity = "1";
        }, 10); // Задержка для плавного появления
        menu.classList.add("show");
    }
}

// Скрытие меню при клике вне его области (для меню языка)
document.addEventListener('click', function(event) {
    var menu = document.getElementById("languageMenu");
    var icon = document.querySelector('.language-menu-icon');

    // Если клик был вне меню и не на иконке, скрываем меню
    if (!menu.contains(event.target) && !icon.contains(event.target)) {
        menu.style.opacity = "0";
        setTimeout(function() {
            menu.classList.remove("show");
            menu.style.display = "none";
        }, 500); // Скрываем меню с задержкой
    }
});

// Скрытие меню при уходе мышки с его области (для меню языка)
document.getElementById("languageMenu").addEventListener('mouseleave', function() {
    this.style.opacity = "0";
    setTimeout(function() {
        document.getElementById("languageMenu").classList.remove("show");
        document.getElementById("languageMenu").style.display = "none";
    }, 500); // Задержка для завершения анимации перед скрытием
});

// Плавное скрытие мобильного меню при клике вне его области (для ссылок)
document.addEventListener('click', function(event) {
    var pageMenu = document.getElementById("mobileMenu");
    var pageMenuIcon = document.querySelector('.menu-icon');

    // Если клик был вне меню и не на иконке, скрываем меню
    if (!pageMenu.contains(event.target) && !pageMenuIcon.contains(event.target)) {
        pageMenu.style.opacity = "0";
        setTimeout(function() {
            pageMenu.style.display = "none";
        }, 500); // Плавное скрытие с задержкой
    }
});

// Скрытие мобильного меню при уходе мышки с его области (для десктопов)
document.getElementById("mobileMenu").addEventListener('mouseleave', function() {
    this.style.opacity = "0";
    setTimeout(function() {
        document.getElementById("mobileMenu").style.display = "none";
    }, 500); // Плавное скрытие с задержкой
});
