'use client';

import { getDayHours } from '@/utils/date';
import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TabContext, TabPanel } from '@mui/lab';
import { forecastDays, getNextDate } from '@/utils/days';
import { ForecastProps } from '@/lib/forecast';
import { getMonthInCyrillic } from '@/utils/translate';
import { getWeatherCondition, getWeatherIconPosition } from '@/utils/weather';
import useViewport from '@/hooks/useViewport';
import 'swiper/css';
import 'swiper/css/pagination';

type Rain = {
  '1h': number;
  '3h': number;
};

type Snow = {
  '1h': number;
  '3h': number;
};

export default function FiveDaysForecast({ forecast, city }: ForecastProps) {
  const [value, setValue] = React.useState(getNextDate(1).nextDay);
  const { isMobile } = useViewport();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Get forecast for the next 5 days + today
  const fiveDaysForecast = forecast ? forecastDays(forecast, 6) : null;

  const calculateChanceOfRain = (pop: number) => {
    return Math.min(pop * 100, 100);
  };

  const isRaining = (rain?: Rain, snow?: Snow) => {
    const rain3h = rain && rain['3h'] ? rain['3h'] : 0;
    const rain1h = rain && rain['1h'] ? rain['1h'] : 0;
    const snow3h = snow && snow['3h'] ? snow['3h'] : 0;
    const snow1h = snow && snow['1h'] ? snow['1h'] : 0;
    return {
      rain1h,
      rain3h,
      snow1h,
      snow3h,
    };
  };

  const isDay = (partOfDay: string) => {
    return partOfDay === 'd' ? true : false;
  };

  const TabLabel = ({ dayName, date }: { dayName: string; date: string }) => {
    return (
      <div className='tab-label'>
        <p className='day-name font-bold mb-1'>{dayName}</p>
        <p className='date text-[12px] capitalize'>{date}</p>
      </div>
    );
  };

  console.log('isMobile', isMobile);

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
                className='w-full grid grid-cols-6 justify-center'
                variant={isMobile ? 'scrollable' : 'fullWidth'}
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
                          {!isMobile && <div className='legend col-span-2'>
                            <div className='grid grid-flow-row grid-rows-[minmax(30px,1fr)_60px_50px_50px_50px_50px_50px_50px] gap-1'>
                              <div className='date font-bold'>{date}</div>
                              <p className='row-span-2 flex items-center'>
                                Прогноза
                              </p>
                              <p className=''>Температура</p>
                              <p className=''>Вятър</p>
                              <p className=''>Вероятност за валежи</p>
                              <p className=''>
                                {item.snow
                                  ? `Количество сняг`
                                  : `Количество валежи`}
                              </p>
                              <p className=''>Облачност</p>
                              <p className=''>Влажност</p>
                            </div>
                          </div>}
                          <div className='col-span-10 lg:col-span-8'>
                            <div className='grid grid-row-8 lg:grid-cols-8'>
                              {item.forecast &&
                                item.forecast.map((item: any) => {
                                  return (
                                    <div
                                      key={item.dt}
                                      className='hour grid grid-cols-[repeat(4,minmax(0,1fr))] lg:grid-cols-none lg:grid-rows-[minmax(30px,1fr)_60px_50px_50px_50px_50px_50px_50px] gap-1 text-center justify-center'
                                    >
                                      <div className='single-hour items-center flex justify-start lg:justify-center'>
                                        <p>{`${getDayHours(item.dt)}:00`}</p>
                                      </div>
                                      <div className='my-auto flex items-center'>
                                        <div
                                          className={`weather-icon mx-auto ${item.weather[0].description.toLowerCase()}`}
                                          aria-label={`${item.weather[0].main.toLowerCase()} icon`}
                                          style={{
                                            backgroundPosition:
                                              getWeatherIconPosition(
                                                item.weather[0].description.toLowerCase(),
                                                isDay(item.sys.pod)
                                              ),
                                          }}
                                        ></div>
                                      </div>
                                      <div
                                        className={`weather flex items-center text-center justify-center text-[14px] text-wrap ${item.weather[0].description.toLowerCase()}`}
                                        aria-label={`${item.weather[0].main.toLowerCase()}`}
                                      >
                                        <p>{`${getWeatherCondition(
                                          item.weather[0].description.toLowerCase(),
                                          isDay(item.sys.pod)
                                        )}`}</p>
                                      </div>
                                      <div className='temp font-bold items-center flex justify-center'>
                                        {Math.round(item.main.temp)}°
                                      </div>
                                      {!isMobile && <><div className='wind'>
                                        {Math.round(item.wind.speed)} m/s
                                      </div>
                                      <div className='rain-chance'>
                                        {Math.round(
                                          calculateChanceOfRain(item.pop)
                                        )}{' '}
                                        %
                                      </div>
                                      <div className='rain'>
                                        {`${
                                          (item.rain &&
                                            isRaining(item.rain).rain3h) ||
                                          isRaining(item.rain).rain1h ||
                                          (item.snow &&
                                            isRaining(item.snow).snow3h) ||
                                          isRaining(item.snow).snow1h
                                        } mm`}
                                      </div>
                                      <div className='clouds'>
                                        {item.clouds.all} %
                                      </div>
                                      <div className='humidity'>
                                        {item.main.humidity} %
                                      </div></>}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
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
