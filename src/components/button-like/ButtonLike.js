class ButtonLike {
  constructor(element) {
    this.element = element;
    this.likesNumberElement = null;
    this.likesNumber = 0;
  }

  addEventListener() {
    this.likesNumberElement = this.element.querySelector('.js-button-like-likes-number');
    this.likesNumber = Number(this.likesNumberElement.innerText);

    this.element.addEventListener('click', this.handleLikeButtonClick);
  }

  handleLikeButtonClick = (e) => {
    const target = e.target.closest('.js-button-like');

    if (target) {
      const isButtonPressed = target.classList.toggle('button-like_pressed');
      this.toggleLikesNumber(isButtonPressed);
    }
  };

  toggleLikesNumber(isButtonPressed) {
    this.likesNumber = isButtonPressed ? this.likesNumber + 1 : this.likesNumber - 1;

    if (this.likesNumber < 0) this.likesNumber = 0;

    this.likesNumberElement.innerText = this.likesNumber;
  }
}

export default ButtonLike;
