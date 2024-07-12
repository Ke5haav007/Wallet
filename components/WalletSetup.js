import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

export default function WalletSetup() {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const checkPassword = async () => {
        const password = await RNSecureStorage.getItem('newPassword');
        const seed = await RNSecureStorage.getItem('seedPhraseVerified');

        if (password && seed) {
          navigation.navigate('MainPage', { replace: true });
        }
      };

      checkPassword();
    }, []),
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     const checkPassword = async () => {
  //       const password = await RNSecureStorage.getItem('newPassword');
  //       console.log('Wallet Setup Password', password);
  //       const seed = await RNSecureStorage.getItem('seedPhraseVerified');
  //       console.log('Seed Phrase', seed);
  //       if (password && seed) {
  //         navigation.replace('MainPage');
  //       }
  //     };
  //     checkPassword();
  //   }, []),
  // );

  const handleDeleteSeedPhrase = async () => {
    try {
      await RNSecureStorage.setItem('seedPhrase', null);
      Alert.alert('Success', 'Seed phrase has been deleted.');
      console.log('Seed phrase deleted.');
    } catch (error) {
      console.error('Failed to delete the seed phrase:', error);
      Alert.alert('Error', 'Failed to delete the seed phrase.');
    }
  };

  const handleDeletePassword = async () => {
    // RNSecureStorage.initialize();
    try {
      await RNSecureStorage.setItem('newPassword', null);
      Alert.alert('Success', 'Password has been deleted.');
      console.log('Password deleted.');
    } catch (error) {
      console.error('Failed to delete the password:', error);
      Alert.alert('Error', 'Failed to delete the password.');
    }
  };

  const handleGetAllSeedPhrases = async () => {
    try {
      const allKeys = await RNSecureStorage.getAllKeys();
      const seedPhrases = [];

      for (const key of allKeys) {
        if (key.startsWith('seedPhrase')) {
          const seedPhrase = await RNSecureStorage.getItem(key);
          seedPhrases.push(seedPhrase);
        }
      }

      console.log('All Seed Phrases:', seedPhrases);
    } catch (error) {
      console.error('Failed to get all seed phrases:', error);
    }
  };

  const handleGetAllAccounts = async () => {
    try {
      const accountsJson = await RNSecureStorage.getItem('accounts');
      if (accountsJson) {
        const accounts = JSON.parse(accountsJson);
        console.log('All Accounts:', accounts);
        Alert.alert('Accounts', JSON.stringify(accounts, null, 2));
      } else {
        Alert.alert('No Accounts', 'No accounts found in storage.');
      }
    } catch (error) {
      console.error('Failed to get all accounts:', error);
      Alert.alert('Error', 'Failed to get all accounts.');
    }
  };
  const handleGetAllNewAccounts = async () => {
    try {
      const accountsJson = await RNSecureStorage.getItem('new accounts');
      if (accountsJson) {
        const accounts = JSON.parse(accountsJson);
        console.log('All NewAccounts Accounts:', accounts);
        Alert.alert('Accounts NewAccounts', JSON.stringify(accounts, null, 2));
      } else {
        Alert.alert(
          'No NewAccounts Accounts',
          'No NewAccounts accounts found in storage.',
        );
      }
    } catch (error) {
      console.error('Failed to get all accounts:', error);
      Alert.alert('Error', 'Failed to get all accounts.');
    }
  };

  const handleDeleteAllAccounts = async () => {
    try {
      await RNSecureStorage.removeItem('accounts');
      Alert.alert('Success', 'All accounts have been deleted.');
      console.log('All accounts deleted.');
    } catch (error) {
      console.error('Failed to delete all accounts:', error);
      Alert.alert('Error', 'Failed to delete all accounts.');
    }
  };

  const handleGetAllTokens = async () => {
    try {
      const tokensJson = await RNSecureStorage.getItem('tokenss');
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        console.log('All Tokens:', tokens);
        Alert.alert('Tokens', JSON.stringify(tokens, null, 2));
      } else {
        Alert.alert('No Tokens', 'No tokens found in storage.');
      }
    } catch (error) {
      console.error('Failed to get all tokens:', error);
      Alert.alert('Error', 'Failed to get all tokens.');
    }
  };

  const handleGetAllNFT = async () => {
    try {
      const tokensJson = await RNSecureStorage.getItem('collectibless');
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        console.log('All Collectiblessss:', tokens);
        Alert.alert('Collectiblessss', JSON.stringify(tokens, null, 2));
      } else {
        Alert.alert('No Tokens', 'No tokens found in storage.');
      }
    } catch (error) {
      console.error('Failed to get all Collectibles:', error);
      Alert.alert('Error', 'Failed to get all collectibles.');
    }
  };

  const handleDeleteCollectibles = async () => {
    try {
      const tokensJson = await RNSecureStorage.removeItem('collectibless');
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        console.log('All Collectiblessss:', tokens);
        Alert.alert('Collectiblessss', JSON.stringify(tokens, null, 2));
      } else {
        Alert.alert('No Tokens', 'No tokens found in storage.');
      }
    } catch (error) {
      console.error('Failed to get all Collectibles:', error);
      Alert.alert('Error', 'Failed to get all collectibles.');
    }
  };
  const handleDeleteSeedPhraseVerified = async () => {
    try {
      await RNSecureStorage.setItem('seedPhraseVerified', null);
      Alert.alert(
        'Success',
        'Seed phrase verification status has been deleted.',
      );
      console.log('Seed phrase verification status deleted.');
    } catch (error) {
      console.error(
        'Failed to delete the seed phrase verification status:',
        error,
      );
      Alert.alert(
        'Error',
        'Failed to delete the seed phrase verification status.',
      );
    }
  };
  const handleDeleteAllNewAccounts = async () => {
    try {
      const tokensJson = await RNSecureStorage.removeItem('new accounts');
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        console.log('All new accounts:', tokens);
        Alert.alert('new accounts', JSON.stringify(tokens, null, 2));
      } else {
        Alert.alert('No Tokens', 'No tokens found in storage.');
      }
    } catch (error) {
      console.error('Failed to get all Collectibles:', error);
      Alert.alert('Error', 'Failed to get all collectibles.');
    }
  };

  const handleDeleteAllTokens = async () => {
    try {
      const tokensJson = await RNSecureStorage.removeItem('tokenss');
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        console.log('All Tokens deleted:', tokens);
        Alert.alert('All Tokens deleted', JSON.stringify(tokens, null, 2));
      } else {
        Alert.alert('No Tokens', 'No tokens found in storage.');
      }
    } catch (error) {
      console.error('Failed to get all Collectibles:', error);
      Alert.alert('Error', 'Failed to get all collectibles.');
    }
  };
  const handleGetFetchedIndex = async () => {
    try {
      const tokensJson = await RNSecureStorage.getItem('fetchedAccountIndex');
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        console.log('All fetchedAccountIndex:', tokens);
        Alert.alert('fetchedAccountIndex', JSON.stringify(tokens, null, 2));
      } else {
        Alert.alert(
          'No fetchedAccountIndex',
          'No fetchedAccountIndex found in storage.',
        );
      }
    } catch (error) {
      console.error('Failed to get all fetchedAccountIndex:', error);
      Alert.alert('Error', 'Failed to get all fetchedAccountIndex.');
    }
  };
  const handleDeleteFetchedIndex = async () => {
    try {
      const tokensJson = await RNSecureStorage.removeItem(
        'fetchedAccountIndex',
      );
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        console.log('All fetchedAccountIndex deleted:', tokens);
        Alert.alert(
          'All fetchedAccountIndex deleted',
          JSON.stringify(tokens, null, 2),
        );
      } else {
        Alert.alert(
          'No fetchedAccountIndex',
          'No fetchedAccountIndex found in storage.',
        );
      }
    } catch (error) {
      console.error('Failed to get all fetchedAccountIndex:', error);
      Alert.alert('Error', 'Failed to get all fetchedAccountIndex.');
    }
  };
  // const handleDeleteCollectibles=async()=>{
  //   try {
  //     await RNSecureStorage.removeItem('collectibless');
  //     Alert.alert('Success', 'All Collectibless have been deleted.');
  //     console.log('All Collectibless deleted.');
  //   } catch (error) {
  //     console.error('Failed to delete all Collectibless:', error);
  //     Alert.alert('Error', 'Failed to delete all Collectibless.');
  //   }
  // }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/flogo.png')} style={styles.image} />

      <Text style={styles.title}>CC Wallet </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePasswordImport')}>
        <Text style={{color: '#000', ...styles.buttonYellow}}>
          Import Using Seed Phrase
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => navigation.navigate('CreatePassword')}>
        <Text style={styles.buttonYellowText}>Create a New Wallet</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.buttonGray}
        onPress={handleDeleteAllTokens}>
        <Text style={styles.deleteButtonText}>Delete All Tokens</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeletePassword}>
        <Text style={styles.deleteButtonText}>Delete Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAllAccounts}>
        <Text style={styles.deleteButtonText}>Delete All Accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAllNewAccounts}>
        <Text style={styles.deleteButtonText}>DeleteAllNewAccounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonGray}
        onPress={handleGetAllAccounts}>
        <Text style={styles.buttonGrayText}>Get All Accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteCollectibles}>
        <Text style={styles.deleteButtonText}>Delete Collectible</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonGray}
        onPress={handleGetAllNewAccounts}>
        <Text style={styles.buttonGrayText}>et All New Accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteSeedPhraseVerified}>
        <Text style={styles.deleteButtonText}>Delete SeedPhrase Verified</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteFetchedIndex}>
        <Text style={styles.deleteButtonText}>Delete Fetched Index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleGetFetchedIndex}>
        <Text style={styles.deleteButtonText}>Get Fetched Index</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGray} onPress={handleGetAllTokens}>
        <Text style={styles.deleteButtonText}>Get All Tokens</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGray} onPress={handleGetAllNFT}>
        <Text style={styles.deleteButtonText}>Get All collectibles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteSeedPhrase}>
        <Text style={styles.deleteButtonText}>Delete Seed Phrase</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleGetAllSeedPhrases}>
        <Text style={styles.deleteButtonText}>Get All Seed Phrases</Text>
      </TouchableOpacity> */}

      <Text style={styles.para}>Secure Seamless Trading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17171A',
    padding: 20,
  },
  image: {
    width: 304,
    height: 296,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    color: 'white',
    marginBottom: 20,
  },
  buttonGray: {
    borderRadius: 8,
    backgroundColor: '#2A2D3C',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 20,
  },

  para: {
    fontFamily: 'poppins',
    fontSize: 30,
    marginTop: 100,
    color: '#FFF',
    textAlign: 'center',
  },
  buttonGrayText: {
    fontSize: 26,
    marginBottom: 10,
    lineHeight: 24,
    color: '#FEBF32',
    textAlign: 'center',
  },
  buttonYellow: {
    borderRadius: 8,
    backgroundColor: '#FEBF32',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  buttonYellowText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
  },
  deleteButton: {
    borderRadius: 8,
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  deleteButtonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
  },
});

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// // import { useFonts, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
// // import { Poppins_300Light, Poppins_600SemiBold } from '@react-native-google-fonts/poppins';

