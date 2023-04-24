import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
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
    width: Platform.OS === 'android' ? 150 : 132,
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
    list__container: {
        margin: 10,
        height: "90%",
        backgroundColor: '#fff',
        borderRadius: 0,
        elevation: 2,
        flexDirection: 'column',
        marginVertical: 0,
        overflow: 'hidden',
        width: '90%',
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
      root: {
        justifyContent: "center",
        alignItems: "center",
      },
      container: {
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        marginVertical: 8,
        overflow: 'hidden',
        width: '100%',
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
      },
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
      container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        
      },
      searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
      searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      },
    imageContainer: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
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
      marginBottom: 15,
      marginEnd: 10,
      verticalAlign: "middle",
      fontWeight: "bold",
      fontSize: 18
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
    marginBottom: 10,
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
    width: '100%',
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
});