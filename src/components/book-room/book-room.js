import createCalendar from '@/components/calendar/calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';

import '@/components/button/button.js';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/room-info/room-info.js';
import './book-room.scss';

(() => {
  createCalendar({
    firstInputSelector: '.js-book-room__date-dropdown-arrival',
    secondInputSelector: '.js-book-room__date-dropdown-departure',
    defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
    today: 8,
    minDate: new Date(2019, 7, 8),
  });

  const dropdownGuests = document.querySelector('.js-book-room__dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости', values: [3, 0, 0] });
  }
})();
