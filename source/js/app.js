const get = (querySelector) => document.querySelector(querySelector);
const getAll = (querySelector) => [...document.querySelectorAll(querySelector)];

const site_list__burger_btn = get('.site-list__burger-btn');
const site_nav = get('.main-nav__list');
const site_list__burger_btn_pic = getAll(".site-list__burger-btn-pic");

site_list__burger_btn.addEventListener("click", evt => {
  site_list__burger_btn_pic.forEach( pic =>
    pic.classList.toggle("site-list__burger-btn-pic--active"));
    site_list__burger_btn.classList.toggle("site-list__burger-btn--closed");
    site_list__burger_btn.classList.toggle("site-list__burger-btn--opened");
    site_nav.classList.toggle("site-list--closed");
    site_nav.classList.toggle("site-list--opened");
});

// no js nav_block turning off
window.addEventListener('load', evt => {
  site_nav.classList.toggle("site-list--opened");
  site_nav.classList.toggle("site-list--closed");
  site_nav.classList.toggle("site-list--no-JS");
});

//pricing slider action
const pricing_slider__btns = getAll(".pricing-slider__btn");
const pricing__table = get(".pricing__table");

pricing_slider__btns.forEach( btn => btn.addEventListener("click", evt => {
  (evt.target === pricing_slider__btns[0] && !evt.target.classList.contains("pricing-slider__btn--active")) ?
    (pricing_slider__btns.forEach( btn => btn.classList.remove("pricing-slider__btn--active")),
     evt.target.classList.toggle("pricing-slider__btn--active"),
     pricing__table.classList.remove("pricing__table--02-tariff-focus"),
     pricing__table.classList.remove("pricing__table--03-tariff-focus"),
     pricing__table.classList.add("pricing__table--01-tariff-focus")
   ) :
   (evt.target === pricing_slider__btns[1] && !evt.target.classList.contains("pricing-slider__btn--active")) ?
     (pricing_slider__btns.forEach( btn => btn.classList.remove("pricing-slider__btn--active")),
      evt.target.classList.toggle("pricing-slider__btn--active"),
      pricing__table.classList.remove("pricing__table--01-tariff-focus"),
      pricing__table.classList.remove("pricing__table--03-tariff-focus"),
      pricing__table.classList.add("pricing__table--02-tariff-focus")
    ) :
    (evt.target === pricing_slider__btns[2] && !evt.target.classList.contains("pricing-slider__btn--active")) ?
      (pricing_slider__btns.forEach( btn => btn.classList.remove("pricing-slider__btn--active")),
       evt.target.classList.toggle("pricing-slider__btn--active"),
       pricing__table.classList.remove("pricing__table--01-tariff-focus"),
       pricing__table.classList.remove("pricing__table--02-tariff-focus"),
       pricing__table.classList.add("pricing__table--03-tariff-focus")
     ) :
  (console.log("nope"));
}))
