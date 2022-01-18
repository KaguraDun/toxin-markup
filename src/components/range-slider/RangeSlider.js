import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import './range-slider.scss';

class RangeSlider {
  constructor(container, options) {
    this.container = container;
    this.options = options || RangeSlider.defaultOptions;
  }

  create() {
    noUiSlider.create(this.container, this.options);
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
}

export default RangeSlider;
