import React, { FC, useEffect, useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { Image, StyleSheet, View } from "react-native";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import CustomNumberPad from "../../components/inputs/CustomNumberPad";
import Logo from "../../assets/images/logo.png";
import TouchableText from "../../components/auth/TouchableText";
import RoundOTPInput from "../../components/inputs/RoundOTPInput";
import { loginWithBiometrics } from "../../utils/BiometricsUtils";

const initialState = ["", "", "", ""];

interface BiometricProp {
  onForgotPin: () => void;
}

const BiometricVerification: FC<BiometricProp> = ({ onForgotPin }) => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  useEffect(() => {}, []);
  const handlePressNumber = (number: number | string) => {
    if (focusedIndex < otpValues.length) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex] = number.toString();
      setOtpError(null);
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex + 1);
    }
  };

  const handlePressBackspace = () => {
    if (focusedIndex > 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex - 1] = "";
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex - 1);
    }
  };
  const handleBiometricVerification = async () => {
    const isVerified = await loginWithBiometrics("1234")
    
    console.log(isVerified);

    if (isVerified) {
      setOtpValues(["B", "I", "O", "P"]);
      
    }
  };

  const handlePressCheckmark = async () => {
    let valid = false;
    if (otpValues.join("") == "BIOP") {
      return;
    }
    otpValues.forEach((i) => {
      if (i === "") {
        valid = true;
        setOtpError("Enter PIN");
        setOtpValues(initialState);
        setFocusedIndex(0);
      }
    });
    if (!valid) {
      setLoading(true);
      await setTimeout(() => {
        setOtpValues(initialState);
      setFocusedIndex(0);
      setLoading(false);
      resetAndNavigate("HomeScreen");
      },2000)
      
    }
  };

  useEffect(() => {
    const allFilled = otpValues.every((value) => value !== "");
    if (allFilled) {
      handlePressCheckmark();
    }
  }, [otpValues]);


  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <CustomText variant="h6" fontFamily={FONTS.Bold}>
          Enter Groww PIN
        </CustomText>
        <View style={styles.emailContainer}>
          <CustomText style={styles.subText}>a*******2@gmail.com</CustomText>
          <TouchableText
            firstText="Logout"
            style={styles.logoutText}
            onPress={() => {}}
          />
        </View>
      </View>

      <RoundOTPInput
        onForgotPin={onForgotPin}
        loading={loading}
        otpValues={otpValues}
        error={otpError}
      />

      <CustomNumberPad
        customFont
        onPressBiometric={handleBiometricVerification}
        isBiometric={true}
        onPressNumber={handlePressNumber}
        onPressBackspace={handlePressBackspace}
        onPressCheckmark={handlePressCheckmark}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(25),
    marginBottom: RFValue(10),
  },
  logo: {
    height: RFValue(25),
    width: RFValue(25),
    alignSelf: "center",
    marginBottom: 8,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 15,
  },
  subText: {
    fontSize: RFValue(10),
  },
  logoutText: {
    fontFamily: FONTS.Regular,
    fontSize: RFValue(10),
  },
});

export default BiometricVerification;