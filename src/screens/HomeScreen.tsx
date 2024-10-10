import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import WeatherSearch from '../components/WeatherSearch';
import WeatherList from '../components/WeatherList';
import LinearGradient from 'react-native-linear-gradient';

interface HomeScreenProps {
    location: string;
    setLocation: (location: string) => void;
    weather: any[];
    loading: boolean;
    searchWeather: (locationToSearch: string) => void;
    error: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
    location,
    setLocation,
    weather,
    loading,
    searchWeather,
    error
}) => {

    // React.useEffect(() => {
    //     searchWeather(location); 
    // }, [location]);

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <Text style={styles.title}>Weather App</Text>
                <WeatherSearch location={location} setLocation={setLocation} loading={loading} searchWeather={searchWeather} />
                {error && <Text style={styles.error}>{error}</Text>}
                {weather.length > 0 && (
                    <WeatherList weatherData={weather} />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    safeAreaView: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginTop: 8,
        textAlign: 'center',
    },
});

export default HomeScreen;