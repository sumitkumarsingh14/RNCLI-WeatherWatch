import React, { useState, useEffect } from 'react';
import { View, FlatList, Animated } from 'react-native';
import WeatherCard from './WeatherCard';

interface WeatherData {
    date: string;
    maxTemp: number;
    minTemp: number;
    weathercode: number;
}

const WeatherList: React.FC<{ weatherData: WeatherData[] }> = ({ weatherData }) => {
    const [animationValues, setAnimationValues] = useState<Animated.Value[]>([]);

    useEffect(() => {
        // set animation values for each card
        const values = weatherData.map(() => new Animated.Value(0));
        setAnimationValues(values);

        // trigger animations for each card
        values.forEach((animValue, index) => {
            Animated.timing(animValue, {
                toValue: 1,
                duration: 500,
                delay: index * 200, // add delay 
                useNativeDriver: true,
            }).start();
        });
    }, [weatherData]);

    const renderItem = ({ item, index }: { item: WeatherData; index: number }) => (
        <WeatherCard
            dayData={item}
            animationValue={animationValues[index]}
        />
    );

    return (
        <FlatList
            data={weatherData}
            renderItem={renderItem}
            keyExtractor={(item) => item.date}
            contentContainerStyle={{ paddingBottom: 16 }}
        />
    );
};

export default WeatherList;