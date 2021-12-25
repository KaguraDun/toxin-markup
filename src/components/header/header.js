import '@/components/logo/logo.js';
import '@/components/header-nav/header-nav.js';
import '@/components/button/button.js';
import './header.scss';

(() => {
  const burgerMenu = document.querySelector('.header__burger');

  function handleBurgerMenuClick() {
    const openModifier = 'header__burger--open';
    const header = document.querySelector('.header');

    header.classList.toggle(openModifier);
    burgerMenu.classList.toggle(openModifier);
  }

  if (burgerMenu) {
    burgerMenu.addEventListener('click', handleBurgerMenuClick);
  }
})();
