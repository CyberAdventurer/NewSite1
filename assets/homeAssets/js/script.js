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
