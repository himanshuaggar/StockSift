import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import BackButton from '../../components/global/BackButton'
import CenteredLogo from '../../components/global/CenteredLogo'
import CustomText from '../../components/global/CustomText'
import CustomInput from '../../components/inputs/CustomInput'
import TouchableText from '../../components/auth/TouchableText'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomButton from '../../components/global/CustomButton'

const EmailScreen = () => {
  const [ loading, setLoading] = useState(false);
  
  return (
    <CustomSafeAreaView>
      <BackButton />
      <CenteredLogo />
      <View>
        <CustomInput
          label='EMAIL ADDRESS'
          returnKeyType="done"
          placeholder='Eg. abc@gmail.com'
          onSubmitEditing={() => {
            console.log("HIT OTP API")
          }}
        />
        <CustomInput
          label='PASSWORD'
          returnKeyType="done"
          placeholder='8-20 characters'
          onSubmitEditing={() => {
            console.log("HIT OTP API")
          }}
          password
        />
        <CustomInput
          label=''

          placeholder='Enter OTP'
          onSubmitEditing={() => {
            console.log("HIT OTP API")
          }}
          keyboardType='number-pad'
          password
        />
        <CustomInput
          label='ENTER OTP SENT TO EMAIL ID'

          placeholder='Enter OTP'
          onSubmitEditing={() => {
            console.log("HIT OTP API")
          }}
          keyboardType='number-pad'
          rightText={
            <TouchableText
              onPress={() => { }}
              firstText='Resend in 25s'
              style={{ fontSize: RFValue(9), marginTop: 0 }}
            />
          }
        />
      <CustomButton loading={loading} text='NEXT' disabled={false} onPress={() => {
        setLoading(!loading)
      }} />

      </View>
    </CustomSafeAreaView>
  )
}

export default EmailScreen

const styles = StyleSheet.create({})