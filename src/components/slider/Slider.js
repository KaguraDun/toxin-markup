import Swiper from '@/libs/swiper/Swiper.js';

class Slider {
  constructor(container, options) {
    this.container = container;
    this.options = options || Slider.#defaultOptions;
  }

  init() {
    const swiper = new Swiper(this.container, this.options);
    swiper.init();
  }

  static #defaultOptions = {
    pagination: true,
    navigation: true,
    loop: true,
  };
}
export default Slider;
