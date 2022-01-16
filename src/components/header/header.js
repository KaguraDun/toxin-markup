import '@/components/logo/logo.js';
import '@/components/link/link.js';
import '@/components/button/button.js';

import './header.scss';

(() => {
  const burgerMenu = document.querySelector('.js-header__burger');

  function handleBurgerMenuClick() {
    const openModifier = 'header__burger_open';
    const header = document.querySelector('.js-header');

    header.classList.toggle(openModifier);
    burgerMenu.classList.toggle(openModifier);
  }

  if (burgerMenu) {
    burgerMenu.addEventListener('click', handleBurgerMenuClick);
  }
})();
