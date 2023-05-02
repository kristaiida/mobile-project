import React from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import styles from "../styles/styles";
import RecipeCard from "./RecipeCard";

const List = ({ searchPhrase, tags, setClicked, data }) => {
  const formattedSearchPhrase = searchPhrase.trim().replace(/\s/g, "").toUpperCase();

  const filteredData = data.filter((item) => {
    const formattedItemName = item.name?.trim().replace(/\s/g, "")?.toUpperCase();
    const formattedItemDetails = item.details?.trim().replace(/\s/g, "")?.toUpperCase();

    // Check if the item's name or details include the search phrase
    const matchesSearchPhrase = formattedItemName?.includes(formattedSearchPhrase) || formattedItemDetails?.includes(formattedSearchPhrase);

    // Check if the item's tags include all of the selected tags
    const hasSelectedTags = tags.length === 0 || tags.every(tag => item.tags?.includes(tag.name));

    return matchesSearchPhrase && hasSelectedTags;
  });

  console.log(filteredData); // Add this line to log filteredData

  const renderItem = ({ item }) => {
    const itemName = item.name?.trim();
    const itemDetails = item.details?.trim();

    if (!itemName && !itemDetails) {
      return null;
    }

    return (
      <RecipeCard
        key={item.id}
        recipe={item}
        screen={'SearchScreen'}
      />
    );
  };

  return (
    <SafeAreaView style={styles.listC}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        {filteredData ? (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={[searchPhrase, tags]}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default List;