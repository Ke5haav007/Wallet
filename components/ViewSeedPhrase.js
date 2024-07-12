// ViewSeedPhrase.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
const ViewSeedPhrase = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
      <Text style={styles.title}>Write Down Your Seed Phrase</Text>
      <Text style={styles.description}>
        This is your seed phrase. Write it down on a paper and keep it in a safe
        place. You'll be asked to re-enter this phrase (in order) on the next
        step.
      </Text>
      <View style={styles.seedPhraseContainer}>
        <Text style={styles.revealText}>Tap to reveal your seed phrase</Text>
        <Text style={styles.warningText}>
          Make sure no one is watching your screen.
        </Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.replace('NoteDownSeed')}>
          <Feather name="eye" size={18} color="#FEBF32" />
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.nextButton} disabled>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  rectanglesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rectangle: {
    width: 50,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#222531',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    background:
      'linear-gradient(91deg, #A9CDFF 0%, #72F6D1 21.87%, #A0ED8D 55.73%, #FED365 81.77%, #FAA49E 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    width: 327,
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  seedPhraseContainer: {
    width: 327,
    height: 320,
    borderRadius: 8,
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backgroundColor: 'rgba(34, 37, 49, 0.60)',
    backdropFilter: 'blur(12px)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  revealText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 10,
  },
  warningText: {
    width: 279,
    color: '#ABAFC4',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderColor: '#FEBF32',
    borderWidth: 5,
    borderRadius: 3,
  },
  viewButtonText: {
    color: '#FEBF32',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginLeft: 8,
  },
  nextButton: {
    width: 327,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#222531',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default ViewSeedPhrase;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Feather from 'react-native-vector-icons/Feather';
// import RNSecureStorage from 'rn-secure-storage';

// const ViewSeedPhrase = () => {
//   const navigation = useNavigation();
//   const [enteredSeedPhrase, setEnteredSeedPhrase] = useState('');
//   const [storedSeedPhrase, setStoredSeedPhrase] = useState('');

//   // Function to fetch stored seed phrase from secure storage
//   const fetchStoredSeedPhrase = async () => {
//     try {
//       const storedSeed = await RNSecureStorage.getItem('seedPhrase');
//       setStoredSeedPhrase(storedSeed);
//     } catch (error) {
//       console.error('Error fetching seed phrase from storage:', error);
//     }
//   };

//   // Function to handle authentication and navigation
//   const handleNext = () => {
//     if (enteredSeedPhrase === storedSeedPhrase) {
//       navigation.navigate('ConfirmSeedPhrase', { seedPhrase: storedSeedPhrase });
//     } else {
//       Alert.alert('Error', 'Entered seed phrase does not match stored seed phrase.');
//     }
//   };

//   // Fetch stored seed phrase on component mount
//   useEffect(() => {
//     fetchStoredSeedPhrase();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.rectanglesContainer}>
//         <View style={styles.rectangle}></View>
//         <View style={styles.rectangle}></View>
//         <View style={styles.rectangle}></View>
//       </View>
//       <Text style={styles.title}>Write Down Your Seed Phrase</Text>
//       <Text style={styles.description}>
//         This is your seed phrase. Write it down on a paper and keep it in a safe
//         place. You'll be asked to re-enter this phrase (in order) on the next
//         step.
//       </Text>
//       <View style={styles.seedPhraseContainer}>
//         <Text style={styles.revealText}>Tap to reveal your seed phrase</Text>
//         <Text style={styles.warningText}>
//           Make sure no one is watching your screen.
//         </Text>
//         <TouchableOpacity
//           style={styles.viewButton}
//           onPress={() => navigation.navigate('ImportSeedPhrase')}>
//           <Feather name="eye" size={18} color="#FEBF32" />
//           <Text style={styles.viewButtonText}>View</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={!storedSeedPhrase}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#17171A',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   rectanglesContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 20,
//   },
//   rectangle: {
//     width: 50,
//     height: 8,
//     borderRadius: 2,
//     backgroundColor: '#222531',
//   },
//   title: {
//     fontFamily: 'Poppins',
//     fontSize: 18,
//     fontWeight: '600',
//     lineHeight: 28,
//     textAlign: 'center',
//     color: '#FFF',
//     marginBottom: 10,
//   },
//   description: {
//     width: 327,
//     color: '#ABAFC4',
//     fontFamily: 'Poppins',
//     fontSize: 14,
//     lineHeight: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   seedPhraseContainer: {
//     width: 327,
//     height: 320,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.06)',
//     backgroundColor: 'rgba(34, 37, 49, 0.60)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   revealText: {
//     color: '#FFF',
//     fontFamily: 'Poppins',
//     fontSize: 14,
//     fontWeight: '600',
//     lineHeight: 24,
//     marginBottom: 10,
//   },
//   warningText: {
//     width: 279,
//     color: '#ABAFC4',
//     textAlign: 'center',
//     fontFamily: 'Poppins',
//     fontSize: 12,
//     lineHeight: 18,
//     marginBottom: 20,
//   },
//   viewButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderColor: '#FEBF32',
//     borderWidth: 5,
//     borderRadius: 3,
//   },
//   viewButtonText: {
//     color: '#FEBF32',
//     fontFamily: 'Poppins',
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 24,
//     marginLeft: 8,
//   },
//   nextButton: {
//     width: 327,
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#222531',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nextButtonText: {
//     color: '#ABAFC4',
//     fontFamily: 'Poppins',
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 24,
//   },
// });

// export default ViewSeedPhrase;




