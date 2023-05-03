import React from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import styles from "../styles/styles";
import RecipeCard from "./RecipeCard";

const List = ({ searchPhrase, tags, setClicked, data }) => {

  const renderItem = ({ item }) => {
    const itemName = item.name?.trim();

    if (!itemName) {
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
    <View style={styles.listC}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={[searchPhrase, tags]}
          />
      </View>
    </View>
  );
};

export default List;