//these styles are used in favorites.js, when favorites site are empty

import { StyleSheet } from "react-native";

const customStyles = StyleSheet.create({
    noFavoritesContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 20
    },
    noFavoritesText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#555',
      textAlign: 'center'
    },
    favoritesContainer: {
      paddingTop: 20,
      paddingBottom: 20,
      flex: 1,
    },
  });
  
  export default customStyles;