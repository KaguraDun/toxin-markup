import getDeclension from '@/helpers/get-declension';
import '@/components/button/button.scss';
import '@/components/input/input.scss';

import './dropdown.scss';

class Dropdown {
  constructor(element, properties) {
    this.element = element;
    this.properties = properties;
    this.store = properties.options;

    this.dropdown = null;
    this.dropdownInput = null;
    this.dropdownItemsWrapper = null;
    this.dropdownItems = null;
    this.buttonClear = null;
    this.buttonApply = null;
  }

  getValues() {
    return this.store;
  }

  init() {
    this.#setLabel();
    this.#setInput();
    this.#setDropdownItems();
    this.#setControlButtons();

    const isButtonClearHidden = this.#getStoreSum() === 0;
    this.#hideButtonClear(isButtonClearHidden);

    if (this.properties.isExpanded) {
      this.#handleExpand();
    }

    this.dropdownInput.addEventListener('keydown', Dropdown.#handleInputSubmit);

    this.dropdown = this.element.querySelector('.js-dropdown');
  }

  #setLabel() {
    const label = this.element.querySelector('.js-dropdown-label-text');

    if (!label) return;
    if (this.properties.label) label.innerText = this.properties.label;
  }

  #setInput() {
    this.dropdownInput = this.element.querySelector('.js-dropdown-input input');

    this.dropdownInput.value = this.#concatStoreValues();
    this.dropdownInput.placeholder = this.properties.placeholder;

    const dropdownInputWrapper = this.element.querySelector('.js-dropdown-input');
    dropdownInputWrapper.addEventListener('click', this.#handleExpand);
  }

  #setDropdownItems() {
    const dropdownItemsContent = this.#createDropdownItems();

    this.dropdownItemsWrapper = this.element.querySelector('.js-dropdown-items-wrapper');
    this.dropdownItems = this.element.querySelector('.js-dropdown-items');
    this.dropdownItems.innerHTML = dropdownItemsContent;

    this.dropdownItems.addEventListener('click', this.#handleStoreValueChange);
  }

  #setControlButtons() {
    const buttonWrapper = this.element.querySelector('.js-dropdown-button-wrapper');
    if (this.properties.controlButtons === false) {
      buttonWrapper.remove();
      return;
    }

    const [buttonClear, buttonApply] = buttonWrapper.children;

    this.buttonClear = buttonClear;
    this.buttonApply = buttonApply;

    this.buttonClear?.addEventListener('click', this.#handleStoreValuesReset);
    this.buttonApply?.addEventListener('click', this.#close);
  }

  #createDropdownItems() {
    return `
      <ul class="dropdown__items js-dropdown-items"}>
        ${this.#createItems()}
      </ul>
    `;
  }

  #createItems() {
    let items = '';

    Object.keys(this.properties.options).forEach((key) => {
      const value = this.properties.options[key].count;
      const buttonMinusDisabled = value <= 0 ? 'disabled' : '';
      const buttonClassNames = 'dropdown__button-minus js-dropdown-button-minus';
      items += `
      <li class="dropdown__item">
        <div class="dropdown__item-name">${key}</div>
        <div class="dropdown__item-buttons">
          <button type="button" class="${buttonClassNames}" ${buttonMinusDisabled}></button>
          <div class="dropdown__item-value js-dropdown-item-value" data-value="${key}">
            ${value}
          </div>
          <button type="button" class="dropdown__button-plus js-dropdown-button-plus"></button>
        </div>
      </li>`;
    });

    return items;
  }

  #getStoreSum() {
    return Object.values(this.store).reduce((acc, option) => acc + Number(option.count), 0);
  }

  #hideButtonClear(isHidden) {
    if (!this.buttonClear) return;

    this.buttonClear.classList.toggle('button_hidden', isHidden);
  }

  static #handleInputSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  #handleKeydown = (event) => {
    if (event.key === 'Escape') {
      this.#close();
    }
  };

  #handleDropdownClose = (event) => {
    const target = event.target.closest('.js-dropdown');
    if (target === this.dropdown) return;

    this.#close();
  };

  #close = () => {
    this.dropdownItemsWrapper.hidden = true;
    this.dropdownInput.classList.remove('input__input_hovered');
    this.dropdownInput.classList.remove('input__input_style_dropdown-opened');

    document.removeEventListener('click', this.#handleDropdownClose);
    document.removeEventListener('keydown', this.#handleKeydown);
  };

  #handleStoreValueChange = (e) => {
    const parent = e.target.parentElement;

    if (parent.className !== 'dropdown__item-buttons') return;

    const valueElement = parent.querySelector('.js-dropdown-item-value');
    const { value } = valueElement.dataset;
    const buttonMinus = parent.querySelector('.js-dropdown-button-minus');
    const buttonPlus = parent.querySelector('.js-dropdown-button-plus');

    if (e.target === buttonMinus) {
      this.store[value].count -= 1;
    }

    if (e.target === buttonPlus) {
      this.store[value].count += 1;
    }

    Dropdown.#toggleButtonMinusDisable(buttonMinus, this.store[value].count);
    valueElement.innerText = this.store[value].count;

    this.dropdownInput.value = this.#concatStoreValues();

    const isStoreSumEqualsZero = this.#getStoreSum() === 0;
    this.#hideButtonClear(isStoreSumEqualsZero);
  };

  #handleStoreValuesReset = () => {
    Object.keys(this.store).forEach((key) => {
      this.store[key].count = 0;
    });

    const valueElements = this.element.querySelectorAll('.js-dropdown-item-value');
    const buttonsMinus = this.element.querySelectorAll('.js-dropdown-button-minus');

    valueElements.forEach((element) => {
      element.innerText = 0;
    });

    buttonsMinus.forEach((button) => {
      button.disabled = true;
    });

    this.dropdownInput.value = null;
    this.dropdownInput.placeholder = this.properties.placeholder;

    this.#hideButtonClear(true);
  };

  #handleExpand = () => {
    this.#toggleExpand();

    document.addEventListener('keydown', this.#handleKeydown);
    document.addEventListener('click', this.#handleDropdownClose);
  };

  #toggleExpand() {
    this.dropdownItemsWrapper.hidden = !this.dropdownItemsWrapper.hidden;
    this.dropdownInput.classList.toggle('input__input_hovered');
    this.dropdownInput.classList.toggle('input__input_style_dropdown-opened');
  }

  #concatStoreValues() {
    const storeValues = [];
    let countAsText = '';
    let countAsSum = 0;

    Object.keys(this.store).forEach((key) => {
      const { count, pattern, countAs } = this.store[key];

      if (count === 0) return;

      if (countAs) {
        countAsSum += count;
        countAsText = countAsSum > 0 ? `${countAsSum} ${getDeclension(countAsSum, countAs)}` : '';
      } else {
        const tempStr = `${count} ${getDeclension(count, pattern)}`;
        storeValues.push(tempStr);
      }
    });

    if (countAsText !== '') storeValues.unshift(countAsText);

    return storeValues.join(', ');
  }

  static #toggleButtonMinusDisable(buttonMinus, value) {
    if (value > 0) buttonMinus.disabled = false;
    if (value <= 0) buttonMinus.disabled = true;
  }
}

export default Dropdown;
