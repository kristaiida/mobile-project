import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { API_KEY } from '../Api_Key';
import CarouselScreen from '../components/Carousel';
import RecipeCard from '../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import styles from '../styles/styles';

export default function Home() {

    const [categories, setCategories] = useState([]);

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    };

    const handleImagePress = (recipe) => {
        navigation.navigate('RecipePage', { recipe });
      };

    const navigation = useNavigation();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        fetch('https://tasty.p.rapidapi.com/feeds/list?size=20&timezone=%2B0700&vegetarian=false&from=0', options)
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

    return (
        <View>
          <Header />
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
                          <Image
                            style={styles.image}
                            source={{uri: recipe.thumbnail_url}}
                            onPress={() => handleImagePress(recipe)}
                          />
                        </View>
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
        </View>
      );

};