import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import List from "../components/List";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api
  useEffect(() => {
    const criteria = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q='
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '768eaa66acmsh8f3f429f4e24c03p171066jsnfe12c7be9e03',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };
    
    fetch(criteria + searchPhrase, options)
      .then(response => response.json())
      .then(
        (result) => {
            setFakeData(result.results)
        },
        (error) => {
            console.log(error);
        }
    );
}, [searchPhrase]);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Recipes</Text>}

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
        
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
    paddingTop: 25,
  },
});