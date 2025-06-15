const track = document.querySelector('.carousel-track');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Ліва кнопка миші
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

document.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1; // Швидкість прокрутки
    track.scrollLeft = scrollLeft - walk;
});



document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".custom-carousel-track");
    const items = document.querySelectorAll(".custom-carousel-item");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const counter = document.querySelector(".carousel-counter");
    const carouselContainer = document.querySelector(".custom-carousel");

    let index = 0;
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth + 20; // 350px + 20px (gap)
    let maxIndex = Math.max(0, Math.ceil((totalItems * itemWidth - carouselContainer.offsetWidth) / itemWidth));

    function updateCarousel() {
        let translateX = index * itemWidth;
        const maxTranslateX = totalItems * itemWidth - carouselContainer.offsetWidth;
        if (translateX > maxTranslateX) {
            translateX = maxTranslateX; // Обмежуємо зміщення
        }
        track.style.transform = `translateX(-${translateX}px)`;
        counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(totalItems).padStart(2, '0')}`;
    }

    nextButton.addEventListener("click", () => {
        if (index < maxIndex) {
            index++;
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        if (index > 0) {
            index--;
        }
        updateCarousel();
    });

    // Оновлення maxIndex при зміні розміру вікна
    window.addEventListener("resize", () => {
        const newContainerWidth = carouselContainer.offsetWidth;
        maxIndex = Math.max(0, Math.ceil((totalItems * itemWidth - newContainerWidth) / itemWidth));
        if (index > maxIndex) {
            index = maxIndex;
        }
        updateCarousel();
    });

    updateCarousel();
});

