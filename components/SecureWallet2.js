import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SecureWallet2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
      
      <Text style={styles.title}>
        Secure Your CC Wallet
      </Text>

      <Text style={styles.subtitle}>
        Secure your wallet's <Text style={{ fontWeight: '600', color: '#5F97FF' }}>Seed Phrase</Text>
      </Text>

      <Text style={styles.manual}>
        Manual
      </Text>

      <Text style={styles.description}>
        Write down your seed phrase on a piece of paper and store in a safe place.
      </Text>

      <View style={styles.risksContainer}>
        <Text style={styles.risksTitle}>
          Risks are:
        </Text>
        <Text style={styles.risksItem}>• You lose it</Text>
        <Text style={styles.risksItem}>• You forget where you put it</Text>
        <Text style={styles.risksItem}>• Someone else finds it</Text>
      </View>

      <Text style={styles.otherOptions}>
        Other options: Doesn't have to be paper!
      </Text>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>
          Tips:
        </Text>
        <Text style={styles.tipsItem}>• Store in bank vault</Text>
        <Text style={styles.tipsItem}>• Store in a safe</Text>
        <Text style={styles.tipsItem}>• Store in multiple secret places</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('ViewSeedPhrase')}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'flex-start',
   padding:50
  },
  rectanglesContainer: {
    flexDirection: 'row',
    width: 303,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rectangle: {
    height: 8,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#222531',
    marginHorizontal: 2,
  },
  title: {
    width: 327,
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    lineHeight: 28,
    background: 'var(--Gradient-08, linear-gradient(91deg, #A9CDFF 0%, #72F6D1 21.87%, #A0ED8D 55.73%, #FED365 81.77%, #FAA49E 100%))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    width: 327,
    color: '#ABAFC4',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
  },
  manual: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },
  description: {
    width: 327,
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
    
  },
  risksContainer: {
    width: 327,
    marginBottom: 20,
    borderWidth:5,
    padding:20
  },
  risksTitle: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },
  risksItem: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
  },
  otherOptions: {
    width: 327,
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },
  tipsContainer: {
    width: 327,
    marginBottom: 20,
    borderWidth:5,
    padding:20
  },
  tipsTitle: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },
  tipsItem: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 20,
    width: 327,
  },
  startButton: {
    width: 327,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEBF32',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SecureWallet2;
