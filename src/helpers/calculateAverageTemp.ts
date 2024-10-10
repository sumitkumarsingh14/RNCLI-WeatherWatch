export const calculateAverageTemp = (temps: number[]): number => {
    const sum = temps.reduce((acc, temp) => acc + temp, 0);
    return Math.round(sum / temps.length);
};