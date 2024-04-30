import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import {createNativeRootStackNavigator} from '@react-navigation/native-RootStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Linking } from 'react-native';

// Import your screens
import Welcome from '../screens/Welcome/welcome';
import InterestScreen from '../screens/InterestScreen/interestScreen';
import Shop from '../screens/Shop/shop';
import WelcomeBack from '../screens/WelcomeBack/welcomeBack';
import {useSelector} from 'react-redux';
import InterestMessage from '../screens/InterestMessage/interestMessage';
import CongratsMsg from '../screens/CongratsMsg/congratsMsg';
import Login from '../screens/Login/login';
import SplashScreen from '../screens/Splash/splashScreen';
import Register from '../screens/Register/register';
import ForgotPassword from '../screens/ForgotPassword/forgotPassword';
import { createRootStackNavigator } from '@react-navigation/RootStack';
// import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import MainScreen from '../screens/MainScreen/mainScreen';
import NewPassword from '../screens/NewPassword/newPassword';
import SearchScreen from '../screens/Search/search';
import DeliveryAddress from '../screens/AddDeliveryAddress/addDeliveryAddress';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import Filter from '../screens/Filter/filter';
import ThankYou from '../screens/ThankYouScreen/thankYou';
import ProductScreen from '../screens/ProductScreen/productScreen';
import FilterProductScreen from '../screens/ProductScreen/filterProductScreen'; 
import ClearanceScreen from '../components/Clearance/clearance';
import StudentDiscount from '../screens/StudentDiscount/studentDiscount';
import FgcWebView from '../screens/FgcWebView/fgcWebView';
import MyOrders from '../screens/MyOrders/myOrders';
import AutoReplenish from '../screens/AutoReplenish/autoReplenish';
import LiveChat from '../screens/LiveChat/liveChat';
import CustomerServices from '../screens/CustomerService/customerServices';
import AccountSettings from '../screens/AccountSetting/accountSettings';
import PersonalDetails from '../screens/PersonalDetails/personalDetails';
import GlassesLense from '../screens/Glasseslense/glassesLense';
import ViewReview from '../components/ViewReview/ViewReview';
import GlassPrescription from '../screens/glassPrescription/glassPrescription';
import MyBasket from '../screens/MyBasket/myBasket';
import RewardPoints from '../screens/RewardPoints';
import Payment from '../screens/Payment/payment';
import MyAccount from '../screens/MyAccount/myAccount';
import Communication from '../screens/CommunicationPreference/communicationPreference';
import Address from '../screens/Address/address';
import SecondSection from '../screens/Glasseslense/seccondSection';
import ThirdSection from '../screens/Glasseslense/thirdSection';
import ForthSection from '../screens/Glasseslense/forthSection';
import Reorder from '../screens/ReOrder/reOrder';
import AddGlassBasket from '../screens/Glasseslense/AddGlassBasket';
import ReorderReminder from '../screens/ReOrderReminder/reOrderReminder';
import Checkout from '../screens/Checkout/checkout';
import PaymentOption from '../screens/PaymentOption/paymentOption';
import ReturnOrder from '../screens/ReturnOrder/returnOrder';
import SelectPrescription from '../screens/Glasseslense/SelectGlassPrescription';
import HomeScreen from '../screens/HomeScreen/homeScreen';
import DeepLinkUrl from '../ConfigUrl/deeplinkurl';
//Deep linking testing
import DeepLink from '../screens/deeplink';

// const RegistrationRootStack = createNativeRootStackNavigator();
const RootStack = createNativeStackNavigator();
import LenseEdit from '../screens/LenseEdit/lenseEdit';

function Auth() {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="mainScreen">
      <RootStack.Screen name="register" component={Register} />
      <RootStack.Screen name="login" component={Login} />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="mainScreen"
        component={MainScreen}
      />
    </RootStack.Navigator>
  );
}


const configA = {
  initialRouteName: 'Shop',
  screens: {
    detailsScreen: {
      path: 'detailsScreen/:id',
      // parse: {
      //   id: (id) => console.log("linking------",id),
      // }, solutions  contact-lenses
    },
    sunglasses: {
      path: 'sunglasses/:sunglasses',
      deepLink:true
    },
    glasses: {
      path: 'glasses/:id',
    },
    solutions: {
      path: 'solutions/:id',
    },
    ['contact-lenses']: {
      path: 'contact-lenses/:productName',
    },
    catalogue: {
      path: 'catalogue/:id',
    },
    ['eye-care']: {
      path: 'eye-care/:id',
    },
    DeepLink: {
      path: 'deeplink/:id'
    }
  }
}

const linkingA = {
  prefixes: ['ukstaging://', 'https://ukstaging.lensgroup.co'],
  configA,
  async getInitialURL() {
    return Linking.getInitialURL();
  },
};

