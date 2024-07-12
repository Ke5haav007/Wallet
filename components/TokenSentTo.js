import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TokenSentTo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Token Sent To Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17171A',
  },
  text: {
    color: '#FEBF32',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default TokenSentTo;
