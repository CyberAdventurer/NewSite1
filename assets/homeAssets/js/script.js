gsap.registerPlugin(Draggable);

const homeSlider = document.querySelector('.slider-track');
let homeSlides = Array.from(homeSlider.children);
let homeSlideWidth = homeSlider.parentElement.clientWidth;
let homeCurrentSlideIndex = 2;
let homeIsAnimating = false;
let autoSlideInterval = null;  // Переменная для таймера

// Функция обновления позиций слайдов
function homeUpdateSlidePositions() {
    homeSlideWidth = homeSlider.parentElement.clientWidth;
    gsap.set(homeSlides, { width: homeSlideWidth });
    gsap.set(homeSlider, { x: -homeCurrentSlideIndex * homeSlideWidth });
}

// При изменении размера окна обновляем позиции слайдов
window.addEventListener('resize', homeUpdateSlidePositions);
homeUpdateSlidePositions();

// Функция для выполнения анимации слайдов
function homeAnimateSlider(newIndex) {
    homeIsAnimating = true;
    homeDisableDraggable();  // Отключаем Draggable на время анимации
    gsap.to(homeSlider, {
        x: -newIndex * homeSlideWidth,
        duration: 0.75,  // Плавный переход за 1.5 секунды
        onComplete: () => {
            homeRearrangeSlides();
            homeIsAnimating = false;
            homeEnableDraggable();  // Включаем Draggable после завершения анимации
            resetAutoSlide();  // Перезапуск таймера
        }
    });
}

// Автоматическое переключение слайдов
function autoSlide() {
    homeCurrentSlideIndex = (homeCurrentSlideIndex + 1) % homeSlides.length;
    homeAnimateSlider(homeCurrentSlideIndex);
}

// Перезапуск таймера
function resetAutoSlide() {
    clearInterval(autoSlideInterval);  // Очищаем предыдущий таймер
    autoSlideInterval = setInterval(autoSlide, 5000);  // Стартуем новый таймер на 5 секунд
}

// Создаём Draggable для слайдера
let homeDraggable = Draggable.create(homeSlider, {
    type: "x",
    inertia: true,
    bounds: { minX: -homeSlideWidth * (homeSlides.length - 1), maxX: 0 },
    onDragEnd: function() {
        if (homeIsAnimating) return;

        const homeDragDistance = this.x - (-homeCurrentSlideIndex * homeSlideWidth);
        const homeDragThreshold = homeSlideWidth * 0.15;

        if (homeDragDistance < -homeDragThreshold && homeCurrentSlideIndex < homeSlides.length - 1) {
            homeCurrentSlideIndex++;
            homeAnimateSlider(homeCurrentSlideIndex);  // Анимация влево
        } 
        else if (homeDragDistance > homeDragThreshold && homeCurrentSlideIndex > 0) {
            homeCurrentSlideIndex--;
            homeAnimateSlider(homeCurrentSlideIndex);  // Анимация вправо
        } 
        else {
            homeAnimateSlider(homeCurrentSlideIndex);  // Возврат на место
        }

        // После ручного переключения слайда, перезапускаем таймер на 10 секунд
        clearInterval(autoSlideInterval);  // Очищаем предыдущий таймер
        autoSlideInterval = setInterval(autoSlide, 10000);  // Устанавливаем новый на 10 секунд
    },
    snap: {
        x: function(endValue) {
            return Math.round(endValue / homeSlideWidth) * homeSlideWidth;
        }
    }
})[0];

// Отключаем Draggable
function homeDisableDraggable() {
    homeDraggable.disable();  
}

// Включаем Draggable
function homeEnableDraggable() {
    homeDraggable.enable();  
}

// Функция перестановки слайдов
function homeRearrangeSlides() {
    if (homeCurrentSlideIndex === homeSlides.length - 1) {
        homeSlides.push(homeSlides.shift());  // Перемещаем первый слайд в конец
        homeCurrentSlideIndex--;
    } else if (homeCurrentSlideIndex === 0) {
        homeSlides.unshift(homeSlides.pop());  // Перемещаем последний слайд в начало
        homeCurrentSlideIndex++;
    }

    homeSlider.innerHTML = '';
    homeSlides.forEach(slide => homeSlider.appendChild(slide));
    gsap.set(homeSlider, { x: -homeCurrentSlideIndex * homeSlideWidth });
}

// Первая инициализация слайдов
homeRearrangeSlides();

// Стартуем автоматическое переключение слайдов при загрузке страницы
resetAutoSlide();

