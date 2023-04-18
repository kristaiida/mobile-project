import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/styles';

export default function Favorites({ navigation }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

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

  const handleDelete = async (id) => {
    const newRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    try {
      await AsyncStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
      setFavoriteRecipes(newRecipes);
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.recipeCardContainer}>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
      <RecipeCard recipe={item} screen={'FavoritesScreen'} />
    </View>
  );

  return (
    <View>
      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noFavoritesText}>You have no favorite recipes.</Text>
      )}
    </View>
  );
}
