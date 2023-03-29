import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    marginVertical: 8,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    height: 150,
    width: 120,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});