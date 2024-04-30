import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import FgcHeader from '../../components/Header/FgcHeader';
import OrdersCard from '../../components/OrdersCard/ordersCard';
import {useDispatch, useSelector} from 'react-redux';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  getAutoReplenish,
  postChangeScheduleDate,
  postScheduleDate,
} from '../../redux/action/actions';
import {SkypeIndicator} from 'react-native-indicators';
import Button from '../../components/Button/button';
import Colors from '../../components/Colors/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageUrl from '../../components/ImageUrl';
import {TextInput} from 'react-native';
import {postChangeAutoAddress} from '../../redux/action/actions';
import Fonts from '../../components/CustomsFonts/customFonts';

const AutoReplenish = props => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [isHistory, setHistory] = useState(false);
  const deliveryrefRBSheet = useRef();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressItem, setAddressItem] = useState('');
  const flatListRef = useRef(null);

  const {
    ScheduleDateData,
    registerData,
    data,
    ChangeAutoAddressData,
    ChangeScheduleDateData,
    CancelAutoreplenishData,
  } = useSelector(state => ({
    ScheduleDateData: state.dateSchedule.ScheduleDate.ScheduleDateData,
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    ChangeAutoAddressData: state.autoAddressChange.ChangeAutoAddress,
    ChangeScheduleDateData: state.scheduleDateChange.ChangeScheduleDate,
    CancelAutoreplenishData: state.autoReplenishCancel.CancelAutoreplenish,
  }));
  const {replenishData, replenishData2, replenishisLoading} = useSelector(
    state => state.autoReplenish.replenish,
  );

  const commonParam = '?pagesize=' + 10 + '&pageIndex=' + page;
  // const commonParam = ' pagesize=5&appversion=1';

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData;

  const postJson = {
    type: apiData?.CustomerId + commonParam,
  };
  const handleEndReached = () => {

    setPage(page + 1);
  };
  useEffect(() => {
    dispatch(getAutoReplenish(postJson));
    scrollToTop()
  }, [page]);
  const scrollToTop = () => {
    if (replenishData?.length > 0 ) {
      flatListRef?.current?.scrollToIndex({ index: 0 });
    }
  };
  useEffect(() => {
    dispatch(getAutoReplenish(postJson));
  }, [
    ScheduleDateData,
    ChangeAutoAddressData,
    ChangeScheduleDateData,
    CancelAutoreplenishData,
    
  ]);
  console.log('Auto replenishData====', replenishData);
  const handleApi = ScheduleJson => {
    if (ScheduleJson[0].OrderId != undefined) {
      dispatch(postScheduleDate(ScheduleJson[0]));
    } else {
      dispatch(postChangeScheduleDate(ScheduleJson[0]));
    }
  };
  const backHandler = () => {
    setPage(0);
  };

  const validateFields = () => {
    if (
      firstName === '' &&
      lastName === '' &&
      addressOne === '' &&
      postCode === '' &&
      city === '' &&
      state === '' &&
      postCode === '' &&
      phoneNumber === ''
    ) {
      Alert.alert('All field is required');
      return false;
    }
    if (firstName === '') {
      Alert.alert('Enter your first name');
      return false;
    }
    if (lastName === '') {
      Alert.alert('Enter your last name');
      return false;
    }
    if (addressOne === '') {
      Alert.alert('Enter your address Line 1');
      return false;
    }
    if (postCode === '') {
      Alert.alert('Please find your address by post code');
      return false;
    }

    if (city === '') {
      Alert.alert('Enter your city');
      return false;
    }

    if (state === '') {
      Alert.alert('Enter your state');
      return false;
    }
    if (country === '') {
      Alert.alert('Select your country');
      return false;
    }

    if (phoneNumber === '') {
      Alert.alert('Enter your phone number');
      return false;
    }

    return true;
  };

  const onChangeText = (item, type) => {
    if (type == 1) {
      setFirstName(item);
    } else if (type == 2) {
      setLastName(item);
    } else if (type == 3) {
      setAddressOne(item);
    } else if (type == 4) {
      setAddressTwo(item);
    } else if (type == 5) {
      setCity(item);
    } else if (type == 6) {
      setState(item);
    } else if (type == 7) {
      setPostCode(item);
    } else if (type == 8) {
      setCountry(item);
    } else {
      setPhoneNumber(item);
    }
  };

  const handledeliverySheet = item => {
    setAddressItem(item);
    setFirstName(item ? item.Address.FirstName : firstName);
    setLastName(item ? item.Address.LastName : lastName);
    setAddressOne(item ? item.Address.AddressLine1 : addressOne);
    setAddressTwo(item ? item.Address.AddressLine2 : addressTwo);
    setCity(item ? item.Address.City : city);
    setState(item ? item.Address.StateCounty : state);
    setPostCode(item ? item.Address.PostCode : postCode);
    setCountry(item ? item.Address.Country : country);
    setPhoneNumber(item ? item.Address.Mobile : phoneNumber);
    deliveryrefRBSheet.current.open();
  };
  const handleAddressUpdate = () => {
    let isvalid = validateFields();
    if (isvalid) {
      const updateAddressJson = {
        CustomerId: apiData?.CustomerId,
        AutoReOrderId: addressItem?.AutoReOrderId,
        Address: {
          AddressLine1: addressOne,
          AddressLine2: addressTwo,
          City: city,
          CountryId: addressItem?.Address?.CountryId,
          FirstName: firstName,
          LastName: lastName,
          Mobile: phoneNumber,
          PostCode: postCode,
          StateCounty: state,
        },
      };
      dispatch(postChangeAutoAddress(updateAddressJson));

      deliveryrefRBSheet.current.close();
    }
  };

  // const isAPICall = (productData?.PageIndex + 1) * productData?.PageSize;

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader
          name={'autoRep'}
          backHandler={backHandler}
          title={'Auto-replenish'}
        />
      </SafeAreaView>

      {!isHistory ? (
        <View style={{flex: 4}}>
          <FlatList
            data={replenishData}
            ref={flatListRef}
            keyExtractor={(item, index) => (item.id ? item.id : index)}
            renderItem={({item}) => (
              <OrdersCard
                handleBtn={'autoReplenish'}
                item={item}
                handleApi={handleApi}
                handledeliverySheet={handledeliverySheet}
              />
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
               onPress={() => setPage(page - 1)}
              style={{
                paddingHorizontal: hp('1.5%'),
                paddingVertical: hp('1.2%'),
                backgroundColor: Colors.Black,
                borderRadius: 8,
              }}>
              <Image
                resizeMode="contain"
                style={{height: 20, width: 20}}
                tintColor={Colors.White}
                source={ImageUrl.ArrowLeft}></Image>
            </TouchableOpacity>
      
            <TouchableOpacity
              onPress={() => setHistory(!isHistory)}
              style={{
                paddingHorizontal: hp('5.5%'),
                paddingVertical: hp('1.5%'),
                backgroundColor: Colors.Black,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.OpenSansBold,
                  color: Colors.White,
                }}>
                View Order History
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => setPage(page + 1)}
              style={{
                paddingHorizontal: hp('1.5%'),
                paddingVertical: hp('1.2%'),
                backgroundColor: Colors.Black,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                tintColor={Colors.White}
                style={{height: 20, width: 20}}
                source={ImageUrl.ArrowRight}></Image>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.pointsView}>
            <Text style={styles.Txt}>My order history:</Text>
          </View>
          <View style={{flex: 4}}>
            <FlatList
              data={replenishData2}
              ref={flatListRef}
              keyExtractor={(item, index) => (item.id ? item.id : index)}
              renderItem={({item}) => (
                <OrdersCard
                  handleBtn={props?.route?.name === 'autoReplenish'}
                  item={item}
                  handleApi={handleApi}
                />
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                 onPress={() => setPage(page - 1)}
                style={{
                  paddingHorizontal: hp('1.5%'),
                  paddingVertical: hp('1.2%'),
                  backgroundColor: Colors.Black,
                  borderRadius: 8,
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: 20, width: 20}}
                  tintColor={Colors.White}
                  source={ImageUrl.ArrowLeft}></Image>
              </TouchableOpacity>
     
              <TouchableOpacity
                onPress={() => setHistory(!isHistory)}
                style={{
                  paddingHorizontal: hp('5.5%'),
                  paddingVertical: hp('1.5%'),
                  backgroundColor: Colors.Black,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: Fonts.OpenSansBold,
                    color: Colors.White,
                  }}>
                  View Auto Order History
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => setPage(page + 1)}
                style={{
                  paddingHorizontal: hp('1.5%'),
                  paddingVertical: hp('1.2%'),
                  backgroundColor: Colors.Black,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  tintColor={Colors.White}
                  style={{height: 20, width: 20}}
                  source={ImageUrl.ArrowRight}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      <RBSheet
        ref={deliveryrefRBSheet}
        height={hp('67%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade">
        <View style={styles.addressContainer}>
          <View style={styles.left}>
            <Text style={styles.newTxt}>Delivery Address</Text>
          </View>
          <View style={styles.ActiveflexStyle}>
            <View style={styles.boxView}>
              <ScrollView style={styles.inputMainView}>
                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image
                      style={styles.accountImage}
                      source={ImageUrl.User_Account}
                    />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 1)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="First Name *"
                      value={firstName}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image style={styles.userImage} source={ImageUrl.User} />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 2)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="Last Name *"
                      value={lastName}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image style={styles.userImage} source={ImageUrl.Country} />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 3)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="Address Line 1*"
                      value={addressOne}
                    />
                  </View>
                </View>
                <View style={styles.plusMainView}>
                  <View style={styles.postView}>
                    <View style={styles.imgView}>
                      <Image
                        style={styles.userImage}
                        source={ImageUrl.Postcode}
                      />
                    </View>
                    <View style={styles.postfieldView}>
                      <TextInput
                        style={styles.postinputBox}
                        onChangeText={text => onChangeText(text, 4)}
                        placeholderTextColor={Colors.Grey}
                        placeholder="Address Line 2*"
                        value={addressTwo}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 5)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   City/Town *"
                      value={city}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 6)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   State"
                      value={state}
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 7)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   Postcode *"
                      value={postCode}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 8)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   Country *"
                      value={country}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image style={styles.userImage} source={ImageUrl.Mobile} />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="Mobile *"
                      maxLength={12}
                      keyboardType="numeric"
                      value={phoneNumber}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: hp('1%'),
              paddingBottom: 20,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => deliveryrefRBSheet.current.close()}
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.Black,
                  paddingHorizontal: hp('8%'),
                  paddingVertical: hp('2%'),
                  alignItems: 'center',
                }}>
                <Text style={styles.btnTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleAddressUpdate()}
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.Black,
                  paddingHorizontal: hp('8%'),
                  paddingVertical: hp('2%'),
                  alignItems: 'center',
                }}>
                <Text style={styles.btnTxt}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
      {/* </ScrollView> */}

      {replenishisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};
export default AutoReplenish;
