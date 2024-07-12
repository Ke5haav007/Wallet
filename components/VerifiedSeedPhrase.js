import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const VerifiedSeedPhrase = () => {
  const navigation= useNavigation()
  const mainPage=()=>{
    navigation.navigate('MainPage')
  }
  return (
    <View style={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
      <Text style={styles.header}>Success!</Text>
      <Text style={styles.description}>
        You've successfully protected your wallet. Remember to keep your seed phrase safe, it's your responsibility!
      </Text>
      <Text style={styles.description}>
        DefiSquid cannot recover your wallet should you lose it. You can find your seedphrase in Settings {">"} Security & Privacy.
      </Text>
      <TouchableOpacity style={styles.verifyButton} onPress={mainPage}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  rectanglesContainer: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  rectangle: {
    flex: 1,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#222531',
    marginHorizontal: 2,
  },
  header: {
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 56,
    textAlign: 'center',
    background: 'linear-gradient(91deg, #A9CDFF 0%, #72F6D1 21.87%, #A0ED8D 55.73%, #FED365 81.77%, #FAA49E 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    marginBottom: 16,
  },
  description: {
    width: 295,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 16,
  },
  verifyButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEBF32',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
  },
});

export default VerifiedSeedPhrase;
