import ChartPlugin from '@/components/chart-plugin/ChartPlugin';
import '@/components/header/header.js';
import '@/components/room-advantages/room-advantages.js';
import '@/components/book-room/book-room.js';
import '@/components/review-list/review-list.js';
import '@/components/bullet-list/bullet-list.js';
import '@/components/footer/footer.js';
import '@/styles/_common.scss';

import './room-details.scss';

(() => {
  const chartContainer = document.querySelector('.js-room-details-page-chart');

  const chart = new ChartPlugin({
    container: chartContainer,
    values: [0, 65, 65, 130],
  });
  chart.render();
})();
