function toggleExpand(e) {
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
    element.addEventListener('click', toggleExpand);
  });
}

export default addEventToCheckboxLists;
