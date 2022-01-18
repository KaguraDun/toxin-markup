import LinkDropdown from './LinkDropdown';
import './link.scss';

(() => {
  const dropdownElements = document.querySelectorAll('.js-link__dropdown');

  if (dropdownElements.length > 0) {
    dropdownElements.forEach((element) => {
      const linkDropdown = new LinkDropdown(element);
      linkDropdown.init();
    });
  }
})();
