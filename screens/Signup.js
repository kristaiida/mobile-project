import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native';
import { signUp } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import styles from '../styles/styles';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePress = () => {
    if (!username) {
      Alert.alert('Username is required.');
    } else if (!email) {
      Alert.alert('Email is required.');
    } else if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
    } else {
      signUp(username, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate('Main');
        };
      });
    };
  };

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.loginLogoAndTextContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.loginLogo}
        />
        <Text style={styles.loginTitle}>Signup</Text>
      </View>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Username *</Text>
        <TextInput
          style={styles.loginInput}
          placeholder='Username *'
          value={username}
          onChangeText={(uname) => setUsername(uname.trim())}
        />
      </View>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Email *</Text>
        <TextInput
          style={styles.loginInput}
          placeholder='Email *'
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          keyboardType='email-address'
          autoCapitalize='none'
        />
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
        <Text style={styles.loginInputLabel}>Confirm password*</Text>
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
          <Text style={styles.loginButtonText}>Signup</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginRegisterContainer}>
        <Text style={styles.loginRegisterText}>Already familiar with RecipePal? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginRegisterLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}