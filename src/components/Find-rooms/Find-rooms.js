import { createDropdownGuests } from '@/components/Dropdown/CreateDropdown';
import createCalendar from '@/components/Calendar/Calendar';

import './Find-rooms.scss';
import '@/components/Date-dropdown/Date-dropdown.js';
import '@/components/Button/Button.js';

createCalendar({
  firstInputSelector: '.js-find-rooms-dropdown-arrival',
  secondInputSelector: '.js-find-rooms-dropdown-departure',
});

const dropdownGuests = document.querySelector('.js-cards-find-rooms-dropdown-guests');

if (dropdownGuests) {
  createDropdownGuests({ element: dropdownGuests, label: 'гости' });
}
