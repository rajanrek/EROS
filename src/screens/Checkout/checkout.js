import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import styles from './styles';
import FgcHeader from '../../components/Header/FgcHeader';
import Colors from '../../components/Colors/colors';
import ImageUrl from '../../components/ImageUrl';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import Button from '../../components/Button/button';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAddress,
  customerAddress,
  getCheckout,
  getReminderDetail,
  MakeOrders,
} from '../../redux/action/actions';
import {SkypeIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../../components/CustomsFonts/customFonts';
import HTMLRender, {
  HTMLContentModel,
  HTMLElementModel,
  RenderHTML,
} from 'react-native-render-html';
import SetAutoReplenish from '../../components/SetAutoReplenish/setAutoReplenish';
import moment from 'moment';
import Global from '../../utils/Global';
import Globals from '../../utils/constant';
import {getBasketTokenAction} from '../../redux/slices/loginUserSlice';
import ConfigUrl from '../../ConfigUrl/configUrl';

const Checkout = props => {
  const [paymentType, setPaymentType] = useState('');
  const [termCondition, setTermCondition] = useState(false);
  const [freeProduct, setFreeProduct] = useState(false);
  const [rewardPointValue, setRewardPointValue] = useState('0');
  const [rewardPromoLoader, setRewardPromoLoader] = useState(false);
  const [deliveryDataLoader, setDeliveryDataLoader] = useState(false);
  const [rewardPointTextValue, setRewardPointTextValue] = useState('');
  const [paymentTypeMethod, setPaymentTypeMethod] = useState('');
  const [transactionID, setTransactionID] = useState('');
  const [promoCodeValue, setPromoCodeValue] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const {checkout} = useSelector(state => state);
  const [autoOrder, setAutoOrder] = useState(false);
  const [autoDate, setAutoDate] = useState('');
  const [deliveryOptionId, setDeliveryOptionId] = useState('337');
  const [deliveryCost, setDeliveryCost] = useState('0');
  const [payNowStatus, setPayNowStatus] = useState(false);
  const {basketData} = useSelector(state => state.myBasket.basket);
  const [updateStateData, setUpdateState] = useState('');
  const [deliveryAddressData, setDeliveryAddressData] = useState('null');
  const [billingAddressData, setBillingAddressData] = useState('null');
  const [defaultDeliveryAddStatus, setDefaultDeliveryAddStatus] =
    useState(false);
  const [defaultBillingAddStatus, setDefaultBillingAddStatus] = useState(false);
  const handleAutoOrder = () => {
 
    dispatch(getReminderDetail(apiData?.CustomerId));
    setAutoOrder(!autoOrder);
    if (!autoOrder) {
      refRBSheet.current.open();
    }
  };
  const navigation = useNavigation();

  const {
    registerData,
    data,
    addressBookData,
    makeOrderdata,
    AddBasketData,
    isLoadingMakeordr,
    isLoading,
    loginBasketData,
    basketToken,
  } = useSelector(state => ({
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    addressPostCodeData:
      state.postCodeAddress.addressPostCode.addressPostCodeData,
    addressBookData: state.customerAddress.addressBook.addressBookData,
    makeOrderdata: state.ordersMake.makeOrder?.makeOrderdata,
    AddBasketData: state.addToBasket.addBasket.AddBasketData,
    isLoadingMakeordr: state.ordersMake.makeOrder.isLoadingMakeordr,
    isLoading: state.checkout.checkoutData.isLoading,
    loginBasketData: state.loginuser.user,
    basketToken: state.loginuser.user.basketToken,
  }));
  const myData = checkout.checkoutData.checkoutScreenData.ResultData;
  const deliveryData = addressBookData?.ResultData;


  const FreeImg =
    checkout?.checkoutData?.checkoutScreenData?.ResultData?.FreeProductDetails
      ?.BannerImg;
  const FreeProductDetail =
    checkout?.checkoutData?.checkoutScreenData?.ResultData?.FreeProductDetails;


  const Replenish = myData?.BasketItem?.Items[0]?.ProductTypeId;

  let a = myData?.BasketItem?.Items?.map(item => {
    return item.ProductTypeId != 1;
  });
  const isContactLense = a?.includes(true);
  console.log('isContactLense---', isContactLense);

  const dispatch = useDispatch();

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;


  const postJson2 = {
    BasketId: basketToken,
    CustomerId: apiData?.CustomerId,
    RedeemPoints: rewardPointValue ? rewardPointValue : 0,
    IsCheckedStoreCredit: 'true',
    DeliveryOptionId: deliveryOptionId,
    CoupanCode: promoCodeValue,
    PostCode:deliveryData?.Deliveryaddress?.length>0 && deliveryData?.Deliveryaddress[0]?.PostCode,
    DeliveryCountryId:deliveryData?.Deliveryaddress?.length>0 && deliveryData?.Deliveryaddress[0]?.CountryId,
    BillingAddressId:deliveryData?.BillingAddress?.length>0 && deliveryData?.BillingAddress[0]?.AddressId,
    DeliveryAddressId:deliveryData?.Deliveryaddress?.length>0 && deliveryData?.Deliveryaddress[0]?.AddressId,
    IsAutoReorder: autoOrder,
    AutoReorderDate: autoDate,
  };

  const updateState = data => {
    const postJson3 = {
      BasketId: basketToken,
      CustomerId: apiData?.CustomerId,
      RewardPoints: data.redeemPointsFromChildFromPayment
        ? data.redeemPointsFromChildFromPayment
        : rewardPointValue,
      // RewardPoint: 1000,
      IsPayPal: data.paymentOptionData == 1 ? true : false,
      // CreditCardId: data.paymentOptionData == 0 ?  parseInt(transactionID) : parseInt('0'),
      CreditCardId: data.cardId,
      IsCheckedStoreCredit: 'true',
      DeliveryOptionId: deliveryOptionId,
      CoupanCode: promoCodeValue,
      PostCode:
        deliveryAddressData == 'null'
          ? myData?.Addresses?.Deliveryaddress?.PostCode
          : deliveryAddressData?.PostCode,
      DeliveryCountryId:
        deliveryAddressData == 'null'
          ? myData?.Addresses?.Deliveryaddress?.CountryId
          : deliveryAddressData?.CountryId,
      BillingAddressId:
        billingAddressData == 'null'
          ? myData?.Addresses?.BillingAddress?.AddressId
          : billingAddressData.AddressId,
      DeliveryAddressId:
        deliveryAddressData == 'null'
          ? myData?.Addresses?.Deliveryaddress?.AddressId
          : deliveryAddressData?.AddressId,
      IsAutoReorder: data.AutoOrder ? data.AutoOrder : false,
      AutoReorderDate: data.AutoDate ? data.AutoDate : '',
      IsRushShipChecked: false,
      CampaignCodes: '',
      SafePlaceInstructions: '',
      IsNewsletterSubscribed: false,
      DeliveryCost: deliveryCost,
      FreeProductId: freeProduct ? 2296 : 0,
 
      // PaymentType:"CheckoutCard"
    };

    // setPaymentTypeMethod(methodOfPayment)
    console.log(
      'log postJson3',
      postJson3,
      'data======',
      data,
      '===',
      rewardPointValue,
      '---deliveryCost',
      deliveryCost,
    );
    dispatch(MakeOrders(postJson3));

    if (data.addCardStatus) {
      handleOpenRBSheet();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let checkoutJsonFirstRender = {
        BasketId: basketToken,
        CustomerId: apiData?.CustomerId,
        DeliveryCountryId: Global.BasketDataSummry.CountryId,
        DeliveryOptionId: Global.BasketDataSummry.DeliveryOptionId,
        IsPayPal: false,
        ItemToEdit: null,
        LeftEyeAttributes: null,
      };
      Global.BasketDataSummry?.AddressId == ''
        ? null
        : (checkoutJsonFirstRender.DeliveryAddressId =
            Global.BasketDataSummry.AddressId);
      Global.BasketDataSummry?.BillingAddressId == ''
        ? null
        : (checkoutJsonFirstRender.BillingAddressId =
            Global.BasketDataSummry.BillingAddressId);
     
      dispatch(getCheckout(checkoutJsonFirstRender));
      console.log('myLog===', checkout);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDefaultDeliveryAddStatus(true);
      setDefaultBillingAddStatus(true);
      const addressJsonCustomerAddress = {
        CustomerId: apiData?.CustomerId,
        IsCheckout: false,
      };
      dispatch(customerAddress(addressJsonCustomerAddress));
    });
    return unsubscribe;
  }, []);

  console.log('addressBookData useEffect data', addressBookData);

  useEffect(() => {
    if (makeOrderdata?.ResultData !== null && payNowStatus == true) {
      navigation.navigate('PaymentOption', {
        makeOrderdata: makeOrderdata,
        autoDate: autoDate,
      });
      setPayNowStatus(false);
    } else if (makeOrderdata?.Errors?.length > 0) {
      Alert.alert(makeOrderdata?.Errors[0]);
      setPayNowStatus(false);
    }
  }, [makeOrderdata]);

  useEffect(() => {
    if (rewardPointValue !== '') {
      dispatch(getCheckout(postJson2));
      setRewardPromoLoader(false);
    } else if (promoCodeValue !== '') {
      dispatch(getCheckout(postJson2));
      setRewardPromoLoader(false);
    } else if (deliveryOptionId !== '') {
      dispatch(getCheckout(postJson2));
      setDeliveryDataLoader(false);
    }
  }, [ paymentTypeMethod]);
  // promoCodeValue,
  // deliveryCost
  // deliveryOptionId
  const rewardFunction = data => {
    // setRewardPointTextValue(false)
    const rewardJson = {
      BasketId: basketToken,
      CustomerId: apiData?.CustomerId,
      RedeemPoints: data.reWardDataWithChild ? data.reWardDataWithChild : 0,
      IsCheckedStoreCredit: 'true',
      DeliveryOptionId: deliveryOptionId,
      CoupanCode: promoCodeValue,
      PostCode: myData?.Addresses?.Deliveryaddress?.PostCode,
      DeliveryCountryId: myData?.Addresses?.Deliveryaddress?.CountryId,
      BillingAddressId: myData?.Addresses?.BillingAddress?.AddressId,
      DeliveryAddressId: myData?.Addresses?.Deliveryaddress?.AddressId,
      IsAutoReorder:
        myData?.Addresses?.Deliveryaddress?.IsAutoReorderPresent == 0
          ? 'false'
          : 'true',
      AutoReorderDate: '',
    };
  
    setRewardPointValue(data.reWardDataWithChild);
    setRewardPointTextValue(data.reWardTextDataWithChild);
    console.log('postJson2', rewardJson);
    dispatch(getCheckout(rewardJson));
  };

  const promoCodeFunction = data => {
    let promoCodeJson = {
      BasketId: basketToken,
      CustomerId: apiData?.CustomerId,
      RedeemPoints: data.rewardPointVal,
      IsCheckedStoreCredit: 'true',
      DeliveryOptionId: deliveryOptionId,
      // DeliveryCost: '',
      CoupanCode: data.promoCodeWithChild,
      PostCode: 
      deliveryAddressData == 'null'
      ? deliveryData?.Deliveryaddress?.length >0 && deliveryData?.Deliveryaddress[0]?.PostCode
      : deliveryAddressData?.PostCode,
      DeliveryCountryId: 
      deliveryAddressData == 'null'
      ? deliveryData?.Deliveryaddress?.length >0 && deliveryData?.Deliveryaddress[0]?.CountryId
      : deliveryAddressData?.CountryId,
      BillingAddressId: 
      billingAddressData == 'null'
      ? deliveryData?.BillingAddress?.length >0 && deliveryData?.BillingAddress[0]?.AddressId
      : billingAddressData.AddressId,
      DeliveryAddressId: 
      deliveryAddressData == 'null'
      ? deliveryData?.Deliveryaddress?.length >0 &&  deliveryData?.Deliveryaddress[0]?.AddressId
      : deliveryAddressData?.AddressId,
      IsAutoReorder: autoOrder,
      AutoReorderDate: autoDate,
    };

    // rewardPointVal, promoCodeWithChild
    // addressBookData
    setPromoCodeValue(data.promoCodeWithChild);
    setRewardPointValue(data.rewardPointVal);
    dispatch(getCheckout(promoCodeJson));
    setRewardPromoLoader(data.loadingStatus);
  
  };

  const payNow = () => {
    updateState(updateStateData);
    setPayNowStatus(true);
    Globals.globalBasket = '';
    dispatch(getBasketTokenAction(''));
    console.log('makeOrderdata====', makeOrderdata);
  };

  console.log('paymentTypeMethod=====', isLoading);
  //   console.log("CheckoutScreenData==========",checkout.checkoutData.checkoutScreenData.ResultData)
  const refRBSheet = useRef();

  const handleCloseRBSheet = item => {
    console.log('item----193', item);
    if (item == 'cancel') {
      setAutoOrder(false);
    }
    refRBSheet.current.close();
  };

  const handleDate = (item, param) => {
    let newDate = item?.length > 0 && item?.split('-').reverse().join('-');
    let updatedDate = newDate.length > 0 && newDate?.replaceAll('-', '/');
    if (param.length > 0) {
      setAutoDate(param);
    }
    setAutoOrder(true);
  };

  const DeliveryOptionCardFun = val => {
    console.log('logDeliveryOptionCardFun', val);

    let deliveryOptionJson = {
      BasketId: basketToken,
      CustomerId: apiData?.CustomerId,
      IsCheckedStoreCredit: 'true',
      DeliveryOptionId: val.deliveryOptionId,
      DeliveryCost: val.deliveryValueWithChild,
      CoupanCode: promoCodeValue,
      PostCode: 
      deliveryAddressData == 'null'
      ? deliveryData?.Deliveryaddress?.length >0 &&  deliveryData?.Deliveryaddress[0]?.PostCode
      : deliveryAddressData?.PostCode,
      DeliveryCountryId:
      deliveryAddressData == 'null'
      ? deliveryData?.Deliveryaddress?.length >0 &&  deliveryData?.Deliveryaddress[0]?.CountryId
      : deliveryAddressData?.CountryId,
      BillingAddressId:
      billingAddressData == 'null'
          ? deliveryData?.BillingAddress?.length >0 &&  deliveryData?.BillingAddress[0]?.AddressId
          : billingAddressData.AddressId,
      DeliveryAddressId: 
      deliveryAddressData == 'null'
      ? deliveryData?.Deliveryaddress?.length >0 && deliveryData?.Deliveryaddress[0]?.AddressId
      : deliveryAddressData?.AddressId,
      IsAutoReorder: autoOrder,
      AutoReorderDate: autoDate,
    };
    rewardPointValue ? deliveryOptionJson.RedeemPoints = rewardPointValue: null
    setDeliveryOptionId(val.deliveryOptionId);
    setDeliveryCost(val.deliveryValueWithChild);
    dispatch(getCheckout(deliveryOptionJson));
    setDeliveryDataLoader(true);
   console.log("deliveryOptionJson",deliveryOptionJson)
  };

  const addAddressDataFromChildFun = data => {
    setDefaultDeliveryAddStatus(false);
    let deliveryOptionJson = {
      BasketId: basketToken,
      CustomerId: apiData?.CustomerId,
      RedeemPoints: rewardPointValue ? rewardPointValue : 0,
      IsCheckedStoreCredit: 'true',
      DeliveryOptionId: deliveryOptionId,
      CoupanCode: promoCodeValue,
      PostCode: data?.addressSelectionData?.PostCode,
      DeliveryCountryId: data?.addressSelectionData?.CountryId,
      BillingAddressId: 
      billingAddressData == 'null'
      ? deliveryData?.BillingAddress?.length >0 && deliveryData?.BillingAddress[0]?.AddressId
      : billingAddressData.AddressId,
      DeliveryAddressId: data?.addressSelectionData?.AddressId,
      IsAutoReorder: autoOrder,
      AutoReorderDate: autoDate,
    };
    console.log('deliveryOptionJson', deliveryOptionJson, '-----', data);
    setDeliveryAddressData(data.addressSelectionData);
    dispatch(getCheckout(deliveryOptionJson));
    // setDeliveryDataLoader(true)
  };

  const billingAddressFun = data => {
    setDefaultBillingAddStatus(false);
    let billingAddressFunJson = {
      BasketId: basketToken,
      CustomerId: apiData?.CustomerId,
      RedeemPoints: rewardPointValue ? rewardPointValue : 0,
      IsCheckedStoreCredit: 'true',
      DeliveryOptionId: deliveryOptionId,
      CoupanCode: promoCodeValue,
      PostCode: 
      deliveryAddressData == 'null'
      ? data?.billingAddressSelectionData?.PostCode
      : deliveryAddressData?.PostCode,
      DeliveryCountryId:
      deliveryAddressData == 'null'
      ? deliveryData?.Deliveryaddress?.length >0 &&  deliveryData?.Deliveryaddress[0]?.CountryId
      : deliveryAddressData?.CountryId,
      BillingAddressId: data?.billingAddressSelectionData?.AddressId,
      DeliveryAddressId: 
      deliveryAddressData == 'null'
      ?deliveryData?.Deliveryaddress?.length >0 &&  deliveryData?.Deliveryaddress[0]?.AddressId
      : deliveryAddressData?.AddressId,
      // myData?.Addresses?.Deliveryaddress?.AddressId,
      IsAutoReorder: autoOrder,
      AutoReorderDate: autoDate,
    };
    // myData?.Addresses?.BillingAddress?.AddressId
    // billingAddressData
    console.log("billingAddressFun",billingAddressFunJson)
    setBillingAddressData(data.billingAddressSelectionData);
    dispatch(getCheckout(billingAddressFunJson));
  };

  console.log('FreeProduct', FreeProductDetail);
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('10.5%')}}>
        <FgcHeader title={'Checkout'} isSearch={true} />
      </SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.IndicatorView}>
            <SkypeIndicator size={100} animationDuration={800} />
          </View>
        ) : null}
 
        {FreeProductDetail && (
          <View
            style={{
              paddingVertical: hp('2%'),
              paddingHorizontal: hp('2%'),
              borderRadius: 8,
            }}>
            <View
              style={{
                backgroundColor: Colors.White,
 
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3,
 
                elevation: 3,
                borderRadius: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: hp('10%'),
                        width: hp('35%'),
                        resizeMode: 'contain',
                      }}
                      source={{uri: FreeImg}}
                    />
                  </TouchableOpacity>
                </View>
                <CommonCheckBox
                  imageSource={ImageUrl.CheckRing}
                  onToggle={() => setFreeProduct(!freeProduct)}
                  isChecked={freeProduct}
                  uncheckedImage={ImageUrl.UncheckRing}
                />
              </View>
            </View>
          </View>
        )}
 
        <DeliveryCard
          DeliveryaddressData={
            defaultDeliveryAddStatus &&
            addressBookData?.ResultData?.Deliveryaddress !== null
              ? addressBookData?.ResultData?.Deliveryaddress?.length  >0 && addressBookData?.ResultData?.Deliveryaddress[0]
              : myData?.Addresses?.Deliveryaddress
          }
          EstimatedText={myData?.BasketSummary}
          AddressSelection={data => addAddressDataFromChildFun(data)}
        />
        <RewardCard
          RewardPoint={myData?.BasketSummary}
          rewardChildData={data => rewardFunction(data)}
          promoCodeChildData={data => promoCodeFunction(data)}
        />
        <DeliveryOptionCard
          deliveryChildData={data => DeliveryOptionCardFun(data)}
          DeliveryOption={myData?.DeliveryOptions?.DeliveryOptions}
        />
        <View style={{paddingHorizontal: hp('2%'), paddingVertical: hp('2%')}}>
          <Text
            style={{
              fontFamily: Fonts.OpenSansBold,
              fontWeight: '700',
              fontSize: 20,
              color: Colors.Black,
            }}>
            Payment{' '}
          </Text>
        </View>
        <BillingAddressCard
          BillingAddress={
            defaultBillingAddStatus &&
            addressBookData?.ResultData?.BillingAddress !== null
              ? addressBookData?.ResultData?.BillingAddress?.length>0 && addressBookData?.ResultData?.BillingAddress[0]
              : myData?.Addresses?.BillingAddress
          }
          AddressBillingSelection={data => billingAddressFun(data)}
        />

        <PaymentOptionCard
          paymentOption={myData?.PaymentOptions}
          AutoOrder={autoOrder}
          AutoDate={autoDate}
          rewardPointFromParent={rewardPointValue}
          updateParentState={data => setUpdateState(data)}
          TransactionID={data => setTransactionID(data.TransactionID)}
          // PaymentType={data => setPaymentTypeMethod(data.id)}
        />
        {!isContactLense && (
          <View
            style={{
              paddingVertical: hp('1%'),
              paddingHorizontal: hp('2%'),
              borderRadius: 8,
            }}>
            <View
              style={{
                backgroundColor: Colors.White,

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3,

                elevation: 3,
                borderRadius: 8,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => handleAutoOrder(!autoOrder)}>
                    <Image
                      source={
                        autoOrder ? ImageUrl.CheckAuto : ImageUrl.uncheckedAuto
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        <RBSheet
          ref={refRBSheet}
          height={Platform.OS === 'ios' ? hp('90%') : hp('95%')}
          openDuration={250}
          closeOnDragDown={false}
          closeOnPressMask={false}
          closeOnPressBack={false}
          animationType="fade"
          customStyles={{
            container: {
              backgroundColor: Colors.LightWhite,
              paddingBottom: Platform.OS === 'ios' ? hp('1.8%') : 0,
            },
          }}>
          <SetAutoReplenish
            handleBtn={'Checkout'}
            onClose={handleCloseRBSheet}
            handleDate={handleDate}
          />
        </RBSheet>
        <View
          style={{
            paddingVertical: hp('1%'),
            paddingHorizontal: hp('2%'),
            borderRadius: 8,
          }}>
          <View style={styles.shppingSummary}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansRegular,
                fontWeight: '400',
                fontSize: 18,
                color: Colors.Black,
              }}>
              Shopping Summary{'\n'}
            </Text>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'stretch',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // alignItems: 'stretch',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  SubTotal
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansBold,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  {myData?.BasketSummary.BasketTotalText}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  Delivery
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansBold,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  {myData?.BasketSummary.ShippingCostText}
                  {/* {'\n'} */}
                </Text>
              </View>

              {myData?.BasketSummary.DiscountPriceText !== null ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansRegular,
                      fontWeight: '400',
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    Coupon Discount
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansBold,
                      fontWeight: '400',
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    {myData?.BasketSummary.DiscountPriceText}
                    {/* {'\n'} */}
                  </Text>
                </View>
              ) : null}

              {myData?.BasketSummary.RewardPointDiscountText !== null ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansRegular,
                      fontWeight: '400',
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    Reward Point Discount
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansBold,
                      fontWeight: '400',
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    {myData?.BasketSummary.RewardPointDiscountText}
                    {'\n'}
                  </Text>
                </View>
              ) : null}

              <View
                style={{borderTopWidth: 1, height: 10, borderColor: 'grey'}}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  Reward Points{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.goldYellow,
                  }}>
                  {basketData?.ResultData?.BasketSummary?.EarnedRewardPoints}
                  {/* {myData?.BasketSummary?.RewardPointDiscountText
                    ? myData?.BasketSummary?.RewardPointDiscountText
                    : 0} */}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '700',
                    fontSize: 18,
                    color: Colors.Black,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '700',
                    fontSize: 18,
                    color: Colors.Black,
                  }}>
                  {myData?.BasketSummary.GrandTotalText}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: hp('2%'),
            paddingHorizontal: hp('2%'),
            borderRadius: 8,
          }}>
          <View
            style={{
              backgroundColor: Colors.White,
              paddingVertical: hp('1%'),
              paddingHorizontal: hp('2%'),
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 3,

              elevation: 3,
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansRegular,
                fontWeight: '400',
                fontSize: 16,
                color: Colors.Black,
                textDecorationLine: 'underline',
                textDecorationColor: Colors.Black,
              }}>
              {myData?.BasketSummary?.TaxDetails?.Header}
            </Text>
            <View style={{paddingVertical: hp('1.5%')}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansRegular,
                      fontWeight: '400',
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    {myData?.BasketSummary?.TaxDetails?.VatLabel1}{' '}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  {' '}
                  {myData?.BasketSummary?.TaxDetails?.VatText}{' '}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: Fonts.OpenSansRegular,
                  fontWeight: '400',
                  fontSize: 16,
                  color: Colors.Black,
                }}>
                {myData?.BasketSummary?.TaxDetails?.VatLabel2}
              </Text>
            </View>

            <View style={{paddingVertical: hp('1%')}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  {myData?.BasketSummary?.TaxDetails?.GoodPriceLabel1}
                </Text>

                <Text
                  style={{
                    fontFamily: Fonts.OpenSansRegular,
                    fontWeight: '400',
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  {' '}
                  {myData?.BasketSummary?.TaxDetails?.GoodsPriceText}{' '}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: Fonts.OpenSansRegular,
                  fontWeight: '400',
                  fontSize: 16,
                  color: Colors.Black,
                }}>
                {myData?.BasketSummary?.TaxDetails?.GoodPriceLabel2}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 7,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 4,
            }}>
            <CommonCheckBox
              imageSource={ImageUrl.CheckRing}
              onToggle={() => setTermCondition(!termCondition)}
              isChecked={termCondition}
              uncheckedImage={ImageUrl.UncheckRing}
            />
          </View>
          <View style={{width: '90%'}}>
          <RenderHTML
                      contentWidth={10}
                      source={{html: myData?.TermsConditions?.DisplayMsg}}
                      // customHTMLElementModels={customHTMLElementModels}

                      // tagsStyles={{"body":{"whiteSpace":"normal","color":"black","padding":10}, 'font':{"color":"#53b17e"}}
                      tagsStyles={{
                        body: {
                          whiteSpace: 'normal',
                          color: 'black',
                          fontSize: 14,
                          padding: 10,
                        },
                        font: {color: '#53b17e', fontSize: 12},
                      }}
                    />
          </View>
          
          {/* <View
            style={{
              flex: 9,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 6,
            }}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansSemiBold,
                fontSize: 13,
                fontWeight: '300',
                color: Colors.Black,
              }}>
              I agree to the{' '}
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 13,
                  fontWeight: '300',
                  color: Colors.Black,
                  textDecorationLine: 'underline',
                  paddingVertical: hp('1.3%'),
                  textDecorationColor: Colors.Black,
                }}
                onPress={() =>
                  navigation.navigate(
                    'fgcWebView',
                    ConfigUrl.TERMS_AND_CONDITIONS,
                  )
                }>
                Terms and Conditions,
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 13,
                  fontWeight: '300',
                  color: Colors.Black,
                  paddingVertical: hp('1.3%'),
                  textDecorationLine: 'underline',
                  textDecorationColor: Colors.Black,
                }}
                onPress={() =>
                  navigation.navigate('fgcWebView', ConfigUrl.PRIVACY_POLICY)
                }>
                Privacy Policy
              </Text>{' '}
              and{' '}
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 13,
                  fontWeight: '300',
                  color: Colors.Black,
                  textDecorationLine: 'underline',
                  textDecorationColor: Colors.Black,
                }}
                onPress={() =>
                  navigation.navigate('fgcWebView', ConfigUrl.COOKIE_POLICY)
                }>
                Cookie Policy.
              </Text>
              The price you will pay includes the supply of goods and the supply
              of dispensing services, which has been separately disclosed in the
              purchase summary of this page.
            </Text>
          </View> */}
        </View>
        <View style={{alignItems: 'center', paddingVertical: hp('2%')}}>
          <Button
            title={'Confirm and Pay'}
            color={termCondition ? Colors.Black : Colors.Grey}
            txtColor={termCondition ? Colors.White : Colors.Black}
            onPress={payNow}
            disable={!termCondition}
          />
        </View>
        <View style={{height: 50}} />
      </ScrollView>

      {isLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}

      {/* {rewardPromoLoader == true  ? 
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
       : null} */}

      {payNowStatus == true ? (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      ) : null}
      {/* payNowStatus */}
      {/* setRewardPointTextValue(false) */}
    </View>
  );
};

