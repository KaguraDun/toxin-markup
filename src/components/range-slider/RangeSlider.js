import getFormattedPrice from '@/helpers/get-formatted-price';
import RangeSliderPlugin from '@/libs/range-slider-plugin/RangeSliderPlugin';

import './range-slider.scss';

class RangeSlider {
  constructor(container, options) {
    this.container = container;
    this.options = options || RangeSlider.#defaultOptions;
    this.rangeSlider = null;
    this.priceElement = null;
    this.sliderContainer = null;
  }

  create() {
    this.priceElement = this.container.querySelector('.js-range-slider-price-range');
    this.sliderContainer = this.container.querySelector('.js-range-slider-container');

    this.rangeSlider = new RangeSliderPlugin(this.sliderContainer, this.options);
    this.rangeSlider.init();
    this.rangeSlider.addEvent('update', this.#handleValuesUpdate);
  }

  static #defaultOptions = {
    start: [5000, 10000],
    connect: true,
    step: 500,
    range: {
      min: 0,
      max: 15000,
    },
  };

  #handleValuesUpdate = () => {
    const [from, to] = this.rangeSlider.getValues();

    this.priceElement.innerHTML = `${getFormattedPrice(from)} - ${getFormattedPrice(to)}`;
  };
}

export default RangeSlider;
