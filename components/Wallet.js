import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import * as Font from 'expo-font';

const transactions = [
  {
    id: 1,
    date: 'Mar 3 at 10:04am',
    type: 'Received',
    token: 'BNB',
    amount: '0.04 BNB',
    usdValue: '$9.58799',
    status: 'Confirmed',
  },
  {
    id: 2,
    date: 'Mar 4 at 11:20am',
    type: 'Sent',
    token: 'BNB',
    amount: '0.10 BNB',
    usdValue: '$23.12345',
    status: 'Confirmed',
  },
  {
    id: 3,
    date: 'Mar 5 at 01:15pm',
    type: 'Received',
    token: 'BNB',
    amount: '0.20 BNB',
    usdValue: '$46.24690',
    status: 'Cancelled',
  },
  {
    id: 4,
    date: 'Mar 6 at 02:30pm',
    type: 'Sent',
    token: 'BNB',
    amount: '0.15 BNB',
    usdValue: '$34.56789',
    status: 'Confirmed',
  },
];

export default function Wallet() {
  const navigation = useNavigation();

  const handlePress = (transaction) => {
    if (transaction.status === 'Confirmed') {
      navigation.navigate('ConfirmedTransaction', { transaction });
    } else if (transaction.status === 'Cancelled') {
      navigation.navigate('CancelledTransaction', { transaction });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return '#76E268';
      case 'Cancelled':
        return 'red';
      default:
        return '#ABAFC4';
    }
  };

  const getArrowIcon = (type) => {
    switch (type) {
      case 'Received':
        return 'arrow-down';
      case 'Sent':
        return 'arrow-up';
      default:
        return 'arrow-right';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/girl.png')} style={styles.profileImage} />
        {/* <View style={styles.networkContainer}>
          <Text style={styles.networkText}>Ethereum Main</Text>
          <FontAwesome name="chevron-down" size={12} color="#FFF" />
        </View> */}
      </View>

      <Text style={styles.balanceText}>9.2362 ETH</Text>
      <Text style={styles.usdText}>$16,858.15 <Text style={styles.pluspercentageText}>+0.7%</Text></Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="arrow-up" size={24} color="#FEBF32" />
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton]}>
          <FontAwesome name="arrow-down" size={24} color="#FEBF32" />
          <Text style={styles.buttonText}>Receive</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.tokenContainer}>
        {transactions.map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.tokenRow} onPress={() => handlePress(transaction)}>
            <Text style={styles.dateText}>{transaction.date}</Text>
            <FontAwesome name={getArrowIcon(transaction.type)} size={24} color={getStatusColor(transaction.status)} style={styles.arrowIcon} />
            <View style={styles.transactionInfo}>
              <View style={styles.transactionHeader}>
                <Text style={[styles.tokenName, { color: getStatusColor(transaction.status) }]}>{transaction.type} {transaction.token}</Text>
                <Text style={[styles.tokenAmount, { color: getStatusColor(transaction.status) }]}>{transaction.amount}</Text>
              </View>
              <View style={styles.confirmationContainer}>
                <Text style={[styles.confirmationText, { color: getStatusColor(transaction.status) }]}>{transaction.status}</Text>
                <Text style={styles.usdValueText}>{transaction.usdValue}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="wallet" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="exchange" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="cog" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/Shape1.png')} style={styles.shapeImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 48,
    padding: 8,
    paddingLeft: 24,
    paddingRight: 115,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '800',
  },
  balanceText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 56,
    color: '#FEBF32',
    marginTop: 20,
  },
  usdText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: '#ABAFC4',
  },
  pluspercentageText: {
    color: '#76E268',
  },
  minuspercentageText: {
    color: 'red',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 327,
    marginTop: 20,
  },
  actionButton: {
    display: 'flex',
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  receiveButton: {
    borderRadius: 8,
    backgroundColor: '#2A2D3C',
  },
  buttonText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
  },
  tokenContainer: {
    width: 343,
    marginTop: 20,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D3C',
  },
  dateText: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    flex: 1,
  },
  arrowIcon: {
    width: 21,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  tokenAmount: {
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  confirmationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  confirmationText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
  },
  usdValueText: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 72,
    alignItems: 'center',
    backgroundColor: '#17171A',
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  shapeImage: {
    position: 'absolute',
    right: 0,
    top: 40,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
