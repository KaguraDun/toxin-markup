import Chart from 'chart.js/auto';

import './chart-plugin.scss';

class ChartPlugin {
  constructor({ container, values }) {
    this.container = container;
    this.values = values;
  }

  render() {
    const chartContainer = this.container
      .querySelector('.js-chart-plugin__canvas')
      .getContext('2d');

    if (!chartContainer) return;
    const gradients = ChartPlugin.getGradients(chartContainer);

    Chart.register(ChartPlugin.centerDoughnutPlugin);

    /* eslint-disable no-new */
    new Chart(chartContainer, {
      type: 'doughnut',
      data: {
        labels: ['Разочарован', 'Удов.', 'Хорошо', 'Великолепно'],
        datasets: [
          {
            data: this.values,
            backgroundColor: [gradients.black, gradients.purple, gradients.green, gradients.orange],
            spacing: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: '90%',
        responsive: true,
        maintainAspectRatio: false,
      },
    });
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

  static getTotal(chart) {
    const sum = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
    return sum;
  }

  static centerDoughnutPlugin = {
    id: 'annotateDoughnutCenter',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;

      ctx.restore();

      ctx.font = `bold ${24}px Montserrat`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#BC9CFF';

      const firstLabel = ChartPlugin.getTotal(chart);
      const textX = Math.round(width / 2);
      const textY = height / 2;
      const firstLabelYOffset = 15;

      ctx.fillText(firstLabel, textX, textY - firstLabelYOffset);
      ctx.font = `bold ${12}px Montserrat`;

      const secondLabel = 'ГОЛОСОВ';
      const secondLabelYOffset = 10;

      ctx.fillText(secondLabel, textX, textY + secondLabelYOffset);

      ctx.save();
    },
  };
}

export default ChartPlugin;
