import React, { useState, useEffect } from 'react';
import { View, Text, ViewPropTypes } from 'react-native';
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

const CarouselScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.request(options).then(function (response) {
      setCategories(response.data.results);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  const renderCategory = ({ item }) => (
    <View style={{ backgroundColor: '#fff', height: 100, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{item.display_name}</Text>
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