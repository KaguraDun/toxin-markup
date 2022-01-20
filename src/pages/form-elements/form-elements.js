import Calendar from '@/components/calendar/Calendar';
import RangeSlider from '@/components/range-slider/RangeSlider';
import CheckboxList from '@/components/checkbox-list/CheckboxList';
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
import '@/components/button-like/button-like.js';
import '@/components/button-rate/button-rate.js';
import '@/components/room-advantages/room-advantages.js';
import '@/components/pagination/pagination.js';
import '@/components/bullet-list/bullet-list.js';
import '@/components/review/review.js';
import '@/styles/_common.scss';

import './form-elements.scss';

const dropdownGuests = document.querySelector('.js-form-elements-dropdown-guests');

if (dropdownGuests) {
  createDropdownGuests({ element: dropdownGuests, label: 'dropdown' });
}

const dropdownGuestsWithControls = document.querySelector(
  '.js-form-elements-dropdown-guests-with-controls',
);

if (dropdownGuestsWithControls) {
  createDropdownGuests({ element: dropdownGuestsWithControls, expanded: true, label: 'dropdown' });
}

const dropdownGuestsWithControlsAndValues = document.querySelector(
  '.js-form-elements-dropdown-guests-with-controls-and-values',
);

if (dropdownGuestsWithControlsAndValues) {
  createDropdownGuests({
    element: dropdownGuestsWithControlsAndValues,
    expanded: true,
    values: [2, 1, 0],
    label: 'dropdown',
  });
}

const twoInputCalendar = new Calendar({
  firstInputSelector: '.js-form-elements-dropdown-arrival',
  secondInputSelector: '.js-form-elements-dropdown-departure',
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 19)],
  today: new Date(2019, 7, 8),
  minDate: new Date(2019, 7, 8),
});
twoInputCalendar.render();

const singleInputCalendar = new Calendar({
  singleInputSelector: '.js-form-elements-dropdown-single',
  defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
  today: new Date(2019, 7, 8),
  minDate: new Date(2019, 7, 8),
});
singleInputCalendar.render();

const dropdownRoomAmenity = document.querySelector('.js-form-elements-dropdown-room-amenity');

if (dropdownRoomAmenity) {
  createDropdownRoomAmenity({ element: dropdownRoomAmenity, values: [2, 2, 1] });
}

const dropdownRoomAmenityExpanded = document.querySelector(
  '.js-form-elements-dropdown-room-amenity-expanded',
);

if (dropdownRoomAmenityExpanded) {
  createDropdownRoomAmenity({
    element: dropdownRoomAmenityExpanded,
    expanded: true,
    controls: false,
    values: [2, 2, 0],
  });
}

const sliderContainer = document.querySelector('.js-form-elements-range-slider');
if (sliderContainer) {
  const rangeSlider = new RangeSlider(sliderContainer);
  rangeSlider.create();
}

const checkboxLists = document.querySelectorAll('.js-form-elements-checkbox-list');
if (checkboxLists.length > 0) {
  checkboxLists.forEach((element) => {
    const checkboxList = new CheckboxList(element);
    checkboxList.addEventListener();
  });
}
