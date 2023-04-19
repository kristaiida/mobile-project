import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { API_KEY } from '../Api_Key';
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import styles from "../styles/styles";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [stillData, setStillData] = useState();

  useEffect(() => {
    const criteria = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q='
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };
    
    fetch(criteria + searchPhrase, options)
      .then(response => response.json())
      .then(
        (result) => {
            setStillData(result.results)
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
        {!stillData ? (
          <ActivityIndicator size="large" />
        ) : (
          
            <List
              searchPhrase={searchPhrase}
              data={stillData}
              setClicked={setClicked}
            />
          
        )}
      </SafeAreaView>
    </View>
  );
};

export default Search;