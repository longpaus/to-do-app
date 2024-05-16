import {CalendarDayInfo} from "../types/Dates";

export const defaultDueDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
}


export function getDaysOfMonth(year: number, month: number): CalendarDayInfo[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1);

  const days: CalendarDayInfo[] = [];

  // Iterate through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isCurrentMonth = date.getMonth() === month;

    days.push({
      date,
      isCurrentMonth,
    });
  }

  // Add preceding days from the previous month if necessary
  const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
  for (let i = 0; i < startDay; i++) {
    const date = new Date(year, month, 0 - i);
    days.unshift({
      date,
      isCurrentMonth: false,
    });
  }

  // Add succeeding days from the next month if necessary
  const endDay = new Date(year, month, daysInMonth).getDay();
  for (let i = 1; i <= 7 - endDay; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
    });
  }

  return days;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

export function getMonthName(month: number): string {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "";
  }
}