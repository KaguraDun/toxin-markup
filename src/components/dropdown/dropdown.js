import getDeclension from '@/helpers/getDeclension';

import './dropdown.scss';

class Dropdown {
  constructor(element, properties) {
    this.element = element;
    this.properties = properties;
    this.store = properties.options;

    this.dropdownInput = null;
    this.dropdownItems = null;
    this.buttonClear = null;
    this.buttonApply = null;

    this.handleStoreValueChange = this.handleStoreValueChange.bind(this);
    this.handleStoreValuesReset = this.handleStoreValuesReset.bind(this);
    this.handleDropdownExpand = this.handleDropdownExpand.bind(this);
  }

  #DROPDOWN_EXPANDED_CLASS = 'dropdown__input_expanded';

  createItems() {
    let items = '';

    Object.keys(this.properties.options).forEach((key) => {
      const value = this.properties.options[key].count;
      const buttonMinusDisabled = value <= 0 ? 'disabled' : '';

      items += `
      <li class="dropdown__item">
        <div class="dropdown__item-name">${key}</div>
        <div class="dropdown__item-buttons">
          <button type="button" class="button-minus" ${buttonMinusDisabled}></button>
          <div class="dropdown__item-value" data-value="${key}">${value}</div>
          <button type="button" class="button-plus"></button>
        </div>
      </li>`;
    });

    return items;
  }

  getStoreSum() {
    return Object.values(this.store).reduce((acc, option) => acc + Number(option.count), 0);
  }

  static createControlButtons() {
    return `
    <div class="dropdown__button-wrapper">
      <button type="button" class="button-widget js-button-clear">Очистить</button>
      <button type="button" class="button-widget js-button-apply">Применить</button>
    </div>`;
  }

  createDropdown() {
    const { isExpanded, placeholder } = this.properties;
    const expandedClass = isExpanded ? this.#DROPDOWN_EXPANDED_CLASS : '';
    const dropdownInputClass = `dropdown__input ${expandedClass}`;

    return `
    <div class="dropdown">
      <p class="dropdown__label">${this.properties.label ?? ''}</p>
      <div class="dropdown__input-wrapper">
        <input type="text" class="${dropdownInputClass}" placeholder="${placeholder}" readonly>
        <span class="dropdown__button-icon"></span>
      </div>
      <ul class="dropdown__items" ${isExpanded ? '' : 'hidden'}>
        ${this.createItems()}
        ${this.properties.controlButtons ? Dropdown.createControlButtons() : ''}
      </ul>
    </div>`;
  }

  hideButtonClear(isHidden) {
    if (!this.buttonClear) return;

    const modifier = 'button_hidden';
    this.buttonClear.classList.toggle(modifier, isHidden);
  }

  init() {
    this.element.innerHTML = this.createDropdown();
    this.dropdownInput = this.element.querySelector('.dropdown__input');
    this.dropdownInput.value = this.concatStoreValues();
    this.dropdownItems = this.element.querySelector('.dropdown__items');

    const dropdownInputWrapper = this.element.querySelector('.dropdown__input-wrapper');
    this.buttonClear = this.element.querySelector('.js-button-clear');
    this.buttonApply = this.element.querySelector('.js-button-apply');

    dropdownInputWrapper.addEventListener('click', this.handleDropdownExpand);
    this.dropdownItems.addEventListener('click', this.handleStoreValueChange);
    this.buttonClear?.addEventListener('click', this.handleStoreValuesReset);
    this.buttonApply?.addEventListener('click', this.handleDropdownExpand);

    const isButtonClearHidden = this.getStoreSum() === 0;
    this.hideButtonClear(isButtonClearHidden);
  }

  handleStoreValueChange(e) {
    const parent = e.target.parentElement;

    if (parent.className !== 'dropdown__item-buttons') return;

    const valueElement = parent.querySelector('.dropdown__item-value');
    const { value } = valueElement.dataset;
    const buttonMinus = parent.querySelector('.button-minus');
    const buttonPlus = parent.querySelector('.button-plus');

    if (e.target === buttonMinus) {
      this.store[value].count -= 1;

      if (this.store[value].count <= 0) buttonMinus.disabled = true;

      valueElement.innerText = this.store[value].count;
    }

    if (e.target === buttonPlus) {
      this.store[value].count += 1;

      if (this.store[value].count > 0) buttonMinus.disabled = false;
      valueElement.innerText = this.store[value].count;
    }

    this.dropdownInput.value = this.concatStoreValues();

    const isStoreSumEqualsZero = this.getStoreSum() === 0;
    this.hideButtonClear(isStoreSumEqualsZero);
  }

  handleStoreValuesReset() {
    Object.keys(this.store).forEach((key) => {
      this.store[key].count = 0;
    });

    const valueElements = this.element.querySelectorAll('.dropdown__item-value');
    const buttonsMinus = this.element.querySelectorAll('.button-minus');

    valueElements.forEach((element) => {
      element.innerText = 0;
    });

    buttonsMinus.forEach((button) => {
      button.disabled = true;
    });

    this.dropdownInput.value = null;
    this.dropdownInput.placeholder = this.properties.placeholder;

    this.hideButtonClear(true);
  }

  handleDropdownExpand() {
    this.dropdownItems.hidden = !this.dropdownItems.hidden;
    this.dropdownInput.classList.toggle(this.#DROPDOWN_EXPANDED_CLASS);
  }

  concatStoreValues() {
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
}

export default Dropdown;
