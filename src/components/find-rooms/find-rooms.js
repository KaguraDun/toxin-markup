import Calendar from '@/components/calendar/Calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/button/button.js';

import './find-rooms.scss';

(() => {
  const calendar = new Calendar({
    firstInputSelector: '.js-find-rooms__dropdown-arrival',
    secondInputSelector: '.js-find-rooms__dropdown-departure',
  });
  calendar.render();

  const dropdownGuests = document.querySelector('.js-find-rooms__dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости' });
  }
})();
