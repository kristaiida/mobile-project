import { View, Text } from 'react-native';
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
      <Text style={[styles.headerFont, {fontFamily: 'kaushanScript'}]}>RecipePal</Text>
    </View>
  );
}