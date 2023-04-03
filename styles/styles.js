import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    slide: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#a8a8a8',
      
    },
    activeText: {
      color: '#000',
      textDecorationLine: 'underline',
    },
    list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
      },
      item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
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
    }
  });