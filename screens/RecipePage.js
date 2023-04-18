import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles/styles';

export default function RecipePage({ route }) {

  const { recipe } = route.params;

  return (
    <View style={styles.containerRC}>
      <View style={styles.recipePageContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageRC} source={{ uri: recipe.thumbnail_url }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleRC}>{recipe.name}</Text>
          {recipe.description ? (
            <Text style={styles.descriptionRC}>{recipe.description}</Text>
          ) : (
            <Text style={styles.descriptionRC}>No description available for this recipe.</Text>
          )}
        </View>
      </View>
    </View>
  );
};