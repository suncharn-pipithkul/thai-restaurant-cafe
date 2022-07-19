// hamburger menu animation
const hamburger = document.querySelector('.hamburger');
const topNav = document.querySelector('.top-nav__nav');

hamburger.addEventListener('click', function(e) {
  hamburger.classList.toggle('open');

  topNav.classList.toggle('slide');
});

// Intersection Observer for topnav
// Topnav change bg color when scroll down
const topNavWrapper = document.querySelector('.top-nav');
const hero = document.querySelector('.nav-intersect');

const heroOptions = {
  // root: null,
  // rootMargin: '-100px 0px 0px 0px',
  threshold: 1.0
};

const heroObserver = new IntersectionObserver(function(entries, heroObserver) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      topNavWrapper.classList.add('top-nav-scrolled');
    } else {
      topNavWrapper.classList.remove('top-nav-scrolled');
    }
  })
}, heroOptions);

heroObserver.observe(hero);

// // Intersection Observer for fade-in from side
// const faders = document.querySelectorAll('.fade-in');
// const sliders = document.querySelectorAll('.slide-in');
// const appearOptions = {
//   // root: null,
//   rootMargin: '0px 0px -125px 0px',
//   threshold: 0.0
// };

// const appearOnScollObserver = new IntersectionObserver(function(entries, appearOnScollObserver) {
//   entries.forEach(entry => {
//     if (!entry.isIntersecting) 
//       return;
//     entry.target.classList.add('appear');
//     appearOnScollObserver.unobserve(entry.target);
//   });
// }, appearOptions);

// faders.forEach(fader => {
//   appearOnScollObserver.observe(fader);
// });

// sliders.forEach(fader => {
//   appearOnScollObserver.observe(fader);
// });

// Auto update copyright date
const copyrightYear = document.querySelector('.copyright__year');
copyrightYear.textContent = new Date().getFullYear();
