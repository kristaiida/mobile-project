import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function RecipePage({ recipe, onClose }) {
  return (
    <View style={styles.containerRC}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <View style={styles.recipePageContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageRC} source={{ uri: recipe.thumbnail_url }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleRC}>{recipe.name}</Text>
          <Text style={styles.descriptionRC}>{recipe.description}</Text>
        </View>
      </View>
    </View>
  );
};

