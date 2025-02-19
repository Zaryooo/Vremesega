'use client';	

import { getHours, getHoursAndMinutes } from '@/utils/date';
import { isDaytime } from '@/utils/days';
import { getWeatherCondition, getWeatherIconPosition } from '@/utils/weather';
import React, { useEffect, useState } from 'react';

interface CurrentWeatherProps {
  forecast: any;
  city?: { bg: string };
}

export default function CurrentWeather({forecast, city}: CurrentWeatherProps) {
  
  console.log("CurrentWeather", forecast, city);

  let isDay = forecast && forecast.sys ? isDaytime(Number(getHours(forecast.dt)), Number(getHours(forecast.sys.sunrise)), Number(getHours(forecast.sys.sunset))) : true;
  return (
    <>
            {city && <h2 className='mb-4 font-bold text-[26px]'>{city.bg}</h2>}
            {forecast && (
                <div key={forecast.dt} className='grid grid-cols-2'>
                  <div className='flex flex-col'>
                    <span className='mb-5'><span>Времето в</span> {`${getHoursAndMinutes(Date.now())}`}</span>
                    <span className=''>Температура {Math.round(forecast.main.temp_max)}°</span>
                    <span className=''>Усеща се {Math.round(forecast.main.feels_like)}°</span>
                    <span className=''>Вятър {Math.round(forecast.wind.speed)} m/s</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className={`scale-125 weather-icon ${forecast.weather[0].description.toLowerCase()}`} aria-label={`${forecast.weather[0].main.toLowerCase()} icon`} style={{ backgroundPosition: getWeatherIconPosition(forecast.weather[0].description.toLowerCase(), isDay) }}></div>
                    <div className={`weather flex items-center text-center text-[14px] leading-[16px] min-h-[34px] ${forecast.weather[0].description.toLowerCase()}`} aria-label={`${forecast.weather[0].main.toLowerCase()}`} ><p>{`${getWeatherCondition(forecast.weather[0].description.toLowerCase(), isDay) }`}</p></div>
                  </div>
                </div>
              )
            }
    </>
  );
}

