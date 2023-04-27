import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/styles';

export default function Profile() {
  const navigation = useNavigation();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

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
      'Are you sure you want to log out?',
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
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
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
