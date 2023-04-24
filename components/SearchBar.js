import React from "react";
import { TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import styles from "../styles/styles";


const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar_unclicked
            : styles.searchBar_clicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
        
        {props.clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              props.setSearchPhrase("")
          }}/>
        )}
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default SearchBar;