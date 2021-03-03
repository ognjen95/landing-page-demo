const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const mobileNavigation = document.querySelector('.mobile-navigation');
const mobileNav = document.querySelector('.mobile-nav');
const headerDiv = document.querySelector('.header-div');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide-container');
const dots = document.querySelectorAll('.dots');

{
  let isOpen = false;

  const closeMenu = (e) => {
    if (e.currentTarget === closeBtn) {
      isOpen = !isOpen;
      mobileNav.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        mobileNavigation.style.zIndex = '-1';
      }, 500);
    }
  };
  const openMenu = (e) => {
    if (e.currentTarget === menuBtn) {
      isOpen = !isOpen;
    }
    if (isOpen) {
      mobileNavigation.style.zIndex = '1000';
      mobileNav.style.transform = 'translateX(0)';
    } else {
      mobileNavigation.style.zIndex = '-1';
      mobileNav.style.transform = 'translateX(-100%)';
    }
    console.log(isOpen);
  };
  menuBtn.addEventListener('click', openMenu);
  closeBtn ? closeBtn.addEventListener('click', closeMenu) : null;
}

{
  // slider functions
  let slide = 1;
  const allSlides = [...slides];

  // function for dots
  const setDots = (slide) => {
    [...dots].map((dot) => {
      if (slide == dot.getAttribute('id')) {
        [...dots].map((dot) => (dot.style.opacity = '.5'));
        dot.style.opacity = '1';
      }
    });
  };
  setDots(slide);

  // function for prev and next carousel buttons
  const nextOrPrevSlide = (e) => {
    //Next button
    if (e.currentTarget === nextBtn && slide !== slides.length) {
      for (let i = 0; i <= allSlides.length - 1; i++) {
        allSlides[i].style.transform = `translateX(-${slide}00%)`;
      }
      slide++;
      setDots(slide);
      console.log(slide);
      return;
    }
    // preb button
    if (slide === 0) return (slide = 1);
    if (e.currentTarget === prevBtn) {
      slide--;
      for (let i = 0; i <= allSlides.length - 1; i++) {
        allSlides[i].style.transform = `translateX(-${slide - 1}00%)`;
      }
      setDots(slide);
      return;
    }
  };
  // function for changing slides by clicking od dots
  const currentPage = (e) => {
    let slideNum = Number(e.target.id);
    slide = slideNum;
    allSlides.map((slider) => {
      slider.style.transform = `translateX(-${slide - 1}00%)`;
      [...dots].map((dot) => (dot.style.opacity = '.5'));
      e.target.style.opacity = 1;
    });
  };

  nextBtn.addEventListener('click', nextOrPrevSlide);
  prevBtn.addEventListener('click', nextOrPrevSlide);
  [...dots].forEach((dot) => dot.addEventListener('click', currentPage));
}
