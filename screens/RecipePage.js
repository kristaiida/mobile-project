import React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import Video from 'react-native-video';

export default function RecipePage({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView>
      <View style={styles.containerRC}>
          <View style={styles.imageContainer}>
            <Image style={styles.imageRC} source={{ uri: recipe.thumbnail_url }} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleRC}>{recipe.name}</Text>
            <Text style={styles.descriptionRC}>{recipe.description}</Text>
          </View>
          <View style={styles.lineRC} />
          <View>
            <Text style={styles.ingTitle}>Ingredients</Text>
            {recipe.sections.map((section) => (
              section.components.map((ingredient) => (
                <Text key={ingredient.id} style={styles.ingText}>
                  {ingredient.raw_text === "n/a" ? ingredient.measurements[0].quantity + ' ' + ingredient.ingredient.name + ' ' + ingredient.extra_comment : ingredient.raw_text}
                </Text>
              ))
            ))}
          </View>
          <View style={styles.lineRC} />
          <View style={styles.instructionRC}>
            <Text style={styles.ingTitle}>Instructions</Text>
            {recipe.instructions.map((instruction) => (
              <Text key={instruction.id} style={styles.ingText}>{instruction.position + '. ' + instruction.display_text}</Text>
            ))}
          </View>
          <View>
            <Video
              source={{ uri: recipe.video_url }}
              style={{ width: 320, height: 240 }}
              controls={true}
            />
          </View>
        </View>
    </ScrollView>
  );
};