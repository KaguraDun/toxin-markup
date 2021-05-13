import '../styles/index.scss';
import Dropdown from '../components/Dropdown/Dropdown';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js|.scss$/));
importAll(require.context('../pug-mixins/', true, /\.js|.scss$/));

const dropdownGuests = document.querySelector('.dropdown-guests');

if (dropdownGuests) {
  const guestsPattern = ['Гость', 'Гостя', 'Гостей'];

  const properties = {
    name: 'Сколько гостей',
    label: 'dropdown',
    options: {
      Взрослые: { count: 1, countAs: guestsPattern },
      Дети: { count: 2, countAs: guestsPattern },
      Младенцы: {
        count: 3,
        pattern: ['Младенец', 'Младенца', 'Младенцев'],
      },
    },
  };

  const dropdown = new Dropdown(dropdownGuests, properties);
  dropdown.init();
}
