import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import RNSecureStorage from 'rn-secure-storage';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';

const ImportAccount = ({ navigation }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [importedAccounts, setImportedAccounts] = useState([]);

  useEffect(() => {
    fetchImportedAccounts();
  }, []);

  const fetchImportedAccounts = async () => {
    try {
      const storedAccounts = await RNSecureStorage.getItem('new accounts');
      if (storedAccounts) {
        const accounts = JSON.parse(storedAccounts);
        setImportedAccounts(accounts);
      }
    } catch (error) {
      console.error('Error fetching imported accounts:', error);
    }
  };

  const decryptPrivateKey = (encryptedPrivateKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, 'your-secret-key');
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      if (!privateKey) {
        Alert.alert('Error', 'Please enter a private key');
        return;
      }

      if (!ethers.utils.isHexString(privateKey)) {
        Alert.alert('Error', 'Invalid private key format');
        return;
      }

      const decryptedPrivateKey = decryptPrivateKey(privateKey);
      const wallet = new ethers.Wallet(decryptedPrivateKey);
      let storedAccounts = await RNSecureStorage.getItem('new accounts');
      storedAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];

      // Find the highest existing account number
      const accountNumbers = storedAccounts
        .filter(account => account.name.startsWith('Imported Account'))
        .map(account => parseInt(account.name.replace('Imported Account ', ''), 10))
        .filter(number => !isNaN(number));

      const highestAccountNumber = accountNumbers.length > 0 ? Math.max(...accountNumbers) : 0;
      const newAccountNumber = highestAccountNumber + 1;

      const newAccount = {
        name: `Imported Account ${newAccountNumber}`,
        address: wallet.address,
        privateKey: decryptedPrivateKey,
      };

      const updatedAccounts = [...storedAccounts, newAccount];

      await RNSecureStorage.setItem('new accounts', JSON.stringify(updatedAccounts));

      Alert.alert('Success', 'Account imported and stored successfully');
      setImportedAccounts(updatedAccounts);
      console.log('updatedAccounts', updatedAccounts);
      navigation.navigate('MainPage');
    } catch (error) {
      console.error('Error importing account:', error);
      Alert.alert('Error', 'Failed to import account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Import Account</Text>
      <Text style={styles.description}>
        Imported accounts won’t be associated with your CC Wallet Secret Recovery
        Phrase.
      </Text>
      <Text style={styles.label}>Enter your private key string here:</Text>
      <TextInput
        style={styles.input}
        placeholder="Private Key"
        value={privateKey}
        onChangeText={text => setPrivateKey(text)}
        multiline
        numberOfLines={3}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleImport}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Importing...' : 'IMPORT'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FEBF32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#AAAAAA',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImportAccount;
