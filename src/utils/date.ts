const locale = process.env.NEXT_PUBLIC_DATE_FORMAT || 'en-US';

export const getDate = (dt: number) => {
  return new Date(dt * 1000).toLocaleDateString(locale, {
    day: 'numeric',
  });
};

export const getMonth = (dt: number) => {
  return new Date(dt * 1000).toLocaleDateString(locale, {
    month: 'long',
  });
};

export const getDayHours = (dt: number) => {
  return new Date(dt * 1000).toLocaleTimeString(locale, {
    hour: 'numeric',
    hour12: false, // Use false for 24-hour format
  });
};

export const getDayUTCHours = (dt: number) => {
  return new Date(dt * 1000).getUTCHours();
};

export const getHoursAndMinutes = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use true for 12-hour format
  });
};
