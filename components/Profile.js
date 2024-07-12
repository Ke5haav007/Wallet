import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Clipboard,
  Animated,
  Easing,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SecureStorage from 'rn-secure-storage';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'your-encryption-key'; // Replace with your own encryption key

const Profile = ({ navigation }) => {
  const [accounts, setAccounts] = useState([]);
  const [showPrivateKeyModal, setShowPrivateKeyModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isEditing, setIsEditing] = useState(false);
  const [editAccountName, setEditAccountName] = useState('');
  const [editAccountIndex, setEditAccountIndex] = useState(-1);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getStoredAccounts = async () => {
      try {
        const storedAccounts = await SecureStorage.getItem('new accounts');
        if (storedAccounts) {
          const parsedAccounts = JSON.parse(storedAccounts);
          setAccounts(parsedAccounts);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    getStoredAccounts();
  }, []);

  const handleRevealPrivateKey = (account) => {
    setSelectedAccount(account);
    setShowPrivateKeyModal(true);
    setPrivateKey('');
    setError('');
  };

  const verifyPasswordAndShowPrivateKey = async () => {
    try {
      const encryptedPassword = await SecureStorage.getItem('newPassword');
      const storedPassword = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

      if (storedPassword === password) {
        const privateKeyBytes = CryptoJS.AES.decrypt(
          selectedAccount.encryptedPrivateKey,
          'your-secret-key'
        );
        const decryptedPrivateKey = privateKeyBytes.toString(CryptoJS.enc.Utf8);

        setPrivateKey(decryptedPrivateKey);
        setPassword('');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied to clipboard', 'Private key has been copied to clipboard.');
  };

  const handleEditAccount = (account, index) => {
    setIsEditing(true);
    setEditAccountName(account.name);
    setEditAccountIndex(index);
  };

  const saveEditedAccountName = async () => {
    if (editAccountIndex !== -1 && editAccountName.trim() !== '') {
      const updatedAccounts = [...accounts];
      updatedAccounts[editAccountIndex].name = editAccountName;

      setAccounts(updatedAccounts);

      await SecureStorage.setItem('new accounts', JSON.stringify(updatedAccounts));
      setIsEditing(false);
      setEditAccountIndex(-1);
      setEditAccountName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Accounts</Text>
      <ScrollView style={styles.accountsContainer} contentContainerStyle={styles.accountsContent}>
        {accounts.map((account, index) => (
          <View key={index} style={styles.accountBox}>
            <View style={styles.accountInfo}>
              <View style={styles.accountNameRow}>
                {isEditing && editAccountIndex === index ? (
                  <TextInput
                    style={styles.input}
                    value={editAccountName}
                    onChangeText={setEditAccountName}
                  />
                ) : (
                  <>
                    <Text style={styles.accountName}>{account.name}</Text>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditAccount(account, index)}
                    >
                      <FontAwesome name="edit" size={16} color="#FFF" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <Text style={styles.accountAddress}>{account.address}</Text>
            </View>
            <View style={styles.accountActions}>
              {isEditing && editAccountIndex === index ? (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={saveEditedAccountName}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.revealButton}
                  onPress={() => handleRevealPrivateKey(account)}
                >
                  <Text style={styles.revealButtonText}>Reveal Private Key</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showPrivateKeyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPrivateKeyModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={verifyPasswordAndShowPrivateKey}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
            {privateKey ? (
              <Animated.View style={[styles.privateKeyContainer, { opacity: fadeAnim }]}>
                <Text style={styles.privateKey}>{privateKey}</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(privateKey)}
                >
                  <FontAwesome name="copy" size={16} color="#FFF" />
                </TouchableOpacity>
              </Animated.View>
            ) : null}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPrivateKeyModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  accountsContainer: {
    flex: 1,
  },
  accountsContent: {
    paddingBottom: 20,
  },
  accountBox: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfo: {
    flex: 1,
    marginRight: 10,
  },
  accountActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountName: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 10,
  },
  accountAddress: {
    color: 'gray',
    fontSize: 14,
  },
  revealButton: {
    backgroundColor: '#FEBF32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  revealButtonText: {
    color: '#1C1C1C',
    fontSize: 14,
  },
  editButton: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#FEBF32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  saveButtonText: {
    color: '#1C1C1C',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1C1C1C',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    width: '100%',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  eyeButton: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#FEBF32',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#1C1C1C',
    fontSize: 16,
  },
  privateKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  privateKey: {
    color: '#FFF',
    marginRight: 10,
  },
  copyButton: {
    padding: 5,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Profile;
