import './room-impressions.scss';

import Chart from 'chart.js/auto';

function getTotal(chart) {
  const sum = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
  return sum;
}

// https://stackoverflow.com/questions/38724876/how-to-add-text-in-centre-of-the-doughnut-chart-using-chart-js
const centerDoughnutPlugin = {
  id: 'annotateDoughnutCenter',
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;

    ctx.restore();

    ctx.font = `bold ${24}px Montserrat`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#BC9CFF';

    const firstLabel = getTotal(chart);
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

Chart.register(centerDoughnutPlugin);

function createChart({ selector, values }) {
  const chartSelector = `${selector} .room-impressions__chart`;
  const chartContainer = document.querySelector(chartSelector).getContext('2d');

  if (!chartContainer) return;

  const { clientWidth, clientHeight } = chartContainer.canvas;

  const OrangeGradient = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
  OrangeGradient.addColorStop(0, 'rgba(255, 227, 156, 1)');
  OrangeGradient.addColorStop(1, 'rgba(255, 186, 156, 1)');

  const greenGradient = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
  greenGradient.addColorStop(0, 'rgba(111, 207, 151, 1)');
  greenGradient.addColorStop(1, 'rgba(102, 210, 234, 1)');

  const purpleGradient = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
  purpleGradient.addColorStop(0, 'rgba(188, 156, 255, 1)');
  purpleGradient.addColorStop(1, 'rgba(139, 164, 249, 1)');

  const blackGradient = chartContainer.createLinearGradient(0, 0, clientWidth, clientHeight);
  blackGradient.addColorStop(0, 'rgba(144, 144, 144, 1)');
  blackGradient.addColorStop(1, 'rgba(61, 73, 117, 1)');

  /* eslint-disable no-new */
  new Chart(chartContainer, {
    type: 'doughnut',
    data: {
      labels: ['Разочарован', 'Удовлетворительно', 'Хорошо', 'Великолепно'],
      datasets: [
        {
          data: values,
          backgroundColor: [blackGradient, purpleGradient, greenGradient, OrangeGradient],
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
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      cutout: '90%',
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

export default createChart;
