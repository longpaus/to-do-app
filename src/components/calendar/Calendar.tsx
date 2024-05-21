import React, {useEffect, useState} from "react";
import {defaultDueDate, getDaysOfMonth, getMonthName, isSameDay} from "../../utils/date.js";
import {CalendarDayInfo} from "../../types/Dates";
import {useStore} from "../../store";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CalendarProps {
}

export default function Calendar({}: CalendarProps) {
  const store = useStore();
  const [dueDate, setDueDate] = useState<Date>(store.defaultDueDate);
  const [displayedMonth, setDisplayedMonth] = useState<number>(dueDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState<number>(dueDate.getFullYear());
  const [days, setDays] = useState(getDaysOfMonth(displayedYear, displayedMonth));
  const [numRows, setNumRows] = useState(Math.ceil(days.length / 7));
  const daysName = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  useEffect(() => {
    if (displayedMonth > 11) {
      setDisplayedMonth(0);
      setDisplayedYear(displayedYear + 1);
    } else if (displayedMonth < 0) {
      setDisplayedMonth(11);
      setDisplayedYear(displayedYear - 1);
    }
    setDays(getDaysOfMonth(displayedYear, displayedMonth));
    setNumRows(Math.ceil(days.length / 7));
  }, [displayedMonth]);


  const handleClick = (day: CalendarDayInfo) => {
    setDueDate(day.date);
  }
  const handleClickReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    store.upDateDefaultDueDate(defaultDueDate());
    setDueDate(store.defaultDueDate);
    setDisplayedMonth(dueDate.getMonth());
    setDisplayedYear(dueDate.getFullYear());
    setDays(getDaysOfMonth(displayedYear, displayedMonth));
    setNumRows(Math.ceil(days.length / 7));
  }
  const handleClickOkay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    store.upDateDefaultDueDate(dueDate);
  }
  return (
    <div className="flex flex-col w-60  bg-surface p-2">
      <div className="flex justify-between  text-lg">
        <div className="pl-1 text-onSurface">
          {getMonthName(displayedMonth)} {displayedYear}
        </div>
        <div className="pr-1">
          <ArrowBackIosNewIcon
            sx={{
              width: '15px',
              height: '15px',
              '&:hover': {
                color: 'white',
              }
            }}
            onClick={() => setDisplayedMonth(displayedMonth - 1)}
          />
          <ArrowForwardIosIcon
            sx={{
              width: '15px',
              height: '15px',
              '&:hover': {
                color: 'white',
              }
            }}
            onClick={() => setDisplayedMonth(displayedMonth + 1)}
          />
        </div>
      </div>
      <div className={`grid grid-cols-7 grid-rows-${numRows + 1} text-center`}>
        {/* Render day names */}
        {daysName.map((day) => (
          <div key={day}>{day}</div>
        ))}

        {/* Render days */}
        {days.map((day, index) => (
          <div
            key={day.date.getDate().toString() + index}
            className={`rounded-lg text-onSurface hover:bg-gray-800 p-1 ${isSameDay(day.date, dueDate) ? 'bg-gray-800' : ''}`}
            onClick={() => handleClick(day)}
          >
            {day.date.getDate()} {/* Display the day of the month */}
          </div>
        ))}
      </div>
      <div className="self-center">
        <button
          type="submit"
          className="w-20 m-1 text-white bg-gray-500 h-9 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg px-4 py-2 text-sm"
          onClick={e => handleClickReset(e)}
        >
          Reset
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