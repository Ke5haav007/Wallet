/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// App.tsx
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

import WalletSetup from './components/WalletSetup';
import ViewSeedPhrase from './components/ViewSeedPhrase';
import CreatePassword from './components/CreatePassword';
import SecureWallet from './components/SecureWallet';
import SecureWallet2 from './components/SecureWallet2';
import NoteDownSeed from './components/NoteDownSeed';
import ConfirmSeedPhrase from './components/ConfirmSeedPhrase';
import SuccessSeedPhrase from './components/SuccessSeedPhrase';
import MainPage from './components/MainPage';
import AddToken from './components/AddToken';
import CreatePasswordImport from './components/CreatePasswordImport';
import ImportSeedPhrase from './components/ImportSeedPhrase';
import VerifiedSeedPhrase from './components/VerifiedSeedPhrase';
import SendToken from './components/SendToken';
import TokenSentToFrom from './components/TokenSentToFrom';
import TokenAmount from './components/TokenAmount';
import TransactionSuccess from './components/TransactionSuccess';
import Wallet from './components/Wallet';
import NewWalletImport from './components/NewWalletImport';
import TransferNFT from './components/TransferNFT';
import TransferToken from './components/TransferToken';
import TokenTransferDetails from './components/TokenTransferDetails';
import AddCollectibles from './components/AddCollectibles';
import Recieve from './components/Recieve';
import Scanner from './components/Scanner';
import ImportAccount from './components/ImportAccount';
import Profile from './components/Profile';

const Stack = createStackNavigator();

