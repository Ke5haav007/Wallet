import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SecureWallet = () => {
  const navigation = useNavigation();

  const navigateToSecureWallet2 = () => {
    navigation.navigate('SecureWallet2');
  };

  return (
    <View style={styles.container}>
      {/* Section with arrows and rectangles */}
      <View style={styles.arrowsContainer}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <View style={styles.rectangle} />
        <View style={styles.rectangle} />
        <View style={styles.rectangle} />
        <Ionicons name="arrow-forward" size={24} color="white" />
      </View>

      {/* Image */}
      <Image source={require('../assets/shield.png')} style={styles.image} />

      {/* Secure Your Wallet text */}
      <Text style={styles.title}>Secure Your CC Wallet</Text>

      {/* Description text 1 */}
      <Text style={styles.description}>
  Don't risk losing your funds. Protect your wallet by saving your{' '}
  <Text style={{ color: '#5F97FF' }}>Seed phrase</Text>{' '}
  in a place you trust.
</Text>



      {/* Description text 2 */}
      <Text style={styles.description}>
        It's the only way to recover your wallet if you get locked out of the app or get a new device.
      </Text>

      {/* Remind Me Later button */}
      <TouchableOpacity style={styles.remindLaterButton} disabled={true}>
        <Text style={styles.buttonText}>Remind Me Later</Text>
      </TouchableOpacity>

      {/* Start button */}
      <TouchableOpacity style={styles.startButton} onPress={navigateToSecureWallet2}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    paddingTop: 50,
  },
  arrowsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  rectangle: {
    height: 8,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#222531',
    marginHorizontal: 2,
  },
  image: {
    width: 295,
    height: 295,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 24,
    marginBottom: 16,
    lineHeight: 20,
  },
  remindLaterButton: {
    width: '90%',
    height: 48,
    backgroundColor: '#FEBF32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  startButton: {
    width: '90%',
    height: 48,
    backgroundColor: '#FEBF32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
});

export default SecureWallet;
