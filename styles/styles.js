import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({

// Header and overall
  header: {
    backgroundColor: '#94B49F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'android' ? 80 : 45,
    paddingTop: Platform.OS === 'ios' ? 10 : 0
  },
  headerFont: {
    fontSize: 30,
    width: 150,
    height: 45,
    paddingLeft: 7
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    paddingRight: 7
  },
  fontAndLogo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 0
  },
  homeScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20
  },
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: "center",
    marginLeft: 18,
    marginBottom: 15,
    marginTop: 5
  },
// Search
  listC: {
    height: "90%",
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
    width: "100%",
    marginTop: 20,
    marginLeft: "10%",
    paddingTop: 25,
  },
  searchScreenContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  searchBar_unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar_clicked: {
    padding: 10,
    flexDirection: "row",
    width: "75%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: 'space-evenly'
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },

// Recipe card
  image: {
    height: 150,
    width: 120,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  description: {
    fontSize: 14,
  },
  hiddenImage: {
    height: 0,
    width: 0
  },
  recipeCardContainer: {
    flexDirection: "row",
    width: "45%",
  },
  recipeCardTextFrontPage: {
    marginTop: 0,
    verticalAlign: "middle",
    marginBottom: 15,
    fontWeight: "bold"
  },
  heartIcon : {
    color: "red",
  },

//Recipe Page
containerRC: {
  backgroundColor: '#fff',
  borderRadius: 0,
  elevation: 2,
  flexDirection: 'column',
  marginVertical: 0,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
},
imageContainer: {
  width: "100%",
  height: 170
},
imageRC: {
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
},
lineRC: {
  backgroundColor: '#94B49F',
  height: 5,
  width: '93%',
  marginBottom: 10,
  marginTop: 10,
  alignSelf: 'center',
},
textContainer: {
  flex: 1,
  flexDirection: 'column',
  padding: 10,
  alignItems: "center"
},
titleRC: {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 10,
  marginBottom: 5,
},
descriptionRC: {
  fontSize: 16,
  fontStyle: 'italic',
},
ingTitle: {
 fontSize: 20,
 fontWeight: 'bold',
 marginBottom: 10,
 marginLeft: 10,
},
ingText: {
  fontSize: 16,
  marginLeft: 10,
  marginBottom: 10,
},
titletext: {
  fontSize: 26,
  fontWeight: 'bold',
  marginVertical: 10,
},
categoryname: {
  fontSize: 20,
  fontWeight: 'bold',
  marginVertical: 10,
},
categoryline: {
  backgroundColor: '#94B49F',
  height: 5,
  width: 500,
  marginBottom: 10,
},
heartIcon: {
  position: 'absolute',
  bottom: 120,
  left: 300,
},
shareIcon: {
  position: 'absolute',
  bottom: 80,
  left: 300,
},
trashIcon: {
  position: 'absolute',
  bottom: 60,
  left: 300,
},

//Favorite.js, more in favStyles.js as those can't be in this file
  deleteAllButton: {
    backgroundColor: '#94B49F',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
  },
  deleteAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recipeDescription: {
    fontSize: 14,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  recipeCardContainerF: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    padding: 10,
    width: '95%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 50,
    height: '80%'
  },
  modalContent: {
    justifyContent: 'space-evenly'
  },  
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5
  },
  modalButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  tagType: {
    padding: 5
  },
  tagTypesContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: '90%'
  },
  tagTypeContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  filterTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tagContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  // Greeting
  greetingText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  greetingText2 : {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLogo: {
    height: 125,
    width: 125,
    marginBottom: 20
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  loginInputContainer: {
    width: '80%',
    marginBottom: 16,
  },
  loginInputLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loginInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    height: 48,
  },
  loginButtonContainer: {
    width: '80%',
    marginTop: 16,
  },
  loginButton: {
    backgroundColor: '#94B49F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginRegisterContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  loginRegisterText: {
    fontSize: 16,
  },
  loginRegisterLink: {
    color: '#94B49F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // Profile.js
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profileContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#94B49F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: 200,
    textAlign: 'center',
  },
  profileLogout: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  profileLogoutWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },

});