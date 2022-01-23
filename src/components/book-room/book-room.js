import Calendar from '@/components/calendar/Calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';
import '@/components/button/button.js';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/room-info/room-info.js';

import './book-room.scss';

(() => {
  const calendar = new Calendar({
    firstInputSelector: '.js-book-room-date-dropdown-arrival',
    secondInputSelector: '.js-book-room-date-dropdown-departure',
    defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
    today: new Date(2019, 7, 8),
    minDate: new Date(2019, 7, 8),
  });
  calendar.render();

  const dropdownGuests = document.querySelector('.js-book-room-dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости', values: [3, 0, 0] });
  }
})();
