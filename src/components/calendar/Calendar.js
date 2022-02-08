import CalendarPlugin from '@/libs/calendar-plugin/CalendarPlugin';

class Calendar {
  constructor({ inputContainers, ...options }) {
    this.inputContainers = inputContainers;
    this.options = options;
    this.calendar = null;
    this.inputList = null;
  }

  render() {
    if (this.inputContainers.length === 1) {
      this.calendar = new CalendarPlugin(this.inputContainers, {
        ...this.options,
        dateFormat: 'd M',
        dateDelimiter: '-',
      });
    }

    if (this.inputContainers.length === 2) {
      this.calendar = new CalendarPlugin(this.inputContainers, {
        ...this.options,
        dateFormat: 'd.m.Y',
      });
    }

    this.calendar.init();
    this.inputList = this.calendar.getInputList();
  }

  getNumberOfSelectedDays() {
    return this.calendar.getNumberOfSelectedDays();
  }
}

export default Calendar;
