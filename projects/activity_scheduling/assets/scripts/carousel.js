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

