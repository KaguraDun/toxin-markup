import createChart from '@/components/room-impressions/room-impressions.js';
import '@/components/header/header.js';
import '@/components/room-advantages/room-advantages.js';
import '@/components/book-room/book-room.js';
import '@/components/review-list/review-list.js';
import '@/components/bullet-list/bullet-list.js';
import '@/components/footer/footer.js';
import '@/assets/styles/_common.scss';

import './room-details.scss';

(() => {
  createChart({
    selector: '.js-room-details-page__room-impressions',
    values: [0, 65, 65, 130],
  });
})();
