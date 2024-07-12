import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ethers} from 'ethers';
import SecureStorage from 'rn-secure-storage';
import CryptoJS from 'crypto-js';

const ImportSeedPhrase = ({navigation}) => {
  const [seedPhrase, setSeedPhrase] = useState(new Array(12).fill(''));
  const [isVerified, setIsVerified] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newAccountName, setNewAccountName] = useState('');
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSeedPhraseVerified = async () => {
      try {
        const seedPhraseVerified = await SecureStorage.getItem(
          'seedPhraseVerified',
        );
        if (seedPhraseVerified) {
          navigation.replace('VerifiedSeedPhrase');
        }
      } catch (error) {
        console.error('Error checking seed phrase verification:', error);
      }
    };

    checkSeedPhraseVerified();
  }, []);

  const handleSeedPhraseChange = (text, index) => {
    const newSeedPhrase = [...seedPhrase];
    newSeedPhrase[index] = text;
    setSeedPhrase(newSeedPhrase);
  };

  const verifySeedPhrase = async () => {
    setLoading(true);
    try {
      const mnemonic = seedPhrase.join(' ');
      const isValid = ethers.utils.isValidMnemonic(mnemonic);
      setLoading(true);

      if (isValid) {
        setIsVerified(true);
        const rootNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

        const newAccounts = [];
        for (let i = 0; i < 25; i++) {
          const childNode = rootNode.derivePath(`m/44'/60'/0'/0/${i}`);
          const newAccount = {
            name: `Account ${accounts.length + i + 1}`,
            address: childNode.address,
            encryptedPrivateKey: CryptoJS.AES.encrypt(
              childNode.privateKey,
              'your-secret-key',
            ).toString(),
          };
          setLoading(true);
          newAccounts.push(newAccount);
        }

        const updatedAccounts = [...accounts, ...newAccounts];
        setAccounts(updatedAccounts);
        await SecureStorage.setItem(
          'accounts',
          JSON.stringify(updatedAccounts),
        );
        setNewAccountName('');
        setShowAccountModal(false);
        setSelectedAccount(newAccounts[0]);
        await SecureStorage.setItem('seedPhraseVerified', 'true');
        Alert.alert(
          'Verification passed',
          'Seed phrase is verified by ethers.js',
        );
        navigation.replace('VerifiedSeedPhrase');
      } else {
        setIsVerified(false);
        Alert.alert(
          'Verification Failed',
          'Seed phrase not verified by ethers.js',
        );
      }
    } catch (error) {
      console.error('Error verifying seed phrase:', error);
      setIsVerified(false);
      Alert.alert(
        'Verification Failed',
        'An error occurred while verifying seed phrase',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
      <Text style={styles.header}>
        Write down the Seed Phrase for your CC Wallet
      </Text>
      <View style={styles.seedPhraseContainer}>
        {seedPhrase.map((word, index) => (
          <TextInput
            key={index}
            style={styles.seedPhraseBox}
            placeholder={`Word ${index + 1}`}
            onChangeText={text => handleSeedPhraseChange(text, index)}
            value={word}
            maxLength={20}
            autoFocus={index === 0}
          />
        ))}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FEBF32" />
      ) : (
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={verifySeedPhrase}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    paddingVertical: 48,
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
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 16,
  },
  seedPhraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  seedPhraseBox: {
    width: '48%',
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#222531',
    borderRadius: 8,
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
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

export default ImportSeedPhrase;
