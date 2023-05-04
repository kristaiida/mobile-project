import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserDetails, logOut } from '../components/Auth';
import { Entypo } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      setUsername(userDetails.username);
      if (userDetails.profilePicture === 1) {
        setProfilePic(require('../assets/chef1.png'));
      } else if (userDetails.profilePicture === 2) {
        setProfilePic(require('../assets/chef2.png'));
      } else if (userDetails.profilePicture === 3) {
        setProfilePic(require('../assets/chef3.png'));
      } else {
        setProfilePic(require('../assets/logo.png'));
      };
    };
    fetchUserDetails();
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
          source={profilePic}
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
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('ChangePwScreen', {username: username})}
          >
            <Entypo name="cog" size={24} color="white" />
            <Text style={styles.loginButtonText}>Change password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileLogoutWrapper}>
        <TouchableOpacity onPress={handlePressLogout}>
          <Text style={styles.profileLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};