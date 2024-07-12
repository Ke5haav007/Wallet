import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import * as Permissions from 'react-native-permissions';

export default function Scanner({route}) {
  const navigation = useNavigation();
  const {fromAccount, selectedNetwork} = route.params; // Get fromAccount from route params
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await Permissions.request(
        Permissions.PERMISSIONS.ANDROID.CAMERA,
      );
      if (granted !== Permissions.RESULTS.GRANTED) {
        console.log('Camera permission denied');
        return;
      }
    }
  };

  const handleScan = ({data}) => {
    console.log('Scanned QR code data:', data);
    navigation.navigate('SendToken', {
      recipientAddress: data,
      fromAccount,
      selectedNetwork,
    }); // Navigate back with scanned data
  };

  const startScan = () => {
    setScanning(true);
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleScan}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      ) : (
        <TouchableOpacity style={styles.scanButton} onPress={startScan}>
          <FontAwesome name="qrcode" size={120} color="#FEBF32" />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>Scan QR Code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17171A',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  scanButton: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
  },
});
