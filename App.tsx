import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {}

const App = (props: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App