// Локальная функция для загрузки JSON с переводами для слайдов
function homeLoadLanguage(languageCode) {
    let jsonPath = `assets/homeAssets/json/${languageCode}.json`;

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла перевода");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Обновляем слайды
                        document.getElementById("slide-title-1").textContent = data["slide-1-title"];
                        document.getElementById("slide-text-1").textContent = data["slide-1-text"];
                        document.getElementById("slide-link-1").textContent = data["slide-1-link"];

                        document.getElementById("slide-title-2").textContent = data["slide-2-title"];
                        document.getElementById("slide-text-2").textContent = data["slide-2-text"];
                        document.getElementById("slide-link-2").textContent = data["slide-2-link"];

                        document.getElementById("slide-title-3").textContent = data["slide-3-title"];
                        document.getElementById("slide-text-3").textContent = data["slide-3-text"];
                        document.getElementById("slide-link-3").textContent = data["slide-3-link"];

                        // Обновляем блок "Почему выбирают нас?"
                        document.getElementById("why-choose-us-title").textContent = data["why-choose-us-title"];
                        document.getElementById("why-choose-us-text").textContent = data["why-choose-us-text"];

                        // Обновляем блок "Наши Партнёры"
                        document.getElementById("partners-title").textContent = data["partners-title"];
                        document.getElementById("partners-text").textContent = data["partners-text"];

                        // Обновляем инфографику
                        document.getElementById("step-1-title").textContent = data["step-1-title"];
                        document.getElementById("step-1-text").textContent = data["step-1-text"];
                        document.getElementById("step-2-title").textContent = data["step-2-title"];
                        document.getElementById("step-2-text").textContent = data["step-2-text"];
                        document.getElementById("step-3-title").textContent = data["step-3-title"];
                        document.getElementById("step-3-text").textContent = data["step-3-text"];

                        // Обновляем блок "Преимущества"
                        document.getElementById("advantages-title").textContent = data["advantages-title"];
                        document.getElementById("advantage-1-title").textContent = data["advantage-1-title"];
                        document.getElementById("advantage-1-text").textContent = data["advantage-1-text"];
                        document.getElementById("advantage-2-title").textContent = data["advantage-2-title"];
                        document.getElementById("advantage-2-text").textContent = data["advantage-2-text"];
                        document.getElementById("advantage-3-title").textContent = data["advantage-3-title"];
                        document.getElementById("advantage-3-text").textContent = data["advantage-3-text"];

                        // Обновляем блок "Примеры вакансий"
                        document.getElementById("vacancies-title").textContent = data["vacancies-title"];
                        document.getElementById("vacancy-1-title").textContent = data["vacancy-1-title"];
                        document.getElementById("vacancy-1-text").textContent = data["vacancy-1-text"];
                        document.getElementById("vacancy-1-button").textContent = data["vacancy-1-button"];
                        document.getElementById("vacancy-2-title").textContent = data["vacancy-2-title"];
                        document.getElementById("vacancy-2-text").textContent = data["vacancy-2-text"];
                        document.getElementById("vacancy-2-button").textContent = data["vacancy-2-button"];
                        document.getElementById("vacancy-3-title").textContent = data["vacancy-3-title"];
                        document.getElementById("vacancy-3-text").textContent = data["vacancy-3-text"];
                        document.getElementById("vacancy-3-button").textContent = data["vacancy-3-button"];

                        // Обновляем блок "Преимущества работы с нами"
                        document.getElementById("benefits-title").textContent = data["benefits-title"];
                        document.getElementById("benefit-1-title").textContent = data["benefit-1-title"];
                        document.getElementById("benefit-1-text").textContent = data["benefit-1-text"];
                        document.getElementById("benefit-2-title").textContent = data["benefit-2-title"];
                        document.getElementById("benefit-2-text").textContent = data["benefit-2-text"];
                        document.getElementById("benefit-3-title").textContent = data["benefit-3-title"];
                        document.getElementById("benefit-3-text").textContent = data["benefit-3-text"];
                        document.getElementById("benefit-4-title").textContent = data["benefit-4-title"];
                        document.getElementById("benefit-4-text").textContent = data["benefit-4-text"];
                        document.getElementById("benefit-5-title").textContent = data["benefit-5-title"];
                        document.getElementById("benefit-5-text").textContent = data["benefit-5-text"];
                        document.getElementById("benefit-6-title").textContent = data["benefit-6-title"];
                        document.getElementById("benefit-6-text").textContent = data["benefit-6-text"];

                        // Обновляем миссию компании
                        document.getElementById("mission-title").textContent = data["mission-title"];
                        document.getElementById("mission-text").textContent = data["mission-text"];

                        // Обновляем отзывы
                        document.getElementById("testimonials-title").textContent = data["testimonials-title"];
                        document.getElementById("testimonial-1-text").textContent = data["testimonial-1-text"];
                        document.getElementById("testimonial-2-text").textContent = data["testimonial-2-text"];
                        document.getElementById("testimonial-3-text").textContent = data["testimonial-3-text"];

                        // Обновляем FAQ
                        document.getElementById("faq-title").textContent = data["faq-title"];
                        document.getElementById("faq-question-1").textContent = data["faq-question-1"];
                        document.getElementById("faq-answer-1").textContent = data["faq-answer-1"];
                        document.getElementById("faq-question-2").textContent = data["faq-question-2"];
                        document.getElementById("faq-answer-2").textContent = data["faq-answer-2"];
                        document.getElementById("faq-question-3").textContent = data["faq-question-3"];
                        document.getElementById("faq-answer-3").textContent = data["faq-answer-3"];
                        document.getElementById("faq-button").textContent = data["faq-button"];

                        // Обновляем Call-to-Action
                        document.getElementById("cta-title").textContent = data["cta-title"];
                        document.getElementById("cta-text").textContent = data["cta-text"];
                        document.getElementById("cta-button").textContent = data["cta-button"];

            } else {
                console.error("Некорректные данные в JSON:", data);
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке JSON:", error);
        });
}

function commonSetLanguage(languageCode) {
    localStorage.setItem("language", languageCode);
    commonLoadLanguage(languageCode);  // Шапка и футер
    homeLoadLanguage(languageCode);    // Например, только для слайдов
}
