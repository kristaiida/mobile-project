import React, { useState, useEffect, useCallback } from "react";
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
  const [selectedTags, setSelectedTags] = useState([]);

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
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };
  
    const criteria = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=30';
    let queryString = '';
  
    if (searchPhrase) {
      queryString += '&q=' + searchPhrase;
    }
  
    if (selectedTags.length > 0) {
      const tagNames = selectedTags.map(tag => tag.name).join(',');
      queryString += '&tags=' + tagNames;
    }
  
    const fetchData = () => {
      fetch(criteria + queryString, options)
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
            console.log(selectedTags);
            console.log(criteria + queryString);
          },
          (error) => {
            console.log(error);
          }
        );
    };
  
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [searchPhrase, selectedTags]);  
  
  
    const handleShowTagTypes = () => {
      setShowTagTypes(!showTagTypes);
    };
    
    const handleShowTags = (type) => {
      setShowTags((prev) => {
        const newState = Object.assign({}, prev);
        newState[type] = !newState[type];
        return newState;
      })      
    };

    const handleTagSelect = useCallback((tag) => {
      setSelectedTags((prev) => [...prev, tag]);
    }, []);

    return (
      <View style={styles.searchScreenContainer}>
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
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {selectedTags.map((tag) => (
            <CheckBox
              key={tag.id}
              title={tag.display_name}
              checked={selectedTags.some((t) => t.id === tag.id)}
              onPress={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
                } else {
                  handleTagSelect(tag);
                }
              }}              
            />
          ))}
        </View>
        <View>
          { stillData.length === 0 ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <List
              searchPhrase={searchPhrase}
              tags={selectedTags}
              data={stillData}
              setClicked={setClicked}
            />
          ) }
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
                        <ScrollView>
                          {showTags[type] && (
                            <View>
                              {tags
                                .filter((tag) => tag.type === type.toLowerCase().replace(/\s+/g, '_'))
                                .map((tag) => (
                                  <View key={tag.id} style={styles.tagContainer}>
                                    <CheckBox
                                      key={tag.id}
                                      title={tag.display_name}
                                      checked={selectedTags.some((t) => t.id === tag.id)}
                                      onPress={() => {
                                        if (selectedTags.includes(tag)) {
                                          setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
                                        } else {
                                          handleTagSelect(tag);
                                        }
                                      }}
                                    />
                                  </View>
                                ))}
                            </View>
                          )}
                        </ScrollView>
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
      </View>
    );
    
}

export default Search;