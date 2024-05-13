import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { validatePasswordLength } from '../../utils/ValidationUtils';
import { goBack, resetAndNavigate } from '../../utils/NavigationUtil';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import CenteredLogo from '../../components/global/CenteredLogo';
import CustomInput from '../../components/inputs/CustomInput';
import { GlobalStyles } from '../../styles/GlobalStyles';
import GuidelineText from '../../components/global/GuidelineText';
import CustomButton from '../../components/global/CustomButton';

const SetPasswordScreen = ({ route }: any) => {
    const [ password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if(!validatePasswordLength(password)){
            setPasswordError("Please enter a valid password");
            return false
        }
        return true;
    };

    const handleOnSubmit = async () => {
        setLoading(true);
        setTimeout(() => {
            if(validate()){
                resetAndNavigate("PhoneScreen");
            }
            setLoading(false);
        }, 3000);
    }
  return (
    <CustomSafeAreaView>
        <ScrollView>
            <CenteredLogo/>
            <TouchableOpacity onPress={() => goBack()}>
                <View pointerEvents="none">
                    <CustomInput label="EMAIL ADDRESS" value={route.params.email} />
                </View>
            </TouchableOpacity>
            <CustomInput
            label='SET PASSWORD'
            returnKeyType='done'
            value={password}
            autoFocus={true}
            error={passwordError}
            onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
            }}
            onSubmitEditing={handleOnSubmit}
            password
             />
        </ScrollView>
        <View style={GlobalStyles.bottomBtn}>
            <GuidelineText text={[
                "Password must contain atleast one uppercase and lowercase letter",
                "Must Contain atleast one number and one special charachter",
                "Must not contain user's first/last name & email id"
            ]} />
            <CustomButton
            text='NEXT'
            loading={loading}
            disabled={loading}
            onPress={() => {
                handleOnSubmit();
            }}
             />
        </View>
    </CustomSafeAreaView>
  )
}

export default SetPasswordScreen

const styles = StyleSheet.create({})