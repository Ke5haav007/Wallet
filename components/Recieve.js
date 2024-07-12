import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

const Receive = () => {
  const route = useRoute();
  const { selectedAccount } = route.params;

  const handleCopyAddress = () => {
    Clipboard.setString(selectedAccount.address);
    Alert.alert('Copied to clipboard', 'The account address has been copied to your clipboard.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Receive</Text>
      
      <View style={styles.qrContainer}>
        <QRCode value={selectedAccount.address} size={165} />
      </View>
      
      <Text style={styles.scanText}>Scan address to Receive payment</Text>
      
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{selectedAccount.address}</Text>
        <TouchableOpacity onPress={handleCopyAddress}>
          <Text style={styles.copyText}>Copy the above address</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#FFF',
    textAlign: 'center',
    fontVariant: ['lining-nums', 'proportional-nums'],
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  qrContainer: {
    display: 'flex',
    width: 180,
    height: 180,
    padding: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginVertical: 20,
  },
  scanText: {
    color: '#ABAFC4',
    textAlign: 'center',
    fontVariant: ['lining-nums', 'proportional-nums'],
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 16,
  },
  addressContainer: {
    display: 'flex',
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addressText: {
    color: '#FEBF32',
    fontVariant: ['lining-nums', 'proportional-nums'],
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  copyText: {
    color: '#FEBF32',
    fontVariant: ['lining-nums', 'proportional-nums'],
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  button: {
    display: 'flex',
    width: 327,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: '#FEBF32',
    marginTop: 16,
  },
  buttonText: {
    color: '#000',
    fontVariant: ['lining-nums', 'proportional-nums'],
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default Receive;
