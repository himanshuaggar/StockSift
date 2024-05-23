import { View, Text } from 'react-native'
import React from 'react'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Navigation from './src/navigation/Navigation'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './ToastConfig';
import { PersistGate } from 'redux-persist/integration/react';

GoogleSignin.configure({
  webClientId:
    "746410106528-rbc149gs88s1gadmkosqvr1ljup551q2.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId:
    "746410106528-6kvpbmrthcack39ohqn80fqvh5pl9m7n.apps.googleusercontent.com",
});

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
      <Toast visibilityTime={3000} config={toastConfig} bottomOffset={0} position='bottom' />

    </GestureHandlerRootView>
  )
}

export default App