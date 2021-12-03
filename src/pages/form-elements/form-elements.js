import '@/components/logo/logo.js';
import '@/components/input/input.js';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/input-checkbox/input-checkbox.js';
import '@/components/input-radio/input-radio.js';
import '@/components/input-toggle/input-toggle.js';
import '@/components/button/button.js';
import '@/components/button-like/button-like.js';
import '@/components/button-rate/button-rate.js';
import '@/components/checkbox-list/checkbox-list.js';
import '@/components/room-advantages/room-advantages.js';
import '@/components/pagination/pagination.js';
import '@/components/bullet-list/bullet-list.js';
import '@/components/review/review.js';
import '@/styles/_common.scss';
import './form-elements.scss';

import createCalendar from '@/components/calendar/calendar';
import {
  createDropdownGuests,
  createDropdownRoomAmenity,
} from '@/components/dropdown/create-dropdown';
import createRangeSlider from '@/components/range-slider/range-slider.js';

const dropdownGuests = document.querySelector('.js-form-elements__dropdown-guests');

if (dropdownGuests) {
  createDropdownGuests({ element: dropdownGuests, label: 'dropdown' });
}

const dropdownGuestsWithControls = document.querySelector(
  '.js-form-elements__dropdown-guests--with-controls',
);

if (dropdownGuestsWithControls) {
  createDropdownGuests({ element: dropdownGuestsWithControls, expanded: true, label: 'dropdown' });
}

const dropdownGuestsWithControlsAndValues = document.querySelector(
  '.js-form-elements__dropdown-guests--with-controls-and-values',
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
  firstInputSelector: '.js-form-elements__dropdown-arrival',
  secondInputSelector: '.js-form-elements__dropdown-departure',
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 19)],
  today: 8,
  minDate: new Date(2019, 7, 8),
});

createCalendar({
  singleInputSelector: '.js-form-elements__dropdown-single',
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: 8,
  minDate: new Date(2019, 7, 8),
});

const dropdownRoomAmenity = document.querySelector('.js-form-elements__dropdown-room-amenity');

if (dropdownRoomAmenity) {
  createDropdownRoomAmenity({ element: dropdownRoomAmenity, values: [2, 2, 1] });
}

const dropdownRoomAmenityExpanded = document.querySelector(
  '.js-form-elements__dropdown-room-amenity-expanded',
);

if (dropdownRoomAmenityExpanded) {
  createDropdownRoomAmenity({
    element: dropdownRoomAmenityExpanded,
    expanded: true,
    controls: false,
    values: [2, 2, 0],
  });
}

createRangeSlider('js-form-elements__range-slider');
