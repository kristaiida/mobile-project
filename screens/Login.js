import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { signIn } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import styles from '../styles/styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email is required.');
    } else if (!password) {
      Alert.alert('Password is required.');
    } else {
      signIn(email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate('Main');
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.loginLogoAndTextContainer}>
        <Image source={require('../assets/logo.png')} style={styles.loginLogo} />
        <Text style={styles.loginTitle}>Login</Text>
      </View>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Email*</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Email*"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Password*</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginRegisterContainer}>
        <Text style={styles.loginRegisterText}>New to RecipePal? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginRegisterLink}>Signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}