import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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
    if (newUsername.trim() === "" || newPassword.trim() === "") {
        Alert.alert('Error', 'Please enter a valid username and password');
        return;
    }

    const usersRef = ref(db, USERS_REF);
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
        const userData = snapshot.val();
        const usernames = Object.keys(userData).map(key => userData[key].username);
        if (usernames.includes(newUsername.trim())) {
            Alert.alert('Error', 'Username already taken');
            return;
        }
    }

    const newUserAccount = {
        username: newUsername.trim(),
        password: newPassword.trim()
    };
    const newUserAccountKey = push(usersRef).key;
    const updates = {};
    updates[USERS_REF + newUserAccountKey] = newUserAccount;
    setNewUsername('');
    setNewPassword('');

    try {
        await update(ref(db), updates);
    } catch (error) {
        console.log(error);
        Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <View style={styles.registerContainer}>
      <Text>Register</Text>
      <View>
        <TextInput
          placeholder='Username'
          value={newUsername}
          onChangeText={setNewUsername}
        />
      </View>
      <View>
        <TextInput
          placeholder='Password'
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleRegisterAndNavigate}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};