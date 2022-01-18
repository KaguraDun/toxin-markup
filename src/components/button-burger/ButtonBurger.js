import './button-burger.scss';

class ButtonBurger {
  constructor(container, header) {
    this.container = container;
    this.header = header;
  }

  addEventListener() {
    this.element = this.container.querySelector('.js-button-burger');

    if (!this.element) return;

    this.element.addEventListener('click', this.handleBurgerMenuClick);
  }

  handleBurgerMenuClick = () => {
    const openModifier = 'header__burger_open';

    this.header.classList.toggle(openModifier);
    this.element.classList.toggle('button-burger_open');
  };
}

export default ButtonBurger;
