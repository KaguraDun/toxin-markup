import getFormattedPrice from '@/helpers/get-formatted-price';
import Calendar from '@/components/calendar/Calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';
import '@/components/button/button.js';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/room-info/room-info.js';

import './book-room.scss';

class BookRoom {
  constructor({ element, priceList, calendarOptions = null, dropdownOptions = null }) {
    this.element = element;
    this.priceList = [...priceList];
    this.calendarOptions = calendarOptions;
    this.dropdownOptions = dropdownOptions;
    this.priceListContainer = null;
    this.totalSumElement = null;
    this.dropdownGuests = null;
    this.calendar = null;
    this.submitButton = null;
  }

  init() {
    this.calendar = new Calendar({
      firstInputContainer: this.element.querySelector('.js-book-room-date-dropdown-arrival'),
      secondInputContainer: this.element.querySelector('.js-book-room-date-dropdown-departure'),
      ...this.calendarOptions,
    });
    this.calendar.render();

    const dropdownGuests = this.element.querySelector('.js-book-room-dropdown-guests');

    if (dropdownGuests) {
      this.dropdownGuests = createDropdownGuests({
        element: dropdownGuests,
        ...this.dropdownOptions,
      });
    }

    this.totalSumElement = this.element.querySelector('.js-book-room-total-sum');
    this.priceListContainer = this.element.querySelector('.js-book-room-price-list-wrapper');
    this.submitButton = this.element.querySelector('.js-book-room-button-book > button');

    this.calendar.inputList.forEach((input) => {
      input.addEventListener('change', this.#handleCalendarUpdate);
    });

    this.#handleCalendarUpdate();
  }

  #handleCalendarUpdate = () => {
    const [bookRoomPrice] = this.priceList;
    const count = this.calendar.getNumberOfSelectedDays();

    this.priceList[0] = { ...bookRoomPrice, ...{ count } };

    this.#renderPriceList();
    this.#setTotalSum();

    const isRangeSelected = count > 0;
    this.submitButton.disabled = !isRangeSelected;
  };

  #renderPriceList() {
    const priceListItems = this.priceList.map((item) => BookRoom.#createPriceListItem(item));

    const priceList = `
      <ul class="book-room__price-list">
        ${priceListItems.join('')}
      </ul>
    `;

    this.priceListContainer.innerHTML = priceList;
  }

  static #createAbout(text) {
    return `
    <span class="book-room__item-about">
      <span class="book-room__item-about-text">
        ${text}
      </span>
    </span>
  `;
  }

  static #createPriceListItem(item) {
    const hasNewLines = item.name.includes('<br>');
    let itemNameClassNames = 'book-room__item-name';
    if (hasNewLines) itemNameClassNames += ' book-room__item-name_style_multiline';

    const name = item.name
      .replace('[price]', getFormattedPrice(item.price))
      .replace('[count]', item.count);

    const itemSum = item.price * item.count;
    const itemAbout = BookRoom.#createAbout(item.about);

    return `
      <li class="book-room__item">
        <div class="book-room__item-name-wrapper">
          <span class="${itemNameClassNames}">${name}</span>
          ${item.about ? itemAbout : ''}
        </div>
        <span class="book-room__item-sum">${getFormattedPrice(itemSum)}</span>
      </li>
    `;
  }

  #setTotalSum() {
    let totalSum = this.priceList.reduce((sum, curr) => sum + curr.price * curr.count, 0);

    if (totalSum < 0) totalSum = 0;

    this.totalSumElement.innerHTML = getFormattedPrice(totalSum);
  }
}

export default BookRoom;
