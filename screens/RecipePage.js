import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from '../styles/styles';

export default function RecipeCard({ recipe }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: recipe.thumbnail_url }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>
    </View>
  );
};