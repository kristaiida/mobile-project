import React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/styles';

export default function RecipePage({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView>
      <View style={styles.containerRC}>
        <View style={styles.recipePageContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.imageRC} source={{ uri: recipe.thumbnail_url }} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleRC}>{recipe.name}</Text>
            <Text style={styles.descriptionRC}>{recipe.description}</Text>
          </View>
          <View>
            {recipe.sections.map((section) => (
              section.components.map((ingredient) => (
                <Text key={ingredient.id}>
                  {ingredient.raw_text === "n/a" ? ingredient.measurements[0].quantity + ' ' + ingredient.ingredient.name + ' ' + ingredient.extra_comment : ingredient.raw_text}
                </Text>
              ))
            ))}
          </View>
          <View>
            {recipe.instructions.map((instruction) => (
              <Text key={instruction.id}>{ instruction.position + '. ' + instruction.display_text}</Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
