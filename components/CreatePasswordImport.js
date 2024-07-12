import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import CryptoJS from 'crypto-js';

export default function CreatePasswordImport() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(''); // State to determine password strength
  const navigation = useNavigation();

  const ENCRYPTION_KEY = 'your-encryption-key'; // Replace with your own encryption key

  useEffect(() => {
    const getPassword = async () => {
      try {
        const encryptedPassword = await RNSecureStorage.getItem('newPassword');
        if (encryptedPassword) {
          const decryptedPassword = CryptoJS.AES.decrypt(
            encryptedPassword,
            ENCRYPTION_KEY,
          ).toString(CryptoJS.enc.Utf8);
          console.log('Decrypted Password:', decryptedPassword);
          navigation.replace('ImportSeedPhrase');
        }
      } catch (error) {
        console.error('Failed to get saved password:', error);
      }
    };
    getPassword();
  }, []);

  const handleCreatePassword = async () => {
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword && !isChecked) {
      Alert.alert(
        'Error',
        'Passwords do not match and checkbox is not checked.',
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!isChecked) {
      Alert.alert('Error', 'Checkbox is not checked.');
      return;
    }

    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        newPassword,
        ENCRYPTION_KEY,
      ).toString();
      await RNSecureStorage.setItem('newPassword', encryptedPassword, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });

      Alert.alert('Success', 'Password has been created.');
      console.log('Password saved:', encryptedPassword);
      navigation.replace('ImportSeedPhrase'); // Replace the current screen with the new one
    } catch (error) {
      console.error('Failed to save the password:', error);
      Alert.alert('Error', 'Failed to save the password.');
    }
  };

  const handleGoToMainPage = () => {
    navigation.navigate('MainPage');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  // const calculatePasswordStrength = (password) => {
  //   let strength = "Weak";
  //   const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  //   const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  //   if (regexStrong.test(password)) {
  //     strength = "Strong";
  //   } else if (regexMedium.test(password)) {
  //     strength = "Medium";
  //   }

  //   return strength;
  // };
  const calculatePasswordStrength = password => {
    let strength = 'Weak';
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (regexStrong.test(password)) {
      strength = 'Strong';
    } else if (regexMedium.test(password)) {
      strength = 'Medium';
    } else if (password.length >= 8) {
      strength = 'Weak';
    }

    return strength;
  };
  const getPasswordStrengthColor = strength => {
    switch (strength) {
      case 'Strong':
        return 'green';
      case 'Medium':
        return 'yellow';
      case 'Weak':
        return 'red';
      default:
        return 'red';
    }
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(newPassword));
  }, [newPassword]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Password</Text>
      <Text style={styles.subtitle}>
        This password will unlock your CC Wallet only on this service
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}>
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#888DAA"
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.passwordStrength,
            {color: getPasswordStrengthColor(passwordStrength)},
          ]}>
          {newPassword.length < 8
            ? 'Password must be at least 8 characters'
            : `Password strength: ${passwordStrength}`}
        </Text>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showCPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={toggleCPasswordVisibility}>
            <Feather
              name={showCPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#888DAA"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#FEBF32' : undefined}
        />
        <Text style={styles.checkboxText}>
          I understand that CC Wallet cannot recover this password for me.{' '}
          <Text style={styles.learnMore}>Learn more</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.createPasswordButton, {opacity: isChecked ? 1 : 0.5}]}
        onPress={handleCreatePassword}
        disabled={!isChecked}>
        <Text style={styles.createPasswordButtonText}>Create Password</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.goToMainPageButton}
        onPress={handleGoToMainPage}>
        <Text style={styles.goToMainPageButtonText}>Go to Main Page</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#FEBF32',
    marginVertical: 20,
  },
  subtitle: {
    color: '#ABAFC4',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#888DAA',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 5,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#888DAA',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    lineHeight: 24,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  passwordStrength: {
    color: '#888DAA',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  checkboxText: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    padding: 10,
  },
  learnMore: {
    color: '#5F97FF',
  },
  createPasswordButton: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEBF32',
    marginTop: 20,
  },
  createPasswordButtonText: {
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  goToMainPageButton: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#444',
    marginTop: 20,
  },
  goToMainPageButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
});

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import CheckBox from '@react-native-community/checkbox';
// import { useNavigation } from '@react-navigation/native';
// import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

// export default function CreatePasswordImport() {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isChecked, setChecked] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
//   const [passwordStrength, setPasswordStrength] = useState(null); // State to determine password strength
//   const navigation = useNavigation();
//   useEffect(() => {
//     const getPassword = async () => {
//       try {
//         const savedPassword = await RNSecureStorage.getItem('newPassword');
//         if (savedPassword) {
//           navigation.replace('ImportSeedPhrase');
//         }
//       } catch (error) {
//         console.error('Failed to get saved password:', error);
//       }
//     };
//     getPassword();
//   }, []);

//   const handleCreatePassword = async() => {
//     if (newPassword.length < 8) {
//       Alert.alert('Error', 'Password must be at least 8 characters long.');
//       return;
//     }

