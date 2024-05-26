// interface that is used in Calendar component
export interface CalendarDayInfo {
  date: Date;
  isCurrentMonth: boolean;
}

export type DueDate = Date | undefined