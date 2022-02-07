import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import sliderPluginOptions from './slider-plugin-options';
import './slider-plugin.scss';

class SliderPlugin {
  constructor(container, options) {
    this.container = container;
    this.options = SliderPlugin.#getPreparedOptions(options);
  }

  init() {
    const { navigation, pagination } = this.options;

    if (navigation) {
      Swiper.use(Navigation);
    }

    if (pagination) {
      Swiper.use(Pagination);
    }

    // eslint-disable-next-line no-new
    new Swiper(this.container, this.options);
  }

  static #getPreparedOptions(options) {
    const { pagination, navigation, loop } = options;

    const preparedOptions = {
      ...(pagination ? sliderPluginOptions.pagination : false),
      ...(navigation ? sliderPluginOptions.navigation : false),
      ...(loop ? sliderPluginOptions.loop : false),
    };

    return preparedOptions;
  }
}

export default SliderPlugin;
