import { View, Text } from 'react-native'
import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useCustomTheme } from './Theme'
import { navigationRef } from '../utils/NavigationUtil'
import MainNavigator from './MainNavigator'
import NoInternet from '../components/global/NoInternet'


const Stack = createNativeStackNavigator()

const Navigation = () => {
    const theme = useCustomTheme();
    const MyTheme = { ...DefaultTheme, 
        colors: { 
        ...DefaultTheme.colors,
        background: theme.colors.background,
        text: theme.colors.text,
        card: theme.colors.card,
        border: theme.colors.border,
        notification: theme.colors.notification,
        primary: theme.colors.primary,
        }
    }

return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <MainNavigator />
        <NoInternet/>
    </NavigationContainer>
)
}

export default Navigation