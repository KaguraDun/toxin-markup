/* eslint-disable no-unused-vars */
import createCalendar from '@/components/calendar/calendar';
import '@/components/logo/logo.js';
import '@/components/find-rooms/find-rooms.js';
import '@/components/sign-up/sign-up.js';
import '@/components/book-room/book-room.js';
import '@/components/sign-in/sign-in.js';

import '@/styles/_common.scss';
import './cards.scss';

createCalendar({
  singleInputSelector: '.js-cards-calendar--opened',
  isOpen: true,
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: 8,
  minDate: new Date(2019, 7, 8),
});
