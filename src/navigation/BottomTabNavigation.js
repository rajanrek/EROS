import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from '../components/Icon';
import Shop from '../screens/Shop/shop';
import DeliveryAddress from '../screens/AddDeliveryAddress/addDeliveryAddress';
import HomeScreen from '../screens/HomeScreen/homeScreen';
import MyBasket from '../screens/MyBasket/myBasket';
import ProductScreen from '../screens/ProductScreen/productScreen';
import ContactLense from '../screens/DetailsScreen/DetailsScreen';
import ReferFriend from '../screens/FgcWebView/fgcWebView';
import MyAccount from '../screens/MyAccount/myAccount';
import Wishlist from '../screens/Wishlist/wishlist';
import {Image, Text, View} from 'react-native';
import Colors from '../components/Colors/colors';
import FilterProductScreen from '../screens/ProductScreen/filterProductScreen';
import {useSelector} from 'react-redux';
import Globals from '../utils/constant';
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{tabBarShowLabel: false, headerShown: false}}
        name="Homescreen"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}
const ShopStack = createStackNavigator();
function ShopStackScreen() {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ShopStack.Screen
        options={{tabBarShowLabel: false, headerShown: false,gestureEnabled: false }}
        name="Shop screen"
        component={Shop}
      />
      <ShopStack.Screen
        options={{tabBarShowLabel: false, headerShown: false,gestureEnabled: false }}
        name="productScreen"
        component={ProductScreen}
      />
      <Stack.Screen
          options={{tabBarShowLabel: false, headerShown: false, gestureEnabled: false}}
          name="FilterProductScreen"
          component={FilterProductScreen}
        />
      <HomeStack.Screen
        options={{tabBarShowLabel: false, headerShown: false, gestureEnabled: false}}
        name="contactLense"
        component={ContactLense}
      />
      <HomeStack.Screen
        options={{tabBarShowLabel: false, headerShown: false, gestureEnabled: false}}
        name="wishlist"
        component={Wishlist}
      />
    </ShopStack.Navigator>
  );
}

const WishlistStack = createStackNavigator();
function WishlistStackScreen() {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen
        options={{tabBarShowLabel: false, headerShown: false}}
        name="WishList screen"
        component={Wishlist}
      />
    </WishlistStack.Navigator>
  );
}

const BasketStack = createStackNavigator();
function BasketStackScreen() {
  return (
    <BasketStack.Navigator>
      <BasketStack.Screen
        options={{tabBarShowLabel: false, headerShown: false}}
        name="Basketscreen"
        component={MyBasket}
      />
    </BasketStack.Navigator>
  );
}

const MyAccountStack = createStackNavigator();
function MyAccountStackScreen() {
  return (
    <MyAccountStack.Navigator>
      <MyAccountStack.Screen
        options={{tabBarShowLabel: false, headerShown: false}}
        name="My Account screen"
        component={MyAccount}
      />
    </MyAccountStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function TabNavigator() {

  const {
    data,
    registerData,
    wishlistCountData
  } = useSelector(state => ({
    data: state.loginuser.user.data,
    registerData: state.newuser.user.registerData,
    wishlistCountData: state.wishlistcounts.WishlistCount.checkoutScreenData,

  }));
  const apiData = registerData
  ? registerData?.ResultData?.loginResponse
  : data?.ResultData?.loginResponse
  ? data?.ResultData?.loginResponse
  : data?.ResultData;

  const {basketData} = useSelector(
    state => state.myBasket.basket,
  );
  const {wishlist} = useSelector(
    state => state.wishlist.wishlistData,
  );
  return (
    <Tab.Navigator initialRouteName="shop">
      <Tab.Screen
        name="Home screen"
        component={HomeStackScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, size, color, tintColor}) => (
            <Image
              source={require('../assets/imageHome.png')}
              style={{height: size, width: size}}
              tintColor={focused ? Colors.goldYellow : 'gray'}
            />
            // <Icon
            //   name="Home"
            //   color={focused ? 'rgb(203, 176, 115)' : 'gray'}
            //   size={size}
            // />
          ),
        }}
      />
      <Tab.Screen
        name="shop"
        component={ShopStackScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/shopping-cart.png')}
              style={{height: 24, width: 24}}
              tintColor={focused ? Colors.goldYellow : 'gray'}
            />
            // <Icon
            //   name="menuBar"
            //   color={focused ? 'rgb(203, 176, 115)' : 'gray'}
            //   size={15}
            // />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistStackScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View>
               {wishlistCountData?.TotalWistListCount >0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -11,
                    top: -8,
                    backgroundColor: 'red',
                    width: 20,
                    height:20,
                    borderRadius: 10,
                    justifyContent:'center',
                    alignItems:'center'
                  }}>
                  <Text
                    style={{
                      color: Colors.White,
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {wishlistCountData?.TotalWistListCount}
                  </Text>
                </View>
              )}
                <Image
              source={require('../assets/imageWishlist.png')}
              style={{height: size, width: size}}
              tintColor={focused ? Colors.goldYellow : 'gray'}
            />
             {/* <Icon
              name="Wishlist"
              color={focused ? 'rgb(203, 176, 115)' : 'gray'}
              size={size}
            /> */}
            </View>
          
          ),
        }}
      />

      <Tab.Screen
        name="basket"
        component={BasketStackScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View>
              {Globals.basketCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -11,
                    top: -8,
                    backgroundColor: 'red',
                    width: 20,
                    height:20,
                    borderRadius: 10,
                    justifyContent:'center',
                    alignItems:'center'
                  }}>
                  <Text
                    style={{
                      color: Colors.White,
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {Globals.basketCount}
                  </Text>
                </View>
              )}
              <Image
                source={require('../assets/imageBag.png')}
                style={{height: size, width: size}}
                tintColor={focused ? Colors.goldYellow : 'gray'}
              />
              {/* <Icon
              name="basket"
              color={focused ? 'rgb(203, 176, 115)' : 'gray'}
              size={size}
            /> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyAccountStackScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/imageProfile.png')}
              style={{height: size, width: size}}
              tintColor={focused ? Colors.goldYellow : 'gray'}
            />
            // <Icon
            //   name="Profile"
            //   color={focused ? 'rgb(203, 176, 115)' : 'gray'}
            //   size={size}
            // />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
