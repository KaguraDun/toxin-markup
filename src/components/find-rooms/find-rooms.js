import Calendar from '@/components/calendar/Calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/button/button.js';

import './find-rooms.scss';

(() => {
  const calendar = new Calendar({
    firstInputContainer: document.querySelector('.js-find-rooms-dropdown-arrival'),
    secondInputContainer: document.querySelector('.js-find-rooms-dropdown-departure'),
  });
  calendar.render();

  const dropdownGuests = document.querySelector('.js-find-rooms-dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости' });
  }
})();
