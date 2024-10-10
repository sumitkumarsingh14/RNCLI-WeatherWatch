import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WeatherCard from '../../components/WeatherCard';
import { Animated } from 'react-native';


jest.mock('../getWeatherImage', () => jest.fn((weatherCode, isDay) => {
    switch (weatherCode) {
        case 100:
            return { image: 'https://openweathermap.org/img/wn/01d@2x.png', description: 'Sunny weather with a clear sky' };
        case 200:
            return { image: 'https://openweathermap.org/img/wn/02d@2x.png', description: 'Partly Cloudy' };
        case 300:
            return { image: 'https://openweathermap.org/img/wn/03d@2x.png', description: 'Cloudy' };
        default:
            return { image: 'https://openweathermap.org/img/wn/01d@2x.png', description: 'Clear' };
    }
}));

describe('WeatherCard', () => {
    const defaultDayData = {
        date: '2024-10-10',
        maxTemp: 30,
        minTemp: 20,
        weathercode: 100,
    };

    const defaultAnimationValue = new Animated.Value(1);

    it('renders correctly with given props', () => {
        const { getByText, getByTestId } = render(
            <WeatherCard dayData={defaultDayData} animationValue={defaultAnimationValue} />
        );

        // check day and date rendering
        expect(getByText('Thursday')).toBeTruthy();
        expect(getByText('Oct 10')).toBeTruthy();

        // check temperature rendering
        expect(getByText('Max: 30°C')).toBeTruthy();
        expect(getByText('Min: 20°C')).toBeTruthy();

        // check image source URI
        const weatherImage = getByTestId('weather-icon');
        expect(weatherImage.props.source.uri).toBe('https://openweathermap.org/img/wn/01d@2x.png');
    });

    it('opens full description popup when "More" is clicked', () => {
        const { getByText, queryByText } = render(
            <WeatherCard dayData={defaultDayData} animationValue={defaultAnimationValue} />
        );

        // short description should be shown initially
        expect(queryByText('Sunny weather with a clear sky')).toBeFalsy();

        // simulate "More" button press
        const moreButton = getByText('More');
        fireEvent.press(moreButton);

        expect(getByText('Sunny weather with a clear sky')).toBeTruthy();
    });

    it('closes full description popup when pressing outside', () => {
        const { getByText, queryByText, getByTestId } = render(
            <WeatherCard dayData={defaultDayData} animationValue={defaultAnimationValue} />
        );

        // simulate pressing More to open full description
        const moreButton = getByText('More');
        fireEvent.press(moreButton);
        expect(getByText('Sunny weather with a clear sky')).toBeTruthy();

        // s]imulate pressing outside the card to close the popup
        const pressable = getByTestId('pressable-outside');
        fireEvent.press(pressable);

        // full description should now be hidden
        expect(queryByText('Sunny weather with a clear sky')).toBeFalsy();
    });

    it('renders animated component with given opacity', () => {
        const { getByTestId } = render(
            <WeatherCard dayData={defaultDayData} animationValue={defaultAnimationValue} />
        );

        const animatedView = getByTestId('animated-view');
        expect(animatedView.props.style.opacity).toBe(1);
    });

    it('renders animated component with lower opacity when animationValue is 0.5', () => {
        const animationValue = new Animated.Value(0.5);
        const { getByTestId } = render(
            <WeatherCard dayData={defaultDayData} animationValue={animationValue} />
        );

        const animatedView = getByTestId('animated-view');
        expect(animatedView.props.style.opacity).toBe(0.5);
    });
});