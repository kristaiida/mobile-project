import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, FAVORITES_REF } from '../firebase/Config';
import { ref, push, child, update, onValue } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles';
import { getAuth } from 'firebase/auth';

export default function RecipeCard({ recipe, screen }) {
  const navigation = useNavigation();
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userUid = user.uid;
    const favoriteRef = ref(db, FAVORITES_REF + userUid);
    const checkFavoriteRecipe = async () => {
      try {
        const snapshot = onValue(favoriteRef, (snapshot) => {
          const favoriteRecipes = snapshot.val();
          if (favoriteRecipes) {
            const isFavorite = Object.values(favoriteRecipes).some(
              (favoriteRecipe) => favoriteRecipe.recipeId === recipe.id
            );
            setIsInFavorites(isFavorite);
          } else {
            setIsInFavorites(false);
          }
        });
      } catch (error) {
        console.log('Checking if recipe is a favorite failed. ', error.message);
        Alert.alert('Checking if recipe is a favorite failed. ', error.message);
      }
    };    
    checkFavoriteRecipe();
  }, [recipe]);

  useEffect(() => {
    console.log("isInFavorites changed to:", isInFavorites);
  }, [isInFavorites]);  

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

  const openRecipePage = () => {
    if (screen === 'HomeScreen') {
      navigation.navigate('HomeRecipePageScreen', { recipe: recipe });
    } else if (screen === 'SearchScreen') {
      navigation.navigate('SearchRecipePageScreen', { recipe: recipe });
    } else if (screen === 'FavoritesScreen') {
      navigation.navigate('ProfileRecipePageScreen', { recipe: recipe });
    }
  };

  const handlePress = async () => {
    if (!isInFavorites) {
      addToFavorites();
    } else {
      removeFromFavorites();
    }
  };   

  const addToFavorites = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userUid = user.uid;
    try {
      const newFavoriteRecipe = {
        recipeId: recipe.id
      };
      const newFavoriteRecipeKey = push(child(ref(db), FAVORITES_REF + userUid)).key;
      const updates = {};
      updates[FAVORITES_REF + userUid + '/' + newFavoriteRecipeKey] = newFavoriteRecipe;
      await update(ref(db), updates);
      setIsInFavorites(true); // add this line
    } catch (error) {
      console.log('Adding recipe to Favorites failed. ', error.message);
      Alert.alert('Adding recipe to Favorites failed. ', error.message);
    }
  };  

  const removeFromFavorites = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userUid = user.uid;
    try {
      const favoriteRef = ref(db, FAVORITES_REF + userUid);
      const snapshot = await onValue(favoriteRef, (snapshot) => {
        const favoriteRecipes = snapshot.val();
        if (!favoriteRecipes) {
          // If favoriteRecipes is empty, return early
          return;
        }
        const favoriteRecipeKey = Object.keys(favoriteRecipes).find(
          (key) => favoriteRecipes[key].recipeId === recipe.id
        );
        if (favoriteRecipeKey) {
          const updates = {};
          updates[FAVORITES_REF + userUid + '/' + favoriteRecipeKey] = null;
          return update(ref(db), updates);
        }
      });
      setIsInFavorites(false);
      console.log(isInFavorites);
      return snapshot;
    } catch (error) {
      console.log('Removing recipe from Favorites failed. ', error.message);
      Alert.alert('Removing recipe from Favorites failed. ', error.message);
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
            <FontAwesome
              name={screen === 'FavoritesScreen' ? 'trash' : (isInFavorites ? 'heart' : 'heart-o')}
              size={24}
              color={screen === 'FavoritesScreen' ? 'black' : 'red'}
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