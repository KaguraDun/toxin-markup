import './Dropdown.scss';

function numWord(value, words) {
  const absValue = Math.abs(value) % 100;
  const num = absValue % 10;

  if (absValue > 10 && absValue < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];

  return words[2];
}

class Dropdown {
  constructor(element, properties, countPattern) {
    this.element = element;
    this.properties = properties;
    this.store = properties.options;
    this.countPattern = countPattern;
  }

  createItems() {
    let items = '';

    Object.keys(this.properties.options).forEach((key) => {
      const value = this.properties.options[key].count;
      items += `
      <div class="dropdown__item">
        <div class="dropdown__item-name">${key}</div>
        <div class="dropdown__item-buttons">
          <button class="button-minus"></button>
          <div class="dropdown__item-value" data-value=${key}>${value}</div>
          <button class="button-plus"></button>
        </div>
      </div>`;
    });

    return items;
  }

  createDropdown() {
    return `
    <div class="dropdown">
      <p class="dropdown__label">${this.properties.label}</p>
      <div class="dropdown__input-wrapper">
        <input type="text" class="dropdown__input" placeholder="${this.properties.name}" readonly>
        <span class="dropdown__button-icon"></span>
      </div>

      <div class="dropdown__items" hidden>
        ${this.createItems()}
      </div>
    </div>`;
  }

  init() {
    this.element.innerHTML = this.createDropdown();

    const dropdownItems = this.element.querySelector('.dropdown__items');
    this.dropdownInputWrapper = this.element.querySelector('.dropdown__input-wrapper');
    this.dropdownInput = this.element.querySelector('.dropdown__input');

    this.dropdownInputWrapper.addEventListener('click', () => this.toggleDropdownItems(dropdownItems));

    dropdownItems.addEventListener('click', (e) => {
      const parent = e.target.parentElement;
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
    });
  }

  toggleDropdownItems(dropdownItems) {
    dropdownItems.hidden = !dropdownItems.hidden;
  }

  concatStoreValues() {
    const storeValues = [];
    let countAsPattern = null;
    let countAsSum = 0;

    Object.keys(this.store).forEach((key) => {
      const { count, pattern, countAs } = this.store[key];

      if (count > 0) {
        if (countAs) {
          countAsSum += count;
          countAsPattern = countAs;
        } else {
          const countAsString = countAsSum > 0 ? `${numWord(countAsSum, countAsPattern)} ${countAsSum}` : '';
          const tempStr = `${numWord(count, pattern)} ${count}`;

          storeValues.push(countAsString + tempStr);
        }
      }
    });

    return storeValues.join(', ');
  }
}

export default Dropdown;
