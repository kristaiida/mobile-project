import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { changePassword } from '../components/Auth';
import styles from '../styles/styles';

export default ChahngePw = ({ navigation, route }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = () => {
        if (!password) {
            Alert.alert('Password is required.');
        } else if (!confirmPassword) {
            setPassword('');
            Alert.alert('Confirming password is required.');
        } else if (password !== confirmPassword) {
            Alert.alert('Passwords do not match.');
        } else {
            changePassword(password, navigation);
            navigation.navigate('ProfileScreen');
        }
    };

    return (
      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={'100'}
      >
        <View style={styles.loginLogoAndTextContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.loginLogo}
          />
          <Text style={styles.loginTitle}>Change password</Text>
        </View>
        <View style={styles.loginInputContainer}>
          <Text style={styles.loginInputLabel}>Password *</Text>
          <TextInput
            style={styles.loginInput}
            placeholder='Password *'
            value={password}
            onChangeText={(pw) => setPassword(pw)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.loginInputContainer}>
          <Text style={styles.loginInputLabel}>Confirm password *</Text>
          <TextInput
            style={styles.loginInput}
            placeholder='Confirm password *'
            value={confirmPassword}
            onChangeText={(cpw) => setConfirmPassword(cpw)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handlePress}
          >
            <Text style={styles.loginButtonText}>Change password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginRegisterContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.loginRegisterLink}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
};