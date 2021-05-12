import '../styles/index.scss';
import Dropdown from '../components/Dropdown/Dropdown';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js|.scss$/));
importAll(require.context('../pug-mixins/', true, /\.js|.scss$/));

const dropdownGuests = document.querySelector('.dropdown-guests');

if (dropdownGuests) {
  const properties = {
    name: 'Сколько гостей',
    label: 'dropdown',
    options: [
      { name: 'Взрослые', value: 1 },
      { name: 'Дети', value: 2 },
      { name: 'Младенцы', value: 3 },
    ],
  };
  const dropdown = new Dropdown(dropdownGuests, properties);
  dropdown.init();
}
