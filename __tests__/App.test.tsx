import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/api/weatherApi', () => ({
  getWeatherData: jest.fn(),
  getLocationData: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SplashScreen initially', () => {
    const { getByText } = render(<App />);
    expect(getByText('Weather App')).toBeTruthy();
  });
});