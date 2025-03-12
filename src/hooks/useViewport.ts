import { useState, useEffect } from 'react';

const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return { isMobile };
};

export default useViewport;