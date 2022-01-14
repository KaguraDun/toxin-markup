import './button-like.scss';

(() => {
  function toggleLikesNumber(likesNumberElement, isButtonPressed) {
    const likesCount = Number(likesNumberElement.innerText);

    likesNumberElement.innerText = isButtonPressed ? likesCount + 1 : likesCount - 1;
  }

  function handleLikeButtonClick(e) {
    const target = e.target.closest('.js-button-like');

    if (target) {
      const isButtonPressed = target.classList.toggle('button-like_pressed');
      const likesNumberElement = target.querySelector('.js-button-like__likes-number');

      toggleLikesNumber(likesNumberElement, isButtonPressed);
    }
  }
  const likeButtons = document.querySelectorAll('.js-button-like');

  likeButtons.forEach((element) => {
    element.addEventListener('click', handleLikeButtonClick);
  });
})();
