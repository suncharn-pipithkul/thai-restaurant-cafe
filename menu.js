// Side nav style on click
const sideNavAnchors = document.querySelectorAll('.side-nav a');
sideNavAnchors.forEach(nav => {
  nav.addEventListener('click', function(e) {
    // remove the current active one
    const currentActiveNav = document.querySelector('.side-nav .active');
    currentActiveNav?.classList.remove('active');

    // add clicked to be actived
    nav.classList.add('active');
  });
});

// Side nav style on scroll
const sideNavIntersections = document.querySelectorAll('.side-nav-intersect');
const sideNav = document.querySelector('.side-nav');
const mapIntersectToAnchor = new Map();

// Map intersect menu type (article) => correlated nav (anchor)
for (let i = 0; i < sideNavIntersections.length; i++) {
  mapIntersectToAnchor.set(
    sideNavIntersections[i],
    sideNavAnchors[i]
  );
}

const sideNavOptions = {
  // root: null,
  rootMargin: '10% 0px -10% 0px',
  threshold: 0.8
};

const sideNavObserver = new IntersectionObserver(function(entries, sideNavObserver) {
  entries.forEach(entry => {
    const anchor = mapIntersectToAnchor.get(entry.target);

    if (entry.isIntersecting) {
      anchor.classList.add('active');
      
      // scroll to this anchor
      if (window.innerWidth <= 720)
        anchor.scrollIntoView({
          block: "nearest", // prevent the page to vertical scroll
          inline: "nearest" // horizontal scroll
        });
        // sideNav.scrollLeft = anchor.offsetLeft;
      
    } else {
      anchor.classList.remove('active');
    }
  });
}, sideNavOptions);

sideNavIntersections.forEach(interect => {
  sideNavObserver.observe(interect);
});


// Dishes img open dialogue box to display larger size of the img
const dishes = document.querySelectorAll('article img');
const dialog = document.querySelector('#dialog');
const dialogImg = document.querySelector('#dailog__img');

// Open dialog on click
dishes.forEach(dish => {
  dish.addEventListener('click', function(e) {
    dialogImg.src = e.target.src;
    dialogImg.style.height = 'auto';
    dialogImg.style.width = 'clamp(300px, 50vw, 400px)';
    dialogImg.style.objectFit = 'contain';
    // dialogImg.style.borderRadius = '50%';

    dialog.showModal();
  });
});

// Close dialog on click again
dialog.addEventListener('click', () => {
  dialog.close();
});
