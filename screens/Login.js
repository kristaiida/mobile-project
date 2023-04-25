import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { ref, get } from 'firebase/database';
import { db, USERS_REF } from '../firebase/Config';
import styles from '../styles/styles';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter a valid username and password');
      return;
    }

    const usersRef = ref(db, USERS_REF);
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const user = Object.keys(userData)
        .map((key) => ({
          id: key,
          ...userData[key],
        }))
        .find((user) => user.username === username.trim() && user.password === password.trim());

      if (user) {
        // successful login
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } else {
      Alert.alert('Error', 'No users exist yet');
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.loginContainer}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.loginLogo}
      />
      <Text style={styles.loginTitle}>Log in</Text>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Username</Text>
        <TextInput style={styles.loginInput} placeholder='Username' value={username} onChangeText={setUsername} />
      </View>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Password</Text>
        <TextInput style={styles.loginInput} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginRegisterContainer}>
        <Text style={styles.loginRegisterText}>New to RecipePal? </Text>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.loginRegisterLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
