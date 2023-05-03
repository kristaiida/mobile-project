import { StyleSheet } from "react-native";

const customStyles = StyleSheet.create({
  noFavoritesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 20
  },
  noFavoritesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  noFavoritesTextSmall: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    marginTop: 10,
  },
  favoritesContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
  },
});

export default customStyles;
