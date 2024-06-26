import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import CenteredLogo from '../../components/global/CenteredLogo'
import CustomText from '../../components/global/CustomText'

const MutualTab = () => {
  return (
    <CustomSafeAreaView>
        <CenteredLogo />
        <CustomText>Mutual</CustomText>
    </CustomSafeAreaView>
  )
}

export default MutualTab

const styles = StyleSheet.create({})