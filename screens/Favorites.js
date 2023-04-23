import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/styles';
import customStyles from '../styles/favStyles';
import logo from '../assets/logo.png';


export default function Favorites({ navigation }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // Load favorite recipes from AsyncStorage when the screen is in focus
  useEffect(() => {
    const loadFavoriteRecipes = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favoriteRecipes');
        const loadedRecipes = jsonValue != null ? JSON.parse(jsonValue) : [];
        setFavoriteRecipes(loadedRecipes);
      } catch (e) {
        console.log(e);
      }
    };
    const unsubscribe = navigation.addListener('focus', loadFavoriteRecipes);
    return unsubscribe;
  }, [navigation]);

  // Handle deleting a recipe from favorites
  const handleDelete = async (id) => {
    const newRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    try {
      await AsyncStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
      setFavoriteRecipes(newRecipes);
      Alert.alert('Recipe deleted from favorites');
    } catch (e) {
      console.log(e);
    }
  };

  // Render each recipe card in the flat list
  const renderItem = ({ item }) => (
    <View style={styles.recipeCardContainerF}>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
      <RecipeCard recipe={item} screen={'FavoritesScreen'} />
    </View>
  );

  // Delete all favorite recipes
  const handleDeleteAll = async () => {
    try {
      await AsyncStorage.removeItem('favoriteRecipes');
      setFavoriteRecipes([]);
      Alert.alert('All recipes deleted from favorites');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={[customStyles.favoritesContainer, { flex: 1 }]}>
      {favoriteRecipes.length > 0 ? (
        <>
          <FlatList
            data={favoriteRecipes}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id?.toString()}
          />
          <TouchableOpacity
            style={styles.deleteAllButton}
            onPress={() => handleDeleteAll()}
          >
            <Text style={styles.deleteAllButtonText}>Delete All</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={customStyles.noFavoritesContainer}>
          <View>
            <Text style={customStyles.noFavoritesText}>You have no favorite recipes</Text>
            <Text style={customStyles.noFavoritesTextSmall}>To add a recipe to your favorites, simply click the ❤️ next to the recipe.</Text>
          </View>
          <View>
            <Image source={logo} style={customStyles.logo} />
          </View>
        </View>
      )}
    </View>
  );
}