import '../styles/index.scss';
import 'jquery';
import 'jquery-mask-plugin';

import Litepicker from 'litepicker';

import addEventToLikeButtons from '@/pug-mixins/Button-like/Button-like';
import createRangeSlider from '@/pug-components/RangeSlider/Range-slider';
import {
  createDropdownGuests,
  createDropdownRoomAmenity,
} from '@/pug-components/Dropdown/CreateDropdown';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('@/pug-components/', true, /\.js|.scss$/));
importAll(require.context('@/pug-mixins/', true, /\.js|.scss$/));

const dropdownGuests = document.querySelector('.dropdown-guests-js');

if (dropdownGuests) {
  createDropdownGuests(dropdownGuests);
}

new Litepicker({
  element: document.querySelector('.js-date-dropdown-arrival'),
  elementEnd: document.querySelector('.js-date-dropdown-departure'),
  singleMode: false,
  autoApply: false,
  allowRepick: true,
  autoRefresh: true,
  minDate: Date.now(),
  disallowLockDaysInRange: true,
  buttonText: { apply: 'применить', cancel: 'очистить' },
});

new Litepicker({
  element: document.querySelector('.js-date-dropdown'),
  allowRepick: true,
  autoApply: false,
  singleMode: false,
  autoRefresh: true,
  minDate: Date.now(),
  buttonText: { apply: 'применить', cancel: 'очистить' },
});

const dropdownRoomAmenity = document.querySelector('.dropdown-room-amenity-js');

if (dropdownRoomAmenity) {
  createDropdownRoomAmenity(dropdownRoomAmenity);
}

const dropdownRoomAmenityExpanded = document.querySelector('.dropdown-room-amenity-expanded-js');

if (dropdownRoomAmenityExpanded) {
  createDropdownRoomAmenity(dropdownRoomAmenityExpanded, true, false);
}

addEventToLikeButtons();
createRangeSlider('range-slider');
