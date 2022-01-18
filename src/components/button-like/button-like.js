import ButtonLike from './ButtonLike';
import './button-like.scss';

(() => {
  const likeButtons = document.querySelectorAll('.js-button-like');

  likeButtons.forEach((element) => {
    const buttonLike = new ButtonLike(element);
    buttonLike.addEventListener();
  });
})();
