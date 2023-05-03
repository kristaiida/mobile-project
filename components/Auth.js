import { Alert } from "react-native";
import { ref, set, query, get } from 'firebase/database';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    signOut,
    updatePassword
} from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';

export const signUp = async (username, email, password, profilePicture) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            set(ref(db, USERS_REF + userCredential.user.uid), {
                username: username,
                email: userCredential.user.email,
                profilePicture: profilePicture
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


export const getUserDetails = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
  
    const userRef = query(ref(db, USERS_REF + uid));
    const snapshot = await get(userRef);
    const userDetails = snapshot.val() || {};
  
    // Get the profile picture download URL if it exists
    if (userDetails.profilePicture) {
      try {
        const downloadURL = await getDownloadURL(storageRef(db, userDetails.profilePicture));
        userDetails.profilePictureURL = downloadURL;
      } catch (error) {
        console.log(error);
      }
    }
  
    return userDetails;
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

export const pickProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setProfilePicture(result.uri);
      }
    } catch (error) {
      console.log('Error picking profile picture: ', error);
    }
  };