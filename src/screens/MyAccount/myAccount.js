import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import RewardPoints from '../RewardPoints';
import SearchBar from '../../components/SearchBar/searchBar';
import ImageUrl from '../../components/ImageUrl';
import Colors from '../../components/Colors/colors';
import Button from '../../components/Button/button';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCategoryListSuccessAction} from '../../redux/slices/categoryListSlice';
import {
  communicationPreference,
  customerAddress,
  getAccountData,
  getReminderDetail,
} from '../../redux/action/actions';

import ConfigUrl from '../../ConfigUrl/configUrl';
import { getWishlistSuccessAction } from '../../redux/slices/wishlistSlice';
import { getBasketSuccessAction } from '../../redux/slices/getBasketSlice';
import { getBasketTokenAction, getLoginUserSuccessAction } from '../../redux/slices/loginUserSlice';
import { getaccountSuccessAction } from '../../redux/slices/getAccountSlice';
import Global from '../../utils/Global';
import { getupdateBasketSuccessAction } from '../../redux/slices/updateBasketSlice';
import Globals from '../../utils/constant';

const MyAccount = props => {
  const [trigger, setTrigger] = useState();
  const navigation = useNavigation();
  const {accountData, accountisLoading} = useSelector(
    state => state.accountData.account,
  );

  const {
    data,
    registerData,
    newAddressData,
    addressUpdateData,
    addressRemoveData,
    defaultAddressData,
  } = useSelector(state => ({
    data: state.loginuser.user.data,
    registerData: state.newuser.user.registerData,
    newAddressData: state.addAddress.newAddress.newAddressData,
    addressUpdateData: state.updateAddress.addressUpdate.addressUpdateData,
    addressRemoveData: state.removeAddress.addressRemove.addressRemoveData,
    defaultAddressData: state.setAddress.defaultAddress.defaultAddressData,
  }));
  const dispatch = useDispatch();
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const postJson = {
    CustomerId: apiData?.CustomerId,
  };

  const details = accountData?.ResultData?.personalDetailResponse;
  const credit = accountData?.ResultData?.creditStoreResponse;
  const reward = accountData?.ResultData?.rewardPointsResponse;

  const logOut = () => {
    AsyncStorage.clear();
    // dispatch(getBasketSuccessAction({
    //   basketData: []
    //   }));
      dispatch(getLoginUserSuccessAction({
        user: {
          data: [],
          loginBasketData:[],
          basketToken:[]
        }
        }));
    dispatch(getCategoryListSuccessAction({
      categoryListData: [],
      }));
    dispatch(getWishlistSuccessAction({
      wishlist: []
      }));
      dispatch(getaccountSuccessAction({
        accountData: []
        }));
        const emptyBasketData = []; // Create an empty array
    dispatch(getBasketSuccessAction(emptyBasketData));
        dispatch(getupdateBasketSuccessAction())
        dispatch(getBasketTokenAction(null));
        Globals.globalBasket=''
        Globals.basketCount=0


    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
    // Global={}
  };

  const addressJson = {
    CustomerId: apiData?.CustomerId,
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getAccountData(postJson));
      dispatch(communicationPreference(apiData?.CustomerId));
      dispatch(customerAddress(addressJson));
      dispatch(getReminderDetail(apiData?.CustomerId));

      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    dispatch(customerAddress(addressJson));
  }, [
    newAddressData,
    addressUpdateData,
    addressRemoveData,
    defaultAddressData,
  ]);
  const handleNavigate = item => {
    setTrigger(!trigger);
    navigation.navigate(item?.navigateTo,{navigateFromCheckout:false});
    // navigation.navigate('Address',{navigateFromCheckout:true})
  };

  const Data = [
    {
      id: '1',
      title: 'My orders',
      navigateTo: 'myOrders',
    },
    {
      id: '2',
      title: 'Re-order reminder',
      navigateTo: 'reOrderReminder',
    },
    {
      id: '3',
      title: 'Auto-Replenish',
      navigateTo: 'autoReplenish',
    },

    {
      id: '4',
      title: 'Account settings',
      navigateTo: 'accountSettings',
    },

    {
      id: '5',
      title: 'Customer service',
      navigateTo: 'customerServices',
    },

    {
      id: '6',
      title: 'Addresses',
      navigateTo: 'Address',
    },

    {
      id: '7',
      title: 'Payments',
      navigateTo: 'payment',
    },

    {
      id: '8',
      title: 'Communication Preferences',
      navigateTo: 'communcationPreference',
    },
  ];

  return (
    <View style={styles.view}>
      <ScrollView style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <SearchBar navigation={props.navigation} />

          <View style={[styles.shop, styles.TxtView]}>
            <Text style={styles.shopTxt}>My Account</Text>
          </View>

          <View style={styles.profileView}>
            <View style={styles.nameView}>
              <Text style={styles.nameTxt}>
                {details?.FirstName} {details?.LastName}
              </Text>
              <Text style={styles.mailTxt}>{details?.Email}</Text>
            </View>

            <View style={styles.editView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('accountSettings')}
                style={styles.editBtn}>
                <Text style={styles.editTxt}>Edit profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pointsView}>
            <Text style={styles.Txt}>My points and credit</Text>

            <View style={styles.rewardView}>
              <TouchableOpacity
                style={styles.commonView}
                onPress={() =>
                  props.navigation.navigate('RewardPoints', {
                    screenName: 'Reward Point',
                  })
                }>
                <View style={styles.imageView}>
                  <Image style={styles.image} source={ImageUrl.Reward} />
                </View>
                <View style={styles.imageView}>
                  <Text style={styles.numberTxt}>
                    {reward?.TotalEarned} (£1)
                  </Text>
                </View>
                <Text style={styles.pointTxt}>Reward points</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(
                    'fgcWebView',
                    ConfigUrl.REFER_FRIEND,
                  )
                }
                style={styles.friendView}>
                <View style={styles.imageView}>
                  <Image style={styles.image} source={ImageUrl.Friend} />
                </View>
                <View style={styles.imageView}>
                  <Text style={styles.numberTxt}>£10</Text>
                </View>
                <Text style={styles.pointTxt}>Refer a friend</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.commonView}
                onPress={() =>
                  props.navigation.navigate('RewardPoints', {
                    screenName: 'Store credit',
                  })
                }>
                <View style={styles.imageView}>
                  <Image style={styles.image} source={ImageUrl.Wallet} />
                </View>
                <View style={styles.imageView}>
                  <Text style={styles.numberTxt}>
                    {credit?.TotalCreditAmount}
                  </Text>
                </View>
                <Text style={styles.pointTxt}>Store credit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {accountData?.ResultData?.banners && (
            <View style={styles.offerView}>
              <View style={styles.offersubView}>
                <Text style={styles.nameTxt}>My offers</Text>
              </View>

              <View style={styles.flatlistView}>
                <FlatList
                  data={accountData?.ResultData?.banners}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  renderItem={({item}) => (
                    <TouchableOpacity>
                      <Image
                        style={styles.banner}
                        source={{uri: item?.ImageUrl}}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          )}
          <View style={styles.dataView}>
            <FlatList
              data={Data}
              renderItem={({item}) => (
                <View style={styles.flatlistView}>
                  <TouchableOpacity
                    onPress={() => handleNavigate(item)}
                    style={styles.subTabView}>
                    <Text style={styles.subTabTxt}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={styles.fAQView}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('fgcWebView', ConfigUrl.FAQ)
              }
              style={styles.imageView}>
              <Text style={styles.FAQTxt}>FAQ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  'fgcWebView',
                  ConfigUrl.TERMS_AND_CONDITIONS,
                )
              }
              style={styles.imageView}>
              <Text style={styles.FAQTxt}>Terms & conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  'fgcWebView',
                  ConfigUrl.PRIVACY_POLICY,
                )
              }
              style={styles.imageView}>
              <Text style={styles.FAQTxt}>Privacy policy</Text>
            </TouchableOpacity>

            <Text style={styles.FAQTxt}>Version : 1.0.0</Text>
          </View>
          <View style={styles.btnView}>
            <Button
              onPress={() => logOut()}
              title={'Log out'}
              color={Colors.Black}
              txtColor={Colors.White}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
      {accountisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};
export default MyAccount;
