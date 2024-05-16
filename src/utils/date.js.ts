import {CalendarDayInfo} from "../types/Dates";

export const defaultDueDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
}


export function getDaysOfMonth(dueDate: Date): CalendarDayInfo[] {
  const currentYear = dueDate.getFullYear();
  const currentMonth = dueDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  const days: CalendarDayInfo[] = [];

  // Iterate through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isCurrentMonth = date.getMonth() === currentMonth;
    const isDueDate = isCurrentMonth && date.getDate() === dueDate.getDate();

    days.push({
      date,
      isCurrentMonth,
      isDueDate
    });
  }

  // Add preceding days from the previous month if necessary
  const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
  for (let i = 0; i < startDay; i++) {
    const date = new Date(currentYear, currentMonth, 0 - i);
    days.unshift({
      date,
      isCurrentMonth: false,
      isDueDate: false
    });
  }

  // Add succeeding days from the next month if necessary
  const endDay = new Date(currentYear, currentMonth, daysInMonth).getDay();
  for (let i = 1; i <= 7 - endDay; i++) {
    const date = new Date(currentYear, currentMonth + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      isDueDate: false
    });
  }

  return days;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString();
}