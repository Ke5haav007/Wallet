import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const TokenTransferDetails = ({ route }) => {
  const { transactionDetails } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transaction Details</Text>
      {/* <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Token Amount:</Text>
        <Text style={styles.detailValue}>{transactionDetails.tokenAmount} TOKEN</Text>
      </View> */}
      {/* <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Gas Fee:</Text>
        <Text style={styles.detailValue}>{transactionDetails.gasFee} ETH</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>From Address:</Text>
        <Text style={styles.detailValue}>{transactionDetails.fromAddress}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>To Address:</Text>
        <Text style={styles.detailValue}>{transactionDetails.toAddress}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Token Balance:</Text>
        <Text style={styles.detailValue}>{transactionDetails.tokenBalance} TOKEN</Text>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    padding: 20,
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
  },
  detailValue: {
    color: '#FEBF32',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default TokenTransferDetails;