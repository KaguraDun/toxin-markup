import Dropdown from './Dropdown';

function createDropdownGuests(element, expanded = false, controls = true) {
  const guestsPattern = ['Гость', 'Гостя', 'Гостей'];

  const properties = {
    placeholder: 'Сколько гостей',
    label: 'dropdown',
    controlButtons: controls,
    options: {
      Взрослые: { count: 0, countAs: guestsPattern },
      Дети: { count: 0, countAs: guestsPattern },
      Младенцы: {
        count: 0,
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

function createDropdownRoomAmenity(element, expanded = false, controls = true) {
  const properties = {
    placeholder: 'Удобства',
    controlButtons: controls,
    options: {
      Спальни: { count: 2, pattern: ['Спальня', 'Спальни', 'Спален'] },
      Кровати: { count: 2, pattern: ['Кровать', 'Кровати', 'Кроватей'] },
      'Ванные комнаты': {
        count: 0,
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
