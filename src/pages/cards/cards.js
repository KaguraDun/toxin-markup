/* eslint-disable no-unused-vars */
import createCalendar from '@/components/Calendar/Calendar';
import '@/components/Logo/Logo.js';
import '@/components/Find-rooms/Find-rooms.js';

import '@/styles/index.scss';
import './cards.scss';

createCalendar({
  singleInputSelector: '.js-cards-calendar--opened',
  isOpen: true,
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: 8,
  minDate: new Date(2019, 7, 8),
});
