import React, {useEffect, useMemo, useState} from "react";
import {getDaysOfMonth, getMonthName, isSameDay} from "../../utils/date.js";
import {DueDate} from "../../types/DateTypes";
import {defaultStates} from "../../store";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CalendarProps {
    resetDueDateHandler: () => void;
    changeDueDateHandler: (dueDate: DueDate) => void;
    dueDate: DueDate;
}

const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function Calendar(props: CalendarProps) {
    const [dueDate, setDueDate] = useState<DueDate>(props.dueDate);
    const currTime = new Date();
    const [displayedMonth, setDisplayedMonth] = useState<number>(dueDate ? dueDate.getMonth() : currTime.getMonth());
    const [displayedYear, setDisplayedYear] = useState<number>(dueDate ? dueDate.getFullYear() : currTime.getFullYear());

    const days = useMemo(() => getDaysOfMonth(displayedYear, displayedMonth), [displayedMonth, displayedYear]);
    const numRows = useMemo(() => Math.ceil(Math.ceil(days.length / 7)), [days.length]);


    useEffect(() => {
        if (dueDate) {
            const currMonth = dueDate.getMonth();
            const currYear = dueDate.getFullYear();

            if (currMonth !== displayedMonth) {
                setDisplayedMonth(currMonth);
            }
            if (currYear !== displayedYear) {
                setDisplayedYear(currYear);
            }
        }
    }, [dueDate]);
    const handleDisplayMonthChange = (month: number) => {
        let newMonth = month;
        let newYear = displayedYear;
        if (month > 11) {
            newMonth = 0;
            newYear += 1;
        } else if (month < 0) {
            newMonth = 11;
            newYear -= 1;
        }
        setDisplayedMonth(newMonth);
        setDisplayedYear(newYear);
    }
    const handleClickReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.resetDueDateHandler();
        setDueDate(defaultStates.globalDueDate);
        setDisplayedMonth(dueDate ? dueDate.getMonth() : currTime.getMonth());
        setDisplayedYear(dueDate ? dueDate.getFullYear() : currTime.getFullYear());
    }
    const handleClickOkay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.changeDueDateHandler(dueDate);
    }


    const changeDueDateByAmount = (amount: number) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + amount);
        setDueDate(newDate);
        props.changeDueDateHandler(newDate);
    }
    return (
        <div className="flex flex-col w-60  dark:bg-darkSurface bg-lightSurface p-2 shadow-xl">
            <div className="flex justify-around">
                <div onClick={() => changeDueDateByAmount(0)}>Today</div>
                <div onClick={() => changeDueDateByAmount(1)}>Tomorrow</div>
                <div onClick={() => changeDueDateByAmount(7)}>Next week</div>
                <div onClick={() => changeDueDateByAmount(30)}>next month</div>
            </div>
            <div className="flex justify-between text-lg">
                <div className="pl-1 text-lightOnSurface dark:text-darkOnSurface">
                    {getMonthName(displayedMonth)} {displayedYear}
                </div>
                <div className="pr-1">
                    <ArrowBackIosNewIcon
                        className="hover:text-black dark:hover:text-white text-gray-400"
                        sx={{
                            width: '15px',
                            height: '15px',
                        }}
                        onClick={() => handleDisplayMonthChange(displayedMonth - 1)}
                    />
                    <ArrowForwardIosIcon
                        className="hover:text-black dark:hover:text-white text-gray-400"
                        sx={{
                            width: '15px',
                            height: '15px',
                        }}
                        onClick={() => handleDisplayMonthChange(displayedMonth + 1)}
                    />
                </div>
            </div>
            <div className={`grid grid-cols-7 grid-rows-${numRows + 1} text-center text-gray-400`}>
                {/* Render day names */}
                {DAY_NAMES.map((day) => (
                    <div key={day}>{day}</div>
                ))}

                {/* Render days */}
                {days.map((day, index) => (
                    <div
                        key={day.date.getDate().toString() + index}
                        className={`rounded-lg text-onSurface hover:bg-gray-200 dark:hover:bg-gray-600 p-1 ${(dueDate ? isSameDay(day.date, dueDate) : false) ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                        onClick={() => setDueDate(day.date)}
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