import Chart from '@/components/chart/Chart.js';
import BookRoom from '@/components/book-room/BookRoom';
import '@/components/header/header.js';
import '@/components/room-advantages/room-advantages.js';
import '@/components/review-list/review-list.js';
import '@/components/bullet-list/bullet-list.js';
import '@/components/footer/footer.js';
import '@/styles/_common.scss';

import './room-details.scss';

const chartContainer = document.querySelector('.js-room-details-page-chart');

const chart = new Chart({
  container: chartContainer,
  options: {
    values: [0, 65, 65, 130],
    valuesColors: ['black', 'purple', 'green', 'orange'],
    labels: ['Разочарован', 'Удов.', 'Хорошо', 'Великолепно'],
  },
});
chart.render();

const bookRoomContainer = document.querySelector('.js-room-details-page-book-room');
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
    name: 'Сбор за дополнительные  услуги',
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
