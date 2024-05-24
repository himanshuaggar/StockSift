import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import CenteredLogo from '../../components/global/CenteredLogo'
import CustomText from '../../components/global/CustomText'

const PayTab = () => {
  return (
    <CustomSafeAreaView>
        <CenteredLogo />
        <CustomText>Pay</CustomText>
    </CustomSafeAreaView>
  )
}

export default PayTab

const styles = StyleSheet.create({})