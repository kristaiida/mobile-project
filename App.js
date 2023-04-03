import React from 'react';
import Home from './screens/Home';
import Search from './screens/Search';
import Favorites from './screens/Favorites';
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
          headerShown: false,
          tabBarStyle: { backgroundColor: '#94B49F', height: 90 },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#474747c0'
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
    
)};