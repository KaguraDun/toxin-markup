import addEventToLikeButtons from '@/components/button-like/button-like.js';
import addEventToCheckboxLists from '@/components/checkbox-list/checkbox-list.js';
import createRangeSlider from '@/components/range-slider/range-slider';
import createCalendar from '@/components/calendar/calendar';
import {
  createDropdownGuests,
  createDropdownRoomAmenity,
} from '@/components/dropdown/create-dropdown';

import '@/components/logo/logo.js';
import '@/components/input/input.js';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/input-checkbox/input-checkbox.js';
import '@/components/input-radio/input-radio.js';
import '@/components/input-toggle/input-toggle.js';
import '@/components/button/button.js';
import '@/components/button-rate/button-rate.js';
import '@/components/room-advantages/room-advantages.js';
import '@/components/pagination/pagination.js';
import '@/components/bullet-list/bullet-list.js';
import '@/components/review/review.js';

import '@/styles/index.scss';
import './form-elements.scss';

const dropdownGuests = document.querySelector('.js-dropdown-guests');

if (dropdownGuests) {
  createDropdownGuests({ element: dropdownGuests, label: 'dropdown' });
}

const dropdownGuestsWithControls = document.querySelector('.js-dropdown-guests--with-controls');

if (dropdownGuestsWithControls) {
  createDropdownGuests({ element: dropdownGuestsWithControls, expanded: true, label: 'dropdown' });
}

const dropdownGuestsWithControlsAndValues = document.querySelector(
  '.js-dropdown-guests--with-controls-and-values',
);

if (dropdownGuestsWithControlsAndValues) {
  createDropdownGuests({
    element: dropdownGuestsWithControlsAndValues,
    expanded: true,
    values: [2, 1, 0],
    label: 'dropdown',
  });
}

createCalendar({
  firstInputSelector: '.js-form-elements-dropdown-arrival',
  secondInputSelector: '.js-form-elements-dropdown-departure',
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 19)],
  today: 8,
  minDate: new Date(2019, 7, 8),
});

createCalendar({
  singleInputSelector: '.js-form-elements-dropdown-single',
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: 8,
  minDate: new Date(2019, 7, 8),
});

const dropdownRoomAmenity = document.querySelector('.js-dropdown-room-amenity');

if (dropdownRoomAmenity) {
  createDropdownRoomAmenity({ element: dropdownRoomAmenity, values: [2, 2, 1] });
}

const dropdownRoomAmenityExpanded = document.querySelector('.js-dropdown-room-amenity-expanded');

if (dropdownRoomAmenityExpanded) {
  createDropdownRoomAmenity({
    element: dropdownRoomAmenityExpanded,
    expanded: true,
    controls: false,
    values: [2, 2, 0],
  });
}

addEventToLikeButtons();
addEventToCheckboxLists();

createRangeSlider('js-range-slider');
