import './dropdown.scss';

import getDeclension from '../../helpers/getDeclension';

class Dropdown {
  constructor(element, properties) {
    this.element = element;
    this.properties = properties;
    this.store = properties.options;

    this.dropdownInput = null;
    this.dropdownItems = null;
    this.buttonClear = null;

    this.changeStoreValue = this.changeStoreValue.bind(this);
    this.resetStoreValues = this.resetStoreValues.bind(this);
    this.toggleDropdownItems = this.toggleDropdownItems.bind(this);
  }

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
    const { placeholder } = this.properties;

    return `
    <div class="dropdown">
      <p class="dropdown__label">${this.properties.label ?? ''}</p>
      <div class="dropdown__input-wrapper">
        <input type="text" class="dropdown__input" placeholder="${placeholder}" readonly>
        <span class="dropdown__button-icon"></span>
      </div>
      <ul class="dropdown__items" hidden>
        ${this.createItems()}
        ${this.properties.controlButtons ? Dropdown.createControlButtons() : ''}
      </ul>
    </div>`;
  }

  hideButtonClear(isHidden) {
    if (!this.buttonClear) return;

    const modifier = 'button--hidden';

    if (isHidden) {
      this.buttonClear.classList.add(modifier);
    } else {
      this.buttonClear.classList.remove(modifier);
    }
  }

  init() {
    this.element.innerHTML = this.createDropdown();
    this.dropdownInput = this.element.querySelector('.dropdown__input');
    this.dropdownInput.value = this.concatStoreValues();
    this.dropdownItems = this.element.querySelector('.dropdown__items');

    const dropdownInputWrapper = this.element.querySelector('.dropdown__input-wrapper');
    this.buttonClear = this.element.querySelector('.js-button-clear');
    const buttonApply = this.element.querySelector('.js-button-apply');

    dropdownInputWrapper.addEventListener('click', this.toggleDropdownItems);

    this.dropdownItems.addEventListener('click', this.changeStoreValue);
    this.buttonClear?.addEventListener('click', this.resetStoreValues);
    buttonApply?.addEventListener('click', this.toggleDropdownItems);

    const isClearButtonHidden = this.getStoreSum() === 0;
    if (isClearButtonHidden) this.hideButtonClear(true);
  }

  changeStoreValue(e) {
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

    if (this.getStoreSum() > 0) {
      this.hideButtonClear(false);
    } else if (this.getStoreSum() === 0) {
      this.hideButtonClear(true);
    }
  }

  resetStoreValues() {
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

  toggleDropdownItems() {
    this.dropdownItems.hidden = !this.dropdownItems.hidden;
    this.dropdownInput.classList.toggle('dropdown__input--expanded');
  }

  concatStoreValues() {
    const storeValues = [];
    let countAsStr = '';
    let countAsSum = 0;

    Object.keys(this.store).forEach((key) => {
      const { count, pattern, countAs } = this.store[key];

      if (count === 0) return;

      if (countAs) {
        countAsSum += count;
        countAsStr = countAsSum > 0 ? `${countAsSum} ${getDeclension(countAsSum, countAs)}` : '';
      } else {
        const tempStr = `${count} ${getDeclension(count, pattern)}`;
        storeValues.push(tempStr);
      }
    });

    if (countAsStr !== '') storeValues.unshift(countAsStr);

    return storeValues.join(', ');
  }
}

export default Dropdown;
