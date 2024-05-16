import React, {useState} from "react";
import {getDaysOfMonth, isSameDay} from "../../utils/date.js";
import {CalendarDayInfo} from "../../types/Dates";
import {useStore} from "../../store";

interface CalendarProps {
}

export default function Calendar({}: CalendarProps) {
  const store = useStore();
  const days: CalendarDayInfo[] = getDaysOfMonth(store.defaultDueDate);
  const numRows = Math.floor(days.length / 7);
  const daysName = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const [dueDate, setDueDate] = useState<Date>(store.defaultDueDate);
  const handleClick = (day: CalendarDayInfo) => {
    setDueDate(day.date);
  }
  const handleClickClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setDueDate(store.defaultDueDate);
  }
  const handleClickOkay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    store.upDateDefaultDueDate(dueDate);
  }
  return (
    <div className="flex flex-col justify-center items-center w-60 text-onSurface bg-surface">
      <div className={`grid grid-cols-7 grid-rows-${numRows + 1} text-center`}>
        {/* Render day names */}
        {daysName.map((day) => (
          <div key={day}>{day}</div>
        ))}

        {/* Render days */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`rounded-lg hover:bg-gray-800 p-1 ${isSameDay(day.date, dueDate) ? 'bg-gray-800' : ''}`}
            onClick={() => handleClick(day)}
          >
            {day.date.getDate()} {/* Display the day of the month */}
          </div>
        ))}
      </div>
      <div>
        <button
          type="submit"
          className="w-20 m-1 text-white bg-gray-500 h-9 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg px-4 py-2 text-sm"
          onClick={e => handleClickClear(e)}
        >
          Clear
        </button>
        <button
          type="submit"
          className="w-20 m-1 text-onPrimary bg-primary h-9 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 focus:border-purple-500 font-medium rounded-lg px-4 py-2 text-sm"
          onClick={e => handleClickOkay(e)}
        >
          Ok
        </button>
      </div>

    </div>
  );
}