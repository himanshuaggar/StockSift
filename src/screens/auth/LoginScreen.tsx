import { Image, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import CustomText from '../../components/global/CustomText'
import { FONTS } from '../../constants/Fonts'
import LoginImageDark from "../../assets/images/login_dark_animation.png";
import LoginImageLight from '../../assets/images/login_animation_light.png';
import {
    normalizeModerately,
    screenHeight,
    screenWidth,
} from "../../utils/Scaling";
import SocialLoginButton from "../../components/auth/SocailLoginButton";
import Icon from "react-native-vector-icons/Ionicons";
import GoogleIcon from "../../assets/images/google.png";
import TouchableText from '../../components/auth/TouchableText'
import BottomText from '../../components/auth/BottomText'



type Props = {}

const LoginScreen = (props: Props) => {
    const theme = useColorScheme();
    return (
        <CustomSafeAreaView>
            <View style={styles.container}>
                <CustomText variant="h1" fontFamily={FONTS.Medium}>LoginScreen</CustomText>
                <CustomText variant="h7" style={styles.subText} fontFamily={FONTS.Bold}>
                    Invest • Pay • Loans
                </CustomText>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.img}
                        source={theme === "dark" ? LoginImageDark : LoginImageLight}
                    />
                </View>
                <SocialLoginButton
                    icon={<Image source={GoogleIcon} style={styles.gimg} />}
                    text="Continue with Google"
                    onPress={() => { }}
                />
                <SocialLoginButton
                    icon={<Icon name="logo-apple" size={18} color="black" />}
                    text="Continue with Apple"
                    onPress={() => { }}
                />

                <TouchableText
                    firstText="Use other email ID"
                    onPress={() => { }}
                    style={styles.touchText}
                />

                <BottomText />
            </View>
        </CustomSafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    subText: {
        marginTop: 16,
        opacity: 0.5,
    },
    imgContainer: {
        width: screenWidth,
        height: screenHeight * 0.45,
        marginVertical: normalizeModerately(25),
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    gimg: {
        height: 20,
        width: 20,
    },
    touchText: {
        marginVertical: 30,
        marginTop: 15,
    },
})