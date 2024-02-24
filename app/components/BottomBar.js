import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons library

function BottomBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                <MaterialCommunityIcons name="home" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
                <MaterialCommunityIcons name="account" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#C1F2B0',
        paddingVertical: 10,
        borderTopColor: '#ccc',

    },
    iconContainer: {
        flex: 1, 
        alignItems: 'center', // Center icon horizontally
    },
});

export default BottomBar;
