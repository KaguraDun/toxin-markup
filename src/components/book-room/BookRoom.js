import getFormattedPrice from '@/helpers/get-formatted-price';
import Calendar from '@/components/calendar/Calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';
import '@/components/button/button.js';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/room-info/room-info.js';

import './book-room.scss';

class BookRoom {
  constructor(element, priceList) {
    this.element = element;
    this.priceList = [...priceList];
    this.priceListContainer = null;
    this.totalSumElement = null;
    this.dropdownGuests = null;
    this.calendar = null;
  }

  init() {
    this.calendar = new Calendar({
      firstInputContainer: this.element.querySelector('.js-book-room-date-dropdown-arrival'),
      secondInputContainer: this.element.querySelector('.js-book-room-date-dropdown-departure'),
      defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
      today: new Date(2019, 7, 8),
      minDate: new Date(2019, 7, 8),
    });
    this.calendar.render();

    const dropdownGuests = this.element.querySelector('.js-book-room-dropdown-guests');

    if (dropdownGuests) {
      this.dropdownGuests = createDropdownGuests({
        element: dropdownGuests,
        label: 'гости',
        values: [3, 0, 0],
      });
    }

    this.totalSumElement = this.element.querySelector('.js-book-room-total-sum');
    this.priceListContainer = this.element.querySelector('.js-book-room-price-list-wrapper');

    this.#renderPriceList();
    this.#setTotalSum();

    this.calendar.inputList.forEach((input) => {
      input.addEventListener('change', this.#handleCalendarUpdate);
    });
  }

  #handleCalendarUpdate = () => {
    const [bookRoomPrice] = this.priceList;
    const count = this.calendar.getNumberOfSelectedDays();

    this.priceList[0] = { ...bookRoomPrice, ...{ count } };

    this.#renderPriceList();
    this.#setTotalSum();
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

  static #createPriceListItem(item) {
    const hasNewLines = item.name.includes('<br>');
    let itemNameClassNames = 'book-room__item-nam';
    if (hasNewLines) itemNameClassNames += ' book-room__item-name_style_multiline';

    const itemAbout = item.about ? '<span class="book-room__item-about"></span>' : '';
    const name = item.name.replace('[template]', item.count);
    const itemSum = item.price * item.count;

    return `
      <li class="book-room__item">
        <div class="book-room__item-name-wrapper">
          <span class="${itemNameClassNames}">${name}</span>
          ${itemAbout}
        </div>
        <span class="book-room__item-sum">${getFormattedPrice(itemSum)}</span>
      </li>
    `;
  }

  #setTotalSum() {
    const totalSum = this.priceList.reduce((sum, curr) => sum + curr.price * curr.count, 0);
    this.totalSumElement.innerHTML = getFormattedPrice(totalSum);
  }
}

export default BookRoom;
