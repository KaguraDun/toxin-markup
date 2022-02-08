import ChartPlugin from '@/libs/chart-plugin/ChartPlugin';

import './chart.scss';

class Chart {
  constructor({ container, options }) {
    this.container = container;
    this.options = options;
  }

  render() {
    const chartContainer = this.container.querySelector('.js-chart-canvas').getContext('2d');

    if (!chartContainer) return;

    const gradients = Chart.getGradients(chartContainer);
    const { labels, values, valuesColors } = this.options;

    const valuesBackground = valuesColors
      .filter((color) => color in gradients)
      .map((color) => gradients[color]);

    const chart = new ChartPlugin({
      container: chartContainer,
      options: {
        labels,
        values,
        valuesBackground,
      },
    });

    chart.init();
  }

  static getGradients(chartContainer) {
    const { clientWidth, clientHeight } = chartContainer.canvas;

    const orange = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
    orange.addColorStop(0, 'rgba(255, 227, 156, 1)');
    orange.addColorStop(1, 'rgba(255, 186, 156, 1)');

    const green = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
    green.addColorStop(0, 'rgba(111, 207, 151, 1)');
    green.addColorStop(1, 'rgba(102, 210, 234, 1)');

    const purple = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
    purple.addColorStop(0, 'rgba(188, 156, 255, 1)');
    purple.addColorStop(1, 'rgba(139, 164, 249, 1)');

    const black = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
    black.addColorStop(0, 'rgba(144, 144, 144, 1)');
    black.addColorStop(1, 'rgba(61, 73, 117, 1)');

    return {
      orange,
      green,
      purple,
      black,
    };
  }
}

export default Chart;
