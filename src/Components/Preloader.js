import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className={`preloader ${isLoading ? 'loading' : 'loaded'}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;