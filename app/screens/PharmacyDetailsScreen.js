import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function PharmacyDetailsScreen({ route }) {
    // const { pharmacy } = route.params;
    const { pharmacy } = route.params;
    console.log(pharmacy);
    // const onGuardDays = pharmacy.onGuardDays.map(dateString => new Date(dateString));

    const openMapApp = () => {
        const { latitude, longitude } = pharmacy;
        // const url = `http://maps.apple.com/?ll=${latitude},${longitude}`; for iOS
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`; // for Android 31.629754, -8.040264
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: pharmacy.images[0] }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{pharmacy.name}</Text>
                <Text style={styles.address}>{pharmacy.address}</Text>
                <Text style={styles.distance}>{pharmacy.distance} meters away</Text>
                <Text style={styles.hours}>Opening hours: {pharmacy.openingHours} - {pharmacy.closingHours}</Text>
            </View>
            <TouchableOpacity onPress={openMapApp} style={styles.mapButton}>
                <FontAwesome name="map-marker" size={24} color="black" />
                <Text style={styles.mapText}>View on Map</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    image: {
        width: '100%',
        height: 180,
        marginBottom: 10,
    },
    infoContainer: {
        paddingHorizontal: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    address: {
        fontSize: 18,
        marginBottom: 5,
    },
    distance: {
        fontSize: 16,
        color: '#888',
        marginBottom: 5,
    },
    hours: {
        fontSize: 16,
        marginBottom: 5,
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapText: {
        fontSize: 20,
        marginLeft: 10,
    },
});

export default PharmacyDetailsScreen;
