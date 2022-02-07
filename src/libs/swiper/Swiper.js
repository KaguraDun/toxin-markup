import { Swiper as SliderSwiper, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import swiperOptions from './swiper-options';
import './swiper.scss';

class Swiper {
  constructor(container, options) {
    this.container = container;
    this.options = Swiper.#getPreparedOptions(options);
  }

  init() {
    const { navigation, pagination } = this.options;

    if (navigation) {
      SliderSwiper.use(Navigation);
    }

    if (pagination) {
      SliderSwiper.use(Pagination);
    }

    // eslint-disable-next-line no-new
    new SliderSwiper(this.container, this.options);
  }

  static #getPreparedOptions(options) {
    const { pagination, navigation, loop } = options;

    const preparedOptions = {
      ...(pagination ? swiperOptions.pagination : false),
      ...(navigation ? swiperOptions.navigation : false),
      ...(loop ? swiperOptions.loop : false),
    };

    return preparedOptions;
  }
}

export default Swiper;
