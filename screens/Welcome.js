import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "../styles/styles";
import { useFonts } from 'expo-font';

export default Welcome = ({ navigation }) => {

    const [fontLoaded] = useFonts({
        kaushanScript: require('../assets/fonts/KaushanScript-Regular.ttf'),
      });
    
      if (!fontLoaded) {
        return null;
      }
    
    return (
        <View style={styles.loginContainer}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.loginLogo}
            />
            <Text style={styles.loginTitle}>Welcome to </Text>
            <Text style={[styles.loginFont,
                        { fontFamily: 'kaushanScript' },
                        ]}>RecipePal</Text>
            <View style={styles.loginButtonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginButtonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.loginButtonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}