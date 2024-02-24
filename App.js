import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, SafeAreaView, Button, Alert } from 'react-native';
import RegisterScreen from './app/screens/RegisterScreen';
import Navigation from './app/Navigation';
import { db, auth } from './app/services/Config';

export default function App() {

  // return (
  //   <View style={styles.container}>
  //     <RegisterScreen />
  //   </View>
  // );
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
