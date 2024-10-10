export interface LocationData {
    daily: LocationData;
    latitude: number;
    longitude: number;
}

export interface WeatherData {
    length: number;
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weathercode: number[];
    };
}