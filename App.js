import React from 'react';
import Home from './components/Home';
import Search from './components/Search';
import Favorites from './components/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
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
            } else if (route.name === 'Favorites') {
              iconName = focused
              ? 'heart'
              : 'heart-outline';
            };
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'turquoise',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
    
)};