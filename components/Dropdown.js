import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import * as Font from 'expo-font';

const Dropdown = ({ isVisible, onClose, selectedNetwork, onSelectNetwork }) => {
  const networks = [
    'Ethereum Main',
    'Ropsten ',
    'Kovan ',
    'Goerli ',
  ];

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.headerText}>Network</Text>
          <TouchableOpacity style={styles.networkOptionSelected} onPress={() => onSelectNetwork(selectedNetwork)}>
            <Text style={styles.networkOptionSelectedText}>
              {selectedNetwork} <FontAwesome name="check" size={14} color="#76E268" />
            </Text>
          </TouchableOpacity>
          {networks.filter(network => network !== selectedNetwork).map((network, index) => (
            <TouchableOpacity key={index} style={styles.networkOption} onPress={() => onSelectNetwork(network)}>
              <Text style={styles.networkOptionText}>• {network}</Text>
            </TouchableOpacity>
          ))}
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100, // Gap from the top
  },
  dropdownContainer: {
    backgroundColor: '#1E1E24',
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    borderColor: '#FEBF32',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  selectedNetwork: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
   
  },
  networkOptionSelected: {
    marginBottom: 16,
    alignSelf: 'center',
  },
  networkOptionSelectedText: {
    color: '#76E268',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
  networkOption: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  networkOptionText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 24,
  },
  closeButtonText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default Dropdown;
