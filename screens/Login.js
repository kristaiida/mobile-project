import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';

export default function Login({ navigation }) {

    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.loginContainer}>
            <TouchableOpacity onPress={handleRegisterPress}>
                <Text>New to RecipePal? Register here</Text>
            </TouchableOpacity>
        </View>
    );

};