// export default function WalletSetup() {
//   const navigation = useNavigation();
//   // const [fontsLoaded, setFontsLoaded] = useState(false);

//   // useEffect(() => {
//   //   async function loadFonts() {
//   //     try {
//   //       await useFonts({
//   //         Poppins_300Light,
//   //         Poppins_600SemiBold,
//   //       });
//   //       setFontsLoaded(true);
//   //     } catch (error) {
//   //       console.error('Error loading fonts:', error);
//   //     }
//   //   }

//   //   loadFonts();
//   // }, []);

//   // if (!fontsLoaded) {
//   //   return (
//   //     <View style={styles.loadingContainer}>
//   //       {/* Loading indicator */}
//   //       <Text>Loading...</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/flogo.png')} style={styles.image} />
//       <Text style={styles.title}>CC Wallet </Text>
//       <TouchableOpacity style={styles.buttonGray} onPress={() => navigation.navigate('CreatePasswordImport')}>
//         <Text style={styles.buttonGrayText}>Import Using Seed Phrase</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.buttonYellow} onPress={() => navigation.navigate('CreatePassword')}>
//         <Text style={styles.buttonYellowText}>Create a New Wallet</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#17171A',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#17171A',
//     padding: 20,
//   },
//   image: {
//     width: 304,
//     height: 296,
//     marginBottom: 20,
//   },
//   title: {
//     fontFamily: 'Poppins_300Light',
//     fontSize: 40,
//     fontWeight: '300',
//     color: 'white',
//     marginBottom: 20,
//   },
//   buttonGray: {
//     borderRadius: 8,
//     backgroundColor: '#2A2D3C',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     marginBottom: 20,
//   },
//   buttonGrayText: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#FEBF32',
//     textAlign: 'center',
//   },
//   buttonYellow: {
//     borderRadius: 8,
//     backgroundColor: '#FEBF32',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     marginBottom: 20,
//   },
//   buttonYellowText: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#000',
//     textAlign: 'center',
//   },
// });
