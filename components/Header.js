import { View, Text, Image } from 'react-native';
import { useFonts } from 'expo-font';
import styles from '../styles/styles';
import { Constants } from 'expo-constants';

export default function Header() {
  const [fontLoaded] = useFonts({
    kaushanScript: require('../assets/fonts/KaushanScript-Regular.ttf'),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={[styles.header, {fontFamily: 'kaushanScript'}]}>
        <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
        />
      <Text style={[styles.headerFont, {fontFamily: 'kaushanScript'}]}>RecipePal</Text>
    </View>
  );
}