const App: React.FC = (): React.ReactElement | null => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkPassword = async () => {
      try {
        const password = await RNSecureStorage.getItem('Password');
        console.log('Password:', password); // Log password for debugging

        if (password) {
          setInitialRoute('MainPage');
        } else {
          let isFirstLaunch = await RNSecureStorage.getItem('isFirstLaunch');
          console.log('isFirstLaunch (before setting):', isFirstLaunch); // Log isFirstLaunch for debugging

          if (isFirstLaunch === null) {
            await RNSecureStorage.setItem('isFirstLaunch', 'false', {
              accessible: ACCESSIBLE.WHEN_UNLOCKED,
            });
            isFirstLaunch = await RNSecureStorage.getItem('isFirstLaunch');
            console.log('isFirstLaunch (after setting):', isFirstLaunch); // Log isFirstLaunch for debugging

            setInitialRoute('WalletSetup');
          } else {
            setInitialRoute('CreatePassword');
          }
        }
      } catch (error) {
        console.error('Error checking password:', error);
        setInitialRoute('WalletSetup'); // fallback route
      }
    };

    checkPassword();
  }, []);

  // Render logic based on initialRoute value
  if (initialRoute === null) {
    return null; // or a loading spinner
  }

  // useEffect(() => {
  //   const checkPassword = async () => {
  //     try {
  //       const password = await RNSecureStorage.getItem('password');
  //       console.log('Password:', password); // Log password for debugging

  //       if (password) {
  //         setInitialRoute('MainPage');
  //       } else {
  //         const isFirstLaunch = await RNSecureStorage.getItem('isFirstLaunch');
  //         console.log('isFirstLaunch:', isFirstLaunch); // Log isFirstLaunch for debugging

  //         if (isFirstLaunch === null) {
  //           await RNSecureStorage.setItem('isFirstLaunch', 'false', {
  //             accessible: ACCESSIBLE.WHEN_UNLOCKED,
  //           });
  //           setInitialRoute('WalletSetup');
  //         } else {
  //           setInitialRoute('CreatePassword');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error checking password:', error);
  //       setInitialRoute('WalletSetup'); // fallback route
  //     }
  //   };

  //   checkPassword();
  // }, []);

  // if (!initialRoute) {
  //   // Show a loading screen or nothing until initial route is determined
  //   return null;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="WalletSetup"
          component={WalletSetup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewSeedPhrase"
          component={ViewSeedPhrase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePassword"
          component={CreatePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SecureWallet"
          component={SecureWallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SecureWallet2"
          component={SecureWallet2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoteDownSeed"
          component={NoteDownSeed}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConfirmSeedPhrase"
          component={ConfirmSeedPhrase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SuccessSeedPhrase"
          component={SuccessSeedPhrase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddToken"
          component={AddToken}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePasswordImport"
          component={CreatePasswordImport}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImportSeedPhrase"
          component={ImportSeedPhrase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifiedSeedPhrase"
          component={VerifiedSeedPhrase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SendToken"
          component={SendToken}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TokenSentToFrom"
          component={TokenSentToFrom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TokenAmount"
          component={TokenAmount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TransactionSuccess"
          component={TransactionSuccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewWalletImport"
          component={NewWalletImport}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TransferNFT"
          component={TransferNFT}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TransferToken"
          component={TransferToken}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TokenTransferDetails"
          component={TokenTransferDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddCollectibles"
          component={AddCollectibles}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recieve"
          component={Recieve}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImportAccount"
          component={ImportAccount}
          options={{headerShown: false}}
        />

<Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import WalletSetup from './components/WalletSetup';
// import ViewSeedPhrase from './components/ViewSeedPhrase';
// import CreatePassword from './components/CreatePassword';
// import SecureWallet from './components/SecureWallet';
// import SecureWallet2 from './components/SecureWallet2';
// import NoteDownSeed from './components/NoteDownSeed';
// import ConfirmSeedPhrase from './components/ConfirmSeedPhrase';
// import SuccessSeedPhrase from './components/SuccessSeedPhrase';
// import MainPage from './components/MainPage';
// import AddToken from './components/AddToken';
// import CreatePasswordImport from './components/CreatePasswordImport';
// import ImportSeedPhrase from './components/ImportSeedPhrase';
// import VerifiedSeedPhrase from './components/VerifiedSeedPhrase';
// import SendToken from './components/SendToken';
// import TokenSentToFrom from './components/TokenSentToFrom';
// import TokenAmount from './components/TokenAmount';
// import TransactionSuccess from './components/TransactionSuccess';
// import Wallet from './components/Wallet';

// const Stack = createStackNavigator();

// function App(): React.JSX.Element {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="WalletSetup">
//         <Stack.Screen name="WalletSetup" component={WalletSetup} options={{ headerShown: false }} />
//         <Stack.Screen name="ViewSeedPhrase" component={ViewSeedPhrase} options={{ headerShown: false }} />
//         <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false }} />
//         <Stack.Screen name="SecureWallet" component={SecureWallet} options={{ headerShown: false }} />
//         <Stack.Screen name="SecureWallet2" component={SecureWallet2} options={{ headerShown: false }} />
//         <Stack.Screen name="NoteDownSeed" component={NoteDownSeed} options={{ headerShown: false }} />
//         <Stack.Screen name="ConfirmSeedPhrase" component={ConfirmSeedPhrase} options={{ headerShown: false }} />
//         <Stack.Screen name="SuccessSeedPhrase" component={SuccessSeedPhrase} options={{ headerShown: false }} />
//         <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
//         <Stack.Screen name="AddToken" component={AddToken} options={{ headerShown: false }} />
//         <Stack.Screen name="CreatePasswordImport" component={CreatePasswordImport} options={{ headerShown: false }} />
//         <Stack.Screen name="ImportSeedPhrase" component={ImportSeedPhrase} options={{ headerShown: false }} />
//         <Stack.Screen name="VerifiedSeedPhrase" component={VerifiedSeedPhrase} options={{ headerShown: false }} />
//         <Stack.Screen name="SendToken" component={SendToken} options={{ headerShown: false }} />
//         <Stack.Screen name="TokenSentToFrom" component={TokenSentToFrom} options={{ headerShown: false }} />
//         <Stack.Screen name="TokenAmount" component={TokenAmount} options={{ headerShown: false }} />
//         <Stack.Screen name="TransactionSuccess" component={TransactionSuccess} options={{ headerShown: false }} />
//         <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
