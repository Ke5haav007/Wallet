import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RNSecureStorage from 'rn-secure-storage';
import {ethers} from 'ethers';

// Sample ABI definitions, replace these with actual ABI definitions
const abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
  'function approve(address spender, uint256 value) external returns (bool)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function ownerOf(uint256 tokenId) external view returns (address owner)',
];

export default function TokenSentToFrom({route, navigation}) {
  const {
    data,
    selectedForToken,
    selectedForCollectible,
    fromAccount,
    toAccount,
  } = route.params;
  const {selectedNetwork} = route.params;
  const [selectedTokenOrCollectible, setSelectedTokenOrCollectible] = useState(
    selectedForToken ? selectedForToken.name : selectedForCollectible ? selectedForCollectible.tokenId : selectedNetwork?.name
  );
  

  const [selectedToken, setSelectedToken] = useState(
    selectedForToken ? selectedForToken.name : selectedNetwork?.name,
  );
  const [selectedCollectible, setSelectedCollectible] = useState(
    selectedForToken ? selectedForToken.name : selectedNetwork?.name,
  );
  const [tokens, setTokens] = useState([]);
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    fetchTokensFromStorage();
    fetchNFTFromStorage();
  }, []);

  const fetchTokensFromStorage = async () => {
    try {
      const savedTokens = await RNSecureStorage.getItem('tokenss');
      if (savedTokens) {
        const parsedTokens = JSON.parse(savedTokens);
        const tokensWithBalances = await Promise.all(
          parsedTokens.map(async token => ({
            ...token,
            balance: await getTokenBalance(token.address),
          })),
        );
        setTokens(tokensWithBalances);
        console.log('Saved tokens:', tokensWithBalances);
      } else {
        setTokens([]);
        console.log('No tokens found in storage');
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  console.log('Fromss Accountss', fromAccount);
  console.log('tokenssssss:', tokens);

  const fetchNFTFromStorage = async () => {
    try {
      const savedCollectibles = await RNSecureStorage.getItem('collectibless');
      if (savedCollectibles) {
        const parsedCollectibles = JSON.parse(savedCollectibles);
        const collectiblesWithBalances = await Promise.all(
          parsedCollectibles.map(async collectible => ({
            ...collectible,
            balance: await getCollectibleBalance(
              collectible.address,
              collectible.tokenId,
            ),
          })),
        );
        setCollectibles(collectiblesWithBalances);
        console.log('Saved collectibles:', collectiblesWithBalances);
      } else {
        setCollectibles([]);
        console.log('No collectibles found in storage');
      }
    } catch (error) {
      console.error('Error fetching collectibles:', error);
    }
  };

  const getTokenBalance = async tokenAddress => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.networkurl);
        const contract = new ethers.Contract(tokenAddress, abi, provider);
        
        // Fetch token decimals
        const decimals = await contract.decimals();
        
        // Fetch token balance
        const balance = await contract.balanceOf(fromAccount.address);
        
        // Format balance with the fetched decimals
        return ethers.utils.formatUnits(balance, decimals);
    } catch (error) {
        console.error('Error fetching token balance:', error);
        return '0';
    }
};

  const getCollectibleBalance = async (collectibleAddress, tokenId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        selectedNetwork.networkurl,
      );
      const contract = new ethers.Contract(collectibleAddress, abi, provider);
      const balance = await contract.balanceOf(fromAccount.address);
      return balance.toString();
    } catch (error) {
      console.error('Error fetching collectible balance:', error);
      return '0';
    }
  };

  const handleTokenChange = (token, collectible) => {
    setSelectedToken(token);
    setSelectedCollectible(collectible);
  };
  // const handleNFTChange = collectible => {
  //   setSelectedCollectible(collectible);
  // };

  const handleNext = () => {
    const selectedTokenItem = tokens.find(token => token.name === selectedTokenOrCollectible);
    const selectedCollectibleItem = collectibles.find(coll => coll.tokenId === selectedTokenOrCollectible);
  
    if (selectedTokenItem) {
      navigation.navigate('TransferToken', {
        data,
        fromAccount,
        toAccount,
        tokenAddress: selectedTokenItem.address,
        selectedForToken,
        selectedNetwork
      });
    } else if (selectedCollectibleItem) {
      navigation.navigate('TransferNFT', {
        fromAccount,
        data,
        selectedForCollectible,
        toAccount,
        collectibleAddress: selectedCollectibleItem.address,
        collectibleId: selectedCollectibleItem.tokenId,
        selectedNetwork
      });
    } else {
      navigation.navigate('TokenAmount', {
        data,
        fromAccount,
        toAccount,
        selectedNetwork
      });
    }
  };
  
  console.log("selectedCollectible == ",selectedCollectible)
  console.log("selectedForCollectible Send to from == ",selectedForCollectible)

  useEffect(() => {
    if (selectedForCollectible) {
      setSelectedTokenOrCollectible(selectedForCollectible.tokenId);
    } else if (selectedForToken) {
      setSelectedTokenOrCollectible(selectedForToken.name);
    }
  }, [selectedForToken, selectedForCollectible]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sent To</Text>
      <Text style={styles.sectionTitle}>From</Text>
      <View style={styles.accountContainer}>
        <Image source={require('../assets/dot.png')} style={styles.icon} />
        <View style={styles.accountDetails}>
          <Text style={styles.accountName}>
            {data ? data?.name : fromAccount?.name}
          </Text>
          <Text style={styles.accountAddress}>
            {data ? data?.address : fromAccount?.address}
          </Text>
          {/* <Text style={styles.accountName}>{fromAccount.name}</Text>
          <Text style={styles.accountAddress}>{fromAccount.address}</Text> */}
        </View>
      </View>
      <Text style={styles.sectionTitle}>To</Text>
      <View style={styles.accountContainer}>
        <Image source={require('../assets/dot.png')} style={styles.icon} />
        <View style={styles.accountDetails}>
          <Text style={styles.accountName}>{toAccount.name}</Text>
          <Text style={styles.accountAddress}>{toAccount.address}</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Select Token or Collectible</Text>
<View style={styles.dropdownContainer}>
  <Picker
    selectedValue={selectedTokenOrCollectible}
    style={styles.dropdown}
    onValueChange={itemValue => {
      if (tokens.find(token => token.name === itemValue)) {
        setSelectedTokenOrCollectible(itemValue);
      } else {
        setSelectedTokenOrCollectible(itemValue);
      }
    }}
  >
    <Picker.Item label={selectedNetwork?.name} value={selectedNetwork?.name} />
    {tokens.map(token => (
      <Picker.Item
        key={token.address}
        label={`${token.name} (${token.balance})`}
        value={token.name}
      />
    ))}
    {collectibles.map(coll => (
      <Picker.Item
        key={coll.tokenId}
        label={`${coll.name} (ID: ${coll.tokenId}, Balance: ${coll.balance})`}
        value={coll.tokenId}
      />
    ))}
  </Picker>
</View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
  headerText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242731',
    borderRadius: 8,
    marginBottom: 20,
    padding: 12,
    paddingRight: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  accountDetails: {
    marginLeft: 12,
  },
  accountName: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  accountAddress: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  dropdownContainer: {
    backgroundColor: '#242731',
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdown: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  nextButton: {
    backgroundColor: '#FEBF32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
});

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import RNSecureStorage from 'rn-secure-storage';
// import { ethers } from 'ethers';

// // Sample ABI definitions, replace these with actual ABI definitions
// const abi = [
//   "function name() view returns (string)",
//   "function symbol() view returns (string)",
//   "function decimals() view returns (uint8)",
//   "function balanceOf(address) view returns (uint256)",
//   "function approve(address spender, uint256 value) external returns (bool)",
//   "function transfer(address to, uint256 amount) returns (bool)",
//   "function ownerOf(uint256 tokenId) external view returns (address owner)",
// ];

// export default function TokenSentToFrom({ route, navigation }) {
//   const { data, selectedForToken, fromAccount, toAccount } = route.params;
//   const [selectedToken, setSelectedToken] = useState('Sepolia'); // Default selected token
//   const [tokens, setTokens] = useState([]); // State to hold tokens fetched from storage
//   const [collectibles, setCollectibles] = useState([]); // State to hold collectibles fetched from storage

//   useEffect(() => {
//     // Fetch tokens and collectibles from storage when component mounts
//     fetchTokensFromStorage();
//     fetchNFTFromStorage();
//   }, []);

//   const fetchTokensFromStorage = async () => {
//     try {
//       const savedTokens = await RNSecureStorage.getItem('tokenss');
//       if (savedTokens) {
//         const parsedTokens = JSON.parse(savedTokens);
//         const tokensWithBalances = await Promise.all(parsedTokens.map(async token => ({
//           ...token,
//           balance: await getTokenBalance(token.address),
//         })));
//         setTokens(tokensWithBalances);
//         console.log('Saved tokens:', tokensWithBalances);
//       } else {
//         setTokens([]);
//         console.log('No tokens found in storage');
//       }
//     } catch (error) {
//       console.error('Error fetching tokens:', error);
//     }
//   };

//   const fetchNFTFromStorage = async () => {
//     try {
//       const savedCollectibles = await RNSecureStorage.getItem('collectibless');
//       if (savedCollectibles) {
//         const parsedCollectibles = JSON.parse(savedCollectibles);
//         const collectiblesWithBalances = await Promise.all(parsedCollectibles.map(async collectible => ({
//           ...collectible,
//           balance: await getCollectibleBalance(collectible.address, collectible.tokenId),
//         })));
//         setCollectibles(collectiblesWithBalances);
//         console.log('Saved collectibles:', collectiblesWithBalances);
//       } else {
//         setCollectibles([]);
//         console.log('No collectibles found in storage');
//       }
//     } catch (error) {
//       console.error('Error fetching collectibles:', error);
//     }
//   };

//   const getTokenBalance = async (tokenAddress) => {
//     try {
//       // Using Sepolia test network
//       const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/215d4e9d78b5430fb64f66b61d84c1e9');
//       const contract = new ethers.Contract(tokenAddress, abi, provider);
//       const balance = await contract.balanceOf(fromAccount.address);
//       return ethers.utils.formatUnits(balance, 18);
//     } catch (error) {
//       console.error('Error fetching token balance:', error);
//       return '0';
//     }
//   };

//   const getCollectibleBalance = async (collectibleAddress, tokenId) => {
//     try {
//       // Using Sepolia test network
//       const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/215d4e9d78b5430fb64f66b61d84c1e9');
//       const contract = new ethers.Contract(collectibleAddress, abi, provider);
//       const balance = await contract.balanceOf(fromAccount.address);
//       console.log("helow =web3===================")
//       return balance.toString();
//     } catch (error) {
//       console.log("helow =web8===================")
//       console.error('Error fetching collectible balance:', error);
//       return '0';
//     }
//   };

//   const handleTokenChange = (token) => {
//     setSelectedToken(token);
//   };

//   const handleNext = () => {
//     if (selectedToken === 'Sepolia') {
//       navigation.navigate('TokenAmount', {
//          data,
//          fromAccount,
//          toAccount
//       });
//     } else {
//       const selected = tokens.find(token => token.name === selectedToken) ||
//         collectibles.find(coll => coll.tokenId === selectedToken);

//       if (selected) {
//         const isToken = tokens.includes(selected);

//         if (isToken) {
//           navigation.navigate('TransferToken', {
//             data,
//             fromAccount,
//             toAccount,
//             tokenAddress: selected.address,
//             selectedForToken
//           });
//         } else {
//           navigation.navigate('TransferNFT', {
//             fromAccount,
//             data,
//             toAccount,
//             collectibleAddress: selected.address,
//             collectibleId: selected.tokenId,
//             selectedForToken

//           });
//         }
//       }
//     }
//   };

//   console.log("From name",data)
//   console.log("From name fromAccount",fromAccount)
// console.log("selected ShadabForToken",selectedForToken)

// return (
//   <View style={styles.container}>
//     <Text style={styles.headerText}>Sent To</Text>
//     <Text style={styles.sectionTitle}>From</Text>
//     <View style={styles.accountContainer}>
//       <Image source={require('../assets/dot.png')} style={styles.icon} />
//       <View style={styles.accountDetails}>
//       <Text style={styles.accountName}>
//           {data ? data?.name : fromAccount?.name}
//         </Text>
//         <Text style={styles.accountAddress}>
//           {data ? data?.address : fromAccount?.address}
//         </Text>
//         {/* <Text style={styles.accountName}>{fromAccount.name}</Text>
//         <Text style={styles.accountAddress}>{fromAccount.address}</Text> */}
//       </View>
//     </View>
//     <Text style={styles.sectionTitle}>To</Text>
//     <View style={styles.accountContainer}>
//       <Image source={require('../assets/dot.png')} style={styles.icon} />
//       <View style={styles.accountDetails}>
//         <Text style={styles.accountName}>{toAccount.name}</Text>
//         <Text style={styles.accountAddress}>{toAccount.address}</Text>

//       </View>
//     </View>
//       <Text style={styles.sectionTitle}>Select Token</Text>
//       <View style={styles.dropdownContainer}>
//         <Picker
//           selectedValue={selectedToken}
//           style={styles.dropdown}
//           onValueChange={itemValue => handleTokenChange(itemValue)}>
//           <Picker.Item label="Sepolia" value="Sepolia" />
//           {tokens.map(token => (
//             <Picker.Item
//               key={token.address}
//               label={`${token.name} (${token.balance})`}
//               value={token.name}
//             />
//           ))}
//           {collectibles.map(coll => (
//             <Picker.Item
//               key={coll.address}
//               label={`${coll.name} (ID: ${coll.tokenId}, Balance: ${coll.balance})`}
//               value={coll.tokenId}
//             />
//           ))}
//         </Picker>
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#17171A',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   headerText: {
//     color: '#FFF',
//     fontFamily: 'Poppins',
//     fontSize: 24,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     color: '#FFF',
//     fontFamily: 'Poppins',
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   accountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#242731',
//     borderRadius: 8,
//     marginBottom: 20,
//     padding: 12,
//     paddingRight: 30,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   accountDetails: {
//     marginLeft: 12,
//   },
//   accountName: {
//     color: '#FFF',
//     fontFamily: 'Poppins',
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   accountAddress: {
//     color: '#FFF',
//     fontFamily: 'Poppins',
//     fontSize: 14,
//     flexWrap: 'wrap',
//   },
//   dropdownContainer: {
//     backgroundColor: '#242731',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   dropdown: {
//     color: '#FFF',
//     fontFamily: 'Poppins',
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   nextButton: {
//     backgroundColor: '#FEBF32',
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   nextButtonText: {
//     color: '#000',
//     fontFamily: 'Poppins',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
