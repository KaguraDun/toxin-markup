import '@/components/input-checkbox/input-checkbox.js';

import './checkbox-list.scss';

class CheckboxList {
  constructor(container) {
    this.container = container;
    this.element = null;
  }

  addEventListener() {
    this.element = this.container.querySelector('.js-checkbox-list');
    const button = this.container.querySelector('.js-checkbox-list-button');

    if (button) {
      this.element.addEventListener('click', this.handleCheckboxListExpand);
    }
  }

  handleCheckboxListExpand = (e) => {
    const target = e.target.closest('.js-checkbox-list-button');
    if (!target) return;

    const isExpanded = this.element.classList.toggle('checkbox-list_expanded');
    const buttonIcon = this.element.querySelector('.js-checkbox-list-icon');

    if (buttonIcon) {
      buttonIcon.classList.toggle('checkbox-list__icon_style_expand-less', isExpanded);
      buttonIcon.classList.toggle('checkbox-list__icon_style_expand', !isExpanded);
    }
  };
}

export default CheckboxList;
