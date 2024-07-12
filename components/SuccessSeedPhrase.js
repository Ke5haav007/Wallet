import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SuccessSeedPhrase = () => {
  const navigation = useNavigation();

  const nextSuccessPage = () => {
    navigation.replace('MainPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
   
      <Text style={styles.bigTitle}>Success!</Text>
      <Text style={styles.description}>
        Seed phrase confirmed successfully!
      </Text>
      <Text style={styles.infoText}>
        You've successfully protected your wallet. Remember to keep your seed phrase safe, it's your responsibility!
      </Text>
      <Text style={styles.infoText}>
      CC Wallet cannot recover your wallet should you lose it. You can find your seed phrase in Settings {">"} Security & Privacy.
      </Text>
      <TouchableOpacity style={styles.button} onPress={nextSuccessPage}>
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
  bigTitle: {
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 56,
    textAlign: 'center',
    color: '#FEBF32',
    marginBottom: 16,
    marginTop: 36,
    width: '80%',
    padding: 4,
  },
  description: {
    width: '80%',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#ABAFC4',
    marginBottom: 16,
  },
  infoText: {
    width: '80%',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 16,
  },
  button: {
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

export default SuccessSeedPhrase;
