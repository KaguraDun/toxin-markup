import './header.scss';
import '@/components/logo/logo.js';
import '@/components/header-nav/header-nav.js';
import '@/components/button/button.js';

(() => {
  const burgerMenu = document.querySelector('.header__burger');

  function handleBurgerMenuClick() {
    const openModifier = 'header__burger--open';
    const headerNavigation = document.querySelector('.header__right-col');
    headerNavigation.classList.toggle(openModifier);
    burgerMenu.classList.toggle(openModifier);
  }

  if (burgerMenu) {
    burgerMenu.addEventListener('click', handleBurgerMenuClick);
  }
})();
