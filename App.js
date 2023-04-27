import React from 'react';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Profile from './screens/Profile';
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

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={({ navigation, route }) => ({
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              title="Profile"
            />
          ),
        })}
      />
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
        name="ProfileRecipePageScreen"
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
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'home'
                      : 'home-outline';
                  } else if (route.name === 'Search') {
                    iconName = focused
                      ? 'search-circle'
                      : 'search-circle-outline';
                  } else if (route.name === 'Profile') {
                    iconName = focused
                      ? 'person-circle'
                      : 'person-circle-outline';
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
              <Tab.Screen name="Profile" component={ProfileStack} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};