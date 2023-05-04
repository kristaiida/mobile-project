import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { getUserDetails } from '../components/Auth';
import { API_KEY } from '../Api_Key';
import styles from '../styles/styles';
import RecipeCard from '../components/RecipeCard';
import { UseGreeting } from '../components/Greeting';
import { Feather } from '@expo/vector-icons';

export default function Home() {

  const [username, setUsername] = useState('');
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { greeting, meal, emoji } = UseGreeting();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      setUsername(userDetails.username);
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (meal !== '') { // add a condition to check if meal is not an empty string
      const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=30&tags=' + meal;
      console.log(url);
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      };
      fetch(url, options)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          };
        })
        .then(
          (result) => {
            const apiMeals = [];
            for (let i = 0; i < result.results.length; i++) {
              if (!result.results[i].recipes) {
                apiMeals.push(result.results[i]);
              };
            };
            setMeals(apiMeals);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [meal]);    

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
          setLoading(false); // Set loading to false when data is fetched
          Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 500,
              useNativeDriver: true
            }
          ).start();
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <View style={styles.homeScreenContainer}>
      {loading &&
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      }
      {!loading && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <ScrollView>
            <View style={{marginVertical: 10}}>
              <View style={{marginTop: 5, marginBottom: 12}}>
                <Text style={styles.greetingText}>{greeting} {username}!</Text>
                <Text style={styles.greetingText2}>Time for <Text style={{fontWeight: '700'}}>{meal}</Text> {emoji}</Text>
              </View>
              <View>
                <ScrollView horizontal={true}>
                  {meals.map((meal) => (
                    <RecipeCard key={meal.id} recipe={meal} screen={'HomeScreen'} />
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.greetingText}>Trending recipes {'\u{1F525}'}</Text>
            </View>
            {categories.map((category, index) => (
              <View key={category.id}>
                {index > 0 && <View style={styles.lineRC2}></View>}
                <View>
                  <Text style={styles.titletext2}>{category.name}</Text>
                </View>
                <ScrollView horizontal={true}>
                  {category.recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} screen={'HomeScreen'} />
                  ))}
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};
