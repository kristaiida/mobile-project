import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeCard from '../components/RecipeCard';
import { db, FAVORITES_REF } from '../firebase/Config';
import styles from '../styles/styles';
import customStyles from '../styles/favStyles';
import logo from '../assets/logo.png';
import { getAuth } from 'firebase/auth';
import { API_KEY } from '../Api_Key';
import { child, onValue, push, ref, update, query } from 'firebase/database';

export default function Favorites({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const userUid = user.uid;
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [updatedFavoriteRecipes, setUpdatedFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favoritesRef = ref(db, `${FAVORITES_REF}/${userUid}`);
    onValue(favoritesRef, (snapshot) => {
      const favoriteData = snapshot.val();
      if (favoriteData) {
        const favoriteIds = Object.keys(favoriteData).map((key) => favoriteData[key].recipeId);
        setFavoriteRecipeIds(favoriteIds);
      } else {
        setFavoriteRecipeIds([]);
      }
      setLoading(false);
    });    
  }, []);
  
  useEffect(() => {
    const promises = favoriteRecipeIds.map((recipeId) => {
      return fetchRecipeData(recipeId);
    });
  
    Promise.all(promises)
      .then((recipeData) => {
        if (recipeData && recipeData.length > 0) {
          setUpdatedFavoriteRecipes(recipeData);
        } else {
          setUpdatedFavoriteRecipes([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setUpdatedFavoriteRecipes([]);
        setLoading(false);
      });
  }, [favoriteRecipeIds]);       
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (updatedFavoriteRecipes.length === 0) {
        setFavoriteRecipes([]);
      } else {
        setFavoriteRecipes(updatedFavoriteRecipes);
      }
    }, 500);
  
    return () => clearTimeout(timeout);
  }, [updatedFavoriteRecipes]);  
  

  const fetchRecipeData = async (recipeId) => {
    const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeId}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={[customStyles.favoritesContainer, { flex: 1 }]}>
      {loading ? ( // Add a check for loading
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.textAndButtonContainer}>
            <Text style={styles.favoritesText}>My Favorites</Text>
            <TouchableOpacity
                style={styles.deleteAllButton}
                onPress={() => handleDeleteAll()}
              >
                <Text style={styles.deleteAllButtonText}>Delete All</Text>
              </TouchableOpacity>
          </View>
          {favoriteRecipes && favoriteRecipes.length > 0 ? (
            <ScrollView>
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} screen={'FavoritesScreen'} />
              ))}
            </ScrollView>
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
        </>
      )}
    </View>
  );
}