import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TransactionSuccess({ route, navigation }) {
  const { txReceipt, gasFees } = route.params;

  const handleBackToWallet = () => {
    const ethAmount = parseFloat(txReceipt.value) / (10 ** 18); // Convert from Wei to ETH
    const ethToUsdRate = 1864.50; // Current ETH to USD conversion rate
    const usdValue = (ethAmount * ethToUsdRate).toFixed(2);

    navigation.navigate('MainPage', {
      newTransaction: {
        id: txReceipt.transactionHash,
        date: new Date().toLocaleString(), // Current date and time
        type: 'Sent', // Assuming it's a sent transaction
        token: 'ETH', // Assuming it's ETH
        amount: `${ethAmount} ETH`, // Convert from Wei to ETH
        usdValue: `$${usdValue}`, // Convert to USD
        status: 'Confirmed',
        gasFees: `${gasFees} ETH`,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transaction Successful</Text>
      <Text style={styles.detailsText}>Transaction Hash:</Text>
      <Text style={styles.hashText}>{txReceipt.transactionHash}</Text>
      <Text style={styles.detailsText}>Block Number:</Text>
      <Text style={styles.hashText}>{txReceipt.blockNumber}</Text>
      <Text style={styles.detailsText}>Gas Fees:</Text>
      <Text style={styles.hashText}>{gasFees} ETH</Text>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToWallet}>
        <Text style={styles.backButtonText}>Back to Wallet</Text>
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
  detailsText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  hashText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FEBF32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
});
