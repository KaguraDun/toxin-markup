import Slider from '@/components/slider/Slider.js';
import '@/components/room-info/room-info.js';
import '@/components/button-rate/button-rate.js';

import './room-card.scss';

(() => {
  const sliders = document.querySelectorAll('.js-slider');

  if (sliders.length > 0) {
    sliders.forEach((sliderContainer) => {
      const slider = new Slider(sliderContainer);
      slider.init();
    });
  }
})();
