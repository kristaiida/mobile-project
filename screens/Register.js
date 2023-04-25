import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { child, push, ref, update, query, equalTo, off } from 'firebase/database';
import { db, USERS_REF } from '../firebase/Config';
import styles from '../styles/styles';
import { onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigation = useNavigation();

    const handleRegisterAndNavigate = () => {
        addNewUser();
        navigation.navigate('Main');
        
   }

    const addNewUser = () => {
        if (newUsername.trim() === "" || newPassword.trim() === "") {
            Alert.alert('Error', 'Please enter a valid username and password');
            return;
        }

        const usersRef = ref(db, USERS_REF);
        const usernameQuery = query(usersRef, equalTo('username', newUsername.trim()));
        
        return new Promise((resolve, reject) => {
            const handleSnapshot = (snapshot) => {
                if (snapshot.exists()) {
                    Alert.alert('Error', 'Username already taken');
                    resolve();
                } else {
                    const newUserAccount = {
                        username: newUsername.trim(),
                        password: newPassword.trim()
                    };
                    const newUserAccountKey = push(usersRef).key;
                    const updates = {};
                    updates[USERS_REF + newUserAccountKey] = newUserAccount;
                    setNewUsername('');
                    setNewPassword('');
                    update(ref(db), updates).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                }
            };
            const handleError = (error) => {
                reject(error);
            };
            const querySubscription = onValue(usernameQuery, handleSnapshot, handleError);
            return () => {
                off(querySubscription);
            };
        });
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
