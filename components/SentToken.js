import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SentToken({ route }) {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Details</Text>
      <Text style={styles.detail}>Date: {transaction.date}</Text>
      <Text style={styles.detail}>Type: {transaction.type}</Text>
      <Text style={styles.detail}>Token: {transaction.token}</Text>
      <Text style={styles.detail}>Amount: {transaction.amount}</Text>
      <Text style={styles.detail}>USD Value: {transaction.usdValue}</Text>
      <Text style={styles.detail}>Status: {transaction.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#FEBF32',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  detail: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
});
