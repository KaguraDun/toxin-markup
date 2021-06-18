import '../styles/index.scss';
import 'jquery';
import 'jquery-mask-plugin';

import Litepicker from 'litepicker';
import Dropdown from '../components/Dropdown/Dropdown';

import addEventToLikeButtons from '../pug-mixins/Button-like/Button-like';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js|.scss$/));
importAll(require.context('../pug-mixins/', true, /\.js|.scss$/));

const dropdownGuests = document.querySelector('.dropdown-guests');

if (dropdownGuests) {
  const guestsPattern = ['Гость', 'Гостя', 'Гостей'];

  const properties = {
    placeholder: 'Сколько гостей',
    label: 'dropdown',
    options: {
      Взрослые: { count: 0, countAs: guestsPattern },
      Дети: { count: 0, countAs: guestsPattern },
      Младенцы: {
        count: 0,
        pattern: ['Младенец', 'Младенца', 'Младенцев'],
      },
    },
  };

  const dropdown = new Dropdown(dropdownGuests, properties);
  dropdown.init();
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

// const dropdownRoomAmenity = document.querySelector('.dropdown-room-amenity');

// if (dropdownRoomAmenity) {
//   const properties = {
//     placeholder: 'Удобства',
//     label: 'dropdown',
//     options: {
//       Спальни: { count: 2, pattern: ['Спальня', 'Спальни', 'Спален'] },
//       Кровати: { count: 2, pattern: ['Кровать', 'Кровати', 'Кроватей'] },
//       'Ванные комнаты': {
//         count: 0,
//         pattern: ['Ванная комната', 'Ванных комнаты', 'Ванных комнат'],
//       },
//     },
//   };

//   const dropdown = new Dropdown(dropdownRoomAmenity, properties);
//   dropdown.init();
//   dropdown.dropdownItems.hidden = false;
// }
addEventToLikeButtons();
