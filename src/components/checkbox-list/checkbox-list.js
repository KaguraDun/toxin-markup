import '@/components/input-checkbox/input-checkbox.js';

import './checkbox-list.scss';

(() => {
  function handleCheckboxListExpand(e) {
    const target = e.target.closest('.js-checkbox-list__button');
    if (!target) return;

    const items = target.parentElement.querySelector('.js-checkbox-list__items');
    const buttonIcon = target.parentElement.querySelector('.js-checkbox-list__icon');

    if (items) {
      const isExpanded = items.classList.toggle('checkbox-list__items_expanded');

      buttonIcon.classList.toggle('checkbox-list__icon_style_expand-less', isExpanded);
      buttonIcon.classList.toggle('checkbox-list__icon_style_expand', !isExpanded);
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
