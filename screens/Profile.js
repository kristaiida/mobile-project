import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetails, logOut } from '../components/Auth';
import { Entypo } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function Profile() {

  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      setUsername(userDetails.username);
    };
    fetchUserDetails();
  }, []);

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
        <Text style={styles.profileTitle}>{username}'s Profile</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handlePressFavorites}
          >
            <Entypo name="heart" size={24} color="white" />
            <Text style={styles.loginButtonText}>My Favorites</Text>
          </TouchableOpacity>
      </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePwScreen', {username: username})}>
          <Text style= {styles.changePWText}>Change password</Text>
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
