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
      width: 150,
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
  recipePageContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
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
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    alignItems: "center"
  },
  titleRC: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionRC: {
    fontSize: 14,
    
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
});
