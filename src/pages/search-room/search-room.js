import RoomFilter from '@/components/room-filter/RoomFilter';
import '@/components/header/header.js';
import '@/components/room-cards-list/room-cards-list.js';
import '@/components/footer/footer.js';
import '@/styles/_common.scss';

import './search-room.scss';

const roomFilter = new RoomFilter({
  calendarOptions: {
    defaultDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
    today: new Date(2019, 7, 8),
    minDate: new Date(2019, 7, 8),
  },
  dropdownGuestsOptions: {
    label: 'гости',
    values: [3, 0, 1],
  },
  dropdownRoomAmenityOptions: {
    label: 'удобства номера',
    values: [2, 2, 1],
    controls: false,
  },
});

roomFilter.init();
