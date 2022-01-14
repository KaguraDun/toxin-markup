import '@/components/input-checkbox/input-checkbox.js';

import './checkbox-list.scss';

(() => {
  function handleCheckboxListExpand(e) {
    const target = e.target.closest('.js-checkbox-list__button');
    if (!target) return;

    const items = target.parentElement.querySelector('.js-checkbox-list__items');
    const buttonIcon = target.parentElement.querySelector('.js-checkbox-list__icon');

    if (items) {
      items.classList.toggle('checkbox-list__items_expand');
      buttonIcon.classList.toggle('checkbox-list__icon_rotate');
    }
  }

  const checkboxLists = document.querySelectorAll('.js-checkbox-list');
  function addEventToCheckboxLists() {
    checkboxLists.forEach((element) => {
      const isExpandable = element.firstElementChild.tagName === 'BUTTON';

      if (isExpandable) {
        element.addEventListener('click', handleCheckboxListExpand);
      }
    });
  }

  addEventToCheckboxLists();
})();
