import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Image, Text, StyleSheet, Dimensions } from 'react-native';

const images = [
    { uri: 'https://openweathermap.org/img/wn/01d@2x.png' }, // Sunny
    { uri: 'https://openweathermap.org/img/wn/01n@2x.png' }, // Clear
    { uri: 'https://openweathermap.org/img/wn/02n@2x.png' }, // Partly Cloudy
    { uri: 'https://openweathermap.org/img/wn/50d@2x.png' }, // Foggy
    { uri: 'https://openweathermap.org/img/wn/09n@2x.png' }, // Light Drizzle
    { uri: 'https://openweathermap.org/img/wn/10d@2x.png' }, // Heavy Rain
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CIRCLE_RADIUS = 100;
const IMAGE_SIZE = 60;

const SplashScreen: React.FC<{ onAnimationEnd: () => void }> = ({ onAnimationEnd }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const rotateImages = Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 6000,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                }),
            ])
        );

        rotateImages.start();

        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000);

        const timeout = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                onAnimationEnd();
            }, 3000);
        }, 3000);

        return () => {
            rotateImages.stop();
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [fadeAnim, onAnimationEnd, animatedValue]);


    return (
        <View style={styles.container}>
            <View style={styles.circle} testID='splash-circle'>
                {images.map((image, index) => {
                    const angle = (2 * Math.PI * index) / images.length;
                    const x = CIRCLE_RADIUS * Math.cos(angle);
                    const y = CIRCLE_RADIUS * Math.sin(angle);

                    return (
                        <Animated.Image
                            key={index}
                            source={image}
                            style={[
                                styles.image,
                                {
                                    transform: [
                                        { translateX: x },
                                        { translateY: y },
                                    ],
                                },
                            ]}
                        />
                    );
                })}
            </View>
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                Weather App
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4c669f',
    },
    circle: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        position: 'absolute',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
    },
});

export default SplashScreen;