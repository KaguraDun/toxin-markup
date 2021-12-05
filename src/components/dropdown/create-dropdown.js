import Dropdown from './dropdown';

function createDropdownGuests({ element, expanded = false, controls = true, values = [], label }) {
  const guestsPattern = ['Гость', 'Гостя', 'Гостей'];
  const [adults = 0, children = 0, babies = 0] = values;

  const properties = {
    placeholder: 'Сколько гостей',
    label,
    controlButtons: controls,
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

  if (expanded) {
    dropdown.dropdownItems.hidden = false;
  }
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

  if (expanded) {
    dropdown.dropdownItems.hidden = false;
  }
}

export { createDropdownGuests, createDropdownRoomAmenity };
