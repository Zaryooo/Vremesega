import { ForecastProps } from '@/lib/forecast';
import { forecastDays } from '@/utils/days';
import { getMonthInCyrillic } from '@/utils/translate';
import { getWeatherCondition, getWeatherIconPosition } from '@/utils/weather';

export default function ThreeDaysMax({ forecast }: ForecastProps) {
  // Get forecast for the next 3 days
  const threeDaysMax = forecast ? forecastDays(forecast, 4, 1) : null;

  return (
    <>
      <div className='grid grid-cols-9'>
        {threeDaysMax &&
          threeDaysMax.map((item: any) => {
            return (
              item.date && (
                <div
                  className='forecast-date col-span-3 flex flex-col items-center'
                  key={item.date}
                >
                  <div className='day font-bold'>{item.dayName}</div>
                  <div className='date-mount'>
                    {item.date} {getMonthInCyrillic(item.mounth)}
                  </div>
                  {item.forecast &&
                    item.forecast.map((item: any) => {
                      if (item.dt_txt.includes('12:00:00')) {
                        return (
                          <div
                            key={item.dt}
                            className='flex flex-col items-center'
                          >
                            <div
                              className={`weather-icon mt-3 ${item.weather[0].description.toLowerCase()}`}
                              aria-label={`${item.weather[0].main.toLowerCase()} icon`}
                              style={{
                                backgroundPosition: getWeatherIconPosition(
                                  item.weather[0].description.toLowerCase(),
                                  true
                                ),
                              }}
                            ></div>
                            <div
                              className={`weather mt-3 mb-2 flex items-center text-center text-[14px] leading-[16px] min-h-[34px] ${item.weather[0].description.toLowerCase()}`}
                              aria-label={`${item.weather[0].main.toLowerCase()}`}
                            >
                              <p>{`${getWeatherCondition(
                                item.weather[0].description.toLowerCase(),
                                true
                              )}`}</p>
                            </div>
                          </div>
                        );
                      }
                    })}
                  <div className='flex flex-row'>
                    {item.maxTemp && (
                      <div className='day-max'>
                        <span className='mx-2 font-bold'>
                          {Math.round(item.maxTemp)}°
                        </span>
                      </div>
                    )}
                    <p>/</p>
                    {item.minTemp && (
                      <div className='day-min text-center'>
                        <span className='mx-2 font-bold'>
                          {Math.round(item.minTemp)}°
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            );
          })}
      </div>
    </>
  );
}
