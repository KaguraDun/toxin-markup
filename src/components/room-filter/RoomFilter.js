import Calendar from '@/components/calendar/Calendar';
import RangeSlider from '@/components/range-slider/RangeSlider';
import CheckboxList from '@/components/checkbox-list/CheckboxList';
import {
  createDropdownGuests,
  createDropdownRoomAmenity,
} from '@/components/dropdown/create-dropdown';
import '@/components/date-dropdown/date-dropdown.js';

import './room-filter.scss';

class RoomFilter {
  constructor({
    calendarOptions = null,
    sliderOptions = null,
    dropdownGuestsOptions = null,
    dropdownRoomAmenityOptions = null,
  }) {
    this.calendarOptions = calendarOptions;
    this.sliderOptions = sliderOptions;
    this.dropdownGuestsOptions = dropdownGuestsOptions;
    this.dropdownRoomAmenityOptions = dropdownRoomAmenityOptions;
  }

  init() {
    const singleInputContainer = document.querySelector('.js-room-filter-date-dropdown');
    const calendar = new Calendar({
      inputContainers: [singleInputContainer],
      ...this.calendarOptions,
    });
    calendar.render();

    const dropdownGuests = document.querySelector('.js-room-filter-dropdown-guests');
    if (dropdownGuests) {
      createDropdownGuests({ element: dropdownGuests, ...this.dropdownGuestsOptions });
    }

    const sliderContainer = document.querySelector('.js-room-filter-range-slider');
    if (sliderContainer) {
      const rangeSlider = new RangeSlider(sliderContainer, this.sliderOptions);
      rangeSlider.create();
    }

    const dropdownRoomAmenity = document.querySelector('.js-room-filter-dropdown-room-amenity');
    if (dropdownRoomAmenity) {
      createDropdownRoomAmenity({
        element: dropdownRoomAmenity,
        ...this.dropdownRoomAmenityOptions,
      });
    }

    const checkboxLists = document.querySelectorAll('.js-room-filter-checkbox-list');
    if (checkboxLists.length > 0) {
      checkboxLists.forEach((container) => {
        const checkboxList = new CheckboxList(container);
        checkboxList.addEventListener();
      });
    }
  }
}

export default RoomFilter;
