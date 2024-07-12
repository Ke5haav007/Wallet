import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {ethers} from 'ethers';
import SecureStorage from 'rn-secure-storage';
import CryptoJS from 'crypto-js';

const ConfirmSeedPhrase = ({navigation, route}) => {
  const {seedPhrase} = route.params;
  const [accounts, setAccounts] = useState([]);
  const [inputPhrase, setInputPhrase] = useState(new Array(12).fill(''));
  const [activeStep, setActiveStep] = useState(1);
  const [randomPosition, setRandomPosition] = useState(generateRandomNumber());

  // Function to generate a random number between 0 and 11 (inclusive)
  function generateRandomNumber() {
    return Math.floor(Math.random() * 12);
  }

  // Function to handle input change for seed phrase
  const handleWordChange = text => {
    const newInputPhrase = [...inputPhrase];
    newInputPhrase[randomPosition] = text.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    setInputPhrase(newInputPhrase);
  };

  // Function to handle navigation to next step
  const handleNext = async () => {
    // Check if the entered phrase matches the seed phrase at the current random position
    if (inputPhrase[randomPosition] === seedPhrase[randomPosition]) {
      // If correct, proceed to the next step or navigate to success page if all steps are completed
      if (activeStep === 3) {
        try {
          const mnemonic = seedPhrase.join(' ');
          const isValid = ethers.utils.isValidMnemonic(mnemonic);
          if (isValid) {
            const rootNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
  
            // Fetch all 25 accounts from the seed phrase and store them locally
            const newAccounts = [];
            for (let i = 0; i < 25; i++) {
              const childNode = rootNode.derivePath(`m/44'/60'/0'/0/${i}`);
              const newAccount = {
                name: `Account ${accounts.length + i + 1}`, // Naming convention or use newAccountName
                address: childNode.address,
                encryptedPrivateKey: CryptoJS.AES.encrypt(
                  childNode.privateKey,
                  'your-secret-key'
                ).toString(),
              };
              newAccounts.push(newAccount);
            }
            const updatedAccounts = [...accounts, ...newAccounts];
            setAccounts(updatedAccounts);
            await SecureStorage.setItem('accounts', JSON.stringify(updatedAccounts));
            await SecureStorage.setItem('seedPhraseVerified', 'true');
            
            Alert.alert('Verification passed', 'Seed phrase is verified by ethers.js');
            navigation.replace('SuccessSeedPhrase');
          } else {
            Alert.alert('Verification failed', 'Seed phrase is not verified by ethers.js');
          }
        } catch (error) {
          console.error('Error verifying seed phrase:', error);
          Alert.alert('Verification Failed', 'An error occurred while verifying seed phrase');
        }
      } else {
        // Otherwise, move to the next random position and reset input
        setRandomPosition(generateRandomNumber());
        setInputPhrase(new Array(12).fill(''));
        setActiveStep(activeStep + 1);
      }
    } else {
      Alert.alert('Verification Failed', 'The entered phrase does not match the seed phrase.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View
          style={[
            styles.rectangle,
            activeStep >= 1 && styles.activeRectangle,
          ]}></View>
        <View
          style={[
            styles.rectangle,
            activeStep >= 2 && styles.activeRectangle,
          ]}></View>
        <View
          style={[
            styles.rectangle,
            activeStep === 3 && styles.activeRectangle,
          ]}></View>
      </View>
      <Text style={styles.title}>Confirm Seed Phrase</Text>
      <Text style={styles.description}>
        Select each word in the order it was presented to you
      </Text>
      <View style={styles.promptContainer}>
        <Text style={styles.promptNumber}>{randomPosition + 1}.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter word"
          onChangeText={handleWordChange}
          editable={activeStep <= 3}
          value={inputPhrase[randomPosition]}
        />
      </View>
      <View style={styles.rectanglesContainer}>
        {inputPhrase.map((word, index) => (
          <View
            key={index}
            style={[
              styles.rectangle,
              {
                backgroundColor:
                  randomPosition === index ? '#FEBF32' : '#222531',
              },
            ]}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          activeStep <= 3 &&
          inputPhrase[randomPosition] === seedPhrase[randomPosition]
            ? styles.activeButton
            : styles.disabledButton,
        ]}
        onPress={handleNext}
        disabled={
          !(
            activeStep <= 3 &&
            inputPhrase[randomPosition] === seedPhrase[randomPosition]
          )
        }>
        <Text style={styles.buttonText}>
          {activeStep === 3 ? 'Next' : 'Continue'}
        </Text>
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
  activeRectangle: {
    backgroundColor: '#FEBF32',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 16,
    marginTop: 30,
  },
  description: {
    width: '80%',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#ABAFC4',
    marginBottom: 16,
  },
  promptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 30,
  },
  promptNumber: {
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 56,
    color: '#888DAA',
    marginRight: 8,
    marginTop: 30,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#888DAA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 30,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4C4C4', // Initial disabled color
    borderRadius: 8,
    marginTop: 80,
  },
  activeButton: {
    backgroundColor: '#FEBF32',
  },
  disabledButton: {
    backgroundColor: '#C4C4C4',
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

export default ConfirmSeedPhrase;
