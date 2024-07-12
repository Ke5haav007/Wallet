import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ethers} from 'ethers';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

// Replace with your Infura project ID
const nftAbi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function tokenURI(uint256 tokenId) view returns (string)',
];

export default function AddCollectibles({navigation, route}) {
  const {selectedNetwork} = route.params;
  // Create provider based on selected network
  const provide = new ethers.providers.JsonRpcProvider(
    selectedNetwork?.networkurl,
  );
  const [address, setAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [nftSymbol, setNftSymbol] = useState('');
  const [nftName, setNftName] = useState('');
  const [tokenUri, setTokenUri] = useState('');
  const [showNftInfo, setShowNftInfo] = useState(false);

  const handleAddressChange = input => {
    setAddress(input);
    if (ethers.utils.isAddress(input)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleTokenIdChange = input => {
    setTokenId(input);
    if (input !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleNext = async () => {
    if (ethers.utils.isAddress(address) && tokenId !== '') {
      try {
        const nftContract = new ethers.Contract(address, nftAbi, provide);
        const symbol = await nftContract.symbol();
        const name = await nftContract.name();
        const uri = await nftContract.tokenURI(tokenId);
        setNftSymbol(symbol);
        setNftName(name);
        setTokenUri(uri);
        setShowNftInfo(true);
      } catch (error) {
        console.error(error);
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  };

  // const handleImport = async () => {
  //   if (!ethers.utils.isAddress(address)) {
  //     Alert.alert('Invalid Address', 'Please enter a valid collectible contract address.');
  //     return;
  //   }

  //   const newNft = { address, tokenId, symbol: nftSymbol, name: nftName, uri: tokenUri };

  //   try {
  //     // Fetch existing collectibles from storage
  //     let existingCollectiblesJson = await RNSecureStorage.getItem('collectibless');
  //     let existingCollectibles = [];

  //     // Initialize collectibles if storage key does not exist
  //     if (!existingCollectiblesJson) {
  //       await RNSecureStorage.setItem('collectibless', JSON.stringify([]));
  //       existingCollectiblesJson = await RNSecureStorage.getItem('collectibless');
  //     }

  //     existingCollectibles = JSON.parse(existingCollectiblesJson);
  //     if (!Array.isArray(existingCollectibles)) {
  //       existingCollectibles = [];
  //     }

  //     // Check if the collectible address and token ID already exist in the list
  //     const collectibleExists = existingCollectibles.some(collectible =>
  //       collectible.address === address && collectible.tokenId === tokenId
  //     );
  //     if (collectibleExists) {
  //       Alert.alert('Collectible Already Imported', 'This collectible has already been imported.');
  //       return;
  //     }

  //     // Append new collectible to the existing list
  //     existingCollectibles.push(newNft);

  //     // Store the updated list back into storage
  //     await RNSecureStorage.setItem('collectibless', JSON.stringify(existingCollectibles));

  //     Alert.alert('Collectible Imported', 'Collectible successfully imported!');
  //     navigation.navigate('MainPage');
  //   } catch (error) {
  //     console.error('Error storing collectible:', error);
  //     Alert.alert('Error', 'Failed to import collectible. Please try again.');
  //   }
  // };
  const handleImportCollectible = async () => {
    if (!ethers.utils.isAddress(address)) {
      Alert.alert(
        'Invalid Address',
        'Please enter a valid collectible contract address.',
      );
      return;
    }

    const newNft = {
      address,
      tokenId,
      symbol: nftSymbol,
      name: nftName,
      uri: tokenUri,
    };

    try {
      let existingCollectibles = [];
      try {
        const existingCollectiblesJson= await RNSecureStorage.getItem('collectibless');
        if (existingCollectiblesJson) {
          existingCollectibles = JSON.parse(existingCollectiblesJson);
        }
      } catch (error) {
        console.warn('Error fetching collectibles from storage:', error);
        // Handle error if necessary
      }

  

      if (!Array.isArray(existingCollectibles)) {
        existingCollectibles = [];
      }

      // Check if the collectible address and token ID already exist in the list
      const collectibleExists = existingCollectibles.some(
        collectible =>
          collectible.address === address && collectible.tokenId === tokenId,
      );
      if (collectibleExists) {
        Alert.alert(
          'Collectible Already Imported',
          'This collectible has already been imported.',
        );
        return;
      }

      // Append new collectible to the existing list
      existingCollectibles.push(newNft);

      // Store the updated list back into storage
      await RNSecureStorage.setItem(
        'collectibless',
        JSON.stringify(existingCollectibles),
      );

      Alert.alert('Collectible Imported', 'Collectible successfully imported!');
      navigation.navigate('MainPage');
    } catch (error) {
      console.error('Error storing collectible:', error);
      Alert.alert('Error', 'Failed to import collectible. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Collectibles</Text>
      <View style={styles.warningContainer}>
        <FontAwesome name="exclamation-triangle" size={24} color="#FEBF32" />
        <Text style={styles.warningText}>
          Anyone can create a collectible, including creating fake versions of
          existing NFTs.
        </Text>
      </View>
      <Text style={styles.sectionHeader}>Collectible Contract Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter collectible contract address"
        placeholderTextColor="#ABAFC4"
        value={address}
        onChangeText={handleAddressChange}
      />
      {!isValid && (
        <Text style={styles.invalidText}>Invalid address or token ID</Text>
      )}
      <Text style={styles.sectionHeader}>Token ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter token ID"
        placeholderTextColor="#ABAFC4"
        value={tokenId}
        onChangeText={handleTokenIdChange}
      />
      {!isValid && (
        <Text style={styles.invalidText}>Invalid address or token ID</Text>
      )}
      {!showNftInfo && (
        <TouchableOpacity
          style={[
            styles.nextButton,
            isValid ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={handleNext}
          disabled={!isValid}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
      {showNftInfo && (
        <View>
          <Text style={styles.sectionHeader}>
            Would you like to import this collectible?
          </Text>
          <Text style={styles.tokenSymbol}>{nftSymbol}</Text>
          <Text style={styles.tokenUri}>{tokenUri}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowNftInfo(false)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.importButton}
              onPress={handleImportCollectible}>
              <Text style={styles.buttonText}>Import</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

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
  tokenUri: {
    color: '#FFF',
    fontSize: 14,
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
