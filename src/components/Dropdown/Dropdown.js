import './Dropdown.scss';

class Dropdown {
  constructor(element, properties) {
    this.element = element;
    this.properties = properties;
    this.store = properties.options;
  }

  createItem(name, value) {
    return `
    <div class="dropdown__item">
      <div class="dropdown__item-name">${name}</div>
        <div class="dropdown__item-buttons">
          <button class="button-minus" data-type="minus">-</button>
          <div class="dropdown__item-value" data-value=${name}>${value}</div>
          <button class="button-plus" data-type="plus">+</button>
        </div>
    </div>`;
  }

  init() {
    console.log(this.store);

    const dropdown = `
    <div class="dropdown__label">
    ${this.properties.label}
    <button class="dropdown__button-open">${this.properties.name}</button>
    <div class="dropdown__items">`;

    this.element.innerHTML = dropdown;
  }
}

export default Dropdown;
