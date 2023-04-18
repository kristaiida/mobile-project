import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/styles";


export default function RecipeCard({ recipe, screen }) {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);

    const openRecipePage = (recipe) => {      
        if (screen === 'HomeScreen') {
          navigation.navigate('HomeRecipePageScreen', { recipe: recipe });
        } else if (screen === 'SearchScreen') {
          navigation.navigate('SearchRecipePageScreen', { recipe: recipe });
        } else if (screen === 'FavoritesScreen') {
          navigation.navigate('FavoritesRecipePageScreen', { recipe: recipe });
        }
    };

    const handlePress = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <View>
            <TouchableOpacity
                key={recipe.id}
                onPress={() => openRecipePage(recipe)}
            >
                <View>
                    <Text>{recipe.name}</Text>
                    <TouchableOpacity onPress={handlePress}>
                        <Icon
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFavorite ? 'red' : 'black'}
                        />
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{uri: recipe.thumbnail_url}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};