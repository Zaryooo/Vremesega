'use client'

import { useEffect, useState, use } from 'react';
import CurrentWeather from '@/components/current';
import { getCurrentWeather, getFiveDaysForecast, getSearchCity } from '@/api/search';
import ThreeDays from '@/components/threedays';
import FiveDaysForecast from '@/components/fivedays';
import useViewport from '@/hooks/useViewport';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>
}

const CityPage = (props: CityPageProps) => {
  const params = use(props.params);
  const [cityName, setCityName] = useState<{ bg: string } | null>(null);
  const [currentForecast, setCurrentForecast] = useState<{ lat: number; lng: number, city: any } | null>(null);
  const [fiveDaysForecast, setFiveDaysForecast] = useState<any>(undefined);
  const { isMobile } = useViewport();

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);


  const fetchCity = async (city: string) => {
      const result = await getSearchCity(city);
      if (result?.length) {
          const {lat, lon} = result[0];
          setCityName({ bg: result[0].local_names.bg });
          fetchFiveDaysForecast(lat, lon);
          fetchCurrentForecast(lat, lon);
      }
  }

  useEffect(() => {  
    if(params.city) {
      fetchCity(params.city);
    } else {
      fetchCity("Sofia");
    }
  }, [params.city]);

  const fetchFiveDaysForecast = async (lat: number, lon: number) => {
    const result = await getFiveDaysForecast(lat, lon);
    if (result) {
      setFiveDaysForecast(result);
    }
  }

  const fetchCurrentForecast = async (lat: number, lon: number) => {
    const result = await getCurrentWeather(lat, lon);
    if (result) {
      setCurrentForecast(result);
    }
  }


  return (
      <div className='container'>
        <div className=' grid grid-cols-12 gap-4'>
          <div className='forecast-wrapper col-span-12'>
            <div className='forecast-body'>
              <div className='grid grid-cols-12 md:gap-4'>
                <div className='wrapper raund current-weather col-span-12 md:col-span-5'>
                  <CurrentWeather forecast={currentForecast} city={cityName || { bg: '' }}/>
                </div>
                <div className='wrapper raund three-days-max col-span-12 md:col-span-7'>
                  <ThreeDays forecast={fiveDaysForecast} />
                </div>
              </div>
            </div>
          </div>
          {/* {!isMobile && <div className='wrapper raund side-wrapper col-span-3'>
            <div className='side'>
              <p>Ads</p>
            </div>
          </div>} */}
        </div>
        <div className='wrapper raund'>
          <FiveDaysForecast forecast={fiveDaysForecast} city={currentForecast}/>
        </div>
    </div>
  );
};

  export default CityPage;