import React, {useEffect, useState} from "react";
import {getDaysOfMonth, getMonthName, isSameDay} from "../../utils/date.js";
import {CalendarDayInfo, DueDate} from "../../types/DateTypes";
import {defaultStates} from "../../store";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CalendarProps {
  onResetHandler: () => void;
  onOkayHandler: (dueDate: DueDate) => void;
  dueDate: DueDate;
}

export default function Calendar(props: CalendarProps) {
  const [dueDate, setDueDate] = useState<DueDate>(props.dueDate);
  const currTime = new Date();
  const [displayedMonth, setDisplayedMonth] = useState<number>(dueDate ? dueDate.getMonth() : currTime.getMonth());
  const [displayedYear, setDisplayedYear] = useState<number>(dueDate ? dueDate.getFullYear() : currTime.getFullYear());
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
    props.onResetHandler();
    setDueDate(defaultStates.globalDueDate);
    setDisplayedMonth(dueDate ? dueDate.getMonth() : currTime.getMonth());
    setDisplayedYear(dueDate ? dueDate.getFullYear() : currTime.getFullYear());
    setDays(getDaysOfMonth(displayedYear, displayedMonth));
    setNumRows(Math.ceil(days.length / 7));
  }
  const handleClickOkay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.onOkayHandler(dueDate);
  }
  return (
    <div className="flex flex-col w-60  bg-surface p-2 ">
      <div className="flex justify-between  text-lg">
        <div className="pl-1 text-onSurface">
          {getMonthName(displayedMonth)} {displayedYear}
        </div>
        <div className="pr-1">
          <ArrowBackIosNewIcon
            className="hover:text-black black:hover:text-white text-gray-400"

            sx={{
              width: '15px',
              height: '15px',
            }}
            onClick={() => setDisplayedMonth(displayedMonth - 1)}
          />
          <ArrowForwardIosIcon
            className="hover:text-black dark:hover:text-white text-gray-400"
            sx={{
              width: '15px',
              height: '15px',
            }}
            onClick={() => setDisplayedMonth(displayedMonth + 1)}
          />
        </div>
      </div>
      <div className={`grid grid-cols-7 grid-rows-${numRows + 1} text-center text-gray-400`}>
        {/* Render day names */}
        {daysName.map((day) => (
          <div key={day}>{day}</div>
        ))}

        {/* Render days */}
        {days.map((day, index) => (
          <div
            key={day.date.getDate().toString() + index}
            className={`rounded-lg text-onSurface hover:bg-gray-800 p-1 ${(dueDate ? isSameDay(day.date, dueDate) : false) ? 'bg-gray-800' : ''}`}
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