document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-section');
    const infoSection = document.querySelector('.info-section');
    let hasScrolled = false;

    window.addEventListener('wheel', (e) => {
        if (!hasScrolled && window.scrollY < window.innerHeight / 2 && e.deltaY > 0) {
            e.preventDefault();
            hasScrolled = true;

            infoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, { passive: false });

    let touchStart = 0;
    window.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (e) => {
        let touchEnd = e.changedTouches[0].clientY;
        if (!hasScrolled && window.scrollY < window.innerHeight / 2 && touchStart - touchEnd > 50) {
            hasScrolled = true;
            infoSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    const fadeElements = document.querySelectorAll('.fade-in-element');
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
});
