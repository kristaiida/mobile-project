import { StyleSheet, Text, View } from 'react-native';
import CarouselScreen from '../components/Carousel';
import Header from '../components/Header';

export default function Favorites() {

  return (
    <View style={styles.container}>
      <Header />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});