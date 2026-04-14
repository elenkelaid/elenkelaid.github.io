document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  if (window.AOS && typeof AOS.init === 'function') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quad',
      once: true,
      mirror: false,
      disable: window.innerWidth < 576 ? 'mobile' : false
    });
  }

  // Initialize Bootstrap Carousel
  const carouselElement = document.getElementById('projectsCarousel');
  if (carouselElement && window.bootstrap && typeof bootstrap.Carousel === 'function') {
    console.log('✓ Carousel element found');

    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: false,
      wrap: true,
      keyboard: true,
      touch: true
    });

    console.log('✓ Bootstrap Carousel initialized');

    function updateCarouselCounter() {
      const items = document.querySelectorAll('#projectsCarousel .carousel-item');
      const active = document.querySelector('#projectsCarousel .carousel-item.active');
      const currentIndex = Array.from(items).indexOf(active) + 1;
      const totalItems = items.length;

      const currentEl = document.getElementById('carousel-current');
      const totalEl = document.getElementById('carousel-total');

      if (currentEl) currentEl.textContent = currentIndex;
      if (totalEl) totalEl.textContent = totalItems;
    }

    const prevButton = document.querySelector('.carousel-control-prev[data-bs-target="#projectsCarousel"]');
    const nextButton = document.querySelector('.carousel-control-next[data-bs-target="#projectsCarousel"]');

    if (prevButton) {
      prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        carousel.prev();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        carousel.next();
      });
    }

    carouselElement.addEventListener('slid.bs.carousel', updateCarouselCounter);
    updateCarouselCounter();
  }

  // Header scroll effect
  const header = document.querySelector('.modern-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navbar ul');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Footer year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Typed.js
  const typedElement = document.querySelector('.typed');
  const typedItemsElement = document.querySelector('.typed-items');
  if (window.Typed && typedElement && typedItemsElement) {
    const typedStrings = typedItemsElement.textContent.split(',');
    new Typed('.typed', {
      strings: typedStrings,
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1200,
      loop: true
    });
  }
});