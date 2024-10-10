import { calculateAverageTemp } from '../calculateAverageTemp';

test('calculates the average temperature correctly', () => {
    const temps = [20, 22, 18, 19];
    const result = calculateAverageTemp(temps);

    expect(result).toBe(20);
});