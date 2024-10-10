import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Pressable } from 'react-native';
import getWeatherImage from '../helpers/getWeatherImage';
import moment from 'moment';
import { WeatherData } from '../types/weatherTypes';

interface WeatherCardProps {
    dayData: {
        date: string;
        maxTemp: number;
        minTemp: number;
        weathercode: number;
    };
    animationValue: Animated.Value;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ dayData, animationValue }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const weatherImage = getWeatherImage(dayData.weathercode, true);

    const dayName = moment(dayData.date).format('dddd');
    const formattedDate = moment(dayData.date).format('MMM D');

    // enable the popup
    const handleLabelClick = () => {
        setShowFullDescription(true);
    };
    // disable the popup 
    const closePopup = () => {
        setShowFullDescription(false);
    };

    const shortDescription =
        weatherImage.description.length > 10
            ? weatherImage.description.substring(0, 10) + '...'
            : weatherImage.description;

    return (
        <Pressable onPress={closePopup} testID='pressable-outside'>
            <Animated.View style={[styles.card, { opacity: animationValue }]} testID="animated-view">
                <View style={styles.leftContainer}>
                    <Image testID="weather-icon" source={{ uri: weatherImage.image }} alt='weather-icon' style={styles.weatherImage} />
                    <View>
                        <Text style={styles.weatherLabel}>
                            {shortDescription}
                            {weatherImage.description.length > 10 && (
                                <TouchableOpacity onPress={handleLabelClick}>
                                    <Text style={styles.moreButton}>More</Text>
                                </TouchableOpacity>
                            )}
                        </Text>

                        {showFullDescription && (
                            <View style={styles.popupContainer}>
                                <Text style={styles.fullLabelText}>{weatherImage.description}</Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.dayName}>{dayName}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                    <Text style={styles.temp}>Max: {dayData.maxTemp}°C</Text>
                    <Text style={styles.temp}>Min: {dayData.minTemp}°C</Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        elevation: 4,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'center',
    },
    weatherImage: {
        width: 80,
        height: 80,
        marginBottom: 8,
    },
    weatherLabel: {
        fontSize: 14,
        color: '#555',
    },
    moreButton: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#333',
        textDecorationLine: 'underline',
    },
    rightContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 16,
    },
    dayName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 16,
        color: '#666',
    },
    temp: {
        fontSize: 16,
        color: '#333',
    },
    popupContainer: {
        position: 'absolute',
        top: 25, // Adjust the position based on your design
        left: 0,
        width: 170,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 1000, // Make sure it's above everything else
    },
    fullLabelText: {
        fontSize: 16,
        color: '#333',
    },
});

export default WeatherCard;