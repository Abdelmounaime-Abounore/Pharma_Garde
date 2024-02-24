import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { signup } from '../services/auth'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateToken } from '../services/auth';


function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    // const result = await validateToken(token);
                    // console.log('User token is valid:', result);
                    navigation.replace('Home');
                } else {
                    // No token found, user needs to log in
                    console.log('No user token found. User needs to log in.');
                }
            } catch (error) {
                console.log('Error validating token:', error);
            }
        };

        getToken();
    }, [])

    const handleRegister = async () => {
        console.log('email: ' + email)
        console.log('password: ' + password)
        try {
            const user = await signup(email, password);
            console.log(user)
        } catch (error) {
            console.log(error)
        }

    }

    const goToLogin = () => {
        console.log('Go to login')
        navigation.navigate('Login');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Register
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button
                style={styles.Button}
                title="Register" onPress={handleRegister} />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.loginText}>Already have an account? <Text style={styles.blueText}>Login</Text></Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,

    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    Button: {
        marginTop: 50,
        marginBottom: 20,
    },
    loginText: {
        marginTop: 20,
        fontSize: 16,
    },
    blueText: {
        color: 'blue',
    },
});


export default RegisterScreen