import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";


// Debug Biometric & do FaceID

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

export const checkBiometrics = async () => {
  try {
    const { biometryType } = await rnBiometrics.isSensorAvailable();
    if (biometryType === BiometryTypes.Biometrics) {
      console.log("biomnhgtre")
    }
    console.log("qwrtyk,mnbvcgtyujkm")
    console.log(biometryType);
    return biometryType;
  } catch (error) {
    return null;
  }
};

export const generateBiometricPublicKey = async () => {
  try {
    const { keysExist } = await rnBiometrics.biometricKeysExist();
    if (keysExist) {
      throw new Error("Biometric Key exists.");
    }
    const { publicKey } = await rnBiometrics.createKeys();
    return publicKey;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteBiometricPublicKey = async () => {
  try {
    const { keysDeleted } = await rnBiometrics.deleteKeys();
    if (!keysDeleted) {
      throw new Error("Can not remove biometrics");
    }
    console.log(keysDeleted);
    // remove from backend
  } catch (error) {
    console.log(error);
  }
};

export const loginWithBiometrics =
  async (userID: string) => {
    try {
      const isBiometricAvailable = await checkBiometrics();
      if (!isBiometricAvailable) {
        throw new Error("Biometric not available");
      }
      const { keysExist } = await rnBiometrics.biometricKeysExist();

      if (!keysExist) {
        const { publicKey } = await rnBiometrics.createKeys();
        console.log("public Key", publicKey);
      }

      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: "Sign in",
        payload: userID,
      });

      if (!success) {
        throw new Error("Biometrics authentication failed!");
      }
      console.log(signature)
      if(signature){
        return true;
      }else{
        return false;
      }
    } catch (error: any) {
        console.log("Error@@", JSON.stringify(error));
        return false;
        }
  };

export default {
  checkBiometrics,
  generateBiometricPublicKey,
  deleteBiometricPublicKey,
  loginWithBiometrics,
};