const DeliveryCard = props => {
  console.log('DeliveryCard', props?.EstimatedText?.EstimatedDeliveryText);

  const tagsStyle = {
    body: {
      whiteSpace: 'normal',
      color: Colors.Black,
    },
    a: {
      color: 'black',
    },
  };
  const navigation = useNavigation();
  const refAddressRBSheet = useRef();
  const [openRbSheetStatus, setOpenRbSheetStatus] = useState(false);
  const [addressSelectionStatus, setAddressSelectionStatus] = useState('');
  const [addressSelectionData, setAddressSelectionData] = useState('');
  const dispatch = useDispatch();
  const {registerData, data, addressBookData} = useSelector(state => ({
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    addressBookData: state.customerAddress.addressBook,
  }));

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  useEffect(() => {
    if (
      openRbSheetStatus == true &&
      addressBookData?.addressBookData?.ResultData?.Deliveryaddress?.length > 0
    ) {
      refAddressRBSheet.current.open();
      setOpenRbSheetStatus(false);
    }
  }, [openRbSheetStatus]);

  const addressSelectFun = () => {
    // refAddressRBSheet.current.open()
    // console.log("addressSelectFun props",props?.DeliveryaddressData)
    setOpenRbSheetStatus(true);
    props?.DeliveryaddressData == null
      ? navigation.navigate('Address', {navigateFromCheckout: true})
      : null;
    const addressJsonCustomerAddress = {
      CustomerId: apiData?.CustomerId,
      IsCheckout: false,
    };
    dispatch(customerAddress(addressJsonCustomerAddress));
  };

  const addressSelectionFun = (index, data) => {
    setAddressSelectionStatus(index);
    setAddressSelectionData(data);
  };

  const addAddressFun = () => {
    // console.log("addAddressFun",addressSelectionData, props?.DeliveryaddressData?.PostCode)
    props.AddressSelection({
      addressSelectionData: addressSelectionData,
    });
    refAddressRBSheet.current.close();
  };

  const editAddFun = () => {
    refAddressRBSheet.current.close();
    navigation.navigate('Address', {navigateFromCheckout: true});
  };

  console.log('billingAddress', addressBookData?.addressBookData?.ResultData);
 
  return (
    <View style={{paddingHorizontal: hp('1.5%')}}>
      <View
        style={{
          flex: 1,
          shadowColor: '#000',
          backgroundColor: Colors.White,

          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,

          elevation: 3,
          borderRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: hp('2%'),
            paddingVertical: hp('2%'),
          }}>
          <View style={{flex: 8}}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansSemiBold,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.Black,
              }}>
              Delivery Address
            </Text>
          </View>
          <TouchableOpacity
            // navigation.navigate('Address',{navigateFromCheckout:true})
            onPress={() => addressSelectFun()}
            style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            {props?.DeliveryaddressData?.Name ? (
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                Edit
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                Add
              </Text>
            )}
            <Image
              style={{height: hp('2%'), width: hp('4%')}}
              source={ImageUrl.RightArrow}
            />
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={refAddressRBSheet}
          openDuration={250}
          closeOnDragDown={true}
          height={hp('90%')}
          animationType="fade">
          <FlatList
            data={addressBookData?.addressBookData?.ResultData?.Deliveryaddress}
            renderItem={({item, index}) =>
              !item.IsCollectionCenter ? (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingVertical: hp('1%'),
                  }}
                  onPress={() => addressSelectionFun(index, item)}>
                  <View style={styles.addAddressMainView}>
                    <View>
                      {addressSelectionStatus == index ? (
                        <Image
                          style={{
                            height: hp('4%'),
                            width: hp('4%'),
                            left: hp('1.3%'),
                          }}
                          source={ImageUrl.CheckRing}
                        />
                      ) : (
                        <Image
                          style={{
                            height: hp('4%'),
                            width: hp('4%'),
                            left: hp('1.3%'),
                          }}
                          source={ImageUrl.BlankCheck}
                        />
                      )}
                    </View>
                    <View
                      style={[
                        styles.addAddressView,
                        {
                          backgroundColor:
                            addressSelectionStatus == index
                              ? '#daf6f7'
                              : '#ffff',
                        },
                      ]}>
                      <Text style={styles.addAddressTextView}>
                        {item.Name}
                        {'\n'}
                        {item.PhoneNumber} {'\n'}
                        {item.AddressLine1}, {'\n'}
                        {item.AddressLine2} {'\n'}
                        {item.PostCode} {'\n'}
                        {item.Country} {'\n'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null
            }
            // ItemSeparatorComponent={ItemSeparatorView}
          />
          <View
            style={{
              height: '15%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.addressButtonView}
              onPress={() => editAddFun()}>
              <Text style={{color: '#ffff', fontSize: 20}}>Edit/Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addressButtonView}
              onPress={() => addAddressFun()}>
              <Text style={{color: '#ffff', fontSize: 20}}>Select</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <View style={{paddingHorizontal: hp('2%')}}>
          <Text
            style={{
              fontFamily: Fonts.OpenSansSemiBold,
              fontWeight: '400',
              fontSize: 12,
              color: Colors.Black,
            }}>
            <HTMLRender
              source={{html: props?.EstimatedText?.EstimatedDeliveryText}}
              tagsStyles={tagsStyle}
            />
            {/* <Text
              style={{
                fontFamily: Fonts.OpenSansSemiBold,
                fontWeight: '400',
                fontSize: 12,
                color: Colors.Green,
              }}>
              Thursday 31 August
            </Text>{' '} */}
          </Text>
        </View>
        <View style={{paddingHorizontal: hp('2%'), paddingVertical: hp('2%')}}>
          <Text
            style={{
              fontFamily: Fonts.OpenSansRegular,
              fontWeight: '400',
              fontSize: 13,
              color: Colors.Black,
            }}>
            {props?.DeliveryaddressData?.Name}
            {'\n'}
            {props?.DeliveryaddressData?.PhoneNumber}
            {'\n'}
            {props?.DeliveryaddressData?.AddressLine1},
            {props?.DeliveryaddressData?.AddressLine2}
            {'\n'}
            {props?.DeliveryaddressData?.PostCode}{' '}
            {props?.DeliveryaddressData?.StateCounty}
            {'\n'}
            {props?.DeliveryaddressData?.Country}
          </Text>
        </View>
      </View>
    </View>
  );
};

