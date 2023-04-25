import React from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Search from './screens/Search';
import Favorites from './screens/Favorites';
import RecipePage from './screens/RecipePage';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={({ navigation, route }) => ({
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              title="Home"
            />
          ),
        })}
      />
      <Stack.Screen
        name="HomeRecipePageScreen"
        component={RecipePage}
        options={({ navigation, route }) => ({
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              title="Recipe"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={({ navigation, route }) => ({
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              title="Search"
            />
          ),
        })}
      />
      <Stack.Screen
        name="SearchRecipePageScreen"
        component={RecipePage}
        options={({ navigation, route }) => ({
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              title="Recipe"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesScreen"
        component={Favorites}
        options={({ navigation, route }) => ({
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              title="Favorites"
            />
          ),
        })}
      />
      <Stack.Screen
        name="FavoritesRecipePageScreen"
        component={RecipePage}
        options={({ navigation, route }) => ({
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              title="Recipe"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Search') {
                    iconName = focused
                      ? 'search-circle'
                      : 'search-circle-outline';
                  } else if (route.name === 'Favorites') {
                    iconName = focused ? 'heart' : 'heart-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarStyle: { backgroundColor: '#94B49F' },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#474747c0',
              })}
            >
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Search" component={SearchStack} />
              <Tab.Screen name="Favorites" component={FavoritesStack} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};