import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { push, ref, update, get } from 'firebase/database';
import { db, USERS_REF } from '../firebase/Config';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleRegisterAndNavigate = async () => {
    const newUserCreated = await addNewUser();
    if (newUserCreated) {
      navigation.navigate('Main');
    }
  };  

  const addNewUser = async () => {
    if (newUsername.trim() === '' || newPassword.trim() === '') {
      Alert.alert('Error', 'Please enter a valid username and password');
      return false;
    }
  
    const usersRef = ref(db, USERS_REF);
    const snapshot = await get(usersRef);
  
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const usernames = Object.keys(userData).map((key) => userData[key].username);
      if (usernames.includes(newUsername.trim())) {
        Alert.alert('Error', 'Username already taken');
        return false;
      }
    }
  
    const newUserAccount = {
      username: newUsername.trim(),
      password: newPassword.trim(),
    };
    const newUserAccountKey = push(usersRef).key;
    const updates = {};
    updates[USERS_REF + newUserAccountKey] = newUserAccount;
    setNewUsername('');
    setNewPassword('');
  
    try {
      await update(ref(db), updates);
      return true;
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred');
      return false;
    }
  };  

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.loginContainer}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.loginLogo}
      />
      <Text style={styles.loginTitle}>Sign up</Text>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Username</Text>
        <TextInput
          style={styles.loginInput}
          placeholder='Username'
          value={newUsername}
          onChangeText={setNewUsername}
        />
      </View>
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginInputLabel}>Password</Text>
        <TextInput
          style={styles.loginInput}
          placeholder='Password'
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleRegisterAndNavigate}
        >
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginRegisterContainer}>
        <Text style={styles.loginRegisterText}>Already familiar with RecipePal? </Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginRegisterLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}