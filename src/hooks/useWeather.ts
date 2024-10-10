import React, { useState, useEffect } from 'react';
import { Keyboard, Animated } from 'react-native';
import { getWeatherData, getLocationData } from '../api/weatherApi';

interface LocationData {
    latitude: number;
    longitude: number;
}

interface WeatherDaily {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
}

interface WeatherData {
    daily: WeatherDaily;
}

const useWeather = (initialLocation: string) => {
    const [location, setLocation] = useState(initialLocation);
    const [weather, setWeather] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fadeAnim = useState(new Animated.Value(0))[0];

    const fetchWeather = async (locationToSearch: string) => {
        try {
            setLoading(true);
            setError('');
            setWeather([]);
            Keyboard.dismiss();

            const locationData: LocationData[] = await getLocationData(locationToSearch);

            if (!locationData || locationData.length === 0) {
                setError('No Weather data, Write your location in the search bar.');
                setLoading(false);
                return;
            }

            const { latitude, longitude } = locationData[0];
            const weatherData: WeatherData = await getWeatherData(latitude, longitude);

            if (weatherData && weatherData.daily) {
                const formattedWeather = weatherData.daily.time.map((time: string, index: number) => ({
                    date: time,
                    maxTemp: weatherData.daily.temperature_2m_max[index],
                    minTemp: weatherData.daily.temperature_2m_min[index],
                    weathercode: weatherData.daily.weathercode[index],
                }));
                setWeather(formattedWeather);
            } else {
                setError('Weather data is not available for the given location.');
            }

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } catch (error) {
            console.error("Error while fetching weather data: ", error);
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(initialLocation);
    }, [initialLocation]);

    return {
        location,
        setLocation,
        weather,
        loading,
        error,
        searchWeather: fetchWeather,
    };
};

export default useWeather;