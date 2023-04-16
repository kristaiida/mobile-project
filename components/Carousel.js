import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import axios from 'axios';
import { API_KEY } from '../Api_Key';
import styles from '../styles/styles';

const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/tags/list',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
};

const unwantedTypes = ['business_tags', 'cooking_style', 'feature_page', 'seo', 'occasion', 'equipment', 'difficulty', 'appliance'];

const transformType = (type) => {
  return type.replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CarouselScreen = () => {
  const [categories, setCategories] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  
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

  const renderCategory = ({ item, index }, parallaxProps) => {
    const isActive = index === activeSlide;
    return (
      <View style={styles.slideC}>
        <Text style={[styles.textC, isActive && styles.activeTextC]}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={categories}
        renderItem={renderCategory}
        sliderWidth={400}
        itemWidth={200}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </View>
  );
};

export default CarouselScreen;