const RewardCard = props => {
  // console.log("props.DeliveryaddressData.Name",props?.DeliveryaddressData?.Deliveryaddress?.Name);
  const [rewardStatus, setRewardStatus] = useState(false);
  const [promoCode, setPromoCode] = useState(false);
  const [promoCodeError, setpromoCodeError] = useState(false);
  const [rewardPoint, setRewardPoints] = useState('');
  const [rewardPointVal, setRewardPointsVal] = useState(0);
  const refRewardRBSheet = React.useRef();
  const rewardTextRef = useRef('');
  const rewardRef = useRef(0);
  // const { width } = useWindowDimensions();

  useEffect(() => {
    props.rewardChildData({
      reWardDataWithChild: rewardPoint,
    });
  }, []);

  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  function closeRewardBRsheet(val) {
    rewardRef.current = val.Value;
    props.rewardChildData({
      reWardDataWithChild: val.Value,
      reWardTextDataWithChild: val.Text,
    });
    setRewardPoints(val.Text);
    setRewardPointsVal(val.Value);
    if (val.Text == 'Remove Reward Points') {
      rewardTextRef.current = 'Use Reward Points';
      setRewardPoints('Use Reward Points');
    } else {
      rewardTextRef.current = val.Text;
    }
    refRewardRBSheet.current.close();
  }

  function promoCodeFun() {
    if (props?.RewardPoint?.DiscountMessage !== null) {
      console.log('promo code 1');
      setPromoCode('');
      props.promoCodeChildData({
        promoCodeWithChild: '',
        rewardPointVal: rewardPointVal,
        loadingStatus: false,
      });
    } else {
      setPromoCode('');
      props.promoCodeChildData({
        promoCodeWithChild: promoCode,
        rewardPointVal: rewardPointVal,
        loadingStatus: true,
      });
    }
  }

  const inputTextFun = val => {
    setPromoCode(val);
  };

  console.log('rewardPoints====', props?.RewardPoint?.DiscountMessage);
  return (
    <View>
      <View
        style={{
          flex: 1,
          paddingVertical: hp('2.3%'),
          paddingHorizontal: hp('2%'),
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.White,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3,

            elevation: 3,
            borderRadius: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: hp('2%'),
              paddingVertical: hp('2%'),
            }}>
            <View style={{flex: 9}}>
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                Apply Reward Points / Promo codes
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setRewardStatus(!rewardStatus)}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Image
                style={{
                  height: hp('2%'),
                  width: hp('4%'),
                  left: hp('1.3%'),
                }}
                source={ImageUrl.RightArrow}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => setRewardStatus(!rewardStatus)}>
        <Text>Apply Reward Points / Promo codes{'\n'}</Text>
      </TouchableOpacity> */}
        {/* props?.RewardPoint?.DiscountError && props?.RewardPoint?.RewardPointList?.length > 0 ? 120  */}
        {rewardStatus ? (
          <View
            style={
              {
                //   borderWidth: 0,
                //   flex:1,
                //   height:
                //     props?.RewardPoint?.DiscountError &&
                //     props?.RewardPoint?.RewardPointList?.length > 0
                //       ? 120
                //       : props?.RewardPoint?.RewardPointList?.length > 0
                //       ? 110
                //       : props?.RewardPoint?.DiscountError
                //       ? 70
                //       : 50,
                //   justifyContent: 'space-around',
              }
            }>
            {/* myData?.BasketSummary.DiscountErrormyData?.BasketSummary.DiscountError */}
            {props?.RewardPoint?.DiscountError ? (
              <View style={{borderWidth: 0, marginTop: 20}}>
                <Text style={{color: 'red', fontSize: 16}}>
                {props?.RewardPoint?.DiscountError}
              </Text>
            </View>
             ) : null}

            {props?.RewardPoint?.RewardPointList?.length > 0 ? (
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 14,
                    fontWeight: '600',
                    color: Colors.Black,
                    paddingVertical: hp('1.3%'),
                  }}>
                  You have {props.RewardPoint.AvailableRewardPoints} Reward
                  Points
                </Text>
                <View
                  style={
                    {
                      // paddingVertical: hp('0.5%'),
                      // paddingHorizontal: hp('1%'),
                    }
                  }>
                  <TouchableOpacity
                    onPress={() => refRewardRBSheet.current.open()}
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.LightGrey,
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingVertical: hp('1%'),
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      // padding: 5,
                      // marginTop: 0,
                    }}>
                    {rewardPoint ? (
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSansSemiBold,
                          fontSize: 14,
                          fontWeight: '600',
                          color: Colors.Black,
                        }}>
                        {' '}
                        {rewardPoint}{' '}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSansSemiBold,
                          fontSize: 14,
                          fontWeight: '600',
                          color: Colors.Black,
                        }}>
                        {'   '}
                        Use Reward Points{' '}
                      </Text>
                    )}
                    <Image
                      style={{
                        height: hp('2%'),
                        width: hp('2%'),
                        resizeMode: 'contain',
                        right: hp('1%'),
                      }}
                      source={ImageUrl.DropArrow}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'rgba(52, 52, 52, 0.8)'
                  }}>
                  <RBSheet
                    ref={refRewardRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={hp('50%')}
                    customStyles={{
                      wrapper: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                      },
                      draggableIcon: {
                        backgroundColor: '#000',
                      },
                    }}>
                    <FlatList
                      data={props.RewardPoint.RewardPointList}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            paddingVertical: hp('1%'),
                          }}
                          onPress={() => closeRewardBRsheet(item)}>
                          <View>
                            <Text
                              style={{
                                fontFamily: Fonts.OpenSansSemiBold,
                                fontSize: 14,
                                fontWeight: '500',
                                color: Colors.Black,
                              }}>
                              {item.Text}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      ItemSeparatorComponent={ItemSeparatorView}
                    />
                  </RBSheet>
                </View>
              </View>
            ) : null}

            <View>
              <View
                style={{
                  paddingHorizontal: hp('1%'),
                  //   paddingVertical: hp('1.5%'),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 14,
                    fontWeight: '600',
                    color: Colors.Black,
                    paddingVertical: hp('1%'),
                  }}>
                  Apply Promotional Code
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 5,
                }}>
                {props?.RewardPoint?.DiscountMessage !== null ? (
                  <View style={{width: '60%'}}>
                    <RenderHTML
                      contentWidth={10}
                      source={{html: props?.RewardPoint?.DiscountMessage}}
                      customHTMLElementModels={customHTMLElementModels}
                      tagsStyles={{
                        body: {
                          whiteSpace: 'normal',
                          color: 'black',
                          fontSize: 12,
                          padding: 10,
                        },
                        font: {color: '#53b17e', fontSize: 12},
                      }}
                    />
                  </View>
                ) : (
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: Colors.Grey,
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: promoCode ? hp('5.5%') : hp('2.5%'),
                      // width: 200,
                    }}
                    onChangeText={text => inputTextFun(text)}
                    maxLength={14}
                    secureTextEntry={false}
                    value={promoCode}
                    placeholder="Insert you coupon code"
                    placeholderTextColor="grey"
                    numberOfLines={1}
                  />
                )}

                {props?.RewardPoint?.DiscountMessage !== null ? (
                  <TouchableOpacity
                    onPress={() => promoCodeFun()}
                    //  disabled={promoCode.length < 5 || props?.RewardPoint?.DiscountMessage == null}
                    style={styles.reorderView}>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 12,
                        fontWeight: '400',
                        color: Colors.Black,
                        color: Colors.White,
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => promoCodeFun()}
                    disabled={
                      promoCode.length == undefined || promoCode.length <= 4
                        ? true
                        : false
                    }
                    style={
                      promoCode.length >= 5
                        ? styles.reorderView
                        : styles.disablereorderView
                    }>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 12,
                        fontWeight: '400',
                        color: Colors.Black,
                        color: Colors.White,
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const DeliveryOptionCard = props => {
  // console.log("props.DeliveryaddressData.Name",props?.DeliveryaddressData?.Deliveryaddress?.Name);
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(0);
  const [hnadleStatus, setHnadleStatus] = useState(true);

  const handleToggle = (id, value) => {
    setHnadleStatus(false);
    console.log('log handleToggle ', id, '--', value);
    setChecked(id);
    if (checked !== id) {
      console.log('log same checked id');
      props.deliveryChildData({
        deliveryValueWithChild: value.Price,
        deliveryOptionId: value.ShippingId,
      });
    }
  };

  useEffect(() => {
    hnadleStatus
      ? props.deliveryChildData({
          deliveryValueWithChild: props?.DeliveryOption?.length>0 && props?.DeliveryOption[0].Price,
          deliveryOptionId:  props?.DeliveryOption?.length>0 &&  props?.DeliveryOption[0].ShippingId,
        })
      : null;
  }, []);

  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  return (
    <View
      style={{
        paddingVertical: hp('0.5%'),
        paddingHorizontal: hp('2%'),
        borderRadius: 8,
      }}>
      <View
        style={{
          backgroundColor: Colors.White,

          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,

          elevation: 3,
          borderRadius: 8,
        }}>
        <View style={{paddingVertical: hp('1%')}}>
          <Text
            style={{
              fontFamily: Fonts.OpenSansSemiBold,
              fontSize: 14,
              fontWeight: '400',
              color: Colors.Black,
              paddingHorizontal: hp('1.5%'),
            }}>
            {' '}
            Delivery Options
          </Text>
        </View>
        {props?.DeliveryOption?.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: hp('2%'),
                paddingVertical: hp('0.2%'),
              }}>
              <View style={{flex: 8}}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 14,
                    fontWeight: '400',
                    color: Colors.Black,
                  }}>
                  {item.DeliveryType}
                </Text>
              </View>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 14,
                    fontWeight: '400',
                    color: Colors.Black,
                  }}>
                  {/* {item.PriceText} */}
                  <View style={{alignItems: 'center'}}>
                    <RenderHTML
                      contentWidth={10}
                      source={{html: item.PriceText}}
                      customHTMLElementModels={customHTMLElementModels}
                      // tagsStyles={{"body":{"whiteSpace":"normal","color":"black","padding":10}, 'font':{"color":"#53b17e"}}
                      tagsStyles={{
                        body: {
                          whiteSpace: 'normal',
                          color: 'black',
                          fontSize: 16,
                          padding: 0,
                          textAlign: 'right',
                          top: 8,
                          alignItems: 'center',
                        },
                        font: {color: 'black', fontSize: 16, top: 8},
                      }}
                    />
                  </View>
                </Text>
                <View>
                  <CommonCheckBox
                    imageSource={ImageUrl.UncheckRing}
                    onToggle={() => handleToggle(index, item)}
                    isChecked={checked !== index}
                    uncheckedImage={ImageUrl.CheckRing}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const BillingAddressCard = props => {
  // console.log("props.DeliveryaddressData.Name",props?.DeliveryaddressData?.Deliveryaddress?.Name);
  const navigation = useNavigation();
  const refAddressRBSheet = useRef();
  const [openRbSheetStatus, setOpenRbSheetStatus] = useState(false);
  const [addressSelectionStatus, setAddressSelectionStatus] = useState(
    props?.BillingAddress?.PostCode,
  );
  const [addressSelectionData, setAddressSelectionData] = useState('');
  const dispatch = useDispatch();
  const {registerData, data, addressBookData} = useSelector(state => ({
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    addressBookData: state.customerAddress.addressBook,
  }));

  // console.log("props?.BillingAddress",props?.BillingAddress?.PostCode)

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  useEffect(() => {
    // console.log("billing Address card=======",addressBookData?.addressBookData?.ResultData?.BillingAddress, '----',props?.BillingAddress?.AddressId)
    if (
      openRbSheetStatus == true &&
      addressBookData?.addressBookData?.ResultData?.BillingAddress?.length > 0
    ) {
      refAddressRBSheet.current.open();
      setOpenRbSheetStatus(false);
    }
  }, [openRbSheetStatus]);

  const billingAddressSelectionFun = (index, data) => {
    setAddressSelectionStatus(data.PostCode);
    setAddressSelectionData(data);
  };

  const addBillingAddressFun = () => {
    // console.log("addBillingAddressFun",addressSelectionData, props?.DeliveryaddressData?.PostCode)

    props.AddressBillingSelection({
      billingAddressSelectionData: addressSelectionData,
    });
    refAddressRBSheet.current.close();
  };

  const editAddBillingFun = () => {
    refAddressRBSheet.current.close();
    navigation.navigate('Address', {navigateFromCheckout: true});
  };

  const billingAddressSelectFun = () => {
    setOpenRbSheetStatus(true);
    // refAddressRBSheet.current.open()
    // console.log("refRBSheet.current.open()",refRBSheet.current.open())
    props?.BillingAddress == null
      ? navigation.navigate('Address', {navigateFromCheckout: true})
      : null;

    const addressJsonCustomerAddress = {
      CustomerId: apiData?.CustomerId,
      IsCheckout: false,
    };
    dispatch(customerAddress(addressJsonCustomerAddress));
  };

  return (
    <View style={{paddingHorizontal: hp('1.5%')}}>
      <View
        style={{
          flex: 1,
          shadowColor: '#000',
          backgroundColor: Colors.White,

          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,

          elevation: 3,
          borderRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: hp('2%'),
            paddingVertical: hp('2%'),
          }}>
          <View style={{flex: 8}}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansSemiBold,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.Black,
              }}>
              Billing Address
            </Text>
          </View>
          <TouchableOpacity
            //  navigation.navigate('Address', { navigateFromCheckout: true })
            onPress={() => billingAddressSelectFun()}
            style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            {props?.BillingAddress?.Name ? (
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                Edit
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                Add
              </Text>
            )}
            <Image
              style={{height: hp('2%'), width: hp('4%')}}
              source={ImageUrl.RightArrow}
            />
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={refAddressRBSheet}
          openDuration={250}
          closeOnDragDown={true}
          height={hp('90%')}
          animationType="fade">
          <FlatList
            data={addressBookData?.addressBookData?.ResultData?.BillingAddress}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  paddingVertical: hp('1%'),
                }}
                onPress={() => billingAddressSelectionFun(index, item)}>
                <View style={styles.addAddressMainView}>
                  <View>
                    {addressSelectionStatus == item.PostCode ? (
                      <Image
                        style={{
                          height: hp('4%'),
                          width: hp('4%'),
                          left: hp('1.3%'),
                        }}
                        source={ImageUrl.CheckRing}
                      />
                    ) : (
                      <Image
                        style={{
                          height: hp('4%'),
                          width: hp('4%'),
                          left: hp('1.3%'),
                        }}
                        source={ImageUrl.BlankCheck}
                      />
                    )}
                  </View>
                  <View
                    style={[
                      styles.addAddressView,
                      {
                        backgroundColor:
                          addressSelectionStatus == item.PostCode
                            ? '#daf6f7'
                            : '#ffff',
                      },
                    ]}>
                    <Text style={styles.addAddressTextView}>
                      {item.Name}
                      {'\n'}
                      {item.PhoneNumber} {'\n'}
                      {item.AddressLine1}, {'\n'}
                      {item.AddressLine2} {'\n'}
                      {item.PostCode} {'\n'}
                      {item.Country} {'\n'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            // ItemSeparatorComponent={ItemSeparatorView}
          />
          <View
            style={{
              height: '15%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.addressButtonView}
              onPress={() => editAddBillingFun()}>
              <Text style={{color: '#ffff', fontSize: 20}}>Edit/Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addressButtonView}
              onPress={() => addBillingAddressFun()}>
              <Text style={{color: '#ffff', fontSize: 20}}>Select</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>

        <View
          style={{paddingHorizontal: hp('2%'), paddingVertical: hp('1.5%')}}>
          <Text
            style={{
              fontFamily: Fonts.OpenSansRegular,
              fontWeight: '400',
              fontSize: 13,
              color: Colors.Black,
            }}>
            {props?.BillingAddress?.Name}
            {'\n'}
            {props?.BillingAddress?.PhoneNumber}
            {'\n'}
            {props?.BillingAddress?.AddressLine1},
            {props?.BillingAddress?.AddressLine2}
            {'\n'}
            {props?.BillingAddress?.PostCode}{' '}
            {props?.BillingAddress?.StateCounty}
            {'\n'}
            {props?.BillingAddress?.Country}
          </Text>
        </View>

        {/* <View
            style={{
              paddingHorizontal: hp('1.7%'),
              paddingVertical: hp('0.7%'),
            }}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansSemiBold,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.Black,
              }}>
              Same as my delivery address
            </Text>
          </View> */}
      </View>
    </View>
  );
};

