import Calendar from '@/components/calendar/Calendar';
import createRangeSlider from '@/components/range-slider/range-slider.js';
import {
  createDropdownGuests,
  createDropdownRoomAmenity,
} from '@/components/dropdown/create-dropdown';
import '@/components/date-dropdown/date-dropdown.js';
import '@/components/checkbox-list/checkbox-list.js';

import './room-filter.scss';

(() => {
  const calendar = new Calendar({
    singleInputSelector: '.js-room-filter__date-dropdown',
    defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
    today: new Date(2019, 7, 8),
    minDate: new Date(2019, 7, 8),
  });
  calendar.render();

  const dropdownGuests = document.querySelector('.js-room-filter__dropdown-guests');

  if (dropdownGuests) {
    createDropdownGuests({ element: dropdownGuests, label: 'гости', values: [3, 0, 1] });
  }

  createRangeSlider('js-room-filter__range-slider');

  const dropdownRoomAmenity = document.querySelector('.js-room-filter__dropdown-room-amenity');

  if (dropdownRoomAmenity) {
    createDropdownRoomAmenity({
      element: dropdownRoomAmenity,
      label: 'удобства номера',
      values: [2, 2, 1],
    });
  }
})();
