document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-btn.prev');
    const nextBtn = document.querySelector('.hero-btn.next');
    const sliderContainer = document.querySelector('.hero-banner .container');

    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    const goToSlide = (slideIndex) => {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
        });
        currentSlide = slideIndex;
    };

    const nextSlide = () => {
        const next = (currentSlide + 1) % slideCount;
        goToSlide(next);
    };

    const prevSlide = () => {
        const prev = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(prev);
    };

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 2000); // 2-second delay
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    goToSlide(0);
    startAutoPlay();
});