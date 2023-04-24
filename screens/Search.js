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
  const [stillData, setStillData] = useState([]);

  useEffect(() => {
    const criteria = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&q='
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
          const filteredResults = [];
          for (let i = 0; i < result.results.length; i++) {
            if (!result.results[i].recipes) {
              filteredResults.push(result.results[i]);
            }
          }
          setStillData(filteredResults);
        },
        (error) => {
          console.log(error);
        }
      );
    }, [searchPhrase]);

    return (
      <View>
        <SafeAreaView style={styles.searchC}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
          { stillData.length === 0 ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <List
              searchPhrase={searchPhrase}
              data={stillData}
              setClicked={setClicked}
            />
          ) }
        </SafeAreaView>
      </View>
    );
}

export default Search;