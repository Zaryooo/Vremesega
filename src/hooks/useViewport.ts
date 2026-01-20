import { useState, useEffect } from 'react';

const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileLg, setIsMobileLg] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const mediaQueryLg = window.matchMedia('(max-width: 768px)');
    
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    const handleMediaQueryLgChange = (event: MediaQueryListEvent) => {
      setIsMobileLg(event.matches);
    };

    // Set initial values
    setIsMobile(mediaQuery.matches);
    setIsMobileLg(mediaQueryLg.matches);

    // Add listeners
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    mediaQueryLg.addEventListener('change', handleMediaQueryLgChange);

    // Cleanup listeners on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      mediaQueryLg.removeEventListener('change', handleMediaQueryLgChange);
    };
  }, []);

  return { isMobile, isMobileLg };
  
};

export default useViewport;