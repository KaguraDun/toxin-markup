/* eslint-disable no-unused-vars */
import BookRoom from '@/components/book-room/BookRoom';
import Calendar from '@/components/calendar/Calendar';
import '@/components/logo/logo.js';
import '@/components/find-rooms/find-rooms.js';
import '@/components/sign-up/sign-up.js';
import '@/components/sign-in/sign-in.js';
import '@/components/room-card/room-card.js';
import '@/styles/_common.scss';

import './cards.scss';

const singleInputContainer = document.querySelector('.js-cards-calendar');

const calendar = new Calendar({
  inputContainers: [singleInputContainer],
  isOpen: true,
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: new Date(2019, 7, 8),
  minDate: new Date(2019, 7, 8),
});

calendar.render();

const bookRoomContainer = document.querySelector('.js-cards-book-room');
const priceList = [
  {
    name: '[price] х [count] суток',
    count: 4,
    price: 9990,
    about: false,
  },
  {
    name: 'Сбор за услуги: скидка 2 179₽',
    count: 1,
    price: -2179,
    about: 'Скидка',
  },
  {
    name: 'Сбор за дополнительные услуги',
    count: 1,
    price: 300,
    about: 'Сбор',
  },
];

if (bookRoomContainer) {
  const bookRoom = new BookRoom({
    element: bookRoomContainer,
    priceList,
    calendarOptions: {
      defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
      today: new Date(2019, 7, 8),
      minDate: new Date(2019, 7, 8),
    },
    dropdownOptions: {
      label: 'гости',
      values: [3, 0, 0],
    },
  });
  bookRoom.init();
}
