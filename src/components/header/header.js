import ButtonBurger from '@/components/button-burger/ButtonBurger';
import '@/components/logo/logo.js';
import '@/components/link/link.js';
import '@/components/button/button.js';

import './header.scss';

(() => {
  const burgerMenuElement = document.querySelector('.js-header__burger');
  const header = document.querySelector('.js-header');

  if (!burgerMenuElement || !header) return;

  const burgerMenu = new ButtonBurger(burgerMenuElement, header);
  burgerMenu.addEventListener();
})();