//     if (newPassword !== confirmPassword && !isChecked) {
//       Alert.alert('Error', 'Passwords do not match and checkbox is not checked.');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       return;
//     }

//     if (!isChecked) {
//       Alert.alert('Error', 'Checkbox is not checked.');
//       return;
//     }
//     try {
//       await RNSecureStorage.setItem('newPassword', newPassword, {
//         accessible: ACCESSIBLE.WHEN_UNLOCKED,
//       });

//       Alert.alert('Success', 'Password has been created.');
//       console.log('Password saved:', newPassword);
//       navigation.replace('ImportSeedPhrase'); // Replace the current screen with the new one
//       // navigation.navigate('SecureWallet');
//     } catch (error) {
//       console.error('Failed to save the password:', error);
//       Alert.alert('Error', 'Failed to save the password.');
//     }

//     // Handle password creation logic here, without AsyncStorage

//     // navigation.navigate('ImportSeedPhrase');
//   };

//   const handleGoToMainPage = () => {
//     navigation.navigate('MainPage');
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const getPasswordStrength = (password) => {
//     if (password.length >= 8) {
//       return 'Good';
//     } else {
//       return 'Weak';
//     }
//   };

//   const updatePasswordStrength = (password) => {
//     const strength = getPasswordStrength(password);
//     setPasswordStrength(strength);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.progressContainer}>
//         <Feather name="arrow-left" size={24} color="#FFF" />
//         <View style={styles.progressRect}></View>
//         <View style={styles.progressRect}></View>
//         <View style={styles.progressRect}></View>
//         <Feather name="arrow-right" size={24} color="#FFF" />
//       </View>
//       <Text style={styles.title}>Create Password</Text>
//       <Text style={styles.subtitle}>
//         This password will unlock your CC wallet only on this service
//       </Text>
//       <View style={styles.inputContainer}>
//         <Text style={styles.inputLabel}>New Password</Text>
//         <View style={styles.passwordInput}>
//           <TextInput
//             style={styles.input}
//             secureTextEntry={!showPassword}
//             value={newPassword}
//             onChangeText={(text) => {
//               setNewPassword(text);
//               updatePasswordStrength(text); // Update password strength when typing
//             }}
//           />
//           <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
//             <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888DAA" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.passwordStrength}>
//           {newPassword.length < 8 ? 'Password must be at least 8 characters' : `Password strength: ${passwordStrength}`}
//         </Text>
//         <Text style={styles.inputLabel}>Confirm Password</Text>
//         <View style={styles.passwordInput}>
//           <TextInput
//             style={styles.input}
//             secureTextEntry={!showPassword}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
//             <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888DAA" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.checkboxContainer}>
//         <CheckBox value={isChecked} onValueChange={setChecked} color={isChecked ? '#FEBF32' : undefined} />
//         <Text style={styles.checkboxText}>
//           I understand that CC cannot recover this password for me.{' '}
//           <Text style={styles.learnMore}>Learn more</Text>
//         </Text>
//       </View>
//       <TouchableOpacity
//         style={[styles.createPasswordButton, { opacity: isChecked ? 1 : 0.5 }]}
//         onPress={handleCreatePassword}
//         disabled={!isChecked}
//       >
//         <Text style={styles.createPasswordButtonText}>Create Password</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.goToMainPageButton}
//         onPress={handleGoToMainPage}
//       >
//         <Text style={styles.goToMainPageButtonText}>Go to Main Page</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#17171A',
//     alignItems: 'center',
//     paddingVertical: 50,
//     paddingHorizontal: 20,
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   progressRect: {
//     height: 8,
//     width: '20%',
//     borderRadius: 2,
//     backgroundColor: '#222531',
//   },
//   title: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 16,
//     lineHeight: 24,
//     color: "#FEBF32",
//     marginVertical: 20,
//   },
//   subtitle: {
//     color: '#ABAFC4',
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 14,
//     lineHeight: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   inputLabel: {
//     color: '#888DAA',
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 12,
//     lineHeight: 16,
//     marginBottom: 5,
//   },
//   passwordInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#888DAA',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     color: '#FFF',
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 14,
//     lineHeight: 24,
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 0,
//     padding: 10,
//   },
//   passwordStrength: {
//     color: '#888DAA',
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 12,
//     lineHeight: 16,
//     marginTop: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     marginVertical: 20,
//   },
//   checkboxText: {
//     flex: 1,
//     color: '#FFF',
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 14,
//     lineHeight: 24,
//     padding: 10,
//   },
//   learnMore: {
//     color: '#5F97FF',
//   },
//   createPasswordButton: {
//     width: '100%',
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#FEBF32',
//     marginTop: 20,
//   },
//   createPasswordButtonText: {
//     color: '#000',
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   goToMainPageButton: {
//     width: '100%',
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#FEBF32',
//     marginTop: 20,
//   },
//   goToMainPageButtonText: {
//     color: '#000',
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 16,
//     lineHeight: 24,
//   },
// });
