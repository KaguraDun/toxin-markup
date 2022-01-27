import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import getFormattedPrice from '@/helpers/get-formatted-price';

import './range-slider.scss';

class RangeSlider {
  constructor(container, options) {
    this.container = container;
    this.options = options || RangeSlider.defaultOptions;
    this.instance = null;
    this.priceElement = null;
    this.sliderContainer = null;
  }

  create() {
    this.priceElement = this.container.querySelector('.js-range-slider-price-range');
    this.sliderContainer = this.container.querySelector('.js-range-slider-container');

    this.instance = noUiSlider.create(this.sliderContainer, this.options);
    this.instance.on('update', this.#handleValuesUpdate);
  }

  static defaultOptions = {
    start: [5000, 10000],
    connect: true,
    step: 500,
    range: {
      min: 0,
      max: 15000,
    },
  };

  #handleValuesUpdate = () => {
    const [from, to] = this.instance.get();

    this.priceElement.innerHTML = `${getFormattedPrice(from)} - ${getFormattedPrice(to)}`;
  };
}

export default RangeSlider;
