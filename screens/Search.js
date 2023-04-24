import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { API_KEY } from '../Api_Key';
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import styles from "../styles/styles";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [stillData, setStillData] = useState([]);
  const [tagTypes, setTagTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const [showTagTypes, setShowTagTypes] = useState(false);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };
  
    fetch('https://tasty.p.rapidapi.com/tags/list', options)
      .then(response => response.json())
      .then(data => {
        const tagTypes = [];
        const tags = [];
  
        data.results.forEach(tag => {
          const tagType = tag.type.charAt(0).toUpperCase() + tag.type.slice(1).replace(/_/g, ' ');
          
          if (!tagTypes.includes(tagType) && tag.type !== 'seo') {
            tagTypes.push(tagType);
          }
          tags.push(tag);
        });
  
        setTagTypes(tagTypes);
        setTags(tags);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);  

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

    const handleShowTagTypes = () => {
      setShowTagTypes(!showTagTypes);
    };
    
    const handleShowTags = (type) => {
      setShowTags((prev) => {
        const newState = {...prev};
        newState[type] = !newState[type];
        return newState;
      })
    };

    return (
      <View>
        <SafeAreaView style={styles.searchC}>
          <View style={styles.searchContainer}>
              <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
              />
              <Feather
                name="filter"
                size={24}
                color="black"
                onPress={handleShowTagTypes}
              />
          </View>
          <Modal
            visible={showTagTypes}
            animationType="fade"
            onRequestClose={() => setShowTagTypes(false)}
            transparent={true}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.filterTitle}>
                    <Feather name="filter" size={20} color="black" />
                    <Text style={styles.modalTitle}>Filters</Text>
                  </View>
                  <View style={styles.tagTypesContainer}>
                    <ScrollView>
                      {tagTypes.map((type) => (
                        <View key={type}>
                          <TouchableOpacity key={type} style={styles.tagTypeContainer} onPress={() => handleShowTags(type)}>
                            <Text key={type} style={styles.tagType}>{type}</Text>
                            <Feather name="chevron-down" size={24} color="black" />
                          </TouchableOpacity>
                          {showTags[type] && (
                            <ScrollView>
                              {tags
                               .filter((tag) => tag.type === type.toLowerCase().replace(/\s+/g, '_'))
                               .map((tag) => (
                                <View key={tag.id} style={styles.tagContainer}>
                                  <Text key={tag.id}>{tag.display_name}</Text>
                                  <CheckBox
                                    checked={false}
                                    containerStyle={{ marginVertical: 0, paddingVertical: 0 }}
                                  />
                                </View>
                               ))
                              }
                            </ScrollView>
                          )}
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowTagTypes(false)}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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