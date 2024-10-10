import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import useWeather from './src/hooks/useWeather';

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const { location, setLocation, weather, loading, searchWeather, error } = useWeather('Delhi');

  const handleAnimationEnd = () => {
    setSplashVisible(false);
  };

  return (
    <>
      {isSplashVisible ? (
        <SplashScreen onAnimationEnd={handleAnimationEnd} />
      ) : (
        <HomeScreen
          location={location}
          setLocation={setLocation}
          weather={weather}
          loading={loading}
          searchWeather={searchWeather}
          error={error}
        />
      )}
    </>
  );
};

export default App;