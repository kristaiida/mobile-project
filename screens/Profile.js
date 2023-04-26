import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

export default function Profile() {
  const navigation = useNavigation();

  const handlePressFavorites = () => {
    navigation.navigate('FavoritesScreen');
  };

  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <TouchableOpacity onPress={handlePressFavorites}>
        <Text>Go to Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};
