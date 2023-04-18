import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/styles";

export default function RecipeCard({ recipe, screen }) {
    const navigation = useNavigation();

    const openRecipePage = (recipe) => {      
        if (screen === 'HomeScreen') {
          navigation.navigate('HomeRecipePageScreen', { recipe: recipe });
        } else if (screen === 'SearchScreen') {
          navigation.navigate('SearchRecipePageScreen', { recipe: recipe });
        } else if (screen === 'FavoritesScreen') {
          navigation.navigate('FavoritesRecipePageScreen', { recipe: recipe });
        }
    };

    return (
        <View>
            <TouchableOpacity
                key={recipe.id}
                onPress={() => openRecipePage(recipe)}
            >
                <View style={styles.recipeCardContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{uri: recipe.thumbnail_url}}
                        />
                    </View>
                    <Text style={styles.recipeCardTextFrontPage}>{recipe.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};