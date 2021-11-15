import 'jquery';
import 'jquery-mask-plugin';

import addEventToLikeButtons from '@/components/Button-like/Button-like.js';
import addEventToCheckboxLists from '@/components/Checkbox-list/Checkbox-list.js';
import createRangeSlider from '@/components/RangeSlider/Range-slider';
import {
  createDropdownGuests,
  createDropdownRoomAmenity,
} from '@/components/Dropdown/CreateDropdown';

import '@/components/Logo/Logo.js';
import '@/components/Input/Input.js';
import '@/components/Date-dropdown/Date-dropdown.js';
import '@/components/Input-checkbox/Input-checkbox.js';
import '@/components/Input-radio/Input-radio.js';
import '@/components/Input-toggle/Input-toggle.js';
import '@/components/Button/Button.js';
import '@/components/Button-rate/Button-rate.js';
import '@/components/Room-info/Room-info.js';
import '@/components/Pagination/Pagination.js';
import '@/components/Bullet-list/Bullet-list.js';
import '@/components/Review/Review.js';

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

const dateDropdownArrival = document.querySelector('.js-date-dropdown-arrival');
const dateDropdownDeparture = document.querySelector('.js-date-dropdown-departure');
const dateDropdown = document.querySelector('.js-date-dropdown');

if (dateDropdownArrival && dateDropdownDeparture) {
  // eslint-disable-next-line no-new
  new Litepicker({
    element: dateDropdownArrival,
    elementEnd: dateDropdownDeparture,
    singleMode: false,
    autoApply: false,
    allowRepick: true,
    autoRefresh: true,
    minDate: Date.now(),
    disallowLockDaysInRange: true,
    buttonText: { apply: 'применить', cancel: 'очистить' },
  });
}

if (dateDropdown) {
  // eslint-disable-next-line no-new
  new Litepicker({
    element: dateDropdown,
    allowRepick: true,
    autoApply: false,
    singleMode: false,
    autoRefresh: true,
    minDate: Date.now(),
    buttonText: { apply: 'применить', cancel: 'очистить' },
  });
}

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
