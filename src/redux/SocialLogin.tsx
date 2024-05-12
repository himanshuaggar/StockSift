import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform, Alert } from "react-native";


export const signInwithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();

        Alert.alert("Token, Loggen In")
        console.log(idToken);
    } catch (error) {
        console.log(error);
    }
    
}