import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ethers} from 'ethers';
import {useNavigation} from '@react-navigation/native';

const NewWalletImport = () => {
  const navigation = useNavigation();
  const [pvtKey, setPvtKey]= useState('')
  const handleImport = () => {
    const data1 = web3.eth.accounts.privateKeyToAccount(
      '0x7afeb74063592f386e1b6105ba301abf9f4f7aa002b4f6d846ec3ddc69494e4d',
    );
    console.log('data1', data1);
    navigation.navigate('MainPage');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Import New Wallet</Text>

      <View style={styles.warningContainer}>
        <FontAwesome name="exclamation-triangle" size={24} color="#FEBF32" />
        <Text style={styles.warningText}>
          Imported accounts won’t be associated with your MetaMask Secret
          Recovery Phrase. Learn more about imported accounts
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Private Key</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter private key"
        placeholderTextColor="#ABAFC4"
        // value={pvtKey}
        // onChangeText={handleAddressChange}
      />
      {/* {!isValid && <Text style={styles.invalidText}>Invalid address</Text>} */}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainPage')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.importButton} onPress={handleImport}>
          <Text style={styles.buttonText}>Import</Text>
        </TouchableOpacity>
      </View>
      {/* <View>
          <Text style={styles.sectionHeader}>
            Would you like to import this token?
          </Text>
          <Text style={styles.tokenSymbol}>{tokenSymbol}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowTokenInfo(false)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.importButton}
              onPress={handleImport}>
              <Text style={styles.buttonText}>Import</Text>
            </TouchableOpacity>
          </View>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    color: '#FEBF32',
    fontSize: 24,
    fontFamily: 'Poppins',
    marginBottom: 20,
    textAlign: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26262A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  warningText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Poppins',
    marginLeft: 10,
  },
  sectionHeader: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#26262A',
    color: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  invalidText: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  nextButton: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: '#FEBF32',
  },
  inactiveButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#17171A',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  tokenSymbol: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  importButton: {
    backgroundColor: '#FEBF32',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
});

export default NewWalletImport;
