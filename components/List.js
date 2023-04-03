import React from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import styles from "../styles/styles";

const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

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

    return <Item name={itemName} details={itemDetails} />;
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