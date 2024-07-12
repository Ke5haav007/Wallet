import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
// import * as Font from 'expo-font';

const ReceivedTransaction = ({ route }) => {
  const { transaction } = route.params;
  const navigation = useNavigation();

  const onViewMainnet = () => {
    // Navigate to TokenSentTo screen
    navigation.navigate('TokenSentTo');
  };

  return (
    <View style={styles.container}>
      {/* Upper Section from MainPage.js */}
      <View style={styles.upperSection}>
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
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="shopping-cart" size={24} color="#FEBF32" />
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* End of Upper Section from MainPage.js */}

      <View style={styles.blurredSection} />

      <Text style={styles.title}>Received {transaction.token}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Text style={styles.status}>Status</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
        <View style={styles.infoRight}>
          <Text style={styles.confirmed}>Confirmed</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Text style={styles.from}>From</Text>
          <Text style={styles.address}>{transaction.sender}</Text>
        </View>
        <View style={styles.infoRight}>
          <Text style={styles.to}>To</Text>
          <Text style={styles.address}>{transaction.receiver}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Text style={styles.nonce}>Nonce</Text>
          <Text style={styles.value}>#{transaction.nonce}</Text>
        </View>
        <View style={styles.infoRight}>
          <Text style={styles.title}>Total Amount</Text>
          <Text style={styles.amount}>{transaction.amount}</Text>
          <Text style={styles.usdValue}>{transaction.usdValue}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewButton} onPress={onViewMainnet}>
        <Text style={styles.viewButtonText}>View on Mainnet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  upperSection: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#0D0E11', // Adjust to desired blue background color
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 80,
  },
  networkText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '800',
    marginRight: 8,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  receiveButton: {
    backgroundColor: '#2A2D3C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buyButton: {
    backgroundColor: '#FEBF32',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 8,
  },

  title: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  infoLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  status: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  date: {
    color: '#FFF',
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  confirmed: {
    color: '#76E268',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
  },
  from: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  to: {
    color: '#ABAFC4',
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  address: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  nonce: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  value: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  amount: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  usdValue: {
    color: '#FFF',
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  viewButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17171A',
    marginTop: 'auto',
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#FEBF32',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default ReceivedTransaction;
