class LinkDropdown {
  constructor(element) {
    this.element = element;
    this.itemList = null;
    this.button = null;
  }

  init() {
    this.itemList = this.element.querySelector('.js-link__dropdown-items');
    this.button = this.element.querySelector('.js-link__dropdown-button');

    const isElementsExist = this.itemList && this.button;
    if (!isElementsExist) return;

    this.element.addEventListener('click', this.handleDropdownOpen);
  }

  handleDropdownOpen = (event) => {
    const target = event.target.closest('.link__dropdown-button');

    if (!target) return;

    const isOpened = this.itemList.classList.toggle('link__dropdown-items_visible');
    target.classList.toggle('link__dropdown-button-icon_expanded-less');

    if (!isOpened) {
      document.removeEventListener('click', this.handleDropdownClose);
    } else {
      document.addEventListener('click', this.handleDropdownClose);
    }
  };

  handleDropdownClose = (event) => {
    const target = event.target.closest('.link__dropdown-button');

    if (target === this.button) return;

    this.itemList.classList.remove('link__dropdown-items_visible');
    this.button.classList.remove('link__dropdown-button-icon_expanded-less');

    document.removeEventListener('click', this.handleDropdownClose);
  };
}

export default LinkDropdown;
