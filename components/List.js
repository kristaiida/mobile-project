import React from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import styles from "../styles/styles";
import RecipeCard from "./RecipeCard";

const List = ({ searchPhrase, setClicked, data }) => {
  const formattedSearchPhrase = searchPhrase.trim().replace(/\s/g, "").toUpperCase();

  const filteredData = data.filter((item) => {
    const formattedItemName = item.name?.trim().replace(/\s/g, "")?.toUpperCase();
    const formattedItemDetails = item.details?.trim().replace(/\s/g, "")?.toUpperCase();

    return formattedItemName?.includes(formattedSearchPhrase) || formattedItemDetails?.includes(formattedSearchPhrase);
  });

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
    <SafeAreaView style={styles.list__container}>
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
            extraData={searchPhrase}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
  
};

export default List;