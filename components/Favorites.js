import { StyleSheet, Text, View } from 'react-native';
import CarouselScreen from './Carousel';

export default function Favorites() {

  return (
    <View style={styles.container}>
      <CarouselScreen></CarouselScreen>
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