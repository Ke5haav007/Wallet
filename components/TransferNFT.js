import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import ERC721Abi from './ERC721Abi.json';

export default function TransferNFT({ route, navigation }) {
  const { fromAccount, toAccount, selectedForCollectible, collectibleAddress, collectibleId, selectedNetwork } = route.params;
  const [loading, setLoading] = useState(false);

  const decryptPrivateKey = (encryptedPrivateKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, 'your-secret-key');
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.networkurl);
      const decryptedPrivateKey = decryptPrivateKey(fromAccount.encryptedPrivateKey);
      const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
      const contract = new ethers.Contract(collectibleAddress, ERC721Abi, wallet);
      const tx = await contract.transferFrom(
        fromAccount.address,
        toAccount.address,
        collectibleId
      );
      const receipt = await tx.wait();
      setLoading(false);
      navigation.navigate('MainPage', 
        // {txReceipt: receipt}
      );
    } catch (error) {
      setLoading(false);
      Alert.alert('Transaction Failed', error.message);
      console.error('Error in TransferNFT:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transfer NFT</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NFT Address</Text>
        <Text style={styles.label}>{collectibleAddress}</Text>
        <Text style={styles.label}>Token ID</Text>
        <Text style={styles.label}>{collectibleId}</Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.nextButtonText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 8,
  },
  nextButton: {
    width: 327,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEBF32',
  },
  nextButtonText: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
