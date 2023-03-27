import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { API_KEY } from '../Api_Key';

export default function Home() {

    const [categories, setCategories] = useState([]);

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
                {categories.map(category => (
                <View style={{padding: 6}} key={category.id}>
                    <Text>{category.name}</Text>
                    {category.recipes.map(recipe => (
                        <View style={{padding: 4}} key={recipe.id}>
                            <Text>{recipe.name}</Text>
                            <View style={styles.imageContainer}>
                                {loadedImages.includes(recipe.id) ? (
                                    <Image
                                        style={styles.image}
                                        source={{uri: recipe.thumbnail_url}}
                                    />
                                ) : (
                                    <Text>Loading image...</Text>
                                )}
                            </View>
                            <Image
                                onLoad={() => handleImageLoad(recipe.id)}
                                style={styles.hiddenImage}
                                source={{uri: recipe.thumbnail_url}}
                            />
                        </View>
                    ))}
                </View>
                ))}
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        height: 50,
        width: 50
    },
    hiddenImage: {
        height: 0,
        width: 0
    }
});