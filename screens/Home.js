import { useEffect, useState, useRef } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Animated } from 'react-native';
import { onValue, query, ref } from 'firebase/database';
import { getUserDetails } from '../components/Auth';
import { db, USERS_REF } from '../firebase/Config';
import { API_KEY } from '../Api_Key';
import styles from '../styles/styles';
import RecipeCard from '../components/RecipeCard';
import { UseGreeting } from '../components/Greeting';

export default function Home() {

  const [username, setUsername] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const greeting = UseGreeting();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      setUsername(userDetails.username);
    };
    fetchUserDetails();
  }, []);

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
      {loading && <ActivityIndicator size="large" color="#000" />}
      {!loading && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <ScrollView>
            <View>
          <Text style={styles.greetingText}>{greeting} {username}!</Text>
          <Text style={styles.greetingText2}>Would you like to try some of these recipes?</Text>
            </View>
            <Text style={styles.titletext}>Trending{'\u{1F525}'}</Text>
            {categories.map((category, index) => (
              <View key={category.id}>
                {index > 0 && <View style={styles.categoryline}></View>}
                <Text style={styles.categoryname}>{category.name}</Text>
                {category.recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} screen={'HomeScreen'} />
                ))}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};
