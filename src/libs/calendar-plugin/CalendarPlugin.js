import * as $ from 'jquery';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/themes/light.css';

import '@/components/button/button.js';

import './calendar-plugin.scss';

class CalendarPlugin {
  constructor(containers, options) {
    this.containers = containers;
    this.options = options;
    this.instance = null;
    this.inputList = [];
  }

  init() {
    const isContainersExist = this.containers && this.containers.length > 0;
    if (!isContainersExist) return;

    if (this.containers.length === 1) {
      this.#createSingle();
    }

    if (this.containers.length === 2) {
      this.#createDouble();
    }

    this.createInputList();
  }

  getInputList() {
    return this.inputList;
  }

  #createSingle() {
    const { dateFormat } = this.options;
    const [singleInput] = this.containers;

    this.instance = flatpickr(singleInput, {
      ...this.#getCommonOptions(),
      dateFormat,
    });
  }

  #createDouble() {
    const { dateFormat } = this.options;
    const [firstInput, secondInput] = this.containers;

    this.instance = flatpickr(firstInput, {
      ...this.#getCommonOptions(),
      dateFormat,
      // eslint-disable-next-line new-cap
      plugins: [new rangePlugin({ input: secondInput })],
    });

    // Hide external days when changing between two inputs
    firstInput.addEventListener('focus', () => {
      CalendarPlugin.#hideExternalNextMonthDays(this.instance);
    });

    const secondInputButton = secondInput.querySelector('[data-toggle]');
    secondInputButton.addEventListener('click', () => {
      CalendarPlugin.#handleOpenByButtonClick(this.instance);
    });
  }

  createInputList() {
    this.containers.forEach((container) => {
      const input = container.querySelector('.js-input-input');
      this.inputList.push(input);
    });
  }

  getNumberOfSelectedDays() {
    const [firstDate, secondDate] = this.instance.selectedDates;
    const DAY_MS = 1000 * 60 * 60 * 24;

    let selectedDays = Math.abs((firstDate - secondDate) / DAY_MS);

    if (Number.isNaN(selectedDays)) selectedDays = 0;
    return selectedDays;
  }

  static #hideExternalNextMonthDays(instance) {
    const nextDays = Array.from(instance.days.querySelectorAll('.nextMonthDay'));
    const daysInWeek = 7;

    if (nextDays.length >= daysInWeek) {
      nextDays.splice(-daysInWeek).forEach((day) => {
        day.classList.add('flatpickr-day_hidden');
      });
    }
  }

  #changeDefaultDateDelimiter(dateStr, instance) {
    if (this.containers.length !== 1) return;
    const { dateDelimiter } = this.options;

    instance.input.value = dateStr.replace('—', dateDelimiter);
  }

  static #handleOpenByButtonClick(instance) {
    if (instance.isOpen) return;

    instance.open();
  }

  #getCommonOptions() {
    const { isOpen = false, minDate = 'today', defaultDate = null, today = null } = this.options;

    return {
      minDate,
      mode: 'range',
      defaultDate,
      prevArrow: '',
      nextArrow: '',
      inline: isOpen,
      locale: Russian,
      monthSelectorType: 'static',
      wrap: !isOpen,
      static: true,
      onChange: (dateObj, dateStr, instance) => {
        instance.open();
        CalendarPlugin.#hideExternalNextMonthDays(instance);
        this.#changeDefaultDateDelimiter(dateStr, instance);
      },
      onMonthChange(dateObj, dateStr, instance) {
        CalendarPlugin.#hideExternalNextMonthDays(instance);
      },
      onYearChange(dateObj, dateStr, instance) {
        CalendarPlugin.#hideExternalNextMonthDays(instance);
      },
      onOpen(dateObj, dateStr, instance) {
        CalendarPlugin.#hideExternalNextMonthDays(instance);
      },
      onReady: (dateObj, dateStr, instance) => {
        const isTodayValidDate = today && today instanceof Date;
        if (isTodayValidDate) {
          instance.now = today;
          instance.redraw();
        }

        const $buttonContainer = $('<div class="flatpickr__buttons"></div>').appendTo(
          $(instance.calendarContainer),
        );

        $(`<button class="button button_style_borderless" type="button">
             <span class="button__text">очистить</span>
           </button>`)
          .on('click', () => {
            instance.clear();
          })
          .appendTo($buttonContainer);

        $(`<button class="button button_style_borderless" type="button">
            <span class="button__text">применить</span>
           </button>`)
          .on('click', () => {
            instance.close();
          })
          .appendTo($buttonContainer);

        CalendarPlugin.#hideExternalNextMonthDays(instance);
        this.#changeDefaultDateDelimiter(dateStr, instance);
      },
    };
  }
}

export default CalendarPlugin;
