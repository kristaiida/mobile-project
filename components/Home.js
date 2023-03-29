import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { API_KEY } from '../Api_Key';
import CarouselScreen from './Carousel';
import RecipeCard from './RecipeCard';
import { useNavigation } from '@react-navigation/native';
import RecipePage from './RecipePage';

export default function Home() {

    const [categories, setCategories] = useState([]);

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    };

    const handleImagePress = (recipe) => {
        navigation.navigate('RecipePage', { recipe });
      };

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        fetch('https://tasty.p.rapidapi.com/feeds/list?size=2&timezone=%2B0700&vegetarian=false&from=0', options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            };
        })
        .then(
            (result) => {
                const apiCategories = [];
                for (let i = 0; i < result.results.length; i++) {
                    if ('min_items' in result.results[i] === false && Array.isArray(result.results[i].item.recipes)) {
                        apiCategories.push(result.results[i].item);
                    };
                };
                const uniqueCategories = apiCategories.filter((category, index, self) =>
                    index === self.findIndex((t) => (
                        t.id === category.id
                    ))
                );
                setCategories(uniqueCategories);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const [loadedImages, setLoadedImages] = useState([]);

    const handleImageLoad = (recipeId) => {
        setLoadedImages([...loadedImages, recipeId]);
    };

    return (
        <View style={styles.container}>
          <ScrollView>
            <CarouselScreen />
            {categories.map((category) => (
              <View style={{ padding: 6 }} key={category.id}>
                <Text>{category.name}</Text>
                {category.recipes.map((recipe) => (
                  <TouchableOpacity
                    key={recipe.id}
                    onPress={() => handleRecipeSelect(recipe)}
                  >
                    <View style={{ padding: 4 }}>
                      <Text>{recipe.name}</Text>
                      <View style={styles.imageContainer}>
                        {loadedImages.includes(recipe.id) ? (
                          <Image
                          style={styles.image}
                          source={{uri: recipe.thumbnail_url}}
                          onPress={() => handleImagePress(recipe)}
                        />
                        ) : (
                          <Text>Loading image...</Text>
                        )}
                      </View>
                      <Image
                        onLoad={() => handleImageLoad(recipe.id)}
                        style={styles.hiddenImage}
                        source={{ uri: recipe.thumbnail_url }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
          {selectedRecipe && (
            <RecipeCard recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
          )}
        </View>
      );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF8E8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    imageContainer: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    hiddenImage: {
        height: 0,
        width: 0
    }
});