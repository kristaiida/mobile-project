import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

export default function Profile() {
  const navigation = useNavigation();

  const handlePressFavorites = () => {
    navigation.navigate('FavoritesScreen');
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>Hello</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <TouchableOpacity onPress={handlePressFavorites}>
        <Text style={styles.profileButton}>Your favorite recipes</Text>
      </TouchableOpacity>
    </View>
  );
};