import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';
import { useState, useEffect } from 'react';

export default function Header({ navigation, route }) {
  const [isRecipePage, setIsRecipePage] = useState(false);

  useEffect(() => {
    if (
      route.name === 'HomeRecipePageScreen' ||
      route.name === 'SearchRecipePageScreen' ||
      route.name === 'FavoritesRecipePageScreen'
    ) {
      setIsRecipePage(true);
    } else {
      setIsRecipePage(false);
    }
  }, [route]);

  const [fontLoaded] = useFonts({
    kaushanScript: require('../assets/fonts/KaushanScript-Regular.ttf'),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#94B49F' }}>
      <View style={styles.header}>
        {isRecipePage && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )}
        <View style={styles.fontAndLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
          <Text
            style={[
              styles.headerFont,
              { fontFamily: 'kaushanScript' },
            ]}
          >
            RecipePal
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
