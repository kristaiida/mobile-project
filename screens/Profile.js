import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { onValue, query, ref } from 'firebase/database';
import { db, USERS_REF } from '../firebase/Config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOut } from '../components/Auth';

import styles from '../styles/styles';

export default function Profile({ route }) {

  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  /*useEffect(() => {
    const userRef = query(ref(db, USERS_REF + route.params.userUid));
    onValue(userRef, (snapshot) => {
      snapshot.val()
        ? setUsername(snapshot.val().username)
        : setUsername('');
    });
  }, []);*/

  useEffect(() => {
    const loadFavoriteRecipes = async () => {
      try {
        const recipes = await AsyncStorage.getItem('favoriteRecipes');
        if (recipes !== null) {
          setFavoriteRecipes(JSON.parse(recipes));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadFavoriteRecipes();
  }, []);

  const handlePressFavorites = () => {
    navigation.navigate('FavoritesScreen');
  };

  const handlePressLogout = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('favoriteRecipes');
              await AsyncStorage.removeItem('userToken');
              setFavoriteRecipes([]);
              await logOut();
              navigation.replace('Welcome');
            } catch (error) {
              console.log(error.message);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileContent}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handlePressFavorites}>
          <Text style={styles.profileButton}>Your favorite recipes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileLogoutWrapper}>
        <TouchableOpacity onPress={handlePressLogout}>
          <Text style={styles.profileLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
