import EmailScreen from "../screens/auth/EmailScreen";
import HomeScreen from "../screens/dashboard/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import EmailOtpScreen from "../screens/auth/EmailOtpScreen";
import SetPasswordScreen from "../screens/auth/SetPasswordScreen";
import EmailPasswordScreen from "../screens/auth/EmailPasswordScreen";
import PersonalDetailScreen from "../screens/auth/PersonalDetailScreen";
import PhoneScreen from "../screens/auth/PhoneScreen";
import PinScreen from "../screens/auth/PinScreen";
import ConfirmPinScreen from "../screens/auth/ConfirmPinScreen";
import AccountProtectedScreen from "../screens/auth/AccountProtectedScreen";
import AuthVerificationScreen from "../screens/auth/AuthVerificationSCreen";
import SplashScreen from "../screens/deeplinks/SplashScreen";
import BottomTab from "./BottomTab";
import StockDetail from "../screens/stocks/StockDetail";

export const authStack = [
    {
        name : "LoginScreen",
        component: LoginScreen,
    },
    
    {
        name : "EmailScreen",
        component: EmailScreen,
    },
    {
        name : "EmailOtpScreen",
        component: EmailOtpScreen,
    },
    {
        name : "SetPasswordScreen",
        component: SetPasswordScreen,
    },
    {
        name : "EmailPasswordScreen",
        component: EmailPasswordScreen,
    },
    {
        name : "PhoneScreen",
        component: PhoneScreen,
    },
    {
        name : "PersonalDetailScreen",
        component: PersonalDetailScreen,
    },
    {
        name : "PinScreen",
        component: PinScreen,
    },
    {
        name : "ConfirmPinScreen",
        component: ConfirmPinScreen,
    },
    {
        name : "AccountProtectedScreen",
        component: AccountProtectedScreen,
    },
    {
        name : "AuthVerificationScreen",
        component: AuthVerificationScreen,
    },
    {
        name : "SplashScreen",
        component: SplashScreen,
    },

];

export const dashboardStack = [
    {
        name : "HomeScreen",
        component: HomeScreen,
    },
    {
        name: "BottomTab",
        component: BottomTab,
      },
      {
        name: "StockDetail",
        component: StockDetail,
      },
]


export const mergedStacks = [...dashboardStack, ...authStack];