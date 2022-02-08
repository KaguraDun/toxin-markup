import SliderPlugin from '@/libs/slider-plugin/SliderPlugin';

class Slider {
  constructor(container, options) {
    this.container = container;
    this.options = options || Slider.#defaultOptions;
  }

  init() {
    const slider = new SliderPlugin(this.container, this.options);
    slider.init();
  }

  static #defaultOptions = {
    pagination: true,
    navigation: true,
    loop: true,
  };
}
export default Slider;
