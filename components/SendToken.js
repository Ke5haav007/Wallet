import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Scanner from './Scanner'; // Adjust the import path as per your file structure

export default function SendToken({ route, navigation }) {
  const { selectedAccount, selectedForToken,selectedForCollectible,fromAccount, selectedNetwork, accounts } = route.params;
  const [data, setData] = useState('');
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [selectedToAccount, setSelectedToAccount] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [isSendEnabled, setIsSendEnabled] = useState(false);

  // Set the initial selected account
  useEffect(() => {
    if (fromAccount) {
      setData(fromAccount);
    }
  }, [fromAccount]);

  // Enable send button if recipient address is valid or if an account is selected
  useEffect(() => {
    setIsSendEnabled(isValidRecipient(recipient) || selectedToAccount !== null);
  }, [recipient, selectedToAccount]);

  useEffect(() => {
    if (route.params?.recipientAddress) {
      setRecipient(route.params.recipientAddress);
    }
  }, [route.params?.recipientAddress]);

  const toggleToDropdown = () => {
    setShowToDropdown(!showToDropdown);
  };
  

  const handleAccountSelect = account => {
    setSelectedToAccount(account);
    setRecipient(''); // Clear the recipient input when an account is selected
    setShowToDropdown(false);
  };

  const handleSend = () => {
    if (!isSendEnabled) {
      Alert.alert(
        'Error',
        'Please provide a valid recipient address or select an account.',
      );
      return;
    }
    // Create the recipient account object based on the selected account or input recipient
    const recipientAccount = selectedToAccount
      ? selectedToAccount
      : { name: 'Recipient', address: recipient };
    navigation.navigate('TokenSentToFrom', {
      fromAccount: selectedAccount,
      data: fromAccount,
      toAccount: recipientAccount,
      selectedForToken,
      selectedForCollectible ,
      selectedNetwork
    });
  };
  console.log("selectedNetwork to from Send Token Page", selectedNetwork)
  console.log("selectedForCollectible Send Token Page === ",selectedForCollectible)

  const isValidRecipient = recipient => {
    // Basic validation, adjust as per your requirements
    return recipient.trim().length > 0 && /^0x[a-fA-F0-9]{40}$/.test(recipient);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Send To</Text>
      <Text style={styles.label}>From</Text>
      <View style={styles.accountContainer}>
        <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>
            {selectedAccount ? selectedAccount.name : data ? data.name : ''}
          </Text>
          <Text style={styles.accountAddress}>
            {selectedAccount
              ? selectedAccount.address
              : data
                ? data.address
                : ''}

            {/* {selectedAccount ? selectedAccount.name : [data.name, data.address]} */}
          </Text>
        </View>
      </View>
      <Text style={styles.label}>To</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={recipient}
          onChangeText={setRecipient}
          placeholder="Search, public address (0x), or ENS"
          placeholderTextColor="#ABAFC4"
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Scanner', { fromAccount: selectedAccount, selectedNetwork })
          }>
          <FontAwesome name="qrcode" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.transferButton}
        onPress={toggleToDropdown}>
        <Text style={styles.transferButtonText}>
          Transfer Between My Accounts
        </Text>
      </TouchableOpacity>
      <Text style={styles.recentText}>Recent</Text>
      <ScrollView>
        {accounts &&
          accounts.map((account, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.accountContainer,
                selectedToAccount?.address === account.address && styles.selectedAccountContainer,
              ]}
              onPress={() => handleAccountSelect(account)}>
              <Image
                source={require('../assets/dot.png')}
                style={styles.dotIcon}
              />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountAddress}>{account.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Modal visible={showToDropdown} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeaderText}>Select Account</Text>
          {accounts &&
            accounts.map((account, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.accountContainer,
                  selectedToAccount?.address === account.address && styles.selectedAccountContainer,
                ]}
                onPress={() => handleAccountSelect(account)}>
                <Image
                  source={require('../assets/dot.png')}
                  style={styles.dotIcon}
                />
                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>{account?.name}</Text>
                  <Text style={styles.accountAddress}>{account?.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.sendButton, !isSendEnabled && styles.disabledButton]}
        onPress={handleSend}
        disabled={!isSendEnabled}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    padding: 20,
  },
  headerText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 20,
    marginTop: 30,
  },
  label: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D3C',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  selectedAccountContainer: {
    backgroundColor: '#3B3F4A', // Change color to indicate selection
  },
  dotIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  accountBalance: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  accountAddress: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2D3C',
    borderRadius: 8,
    marginBottom: 16,
    padding: 20,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  transferButton: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#2A2D3C',
    marginBottom: 16,
  },
  transferButtonText: {
    color: '#5F97FF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  recentText: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalHeaderText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#FEBF32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedAccountText: {
    color: '#FEBF32',
    fontWeight: 'bold',
  },
  
  selectedAccountContainer: {
    backgroundColor: '#3B3F4A',
    borderWidth: 2,
    borderColor: '#FEBF32',
  },
  
});

