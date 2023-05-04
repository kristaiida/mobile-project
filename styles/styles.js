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
    marginLeft: 20,
    marginRight: 20
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 0
  },
  homeScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center'
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
    marginBottom: 126,
    flexDirection: 'column',
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0
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
    width: "80%",
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
    height: 120,
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
    width: "45%"
  },
  recipeCardTextFrontPage: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
    width: 150
  },
  heartIcon : {
    marginTop: 4,
    marginLeft: 3
  },
  trashIcon: {
    marginTop: 10
  },
//Recipe Page
containerRC: {
  backgroundColor: '#fff',
  borderRadius: 0,
  elevation: 2,
  flexDirection: 'column',
  marginTop: 0,
  marginBottom: 0,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
},
imageContainer: {
  height: 150,
},
imageRC: {
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
},
lineRC: {
  backgroundColor: '#94B49F',
  height: 5,
  width: '97%',
  marginBottom: 9,
  marginTop: 16,
  alignSelf: 'center',
},
lineRC2: {
  backgroundColor: '#94B49F',
  height: 3,
  width: '95%',
  marginBottom: 10,
  marginTop: 16,
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
  textAlign: 'center'
},
descriptionRC: {
  fontSize: 17,
  fontStyle: 'italic',
  textAlign: 'center',
  marginTop: 13,
  marginBottom: 5,
  marginLeft: 5,
  marginRight: 5
},
ingTitle: {
 fontSize: 21,
 fontWeight: 'bold',
 marginBottom: 10,
 marginLeft: 10,
 marginRight: 10
},
ingText: {
  fontSize: 18,
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10,
},
titletext: {
  fontSize: 22,
  fontWeight: 'bold',
  marginLeft: 15,
  marginRight: 15,
  marginTop: 15,
  textTransform: 'capitalize',
  marginBottom: 8
},
titletext2: {
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 15,
  marginRight: 15,
  marginTop: 10,
  textTransform: 'capitalize',
  marginBottom: 8,
},
categoryname: {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 10,
  marginLeft: 3,
  marginRight: 3,
  textTransform: 'capitalize',
  alignSelf: 'center'
},
categoryline: {
  backgroundColor: '#94B49F',
  height: 5,
  width: '97%',
  marginTop: 10,
  marginBottom: 12,
  alignSelf: 'center'
},
trashIcon: {
  left: "87%",
  bottom: 43
},
shareIcon: {
  marginTop: 20,
  color: "#04967d"
},

//Favorite.js, more in favStyles.js as those can't be in this file
  deleteAllButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    width: 100
  },
  deleteAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoritesText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 7
  },
  textAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16
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
    justifyContent: 'center'
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  recipeCardContainerF: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    padding: 10,
    justifyContent: 'space-around',
    },
  iconContainer: {
    flexDirection: 'column',
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
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 50,
    paddingBottom: 50,
    height: '80%'
  },
  modalContent: {
    justifyContent: 'space-evenly'
  },  
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
    alignSelf: 'center'
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
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15
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
    fontSize: 27,
    marginTop: 18,
    marginLeft: 15,
    marginRight: 15
  },
  greetingText2 : {
    fontWeight: '500',
    fontSize: 19,
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 40
  },
  loginLogo: {
    height: 125,
    width: 125,
    marginBottom: 20,
    marginTop: 70
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  signUpTitle: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  loginFont: {
    fontSize: 40,
    width: 200,
    height: 60,
    paddingLeft: 12,
    marginBottom: 10
  },
  loginInputContainer: {
    width: '80%',
    marginBottom: 16,
  },
  signUpInputContainer: {
    width: '85%',
    marginBottom: 16
  },
  loginLogoAndTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
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
    width: '70%',
    marginTop: 15,
  },
  loginButton: {
    backgroundColor: '#94B49F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10
  },
  loginRegisterContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20
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
    marginTop: 30,
    marginBottom: 10
  },
  profileContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 15,
    marginBottom: 15
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 15,
    marginBottom: 15
  },
  profilePicture2: {
    width: 90,
    height: 90,
    borderRadius: 75,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  profilePictureSelected: {
    width: 90,
    height: 90,
    borderRadius: 75,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#94B49F',
    borderWidth: 4
  },
  profileButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#94B49F',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
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
    paddingBottom: 20
  },

  changePWText : {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 210,
    textAlign: "center"
  }, 

});