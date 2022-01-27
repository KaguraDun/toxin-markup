import * as $ from 'jquery';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/themes/light.css';

import '@/components/button/button.js';

import './calendar.scss';

class Calendar {
  constructor({
    firstInputContainer,
    secondInputContainer,
    singleInputContainer,
    minDate = 'today',
    isOpen = false,
    mode = 'range',
    defaultDate = null,
    today = null,
    wrap = true,
  }) {
    this.firstInputContainer = firstInputContainer;
    this.secondInputContainer = secondInputContainer;
    this.singleInputContainer = singleInputContainer;
    this.minDate = minDate;
    this.isOpen = isOpen;
    this.mode = mode;
    this.defaultDate = defaultDate;
    this.today = today;
    this.wrap = wrap;
    this.instance = null;
    this.inputList = [];
  }

  render() {
    if (this.singleInputContainer) {
      this.#createSingle();

      const singleInput = this.singleInputContainer.querySelector('.js-input-input');
      this.inputList.push(singleInput);
      return;
    }
    if (this.firstInputContainer && this.secondInputContainer) {
      this.#createRange();

      const firstInput = this.firstInputContainer.querySelector('.js-input-input');
      const secondInput = this.secondInputContainer.querySelector('.js-input-input');
      this.inputList = [firstInput, secondInput];
    }
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
    if (!this.singleInputContainer) return;

    instance.input.value = dateStr.replace('—', '-');
  }

  #createSingle() {
    this.instance = flatpickr(this.singleInputContainer, {
      ...this.#getCommonOptions(),
      dateFormat: 'd M',
    });
  }

  #createRange() {
    this.instance = flatpickr(this.firstInputContainer, {
      ...this.#getCommonOptions(),
      dateFormat: 'd.m.Y',
      // eslint-disable-next-line new-cap
      plugins: [new rangePlugin({ input: this.secondInputContainer })],
    });
    // Hide external days when changing between two inputs
    this.firstInputContainer.addEventListener('focus', () => {
      Calendar.hideExternalNextMonthDays(this.instance);
    });

    const secondInputButton = this.secondInputContainer.querySelector('[data-toggle]');
    secondInputButton.addEventListener('click', () => {
      Calendar.#handleOpenByButtonClick(this.instance);
    });
  }

  static #handleOpenByButtonClick(instance) {
    if (instance.isOpen) return;

    instance.open();
  }

  #getCommonOptions() {
    return {
      minDate: this.minDate,
      mode: this.mode,
      defaultDate: this.defaultDate,
      prevArrow: '',
      nextArrow: '',
      inline: this.isOpen,
      locale: Russian,
      monthSelectorType: 'static',
      wrap: this.wrap,
      static: true,
      onChange: (dateObj, dateStr, instance) => {
        instance.open();
        Calendar.#hideExternalNextMonthDays(instance);
        this.#changeDefaultDateDelimiter(dateStr, instance);
      },
      onMonthChange(dateObj, dateStr, instance) {
        Calendar.#hideExternalNextMonthDays(instance);
      },
      onYearChange(dateObj, dateStr, instance) {
        Calendar.#hideExternalNextMonthDays(instance);
      },
      onOpen(dateObj, dateStr, instance) {
        Calendar.#hideExternalNextMonthDays(instance);
      },
      onReady: (dateObj, dateStr, instance) => {
        const isTodayValidDate = this.today && this.today instanceof Date;
        if (isTodayValidDate) {
          instance.now = this.today;
          instance.redraw();
        }

        const $buttonContainer = $('<div class="flatpickr__buttons"></div>').appendTo(
          $(instance.calendarContainer),
        );

        $(`<button class="button button_style_borderless" type="button">
             <span class='button__text'>очистить</span>
           </button>`)
          .on('click', () => {
            instance.clear();
          })
          .appendTo($buttonContainer);

        $(`<button class="button button_style_borderless" type="button">
            <span class='button__text'>применить</span>
           </button>`)
          .on('click', () => {
            instance.close();
          })
          .appendTo($buttonContainer);

        Calendar.#hideExternalNextMonthDays(instance);
        this.#changeDefaultDateDelimiter(dateStr, instance);
      },
    };
  }
}

export default Calendar;
