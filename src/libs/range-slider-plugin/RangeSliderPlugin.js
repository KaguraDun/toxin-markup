import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import './range-slider-plugin.scss';

class RangeSliderPlugin {
  constructor(container, options) {
    this.instance = null;
    this.container = container;
    this.options = options;
  }

  init() {
    this.instance = noUiSlider.create(this.container, this.options);
  }

  getValues() {
    return this.instance.get();
  }

  addEvent(event, callback) {
    this.instance.on(event, callback);
  }
}

export default RangeSliderPlugin;
