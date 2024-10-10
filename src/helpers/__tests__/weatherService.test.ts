import axios from 'axios';
import { getWeatherData, getLocationData } from "../../api/weatherApi";
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {

    it('should fetch weather data successfully', async () => {
        const mockWeatherData = {
            daily: {
                temperature_2m_max: [20],
                temperature_2m_min: [10],
                weathercode: [0]
            }
        };

        mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

        const result = await getWeatherData(40.7128, -74.0060);
        expect(result).toEqual(mockWeatherData);
    });

    it('should handle error when fetching weather data fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch weather data'));

        try {
            await getWeatherData(40.7128, -74.0060);
        } catch (error: unknown) {
            if (error instanceof Error) {
                expect(error.message).toBe('Failed to fetch weather data');
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    });

    it('should fetch location data successfully', async () => {
        const mockLocationData = [
            {
                name: 'New York',
                latitude: 40.7128,
                longitude: -74.0060,
            }
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: { results: mockLocationData } });

        const result = await getLocationData('New York');
        expect(result).toEqual(mockLocationData);
    });

    it('should handle error when fetching location data fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch location data'));

        try {
            await getLocationData('New York');
        } catch (error: unknown) {
            if (error instanceof Error) {
                expect(error.message).toBe('Failed to fetch location data');
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    });

});