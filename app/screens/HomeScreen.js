import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
// import { PermissionsAndroid } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
import BottomBar from '../components/BottomBar';
import * as Location from 'expo-location';
import data from '../data';

function HomeScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [pharmacies, setPharmacies] = useState(data);

    const onRefresh = () => {
        setRefreshing(true);
        // Add logic to refresh the data here, such as fetching new data from an API
        setPharmacies([]);
        setTimeout(() => {
            setRefreshing(false);
            setPharmacies(data);
        }, 2000); // Simulate a delay of 2 seconds before setting refreshing to false
    };

    useEffect(() => {
        const removeBackButton = () => {
            navigation.setOptions({
                headerLeft: null,
                title: 'Home'
            });
        };

        removeBackButton();
    }, []);

    useEffect(() => {
        // Function to convert degrees to radians
        const deg2rad = deg => {
            return deg * (Math.PI / 180);
        };
        // Function to calculate distance between two coordinates using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371;
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance in kilometers
            return d;
        };
        const getLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                setPharmacies([]);
                return;
            }

            // Permission granted, now you can access location
            const location = await Location.getCurrentPositionAsync({});
            console.log('User location:', location);

            // Calculate distance between user location and each pharmacy
            const pharmaciesInRange = data.filter(pharmacy => {
                const distance = calculateDistance(
                    location.coords.latitude,
                    location.coords.longitude,
                    pharmacy.latitude,
                    pharmacy.longitude
                );
                console.log('Distance:', distance);
                return distance <= 5; // 5 km range
            });

            setPharmacies(pharmaciesInRange);
        };

        getLocationPermission();
    }, []);



    const handleCardPress = (pharmacy) => {
        navigation.navigate('PharmacyDetails', { pharmacy });
        // const onGuardDaysString = pharmacy.onGuardDays.map(date => date.toISOString());

        // navigation.navigate('PharmacyDetails', { pharmacy: { ...pharmacy, onGuardDays: onGuardDaysString } });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" animating={refreshing} />
                <View style={styles.content}>
                    {pharmacies.length > 0 ? (
                        pharmacies.map((pharmacy, index) => (
                            <TouchableOpacity key={index} onPress={() => console.log('Card pressed')}>
                                <View style={styles.card}>
                                    <Image source={{
                                        uri: pharmacy.images[0]
                                    }} style={styles.image} />
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.name}>{pharmacy.name}</Text>
                                        <Text style={styles.address}>{pharmacy.address}</Text>
                                        <Text style={styles.distance}>{pharmacy.distance} meters away</Text>
                                        <Text style={styles.hours}>Opening hours: {pharmacy.openingHours} - {pharmacy.closingHours}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>No pharmacies available</Text>
                    )}
                </View>
            </ScrollView>
            <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 10, // Adjust the paddingBottom to match the height of the BottomBar
    },
    content: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 180,
    },
    infoContainer: {
        padding: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    address: {
        fontSize: 16,
        marginBottom: 5,
    },
    distance: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    hours: {
        fontSize: 14,
        marginBottom: 5,
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1,
    },
});

export default HomeScreen;
