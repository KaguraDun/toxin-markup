import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import './range-slider.scss';

function createRangeSlider(sliderName) {
  const sliderContainer = document.querySelector(`.${sliderName}`);

  if (!sliderContainer) return;

  noUiSlider.create(sliderContainer, {
    start: [5000, 10000],
    connect: true,
    step: 500,
    range: {
      min: 0,
      max: 15000,
    },
  });
}

export default createRangeSlider;
