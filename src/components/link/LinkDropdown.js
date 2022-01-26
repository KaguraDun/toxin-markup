import getIsTouchDevice from '@/helpers/get-is-touch-device';

class LinkDropdown {
  constructor(element) {
    this.element = element;
    this.itemList = null;
    this.button = null;
  }

  init() {
    this.itemList = this.element.querySelector('.js-link-dropdown-items');
    this.button = this.element.querySelector('.js-link-dropdown-button');

    const isElementsExist = this.itemList && this.button;
    if (!isElementsExist) return;

    this.element.addEventListener('click', this.#handleDropdownOpen);

    if (!getIsTouchDevice()) {
      this.element.addEventListener('mouseover', this.#handleDropdownOpen);
      this.itemList.addEventListener('mouseover', this.#handleDropdownOpen);
    }
  }

  #handleDropdownOpen = (event) => {
    const target = event.target.closest('.js-link-dropdown-button');

    if (!target) return;

    const isOpen = this.itemList.classList.contains('link__dropdown-items_visible');
    const isNotTouch = event.type === 'mouseover' && !getIsTouchDevice();

    if (isNotTouch) {
      this.#toggleDropdown(true);
    }

    if (event.type === 'click') {
      this.#toggleDropdown(!isOpen);
    }

    if (getIsTouchDevice()) {
      document.addEventListener('click', this.#handleDropdownClose);
    } else {
      this.element.addEventListener('mouseleave', this.#handleDropdownClose);
      this.element.addEventListener('click', this.#handleDropdownClose);
    }
  };

  #handleDropdownClose = (event) => {
    const target = event.target.closest('.js-link-dropdown-button');

    if (target === this.button) return;

    this.#toggleDropdown(false);

    document.removeEventListener('click', this.#handleDropdownClose);
    this.element.removeEventListener('mouseleave', this.#handleDropdownClose);
  };

  #toggleDropdown(toggle) {
    this.itemList.classList.toggle('link__dropdown-items_visible', toggle);
    this.button.classList.toggle('link__dropdown-button-icon_expanded-less', toggle);
  }
}

export default LinkDropdown;
