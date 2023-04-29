import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipeCard({ recipe, screen }) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const onShare = async (recipe) => {
    try {
      const result = await Share.share({
        message: `Check out this recipe I found from RecipePal: ${recipe.name}`,
        url: recipe.url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favoriteRecipes');
        if (storedFavorites !== null) {
          const parsedFavorites = JSON.parse(storedFavorites);
          const found = parsedFavorites.some(
            (favRecipe) => favRecipe.id === recipe.id
          );
          setIsFavorite(found);
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkFavorite();
  }, [recipe.id]);

  const openRecipePage = () => {
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
        const index = favoriteRecipes.findIndex(
          (favRecipe) => favRecipe.id === recipe.id
        );
        if (index > -1) {
          favoriteRecipes.splice(index, 1);
        }
      } else {
        favoriteRecipes.push(recipe);
        Alert.alert('Recipe added to Favorites');
      }
      setIsFavorite(!isFavorite);
      await AsyncStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(favoriteRecipes)
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openRecipePage}>
        <View style={styles.recipeCardContainerF}>
          <Image style={styles.image} source={{ uri: recipe.thumbnail_url }} />
          <Text style={styles.recipeCardTextFrontPage}>{recipe.name}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handlePress}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? 'red' : 'black'}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onShare(recipe)}>
              <Icon
                name="share-variant"
                size={24}
                color="black"
                style={styles.shareIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );  
}
