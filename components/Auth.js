import { Alert } from "react-native";
import { ref, set } from 'firebase/database';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword
} from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';

export const signUp = async (username, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            set(ref(db, USERS_REF + userCredential.user.uid), {
                username: username,
                email: userCredential.user.email
            });
        });
    } catch (error) {
        console.log('Signup failed. ', error.message);
        Alert.alert('Signup failed. ', error.message);
    };
};

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log('Login failed. ', error.message);
        Alert.alert('Login failed. ', error.message);
    };
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log('Logout failed. ', error.message);
        Alert.alert('Logout failed. ', error.message);
    };
};

export const changePassword = async (password) => {
    try {
        await updatePassword(auth.currentUser, password)
        .then(() => {
            Alert.alert('Password changed successfully.');
        })
        .catch ((error) => {
            console.log('Password change error. ', error.message);
            Alert.alert('Password change error. ', error.message);
        })
    } catch (error) {
        console.log('Password change error. ', error.message);
        Alert.alert('Password change error. ', error.message);
    };
};