import { useState } from 'react';

function useCalendar() {
  const currentDate = new Date()
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());


  const incrementMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };
  const decrementMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };


  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  const generateMonthDays = (year, month) => {
    const totalDays = getDaysInMonth(year, month);
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
    const monthDays = new Array(35).fill('');
    for (let i = 0; i < totalDays; i++) {
      monthDays[firstDayOfMonth + i - 1] = (1 + i).toString();
    }
    return monthDays;
  };

  const currentMonthDays = generateMonthDays(currentYear, currentMonth);
  const nextMonthDays = generateMonthDays(currentYear, currentMonth + 1);

  return { currentYear, currentMonth, currentMonthDays, nextMonthDays, setCurrentMonth, setCurrentYear, incrementMonth, decrementMonth };
}

export default useCalendar;
