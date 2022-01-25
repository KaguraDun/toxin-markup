import BookRoom from '@/components/book-room/BookRoom';
import ChartPlugin from '@/components/chart-plugin/ChartPlugin';
import '@/components/header/header.js';
import '@/components/room-advantages/room-advantages.js';
import '@/components/review-list/review-list.js';
import '@/components/bullet-list/bullet-list.js';
import '@/components/footer/footer.js';
import '@/styles/_common.scss';

import './room-details.scss';

const chartContainer = document.querySelector('.js-room-details-page-chart');

const chart = new ChartPlugin({
  container: chartContainer,
  values: [0, 65, 65, 130],
});
chart.render();

const bookRoomContainer = document.querySelector('.js-room-details-page-book-room');
const priceList = [
  {
    name: '9 990₽ х [template] суток',
    count: 4,
    price: 9990,
    about: false,
  },
  {
    name: 'Сбор за услуги: скидка 2 179₽',
    count: 1,
    price: -2179,
    about: true,
  },
  {
    name: 'Сбор за дополнительные <br> услуги',
    count: 1,
    price: 300,
    about: true,
  },
];

if (bookRoomContainer) {
  const bookRoom = new BookRoom(bookRoomContainer, priceList);
  bookRoom.init();
}
