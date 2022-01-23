/* eslint-disable no-unused-vars */
import Calendar from '@/components/calendar/Calendar';
import '@/components/logo/logo.js';
import '@/components/find-rooms/find-rooms.js';
import '@/components/sign-up/sign-up.js';
import '@/components/book-room/book-room.js';
import '@/components/sign-in/sign-in.js';
import '@/components/room-card/room-card.js';
import '@/styles/_common.scss';

import './cards.scss';

const calendar = new Calendar({
  singleInputSelector: '.js-cards-calendar',
  isOpen: true,
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: new Date(2019, 7, 8),
  minDate: new Date(2019, 7, 8),
  wrap: false,
});

calendar.render();
