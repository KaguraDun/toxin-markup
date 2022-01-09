import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import * as $ from 'jquery';

import '@/components/button/button.js';
import 'flatpickr/dist/themes/light.css';
import './calendar.scss';

function hideExternalNextMonthDays() {
  const elements = document.querySelectorAll('.flatpickr-calendar');

  elements.forEach((element) => {
    const nextDays = Array.from(element.querySelectorAll('.nextMonthDay'));

    const daysInWeek = 7;

    if (nextDays.length >= daysInWeek) {
      nextDays.splice(-daysInWeek).forEach((day) => {
        day.classList.add('flatpickr-day_hidden');
      });
    }
  });
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
      hideExternalNextMonthDays();
      changeDefaultDateDelimiter(dateStr, instance);
    },
    onMonthChange() {
      hideExternalNextMonthDays();
    },
    onOpen() {
      hideExternalNextMonthDays();
    },
    onReady(dateObj, dateStr, instance) {
      hideExternalNextMonthDays();
      changeDefaultDateDelimiter(dateStr, instance);
      if (today) {
        const days = Array.from(instance.daysContainer.querySelectorAll('.flatpickr-day'));
        const todayElement = days.filter(
          (day) => day.classList.length === 1 && day.textContent === String(today),
        )[0];

        todayElement.classList.add('today');
      }

      const $buttonContainer = $(' <div class="flatpickr-buttons"></div>').appendTo(
        $(instance.calendarContainer),
      );

      $(' <button class="button button_borderless" type="button">Очистить</button>')
        .on('click', () => {
          instance.clear();
        })
        .appendTo($buttonContainer);

      $(' <button class="button button_borderless" type="button">Применить</button>')
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

    // Hide external days row when changing between two inputs
    firstInput.addEventListener('focus', hideExternalNextMonthDays);

    firstInput.readOnly = true;
    secondInput.readOnly = true;
  }
}
export default createCalendar;
