import React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from '../styles/styles';

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
          { recipe.description &&
            <Text style={styles.descriptionRC}>{recipe.description}</Text>
          }
        </View>
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginBottom: 5}}>
          {recipe.prep_time_minutes && (
            <View style={{flexDirection: 'row', marginRight: 5}}>
              <MaterialIcons name="access-time" size={24} color="black" style={{marginRight: 2}} />
              <Text style={{textAlign: 'center', alignSelf: 'center', fontWeight: 'bold'}}>
                Prep time:{" "}
                {recipe.prep_time_minutes > 59
                  ? `${Math.floor(recipe.prep_time_minutes / 60)}h ${recipe.prep_time_minutes % 60}min`
                  : `${recipe.prep_time_minutes}min`}
              </Text>
            </View>
          )}
          {recipe.cook_time_minutes &&
            <View style={{flexDirection: 'row', marginLeft: 5}}>
              <MaterialIcons name="microwave" size={24} color="black" style={{marginRight: 2}} />
              <Text style={{textAlign: 'center', alignSelf: 'center', fontWeight: 'bold'}}>
                Cook time:{" "}
                {recipe.cook_time_minutes > 59
                  ? `${Math.floor(recipe.cook_time_minutes / 60)}h ${recipe.cook_time_minutes % 60}min`
                  : `${recipe.cook_time_minutes}min`}
              </Text>
            </View>          
          }
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
      </View>
    </ScrollView>
  );
};