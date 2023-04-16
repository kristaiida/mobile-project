import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView, ActivityIndicator } from "react-native";
import Header from '../components/Header';

import List from "../components/List";
import SearchBar from "../components/SearchBar";
import styles from "../styles/styles";

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
    <View>
      <SafeAreaView style={styles.root}>

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
    </View>
  );
};

export default Search;