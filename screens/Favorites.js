import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import RecipeCard from '../components/RecipeCard';

export default function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Load favorite recipes from AsyncStorage
    AsyncStorage.getItem('favoriteRecipes')
      .then((value) => {
        if (value) {
          setFavoriteRecipes(JSON.parse(value));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFavoriteToggle = (recipe) => {
    // Check if the recipe is already in the list of favorite recipes
    const recipeIndex = favoriteRecipes.findIndex((r) => r.id === recipe.id);

    if (recipeIndex === -1) {
      // Recipe is not in the list, so add it
      const newFavoriteRecipes = [...favoriteRecipes, recipe];
      setFavoriteRecipes(newFavoriteRecipes);

      // Save updated favorite recipes to AsyncStorage
      AsyncStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes))
        .catch((error) => console.log(error));
    } else {
      // Recipe is already in the list, so remove it
      const newFavoriteRecipes = [...favoriteRecipes];
      newFavoriteRecipes.splice(recipeIndex, 1);
      setFavoriteRecipes(newFavoriteRecipes);

      // Save updated favorite recipes to AsyncStorage
      AsyncStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes))
        .catch((error) => console.log(error));
    }
  };

  return (
    <View>
      {favoriteRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          screen={'FavoritesScreen'}
          onFavoriteToggle={() => handleFavoriteToggle(recipe)}
        />
      ))}
    </View>
  );
}
