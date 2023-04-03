import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function RecipeCard({ recipe, onClose }) {
  return (
    <View style={styles.containerRC}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <Image style={styles.imageRC} source={{ uri: recipe.thumbnail_url }} />
      <View style={styles.textContainerRC}>
        <Text style={styles.titleRC}>{recipe.name}</Text>
        <Text style={styles.descriptionRC}>{recipe.description}</Text>
      </View>
    </View>
  );
};