export default function MainNavigation() {
  // const {registerData} = useSelector(state => state.newuser.user);
  // const { data } = useSelector(state => state.users.user);
  const [splitUrlValue, setSplitUrlValue] = useState([]);
  // const isRegistering = registerData?.Status; 

  useEffect(() => {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      var urlSplit = url.split('/');
      console.log("log linkingSubscription=====",urlSplit)
      setSplitUrlValue(urlSplit);
    });
    return () => {
      linkingSubscription.remove();
    };
  }, [splitUrlValue]);
  console.log("log DeepLinkUrl.endPoint",DeepLinkUrl(splitUrlValue[4]),splitUrlValue[4])

  return (
    <NavigationContainer
      linking={linkingA }
      fallback={<ActivityIndicator color="blue" size="large" />}
    >
      <RootStack.Navigator initialRouteName="Shop">

      <RootStack.Screen
          name="DeepLink"
          component={DeepLink}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="splash" component={SplashScreen} />
        <RootStack.Screen
          options={{ headerShown: false,gestureEnabled: false }}
          name="Welcome"
          component={Welcome}
        />
       <RootStack.Screen
          options={{ headerShown: false }}
          name="interestScreen"
          component={InterestScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="WelcomeBack"
          component={WelcomeBack}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="forgotPassword"
          component={ForgotPassword}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="interestMessage"
          component={InterestMessage}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="congratsMsg"
          component={CongratsMsg}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Shop"
          component={BottomTabNavigation}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="newPassword"
          component={NewPassword}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="search"
          component={SearchScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="productScreen"
          component={ProductScreen}
        />

        <RootStack.Screen
          options={{ headerShown: false }}
          name="detailsScreen"
          component={DetailsScreen}
        />

        <RootStack.Screen
          options={{ headerShown: false }}
          name="sunglasses"
          component={
            (splitUrlValue[3] == 'sunglasses' && splitUrlValue[4] == 'brand' || splitUrlValue[4] == 'frameshape' || splitUrlValue[4] == 'prescription-sunglasses' &&  DeepLinkUrl(splitUrlValue[5]).length > 0) || 
            (splitUrlValue[3] == 'sunglasses' &&  DeepLinkUrl(splitUrlValue[4]).length > 0) 
            // (splitUrlValue[4] == 'sunglasses' &&  DeepLinkUrl(splitUrlValue[4]).length > 0)
            ? FilterProductScreen : DetailsScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="glasses"
          component={
            (splitUrlValue[3] == 'glasses' && splitUrlValue[4] == 'brand' || splitUrlValue[4] == 'shape'  &&  DeepLinkUrl(splitUrlValue[5]).length > 0) || 
            (splitUrlValue[3] == 'glasses' &&  DeepLinkUrl(splitUrlValue[4]).length > 0)
            ? FilterProductScreen : DetailsScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="solutions"
          component={
            splitUrlValue[3] == 'solutions'
              &&
              DeepLinkUrl(splitUrlValue[4]).length > 0 ? FilterProductScreen : DetailsScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="contact-lenses"
          component={
            splitUrlValue[3] == 'contact-lenses'
              &&
              DeepLinkUrl(splitUrlValue[4]).length > 0
              ? FilterProductScreen : DetailsScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="catalogue"
          component={
            splitUrlValue[3] == 'catalogue'
              &&
              DeepLinkUrl(splitUrlValue[4]).length > 0
              ? FilterProductScreen : DetailsScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="eye-care"
          component={splitUrlValue[3] == 'eye-care'
            &&
            DeepLinkUrl(splitUrlValue[4]).length > 0 ? FilterProductScreen : DetailsScreen}
        />


        <RootStack.Screen
          options={{headerShown: false}}
          name="filter"
          component={Filter}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="thankYou"
          component={ThankYou}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="clearance"
          component={ClearanceScreen}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="fgcWebView"
          component={FgcWebView}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="studentDiscount"
          component={StudentDiscount}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="myOrders"
          component={MyOrders}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="RewardPoints"
          component={RewardPoints}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="deliveryAddress"
          component={DeliveryAddress}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="autoReplenish"
          component={AutoReplenish}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="liveChat"
          component={LiveChat}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="customerServices"
          component={CustomerServices}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="communcationPreference"
          component={Communication}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="payment"
          component={Payment}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="personalDetails"
          component={PersonalDetails}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="accountSettings"
          component={AccountSettings}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="glassesLense"
          component={GlassesLense}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="viewReview"
          component={ViewReview}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="glassPrescription"
          component={GlassPrescription}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="reOrderReminder"
          component={ReorderReminder}
        />

        <RootStack.Screen
          options={{headerShown: false,gestureEnabled: false}}
          name="mybasket"
          component={MyBasket}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="Basketscreen"
          component={MyBasket}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="MyAccount"
          component={MyAccount}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="Address"
          component={Address}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="Checkout"
          component={Checkout}
        />

        <RootStack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="PaymentOption"
          component={PaymentOption}
        />

        <RootStack.Screen
          options={{headerShown: false}}
          name="SectionSecond"
          component={SecondSection}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="SectionThird"
          component={ThirdSection}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="SectionForth"
          component={ForthSection}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="glassBasket"
          component={AddGlassBasket}
        />
         <RootStack.Screen
          options={{headerShown: false}}
          name="returnOrder"
          component={ReturnOrder}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="lenseEdit"
          component={LenseEdit}
        />

         <RootStack.Screen
          options={{headerShown: false}}
          name="SelectPrescription"
          component={SelectPrescription}
        />
        <RootStack.Screen
        options={{tabBarShowLabel: false, headerShown: false}}
        name="Homescreen"
        component={HomeScreen}
      />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

