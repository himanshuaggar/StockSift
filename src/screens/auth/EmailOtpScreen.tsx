import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SendOTP, VerifyOTP } from '../../redux/actions/userAction';
import CustomButton from '../../components/global/CustomButton';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { ScrollView } from 'react-native-actions-sheet';
import CenteredLogo from '../../components/global/CenteredLogo';
import CustomInput from '../../components/inputs/CustomInput';
import { goBack, navigate } from '../../utils/NavigationUtil';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { useAppDispatch } from '../../redux/reduxHook';
import OtpTimer from '../../components/auth/OtpTimer';



const EmailOtpScreen = ({route}:any) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const [otpError, setOtpError] = useState("");
  const handleSubmit = async () => {
    if (!otp) {
      setOtpError("Enter OTP");
      return;
    }
    setLoading(true);
    setTimeout(()=> {
      navigate("SetPasswordScreen", {
        email: route.params.email
      })
      setLoading(false);
    },2000);
    
  };

  const resendOTPHandler = async () => {
    await dispatch(SendOTP({ email: route?.params?.email, otp_type: "email" }));
  };
  return (
    <CustomSafeAreaView>
      <ScrollView>
        <CenteredLogo />

        <TouchableOpacity onPress={() => goBack()}>
          <View pointerEvents="none">
            <CustomInput label="EMAIL ADDRESS" value={route.params.email} />
          </View>
        </TouchableOpacity>

        <CustomInput
          label="ENTER OTP SEND TO THIS EMAIL ID"
          value={otp}
          onChangeText={(t) => {
            setOtp(t);
            setOtpError("");
          }}
          onSubmitEditing={() => {
            console.log("HIT OTP API");
          }}
          error={otpError}
          returnKeyType="done"
          maxLength={6}
          keyboardType="number-pad"
          rightText={
            <OtpTimer type="email" onPress={() => resendOTPHandler()} />
          }
        />
      </ScrollView>
      <View style={GlobalStyles.bottomBtn}>
        <CustomButton
          text="VERIFY EMAIL ID"
          loading={loading}
          disabled={loading}
          onPress={() => handleSubmit()}
        />
      </View>
    </CustomSafeAreaView>
  )
}

export default EmailOtpScreen

const styles = StyleSheet.create({})