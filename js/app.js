'use strict';

// slide main nav on screen
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
btnNavEl.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open');
});

// smooth scrolling
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');

        //scroll back to top
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        //scroll through header links
        if (href != '#' && href.startsWith('#')) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({ behavior: 'smooth' });
        }

        //close mobile nav
        if (link.classList.contains('main-nav-link')) {
            headerEl.classList.toggle('nav-open');
        }
    });
});

// set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

//STICKY NAVIGATION
const sectionHeroEl = document.querySelector('.section-hero');

const observer = new IntersectionObserver(
    function(entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) {
            document.body.classList.add('sticky');
        }
        if (ent.isIntersecting) {
            document.body.classList.remove('sticky');
        }
    }, {
        // In the viewport
        root: null,
        threshold: 0,
        rootMargin: '-80px',
    }
);
observer.observe(sectionHeroEl);

//fix flexbox gap in Safari
function checkFlexGap() {
    const flex = document.createElement('div');
    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';

    flex.appendChild(document.createElement('div'));
    flex.appendChild(document.createElement('div'));

    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add('no-flex-box-gap');
}
checkFlexGap();