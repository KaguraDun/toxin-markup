import * as $ from 'jquery';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/themes/light.css';

import '@/components/button/button.js';

import './calendar.scss';

function hideExternalNextMonthDays(instance) {
  const nextDays = Array.from(instance.days.querySelectorAll('.nextMonthDay'));

  const daysInWeek = 7;

  if (nextDays.length >= daysInWeek) {
    nextDays.splice(-daysInWeek).forEach((day) => {
      day.classList.add('flatpickr-day_hidden');
    });
  }
}

function changeDefaultDateDelimiter(dateStr, instance) {
  instance.element.value = dateStr.replace('—', '-');
}

function createCalendar({
  firstInputSelector,
  secondInputSelector,
  singleInputSelector,
  minDate = 'today',
  isOpen = false,
  mode = 'range',
  defaultDate = null,
  today = null,
}) {
  const commonOptions = {
    minDate,
    mode,
    defaultDate,
    prevArrow: '',
    nextArrow: '',
    inline: isOpen,
    locale: Russian,
    monthSelectorType: 'static',
    onChange(dateObj, dateStr, instance) {
      instance.open();
      hideExternalNextMonthDays(instance);
      changeDefaultDateDelimiter(dateStr, instance);
    },
    onMonthChange(dateObj, dateStr, instance) {
      hideExternalNextMonthDays(instance);
    },
    onOpen(dateObj, dateStr, instance) {
      hideExternalNextMonthDays(instance);
    },
    onReady(dateObj, dateStr, instance) {
      if (today) {
        instance.now = today;
        instance.redraw();
      }
      hideExternalNextMonthDays(instance);
      changeDefaultDateDelimiter(dateStr, instance);
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

  if (singleInputSelector) {
    flatpickr(singleInputSelector, {
      ...commonOptions,
      dateFormat: 'd M',
    });

    const singleInput = document.querySelector(singleInputSelector);
    singleInput.readOnly = true;
  } else {
    flatpickr(firstInputSelector, {
      ...commonOptions,
      dateFormat: 'd.m.Y',
      // eslint-disable-next-line new-cap
      plugins: [new rangePlugin({ input: secondInputSelector })],
    });
    const firstInput = document.querySelector(firstInputSelector);
    const secondInput = document.querySelector(secondInputSelector);

    // Hide external days when changing between two inputs
    firstInput.addEventListener('focus', hideExternalNextMonthDays);

    firstInput.readOnly = true;
    secondInput.readOnly = true;
  }
}
export default createCalendar;
