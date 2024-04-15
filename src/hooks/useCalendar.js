import { useState } from 'react';

// import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

function useCalendar() {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateMonthDays = (year, month) => {
    const days = new Array(70).fill('A');
    const totalDaysFirstMonth = getDaysInMonth(year, month);
    let firstDayOfFirstMonth = new Date(year, month, 1).getDay();
    firstDayOfFirstMonth = firstDayOfFirstMonth === 0 ? 7 : firstDayOfFirstMonth;

    for (let i = 0; i < totalDaysFirstMonth; i++) {
      days[firstDayOfFirstMonth + i - 1] = (1 + i).toString();
    }

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const totalDaysSecondMonth = getDaysInMonth(nextYear, nextMonth);
    let firstDayOfSecondMonth = new Date(nextYear, nextMonth, 1).getDay();
    firstDayOfSecondMonth = firstDayOfSecondMonth === 0 ? 7 : firstDayOfSecondMonth;

    const startSecondMonthIndex = 35 + firstDayOfSecondMonth - 1;

    for (let i = 0; i < totalDaysSecondMonth; i++) {
      days[startSecondMonthIndex + i] = (1 + i).toString();
    }

    return days;
  };

  const incrementMonth = (e) => {
    e.preventDefault()
    
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const decrementMonth = (e) => {
    e.preventDefault()
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const monthsOfYear = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const twoMonthDays = generateMonthDays(currentYear, currentMonth);

  const firstMonthDays = twoMonthDays.slice(0, 35);
  const secondMonthDays = twoMonthDays.slice(35);





  // normalize date
  // const timeZone = 'Europe/Moscow';

  // const convertToLocalTime = (date) => {
  //   return utcToZonedTime(date, timeZone);
  // };
  // const convertToMoscowTime = (date) => {
  //   const utcDate = zonedTimeToUtc(date, timeZone);
  //   return utcToZonedTime(utcDate, timeZone);
  // };
  // const isPastDay = (day, monthOffset) => {
  //   const dateToCheck = new Date(currentYear, currentMonth + monthOffset, day);
  //   const moscowDateToCheck = setCheckInTime(convertToMoscowTime(dateToCheck));
  
  //   const currentDate = convertToMoscowTime(new Date());
  //   currentDate.setHours(0, 0, 0, 0); // Сброс времени до начала текущего дня
  
  //   return moscowDateToCheck < currentDate;
  // };
  
  const isPastDay = (day, monthOffset) => {
    const dateToCheck = new Date(currentYear, currentMonth + monthOffset, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Сброс времени до начала текущего дня
    return dateToCheck < currentDate;
  };



  return {
    currentYear,
    currentMonth,
    incrementMonth,
    decrementMonth,
    monthsOfYear,
    firstMonthDays,
    secondMonthDays,
    twoMonthDays,
    isPastDay
  };
}

export default useCalendar;
