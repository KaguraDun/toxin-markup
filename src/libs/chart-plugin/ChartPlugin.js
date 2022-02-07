import Chart from 'chart.js/auto';

class ChartPlugin {
  constructor({ container, options }) {
    this.container = container;
    this.options = options;
  }

  init() {
    Chart.register(ChartPlugin.#centerDoughnutPlugin);

    const { labels, values, valuesBackground } = this.options;

    /* eslint-disable no-new */
    new Chart(this.container, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: valuesBackground,
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

  static #getTotal(chart) {
    const sum = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
    return sum;
  }

  static #centerDoughnutPlugin = {
    id: 'annotateDoughnutCenter',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;

      ctx.restore();

      ctx.font = `bold ${24}px Montserrat`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#BC9CFF';

      const firstLabel = ChartPlugin.#getTotal(chart);
      const textX = Math.round(width / 2);
      const textY = height / 2;
      const firstLabelYOffset = 10;

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
