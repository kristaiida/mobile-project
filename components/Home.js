import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { API_KEY } from '../Api_Key';

export default function Home() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        fetch('https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0', options)
        .then(response => response.json())
        .then(
            (result) => {
                setRecipes(result.results)
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {recipes.map(recipe => (
            recipe.min_items > 1
            ? (
                <View>
                    <Text>{recipe.type}</Text>
                </View>
            ) : (
                <Text></Text>
            )
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});