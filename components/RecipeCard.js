import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipeCard({ recipe, screen }) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const openRecipePage = (recipe) => {      
    if (screen === 'HomeScreen') {
      navigation.navigate('HomeRecipePageScreen', { recipe: recipe });
    } else if (screen === 'SearchScreen') {
      navigation.navigate('SearchRecipePageScreen', { recipe: recipe });
    } else if (screen === 'FavoritesScreen') {
      navigation.navigate('FavoritesRecipePageScreen', { recipe: recipe });
    }
  };

  const handlePress = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteRecipes');
      let favoriteRecipes = [];
      if (storedFavorites !== null) {
        favoriteRecipes = JSON.parse(storedFavorites);
      }
      if (isFavorite) {
        const index = favoriteRecipes.findIndex((favRecipe) => favRecipe.id === recipe.id);
        if (index > -1) {
          favoriteRecipes.splice(index, 1);
        }
      } else {
        favoriteRecipes.push(recipe);
      }
      setIsFavorite(!isFavorite);
      await AsyncStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TouchableOpacity
        key={recipe.id}
        onPress={() => openRecipePage(recipe)}
      >
        <View>
          <Text>{recipe.name}</Text>
          <TouchableOpacity onPress={handlePress}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: recipe.thumbnail_url}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
