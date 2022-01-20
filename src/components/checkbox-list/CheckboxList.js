import '@/components/input-checkbox/input-checkbox.js';

import './checkbox-list.scss';

class CheckboxList {
  constructor(container) {
    this.container = container;
    this.element = null;
  }

  addEventListener() {
    this.element = this.container.querySelector('.js-checkbox-list');
    const isExpandable = this.element.firstElementChild.tagName === 'BUTTON';

    if (isExpandable) {
      this.element.addEventListener('click', this.handleCheckboxListExpand);
    }
  }

  handleCheckboxListExpand = (e) => {
    const target = e.target.closest('.js-checkbox-list-button');
    if (!target) return;

    const items = this.element.querySelector('.js-checkbox-list-items');
    const buttonIcon = this.element.querySelector('.js-checkbox-list-icon');

    if (items) {
      const isExpanded = items.classList.toggle('checkbox-list__items_expanded');

      buttonIcon.classList.toggle('checkbox-list__icon_style_expand-less', isExpanded);
      buttonIcon.classList.toggle('checkbox-list__icon_style_expand', !isExpanded);
    }
  };
}

export default CheckboxList;
