import Calendar from '@/components/calendar/Calendar';
import { createDropdownGuests } from '@/components/dropdown/create-dropdown';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/button/button.js';

import './find-rooms.scss';

(() => {
  const firstInputContainer = document.querySelector('.js-find-rooms-dropdown-arrival');
  const secondInputContainer = document.querySelector('.js-find-rooms-dropdown-departure');

  const calendar = new Calendar({
    inputContainers: [firstInputContainer, secondInputContainer],
  });
  calendar.render();

  const dropdownGuests = document.querySelector('.js-find-rooms-dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости' });
  }
})();
