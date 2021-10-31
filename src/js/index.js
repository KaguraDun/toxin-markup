/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import '../styles/index.scss';
import 'jquery';
import 'jquery-mask-plugin';

import Litepicker from 'litepicker';

import addEventToLikeButtons from '@/pug-mixins/Button-like/Button-like.js';
import addEventToCheckboxLists from '@/pug-mixins/Checkbox-list/Checkbox-list.js';
import createRangeSlider from '@/pug-components/RangeSlider/Range-slider.js';
import {
  createDropdownGuests,
  createDropdownRoomAmenity,
} from '@/pug-components/Dropdown/CreateDropdown.js';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('@/pug-components/', true, /\.js|.scss$/));
importAll(require.context('@/pug-mixins/', true, /\.js|.scss$/));

const dropdownGuests = document.querySelector('.js-dropdown-guests');

if (dropdownGuests) {
  createDropdownGuests(dropdownGuests);
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
  createDropdownRoomAmenity(dropdownRoomAmenity);
}

const dropdownRoomAmenityExpanded = document.querySelector('.js-dropdown-room-amenity-expanded');

if (dropdownRoomAmenityExpanded) {
  createDropdownRoomAmenity(dropdownRoomAmenityExpanded, true, false);
}

addEventToLikeButtons();
addEventToCheckboxLists();

createRangeSlider('js-range-slider');