const PaymentOptionCard = props => {
  // console.log("props.DeliveryaddressData.Name",props?.DeliveryaddressData?.Deliveryaddress?.Name);
  console.log('paymentOption', props.paymentOption);
  const [checked, setChecked] = useState(0);
  const [checked2, setChecked2] = useState(0);
  const [cardTransactionId, setCardTransactionId] = useState(0);
  const [addCardStatus, setAddCardStatus] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');

  const refRBSheet = useRef();

  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleOpenRBSheet = item => {
    refRBSheet.current.open();
  };

  const handleCheckboxToggle = id => {
    setChecked(
      prevSelectedSection =>
        // console.log("prevSelectedSection",prevSelectedSection)
        id,
    );
    if (id == 1) {
      setCardTransactionId(0);
      setChecked2(0);
    }
    console.log('handleCheckboxToggle', id);
    // props.PaymentType({
    //     id:id
    // })
  };

  const handleCheckboxToggle2 = (id, TransactionID) => {
    setChecked2(prevSelectedSection => id);
    setCardTransactionId(TransactionID);
    console.log('handleCheckboxToggle2', TransactionID);
    props.TransactionID({
      TransactionID: TransactionID,
    });
  };

  const dataRender = () => {
    console.log('checkedhhhhhh------', checked2, cardTransactionId, checked);
    if (cardTransactionId == 0 && checked == 0) {
      if (checked2 === 0) {
        props?.paymentOption?.map((item, index) =>
          item?.Cards?.map((item, index2, array) => {
            if (index2 == 0) {
              setCardTransactionId(item.TransactionID);
            }
          }),
        );
      } else {
        setCardTransactionId(0);
      }
    }
  };

  // useEffect(()=>{
  //     dataRender()
  // },[])

  useEffect(() => {
    dataRender();
    props.updateParentState({
      paymentOptionData: checked,
      cardId: cardTransactionId,
      addCardStatus: addCardStatus,
      redeemPointsFromChildFromPayment: props.rewardPointFromParent
        ? props.rewardPointFromParent
        : '0',
      AutoDate: props.AutoDate,
      AutoOrder: props.AutoOrder,
    });
  }, [
    checked,
    addCardStatus,
    checked2,
    cardTransactionId,
    props.rewardPointFromParent,
    props.AutoDate,
    props.AutoOrder,
  ]);

  // console.log("addCardStatus===", props)

  return (
    <View style={{paddingVertical: hp('2.7%'), paddingHorizontal: hp('2%')}}>
      <View style={styles.paymentOption}>
        <Text
          style={{
            fontFamily: Fonts.OpenSansSemiBold,
            fontSize: 14,
            fontWeight: '400',
            color: Colors.Black,
            paddingVertical: hp('1.3%'),
          }}>
          Payment Type
        </Text>

        {props?.paymentOption?.map((item, index) => {
          return (
            <View style={{width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View>
                  {/* <Text>{item.DisplayName}</Text> */}
                  {index == 0 ? (
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 14,
                        fontWeight: '400',
                        color: Colors.Black,
                      }}>
                      Add Credit/Debit Card
                    </Text>
                  ) : null}
                  <Image
                    source={{uri: item.Image}}
                    style={{height: 40, width: 250, borderWidth: 0}}
                  />
                </View>
                <CommonCheckBox
                  imageSource={ImageUrl.UncheckRing}
                  onToggle={() => handleCheckboxToggle(index)}
                  isChecked={checked !== index}
                  uncheckedImage={ImageUrl.CheckRing}
                />
              </View>

              {index == 0 && checked == 0
                ? item?.Cards?.map((item, index2, array) => {
                    return (
                      <View
                        style={{
                          borderColor: 'grey',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          paddingHorizontal: hp('5%'),
                          margin: 0,
                          height: index2 === array.length - 1 ? 90 : 60,
                          borderWidth: index2 === array.length - 1 ? 0.2 : 0.2,
                          borderBottomWidth:
                            index2 === array.length - 1 ? 0.2 : 0,
                          borderTopWidth: index2 === array.length - 1 ? 0 : 0.2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderWidth: 0,
                            // paddingHorizontal:hp('2%'),
                            width: '100%',
                            // height: 40,
                          }}>
                          <Image
                            style={{height: 20, width: 30, borderWidth: 0}}
                            source={{uri: item.Image}}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts.OpenSansSemiBold,
                              fontSize: 14,
                              fontWeight: '400',
                              color: Colors.Black,
                            }}>
                            {item.Last4Digits}
                          </Text>
                          <Text
                            style={{
                              fontFamily: Fonts.OpenSansSemiBold,
                              fontSize: 14,
                              fontWeight: '400',
                              color: Colors.Black,
                            }}>
                            {item.Expiry}
                          </Text>
                          <View style={{left: hp('1%')}}>
                            <CommonCheckBox
                              imageSource={ImageUrl.UncheckRing}
                              onToggle={() =>
                                handleCheckboxToggle2(
                                  index2,
                                  item.TransactionID,
                                )
                              }
                              isChecked={checked2 !== index2}
                              uncheckedImage={ImageUrl.CheckRing}
                            />
                          </View>
                          {/* <TouchableOpacity>
                            <Text>*</Text>
                          </TouchableOpacity> */}
                        </View>
                        {index2 === array.length - 1 ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',

                              // width: '100%',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',

                                // borderWidth: 0,
                                // width: '100%',
                                // height: 40,
                              }}>
                              <View
                                style={{
                                  flex: 8,
                                  alignItems: 'center',
                                  paddingVertical: hp('1%'),
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Fonts.OpenSansSemiBold,
                                    fontSize: 16,
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: Colors.Black,
                                  }}>
                                  Add New Card
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 2,
                                  alignItems: 'flex-end',
                                  left: hp('1%'),
                                }}>
                                <CommonCheckBox
                                  imageSource={ImageUrl.UncheckRing}
                                  onToggle={() =>
                                    handleCheckboxToggle2(array.length, 0)
                                  }
                                  isChecked={checked2 !== array.length}
                                  uncheckedImage={ImageUrl.CheckRing}
                                />
                              </View>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    );
                  })
                : null}
            </View>
          );
        })}

        <RBSheet
          ref={refRBSheet}
          height={hp('50%')}
          openDuration={250}
          closeOnDragDown={true}
          animationType="fade"
          customStyles={{
            container: {
              backgroundColor: Colors.White,
            },
          }}>
          {/* <SetAutoReplenish
          handleBtn={props?.route?.name === 'reOrderReminder'}
          onClose={handleCloseRBSheet}
          handleDate={handleDate}
        /> */}

          <View
            style={{
              backgroundColor: Colors.newGrey,
              paddingVertical: hp('1.5%'),
              paddingHorizontal: hp('2.5%'),
            }}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansBold,
                fontSize: 16,
                fontWeight: '600',
                color: Colors.Black,
              }}>
              Add New Card
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',

              //   alignItems: 'center',
              //   height: '90%',
              flex: 1,
              //   borderWidth: 0,
            }}>
            <View style={{paddingHorizontal: hp('2.5%')}}>
              <TextInput
                style={{
                  // height: 40,
                  borderColor: Colors.LightGrey,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontFamily: Fonts.OpenSansBold,
                  fontSize: 11,
                  fontWeight: '600',
                  color: Colors.Black,
                  // width: '80%'
                  paddingHorizontal: hp('2%'),
                  // padding: 10,
                }}
                onChangeText={text => setCardHolderName(text)}
                maxLength={16}
                secureTextEntry={false}
                value={cardHolderName}
                placeholder="Card Holder Name *"
                placeholderTextColor={Colors.DarkGrey}
                numberOfLines={1}
              />
            </View>
            <View style={{paddingHorizontal: hp('2.2%')}}>
              <View
                style={{
                  //   paddingHorizontal: hp('2%'),
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: Colors.LightGrey,
                  fontFamily: Fonts.OpenSansSemiLight,
                  borderRadius: 8,
                  //   marginVertical: hp('0.6%'),
                  alignItems: 'center',
                }}>
                <View style={{flex: 9}}>
                  <TextInput
                    style={{
                      fontFamily: Fonts.OpenSansBold,
                      fontSize: 11,
                      fontWeight: '600',
                      paddingHorizontal: hp('2%'),
                    }}
                    onChangeText={text => setCardHolderName(text)}
                    maxLength={16}
                    keyboardType="numeric"
                    secureTextEntry={false}
                    value={cardHolderName}
                    placeholder="Enter Your Card 16 Digit Number *"
                    placeholderTextColor={Colors.DarkGrey}
                    numberOfLines={1}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={styles.accountImage}
                    source={ImageUrl.CardIcon}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent:'space-between',
              }}>
              <View style={{flex: 1.25, paddingHorizontal: hp('2.5%')}}>
                <TextInput
                  style={{
                    borderColor: Colors.LightGrey,
                    borderWidth: 1,
                    borderRadius: 8,
                    fontFamily: Fonts.OpenSansBold,
                    fontSize: 11,
                    fontWeight: '600',
                    //   color: Colors.Black,
                    paddingHorizontal: hp('1%'),
                  }}
                  onChangeText={text => setCardHolderName(text)}
                  maxLength={16}
                  secureTextEntry={false}
                  value={cardHolderName}
                  placeholder="Expire Date *"
                  placeholderTextColor={Colors.DarkGrey}
                  numberOfLines={1}
                />
              </View>
              <View style={{flex: 1.25, marginRight: hp('2%')}}>
                <TextInput
                  style={{
                    borderColor: Colors.LightGrey,
                    borderWidth: 1,
                    borderRadius: 8,
                    fontFamily: Fonts.OpenSansBold,
                    fontSize: 11,
                    fontWeight: '600',
                    color: Colors.Black,
                    paddingHorizontal: hp('2%'),
                  }}
                  onChangeText={text => setCardHolderName(text)}
                  maxLength={16}
                  secureTextEntry={false}
                  value={cardHolderName}
                  placeholder="CVV *"
                  placeholderTextColor={Colors.DarkGrey}
                  numberOfLines={1}
                />
              </View>
            </View>

            <View style={{alignItems: 'center'}}>
              <Button
                title={'Add Card'}
                color={Colors.Black}
                txtColor={Colors.White}
                // onPress={() => navigation.navigate('Checkout')}
              />
            </View>

            <View style={{alignItems: 'center', paddingVertical: hp('1%')}}>
              <TouchableOpacity onPress={() => handleCloseRBSheet()}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansBold,
                    fontSize: 11,
                    fontWeight: '400',
                    color: Colors.Black,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
};
export default Checkout;
