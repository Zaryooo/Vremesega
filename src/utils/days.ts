import { getDate, getMonth } from './date';


export const isDaytime = (currentTime: number, sunrise: number, sunset: number): boolean => {
  return currentTime >= sunrise && currentTime <= sunset;
}

export const getNextDate = (days: number) => {
    
  // Get today's date
const today = new Date();
let mounth = '';
let dayName = '';

// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const daysOfWeek = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + days);
  dayName  = daysOfWeek[nextDay.getDay()];
  mounth = getMonth(Math.floor(nextDay.getTime() / 1000));
  return {
    mounth,
    dayName,
    nextDay: getDate(Math.floor(nextDay.getTime() / 1000))
  };
}

export const forecastDays = (forecast: any, days: number, start: number = 0) => {
  const forecastDays = [];
  for (let i = start; i < days; i++) {
    const nextDate = getNextDate(i).nextDay;
    const mounth = getNextDate(i).mounth;
    const dayName = getNextDate(i).dayName;
    const dayForecast = forecast?.list.filter((item: any) => {
      const day = getDate(item.dt);
      return day === nextDate;
    });

    const maxTemp = dayForecast && dayForecast?.filter((item: any) => item.main.temp_max === Math.max(...dayForecast.map((item: any) => item.main.temp_max)));
    const minTemp = dayForecast && dayForecast?.filter((item: any) => item.main.temp_min === Math.min(...dayForecast.map((item: any) => item.main.temp_min)));

    forecastDays.push({
      date: nextDate,
      mounth,
      dayName,
      maxTemp: maxTemp[0].main.temp_max,
      minTemp: minTemp[0].main.temp_min,
      forecast: dayForecast
    });
  }
  return forecastDays;
}