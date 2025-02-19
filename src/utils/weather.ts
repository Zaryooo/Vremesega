
export const getWeatherIconPosition = (weatherCondition: string, isDay: boolean) => {
    switch (weatherCondition) {
        case 'clear sky':
            return isDay ? '-13px -13px' : '-298px -132px';
        case 'few clouds':
            return isDay ? '-297px -11px' : '-156px -126px';
        case 'scattered clouds':
            return isDay ? '-226px -11px' : '-156px -126px';
        case 'broken clouds':
        case 'overcast clouds':
            return '-155px -11px';
        case 'shower rain':
            return '-200px 0';
        case 'light rain':
        case 'moderate rain':
            return '-155px -68px';
        case 'thunderstorm':
            return '-300px 0';
        case 'snow':
            return '-227px -192px';
        case 'light snow':
            return '-155px -68px';
        case 'mist':
            return '-300px 0';
        default:
            return ''; // Default to no icon if condition is unknown
    }
  }
  
  export const getWeatherCondition = (weatherCondition: string, isDay: boolean) => {
    switch (weatherCondition) {
      case 'clear sky':
          return isDay ? 'Слънчево' : 'Ясно';
      case 'few clouds':
        return 'Разскъсани облаци';
      case 'scattered clouds':
          return 'Предимно облачно';
      case 'broken clouds':
      case 'overcast clouds':
          return 'Облачно';
      case 'shower rain':
          return 'Кратък дъжд';
      case 'light rain':
          return 'Лек дъжд';
      case 'moderate rain':
          return 'Умерен дъжд';
      case 'rain':
          return 'Силен дъжд';
      case 'thunderstorm':
          return 'Буря';
      case 'light snow':
        return 'Слаб снеговалеж';
      case 'snow':
        return 'Умерен снеговалеж';
      case 'heavy snow':
          return 'Силен снеговалеж';
      case 'mist':
          return 'Мъгла';
      default:
          return 'Слънчево'; // Default to sunny if condition is unknown
  }
  }