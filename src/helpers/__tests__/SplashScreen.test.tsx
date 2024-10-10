import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SplashScreen from '../../screens/SplashScreen';

describe('SplashScreen', () => {
    it('calls onAnimationEnd after 6 seconds', async () => {
        jest.useFakeTimers();
        const onAnimationEndMock = jest.fn();

        render(<SplashScreen onAnimationEnd={onAnimationEndMock} />);

        await act(async () => {
            jest.advanceTimersByTime(6000);
        });

        await waitFor(() => {
            expect(onAnimationEndMock).toHaveBeenCalled();
        });
    });
});
