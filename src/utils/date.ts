export const getDate = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString('en-US', {
      day: 'numeric'
    });
  }

export const getMonth = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString('en-US', {
      month: 'long',
    });
  }

export const getHours = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: false // Use false for 24-hour format
      });
  }

export const getHoursAndMinutes = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Use true for 12-hour format
    });
  };