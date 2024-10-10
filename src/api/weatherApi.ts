import axios from 'axios';
import { LocationData, WeatherData } from '../types/weatherTypes';

// use this function to fetch the WeatherData
export const getWeatherData = async (latitude: number, longitude: number): Promise<LocationData> => {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
    return response.data;
};

// use this function to get the Long. Lat. on behalf of given location
export const getLocationData = async (location: string): Promise<WeatherData> => {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
    return response.data.results;
};
