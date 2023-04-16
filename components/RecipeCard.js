import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/styles";

export default function RecipeCard({ recipe }) {

    const navigation = useNavigation();

    const openRecipePage = (recipe) => {
        navigation.navigate('RecipePage', { recipe: recipe });
    };

    return (
        <View>
            <TouchableOpacity
                key={recipe.id}
                onPress={() => openRecipePage(recipe)}
            >
                <View>
                    <Text>{recipe.name}</Text>
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