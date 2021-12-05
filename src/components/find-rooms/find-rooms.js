import './find-rooms.scss';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/button/button.js';

import createCalendar from '@/components/calendar/calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';

(() => {
  createCalendar({
    firstInputSelector: '.js-find-rooms-dropdown-arrival',
    secondInputSelector: '.js-find-rooms-dropdown-departure',
  });

  const dropdownGuests = document.querySelector('.js-cards-find-rooms-dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости' });
  }
})();
