import { createDropdownGuests } from '@/components/Dropdown/CreateDropdown';
import createCalendar from '@/components/Calendar/Calendar';

import './Find-rooms.scss';
import '@/components/Date-dropdown/Date-dropdown.js';
import '@/components/Button/Button.js';

createCalendar({
  firstInputSelector: '.js-find-rooms-dropdown-arrival',
  secondInputSelector: '.js-find-rooms-dropdown-departure',
});

createCalendar({
  singleInputSelector: '.js-cards-calendar--opened',
  isOpen: true,
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: 8,
  minDate: new Date(2019, 7, 8),
});

const dropdownGuests = document.querySelector('.js-cards-find-rooms-dropdown-guests');

if (dropdownGuests) {
  createDropdownGuests({ element: dropdownGuests, label: 'гости' });
}
