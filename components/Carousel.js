import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { API_KEY } from '../Api_Key';

const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/tags/list',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
};

const unwantedTypes = ['business_tags', 'cooking_style', 'feature_page', 'seo', 'occasion'];

const transformType = (type) => {
  return type.replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CarouselScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.request(options).then(function (response) {
      const { results } = response.data;
      const uniqueTypesSet = new Set();
      results.forEach(result => {
        const { type } = result;
        if (!unwantedTypes.includes(type)) {
          uniqueTypesSet.add(transformType(type));
        }
      });
      const uniqueTypes = Array.from(uniqueTypesSet);
      setCategories(uniqueTypes);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  const renderCategory = ({ item }) => (
    <View style={{ backgroundColor: '#fff', height: 100, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        data={categories}
        renderItem={renderCategory}
        sliderWidth={400}
        itemWidth={200}
      />
    </View>
  );
};

export default CarouselScreen;