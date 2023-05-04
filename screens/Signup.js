import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { signUp } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import chef1 from '../assets/chef1.png';
import chef2 from '../assets/chef2.png';
import chef3 from '../assets/chef3.png';
import styles from '../styles/styles';

export default function Signup({ navigation }) {
  const [selectedPictureIndex, setSelectedPictureIndex] = useState(-1);
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pictureRefs, setPictureRefs] = useState([null, null, null]); // add this line
  const chefImages = [chef1, chef2, chef3];
  const screenWidth = Dimensions.get('window').width;

  const handlePress = () => {
    if (!username) {
      Alert.alert('Username is required.');
    } else if (!email) {
      Alert.alert('Email is required.');
    } else if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
    } else {
      signUp(username, email, password, profilePicture);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate('Main');
        };
      });
    };
  };

  const handleProfilePicturePress = (index) => {
    if (index === selectedPictureIndex) {
      setProfilePicture(null);
      setSelectedPictureIndex(-1);
      let pictureRefs = [chef1Ref, chef2Ref, chef3Ref];
      pictureRefs[index].setNativeProps({
        style: styles.profilePicture2
      });
    } else {
      setProfilePicture(chefImages[index]);
      setSelectedPictureIndex(index);
      if (selectedPictureIndex !== -1) {
        let pictureRefs = [chef1Ref, chef2Ref, chef3Ref];
        pictureRefs[selectedPictureIndex].setNativeProps({
          style: styles.profilePicture2
        });
      }
      let pictureRefs = [chef1Ref, chef2Ref, chef3Ref];
      pictureRefs[index].setNativeProps({
        style: styles.profilePictureSelected
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.signUpContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.loginLogoAndTextContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.loginLogo}
          />
          <Text style={styles.signUpTitle}>Signup</Text>
        </View>
          <View style={styles.signUpInputContainer}>
            <Text style={styles.loginInputLabel}>Profile Picture</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {[chef1, chef2, chef3].map((chef, index) => (
              <TouchableOpacity key={index} onPress={() => handleProfilePicturePress(index)}>
                <Image 
                  ref={(ref) => {
                    pictureRefs[index] = ref;
                    if (index === 0) {
                      chef1Ref = ref;
                    } else if (index === 1) {
                      chef2Ref = ref;
                    } else {
                      chef3Ref = ref;
                    }
                  }}
                  source={chef} 
                  style={index === selectedPictureIndex ? styles.profilePictureSelected : styles.profilePicture2} 
                />
              </TouchableOpacity>
            ))}
            </View>
          </View>
          <View style={styles.signUpInputContainer}>
            <Text style={styles.loginInputLabel}>Username *</Text>
            <TextInput
              style={styles.loginInput}
              placeholder='Username'
              onChangeText={(username) => setUsername(username)}
              value={username}
            />
        </View>
        <View style={styles.signUpInputContainer}>
          <Text style={styles.loginInputLabel}>Email *</Text>
          <TextInput
            style={styles.loginInput}
            placeholder='Email'
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        <View style={styles.signUpInputContainer}>
          <Text style={styles.loginInputLabel}>Password *</Text>
          <TextInput
            style={styles.loginInput}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
        </View>
        <View style={styles.signUpInputContainer}>
          <Text style={styles.loginInputLabel}>Confirm Password *</Text>
          <TextInput
            style={styles.loginInput}
            placeholder='Confirm Password'
            secureTextEntry={true}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            value={confirmPassword}
          />
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
            <Text style={styles.loginButtonText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginRegisterContainer}>
          <Text style={styles.loginRegisterText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginRegisterLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}