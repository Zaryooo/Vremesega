import ErrorBoundary from '@/app/error';

const APIkey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || '';

export async function getSearchCity(city: string, code: string = 'BG', limit: number = 5) {
    const countryCode = code ? `,${code}` : ``;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}${countryCode}&limit=${limit}&appid=${APIkey}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return ErrorBoundary;
    }
  }

  export async function getCurrentWeather(lat: number, lon: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return ErrorBoundary;
    }
  }

  export async function getFiveDaysForecast(lat: number, lon: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return ErrorBoundary;
    }
  }