import Dropdown from './Dropdown.js';

function createDropdownGuests({ element, expanded = false, controls = true, values = [], label }) {
  const guestsPattern = ['Гость', 'Гостя', 'Гостей'];
  const [adults = 0, children = 0, babies = 0] = values;

  const properties = {
    placeholder: 'Сколько гостей',
    label,
    controlButtons: controls,
    isExpanded: expanded,
    options: {
      Взрослые: { count: adults, countAs: guestsPattern },
      Дети: { count: children, countAs: guestsPattern },
      Младенцы: {
        count: babies,
        pattern: ['Младенец', 'Младенца', 'Младенцев'],
      },
    },
  };

  const dropdown = new Dropdown(element, properties);
  dropdown.init();

  return dropdown;
}

function createDropdownRoomAmenity({
  element,
  expanded = false,
  controls = true,
  values = [],
  label,
}) {
  const [bedrooms = 0, beds = 0, bathrooms = 0] = values;

  const properties = {
    placeholder: 'Удобства',
    label,
    controlButtons: controls,
    isExpanded: expanded,
    options: {
      Спальни: { count: bedrooms, pattern: ['Спальня', 'Спальни', 'Спален'] },
      Кровати: { count: beds, pattern: ['Кровать', 'Кровати', 'Кроватей'] },
      'Ванные комнаты': {
        count: bathrooms,
        pattern: ['Ванная комната', 'Ванных комнаты', 'Ванных комнат'],
      },
    },
  };

  const dropdown = new Dropdown(element, properties);
  dropdown.init();

  return dropdown;
}

export { createDropdownGuests, createDropdownRoomAmenity };
