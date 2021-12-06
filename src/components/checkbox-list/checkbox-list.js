import './checkbox-list.scss';
import '@/components/input-checkbox/input-checkbox.js';

(() => {
  function handleCheckboxListExpand(e) {
    const target = e.target.closest('.checkbox-list__button');
    if (!target) return;

    const items = target.parentElement.querySelector('.checkbox-list__items');
    const buttonIcon = target.parentElement.querySelector('.checkbox-list__icon');

    if (items) {
      items.classList.toggle('checkbox-list__items--expand');
      buttonIcon.classList.toggle('checkbox-list__icon--rotate');
    }
  }

  const checkboxLists = document.querySelectorAll('.checkbox-list');
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
