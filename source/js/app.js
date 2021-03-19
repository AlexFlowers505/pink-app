let get = (querySelector) => document.querySelector(querySelector);
let getAll = (querySelector) => [...document.querySelectorAll(querySelector)];

let burger_btn = get('.site-list__burger-btn');
let site_nav = get('.main-nav__list');

burger_btn.addEventListener("click", evt => {
  burger_btn.classList.toggle("burger-btn--closed");
  burger_btn.classList.toggle("burger-btn--opened");
  site_nav.classList.toggle("site-list--closed");
  site_nav.classList.toggle("site-list--opened");
});

// no js nav_block turning off
window.addEventListener('load', evt => {
  site_nav.classList.toggle("site-list--opened");
  site_nav.classList.toggle("site-list--closed");
  site_nav.classList.toggle("site-list--no-JS");
});
