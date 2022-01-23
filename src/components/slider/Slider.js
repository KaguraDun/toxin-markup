import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slider.scss';

class Slider {
  constructor(container, options) {
    this.container = container;
    this.options = options || Slider.#defaultOptions;
  }

  init() {
    Swiper.use([Navigation, Pagination]);
    // eslint-disable-next-line no-new
    new Swiper(this.container, this.options);
  }

  static #defaultOptions = {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
}
export default Slider;
