import createCalendar from '@/components/calendar/calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/button/button.js';

import './find-rooms.scss';

(() => {
  createCalendar({
    firstInputSelector: '.js-find-rooms__dropdown-arrival',
    secondInputSelector: '.js-find-rooms__dropdown-departure',
  });

  const dropdownGuests = document.querySelector('.js-find-rooms__dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости' });
  }
})();
