'use client';

import { getDayHours, getDayUTCHours } from '@/utils/date';
import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TabContext, TabPanel } from '@mui/lab';
import { forecastDays, getNextDate, isDaytime } from '@/utils/days';
import { ForecastProps } from '@/lib/forecast';
import { getMonthInCyrillic } from '@/utils/translate';
import { getWeatherCondition, getWeatherIconPosition } from '@/utils/weather';
import useViewport from '@/hooks/useViewport';

export default function FiveDaysForecast({ forecast, city }: ForecastProps) {
  const [value, setValue] = React.useState(getNextDate(1).nextDay);
  const { isMobile } = useViewport();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  console.log("isMobile", isMobile);

  // Get forecast for the next 5 days + today
  const fiveDaysForecast = forecast ? forecastDays(forecast, 6) : null;

  const calculateChanceOfRain = (
    clouds: number,
    humidity: number,
    pressure: number
  ) => {
    const chanceOfRain = (0.6 * clouds) + (0.3 * humidity) + (1013 - pressure);

    return Math.min(chanceOfRain, 100);
  };

  const TabLabel = ({ dayName, date }: { dayName: string; date: string }) => {
    return (
      <div className='tab-label'>
        <p className='day-name font-bold mb-1'>{dayName}</p>
        <p className='date text-[12px] capitalize'>{date}</p>
      </div>
    );
  };

  return (
    <>
      <div className='forecast-five-days'>
        <div className='forecast-header text-center mt-2 mb-6'>
          <h2>5 дневна прогноза</h2>
        </div>
        <div className='forecast-body'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='Days'
                className='w-full grid grid-cols-6'
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons
                allowScrollButtonsMobile
              >
                {fiveDaysForecast &&
                  fiveDaysForecast.map((item: any) => {
                    const date = `${item.date} ${getMonthInCyrillic(
                      item.mounth
                    )}`;
                    const day = `${item.dayName}`;
                    return (
                      item.date && (
                        <Tab
                          key={item.date}
                          label={<TabLabel dayName={day} date={date} />}
                          value={item.date}
                        />
                      )
                    );
                  })}
              </Tabs>
            </Box>
            {fiveDaysForecast &&
              fiveDaysForecast.map((item: any) => {
                const date = `${item.date} ${getMonthInCyrillic(item.mounth)}`;
                return (
                  item.date && (
                    <TabPanel key={item.date} value={item.date}>
                      <div className='date-hours pt-2' key={item.date}>
                        <div className='hours grid grid-cols-10'>
                          <div className='legend col-span-2'>
                            <div className='date mt-1 pb-3 font-bold'>
                              {date}
                            </div>
                            <p className='mt-4 mb-10'>Времето</p>
                            <p className='mb-7'>Прогноза</p>
                            <p className='mb-7'>Температура</p>
                            <p className='mt-8'>Вятър</p>
                            <p className='mt-6'>Вероятност за валежи</p>
                            <p className='mt-6'>
                              {item.snow ? `Количество сняг` : `Количество валежи`}
                            </p>
                            <p className='mt-6'>Облачност</p>
                            <p className='mt-6'>Влажност</p>
                            <p className='mt-6'>Атмосфетно налягане</p>
                          </div>
                          {item.forecast &&
                            item.forecast.map((item: any) => {
                              const isDay =
                                city && city.sys
                                  ? isDaytime(
                                      Number(getDayHours(item.dt)),
                                      Number(getDayHours(city.sys.sunrise)),
                                      Number(getDayHours(city.sys.sunset))
                                    )
                                  : true;
                              const rain3h =
                                item.rain && item.rain['3h']
                                  ? item.rain['3h']
                                  : 0;
                              const rain1h =
                                item.rain && item.rain['1h']
                                  ? item.rain['1h']
                                  : 0;
                              const snow3h =
                                item.snow && item.snow['3h']
                                  ? item.snow['3h']
                                  : 0;
                              const snow1h =
                                item.snow && item.snow['1h']
                                  ? item.snow['1h']
                                  : 0;
                              return (
                                <div
                                  key={item.dt}
                                  className='hour flex flex-col items-center'
                                >
                                  <div className='single-hour pt-1'>
                                    <p>{`${getDayUTCHours(item.dt)}:00`}</p>
                                  </div>
                                  <div
                                    className={`weather-icon mt-3 ${item.weather[0].description.toLowerCase()}`}
                                    aria-label={`${item.weather[0].main.toLowerCase()} icon`}
                                    style={{
                                      backgroundPosition:
                                        getWeatherIconPosition(
                                          item.weather[0].description.toLowerCase(),
                                          isDay
                                        ),
                                    }}
                                  ></div>
                                  <div
                                    className={`weather mt-3 mb-6 flex items-center text-center text-[14px] leading-[16px] min-h-[34px] ${item.weather[0].description.toLowerCase()}`}
                                    aria-label={`${item.weather[0].main.toLowerCase()}`}
                                  >
                                    <p>{`${getWeatherCondition(
                                      item.weather[0].description.toLowerCase(),
                                      isDay
                                    )}`}</p>
                                  </div>
                                  <div className='temp mb-8'>
                                    <span className='font-bold'>
                                      {Math.round(item.main.temp)}°
                                    </span>
                                  </div>
                                  <div className='wind mb-6'>
                                    <span className=''>
                                      {Math.round(item.wind.speed)} m/s
                                    </span>
                                  </div>
                                  <div className='rain-chance mb-6'>
                                    <span className=''>
                                      {Math.round(
                                        calculateChanceOfRain(
                                          item.clouds.all,
                                          item.main.humidity,
                                          item.main.pressure
                                        )
                                      )}{' '}
                                      %
                                    </span>
                                  </div>
                                  <div className='rain mb-6'>
                                    <span className=''>
                                      {(item.rain && rain3h) ||
                                        rain1h ||
                                        (item.snow && snow3h) ||
                                        snow1h}{' '}
                                      mm
                                    </span>
                                  </div>
                                  <div className='clouds mb-6'>
                                    <span className=''>
                                      {item.clouds.all} %
                                    </span>
                                  </div>
                                  <div className='humidity mb-6'>
                                    <span className=''>
                                      {item.main.humidity} %
                                    </span>
                                  </div>
                                  <div className='pressure mb-6'>
                                    <span className=''>
                                      {item.main.pressure} hPa
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </TabPanel>
                  )
                );
              })}
          </TabContext>
        </div>
      </div>
    </>
  );
}
