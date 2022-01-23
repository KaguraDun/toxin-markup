import * as $ from 'jquery';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/themes/light.css';

import '@/components/button/button.js';

import './calendar.scss';

class Calendar {
  constructor({
    firstInputSelector,
    secondInputSelector,
    singleInputSelector,
    minDate = 'today',
    isOpen = false,
    mode = 'range',
    defaultDate = null,
    today = null,
    wrap = true,
  }) {
    this.firstInputSelector = firstInputSelector;
    this.secondInputSelector = secondInputSelector;
    this.singleInputSelector = singleInputSelector;
    this.minDate = minDate;
    this.isOpen = isOpen;
    this.mode = mode;
    this.defaultDate = defaultDate;
    this.today = today;
    this.wrap = wrap;
  }

  render() {
    const commonOptions = {
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
      onChange(dateObj, dateStr, instance) {
        instance.open();
        Calendar.hideExternalNextMonthDays(instance);
        Calendar.changeDefaultDateDelimiter(dateStr, instance);
      },
      onMonthChange(dateObj, dateStr, instance) {
        Calendar.hideExternalNextMonthDays(instance);
      },
      onOpen(dateObj, dateStr, instance) {
        Calendar.hideExternalNextMonthDays(instance);
      },
      onReady: (dateObj, dateStr, instance) => {
        const isTodayValidDate = this.today && this.today instanceof Date;
        if (isTodayValidDate) {
          instance.now = this.today;
          instance.redraw();
        }

        Calendar.hideExternalNextMonthDays(instance);
        Calendar.changeDefaultDateDelimiter(dateStr, instance);

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
      },
    };

    if (this.singleInputSelector) {
      flatpickr(this.singleInputSelector, {
        ...commonOptions,
        dateFormat: 'd M',
      });

      const singleInput = document.querySelector(this.singleInputSelector);
      singleInput.readOnly = true;
    } else {
      const flatpickrInstance = flatpickr(this.firstInputSelector, {
        ...commonOptions,
        dateFormat: 'd.m.Y',
        // eslint-disable-next-line new-cap
        plugins: [new rangePlugin({ input: this.secondInputSelector })],
      });
      const firstInput = document.querySelector(this.firstInputSelector);
      const secondInput = document.querySelector(this.secondInputSelector);

      // Hide external days when changing between two inputs
      firstInput.addEventListener('focus', () => {
        Calendar.hideExternalNextMonthDays(flatpickrInstance);
      });

      const secondInputButton = secondInput.querySelector('[data-toggle]');
      secondInputButton.addEventListener('click', () => {
        Calendar.handleOpenByButtonClick(flatpickrInstance);
      });

      firstInput.readOnly = true;
      secondInput.readOnly = true;
    }
  }

  static handleOpenByButtonClick(instance) {
    if (instance.isOpen) return;

    instance.open();
  }

  static hideExternalNextMonthDays(instance) {
    const nextDays = Array.from(instance.days.querySelectorAll('.nextMonthDay'));
    const daysInWeek = 7;

    if (nextDays.length >= daysInWeek) {
      nextDays.splice(-daysInWeek).forEach((day) => {
        day.classList.add('flatpickr-day_hidden');
      });
    }
  }

  static changeDefaultDateDelimiter(dateStr, instance) {
    instance.element.value = dateStr.replace('—', '-');
    instance.redraw();
  }
}

export default Calendar;
