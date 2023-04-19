import React from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import styles from "../styles/styles";
import RecipeCard from "./RecipeCard";

const List = ({ searchPhrase, setClicked, data, navigation, screen }) => {
  const formattedSearchPhrase = searchPhrase.trim().replace(/\s/g, "").toUpperCase();

  const filteredData = data.filter((item) => {
    const formattedItemName = item.name?.trim().replace(/\s/g, "")?.toUpperCase();
    const formattedItemDetails = item.details?.trim().replace(/\s/g, "")?.toUpperCase();

    return formattedItemName?.includes(formattedSearchPhrase) || formattedItemDetails?.includes(formattedSearchPhrase);
  });

  const openRecipePageFromList = (recipe) => {     
    console.log('Navigating to screen:', recipe.screen); // Add this line to print the screen name to console
  
    if (screen === 'SearchScreen') {
      navigation.navigate('SearchRecipePageScreen', { recipe: recipe });
    } else if (screen === 'FavoritesScreen') {
      navigation.navigate('FavoritesRecipePageScreen', { recipe: recipe });
    }
};

  const renderItem = ({ item }) => {
    const itemName = item.name?.trim();
    const itemDetails = item.details?.trim();

    if (!itemName && !itemDetails) {
      return null;
    }

    return (
      <RecipeCard
        key={item.id}
        recipe={{ name: itemName, details: itemDetails, thumbnail_url: item.thumbnail_url }}
        screen={'SearchScreen'}
        onPress={() => openRecipePageFromList(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={searchPhrase}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;