import React from 'react';
import { TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface WeatherSearchProps {
    location: string;
    setLocation: (location: string) => void;
    loading: boolean;
    searchWeather: (locationToSearch: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ location, setLocation, loading, searchWeather }) => {

    const handleSearch = () => {
        searchWeather(location);
    };

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={location}
                onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Search</Text>
                )}
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: '#000',
    },
    button: {
        backgroundColor: '#ff7f50',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default WeatherSearch;