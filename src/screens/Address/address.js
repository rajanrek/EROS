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
  postCodeAddress,
  removeAddress,
  selectCountry,
  setAddress,
  updateAddress,
} from '../../redux/action/actions';
import {SkypeIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import Global from '../../utils/Global';

const Address = props => {
  const refRBSheet = useRef();
  const postrefRBSheet = useRef();
  const countryrefRBSheet = useRef();
  const [term, setTerm] = useState(false);
  const dispatch = useDispatch();
  const [selectAddress, setSelectAddress] = useState(false);
  const [trigger, settrigger] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [stateCountry, setStateCountry] = useState('');
  const [country, setCountry] = useState('');
  const [countryId, setCountryId] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [defaultSelected, setDefaultSelected] = useState(false);
  const [updateItem, setUpdateItem] = useState('');
  const [changeStatus, setChangeStatus] = useState(false);
  const navigation = useNavigation();

  const {
    addressPostCodeData,
    addressRemoveData,
    addressRemoveDataLoader,
    addressUpdateData,
    newAddressData,
    addressBookData,
    registerData,
    data,
    selectCountryData,
    addressFormData,
    defaultAddressData,
    defaultAddressDataLoading
  } = useSelector(state => ({
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    addressPostCodeData:
      state.postCodeAddress.addressPostCode.addressPostCodeData,
    addressRemoveData: state.removeAddress.addressRemove,
    addressUpdateData: state.updateAddress.addressUpdate.addressUpdateData,
    newAddressData: state.addAddress.newAddress.newAddressData,
    defaultAddressData: state.setAddress.defaultAddress.defaultAddressData,
    defaultAddressDataLoading: state.setAddress.defaultAddress.defaultAddressisLoading,
    addressBookData: state.customerAddress.addressBook,
    addressFormData: state.customerAddress.addressBook,
    selectCountryData: state.countrySelect.selectCountry.selectCountryData,
  }));

  const {navigateFromCheckout} = props?.route?.params;

  console.log("defaultAddressData",defaultAddressDataLoading)

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const onChangeText = (item, type) => {
    if (type == 1) {
      setFirstName(item);
    } else if (type == 2) {
      setLastName(item);
    } else if (type == 4) {
      setPostCode(item);
    } else if (type == 5) {
      setAddressOne(item);
    } else if (type == 6) {
      setAddressTwo(item);
    } else if (type == 7) {
      setCity(item);
    } else if (type == 8) {
      setStateCountry(item);
    } else if (type == 9) {
      setPhoneCountryCode(item);
    } else {
      setPhoneNumber(item);
    }
  };

  const validateFields = () => {
    if (
      firstName === '' &&
      lastName === '' &&
      country === '' &&
      postCode === '' &&
      city === '' &&
      stateCountry === '' &&
      phoneCountryCode === '' &&
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

    if (country === '') {
      Alert.alert('Select your country');
      return false;
    }
    if (postCode === '') {
      Alert.alert('Please find your address by post code');
      return false;
    }

    if (postCode.length < 5) {
      Alert.alert('Postcode length should be between 5 to 10 characters long');
      return false;
    }

    if (addressOne === '') {
      Alert.alert('Enter your address Line 1');
      return false;
    }

    if (city === '') {
      Alert.alert('Enter your city');
      return false;
    }

    if (stateCountry === '') {
      Alert.alert('Enter your state');
      return false;
    }

    if (phoneCountryCode === '' || phoneCountryCode === null) {
      Alert.alert('Enter your country code');
      return false;
    }

    if (phoneNumber === '') {
      Alert.alert('Enter your phone number');
      return false;
    }

    let postVerify = postCode.replace(/\s+/g, '');
    const postCodeRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]+$/;

    if (!postCodeRegex.test(postVerify)) {
      Alert.alert('Post Code must be a combination of numbers and letters');
      return false;
    }

    return true;
  };

  const handleAddaddress = () => {
    console.log('log navigateFromCheckout', navigateFromCheckout);
    let isvalid = validateFields();
    if (isvalid) {
      const addressJson = {
        IsBillingAddress: term,
        MakeSameAddress: term,
        CustomerId: apiData?.CustomerId,
        FirstName: firstName,
        LastName: lastName,
        AddressLine1: addressOne,
        AddressLine2: addressTwo,
        CountryId: countryId,
        City: city,
        StateCounty: stateCountry,
        PostCode: postCode,
        PhoneCountryCode: phoneCountryCode,
        PhoneNumber: phoneNumber,
      };
     if(navigateFromCheckout == true){
      dispatch(addAddress(addressJson));
      setChangeStatus(true)
      refRBSheet.current.close();
      console.log("log term",addressBookData)
      // navigation.navigate('Checkout');
     }else{
      dispatch(addAddress(addressJson));
      setChangeStatus(true)
      refRBSheet.current.close();
     }
    }
  };

  const handleUpdateaddress = () => {
    let isvalid = validateFields();
    if (isvalid) {
      const updateAddressJson = {
        AddressId: updateItem,
        FirstName: firstName,
        LastName: lastName,
        AddressLine1: addressOne,
        AddressLine2: addressTwo,
        CountryId: countryId,
        City: city,
        StateCounty: stateCountry,
        PostCode: postCode,
        PhoneCountryCode: phoneCountryCode,
        PhoneNumber: phoneNumber,
        IsBillingAddress: selectAddress,
      };

      dispatch(updateAddress(updateAddressJson));

      refRBSheet.current.close();
    }
  };

  const handleRemoveAddress = value => {
    const removeAddressJson = {
      IsBillingAddress: !selectAddress,
      CustomerId: apiData?.CustomerId,
      AddressId: value,
      IsCheckout: false,
      DeliveryCountryId: null,
      DeliveryOptionId: null,
    };
    dispatch(removeAddress(removeAddressJson));
    setChangeStatus(true);
    settrigger(true);
  };

  // const handleAddressToggle = value => {
   
  //   const postJson = { 
  //     CustomerId : apiData?.CustomerId, 
  //     AddressId : value.AddressId, 
  //     IsCheckout : false, 
  //     DeliveryCountryId : value.CountryId,
  //     // DeliveryOptionId : dOptionId 
  //   };
  //   // console.log("handleAddressToggle",postJson, value.AddressId)
  //   dispatch(setAddress(postJson));

  //   setDefaultSelected(prevSelectedSection =>
  //     prevSelectedSection === value.AddressId ? '' : value.AddressId,
  //   );
  // };

  const handleAddressToggle = value => {
    const postJson = {
      CustomerId: apiData?.CustomerId,
      AddressId: value,
    };
    dispatch(setAddress(postJson));
 
    setDefaultSelected(prevSelectedSection =>
      prevSelectedSection === value ? '' : value,
    );
  };



  const handleFindAddress = () => {
    const postJson = {
      type: postCode,
    };
    dispatch(postCodeAddress(postJson));
    postrefRBSheet.current.open();
  };

  const handleTerms = () => {
    setTerm(!term);
  };

  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleOpenRBSheet = (item, param) => {
    setEditAddress(param);
    setCountryId(item?.CountryId);
    refRBSheet.current.open();

    if (param) {
      setUpdateItem(item.AddressId);
      let nameArray = item.Name.split(' ');
      setFirstName(item ? nameArray[0] : firstName);
      setLastName(item ? nameArray[1] : lastName);
      setCountry(item ? item.Country : country);
      setPostCode(item ? item.PostCode : postCode);
      setAddressOne(item ? item.AddressLine1 : addressOne);
      setAddressTwo(item ? item.AddressLine2 : addressTwo);
      setCity(item ? item.City : city);
      setStateCountry(item ? item.StateCounty : stateCountry);
      setPhoneCountryCode(item ? item.PhoneCountryCode : phoneCountryCode);
      setPhoneNumber(item ? item.PhoneNumber : phoneNumber);
    } else {
      setFirstName('');
      setLastName('');
      setCountry('');
      setPostCode('');
      setAddressOne('');
      setAddressTwo('');
      setCity('');
      setStateCountry('');
      setPhoneCountryCode('');
      setPhoneNumber('');
    }
  };

  const AddressBook = () => {
    setSelectAddress(!selectAddress);
  };

  const handleCountry = () => {
    const countryJson = {
      CustomerId: apiData?.CustomerId,
    };
    dispatch(selectCountry(countryJson));
    countryrefRBSheet.current.open();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(customerAddress(addressJsonCustomerAddress));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let filterArr =
      addressBookData?.ResultData?.length > 0 &&
      addressBookData?.ResultData?.filter(item => item?.IsDefault != true);
    setDefaultSelected(
      defaultSelected
        ? defaultSelected
        : addressBookData?.ResultData?.IsDefault,
    );

    dispatch(customerAddress(addressJsonCustomerAddress));
   
     
    setChangeStatus(false)
  }, [changeStatus])

  useEffect(()=>{
    Global.BasketDataSummry.AddressId = defaultAddressData?.ResultData?.Deliveryaddress[0]?.AddressId
    Global.BasketDataSummry.CountryId = defaultAddressData?.ResultData?.Deliveryaddress[0]?.CountryId
    Global.BasketDataSummry.BillingAddressId = defaultAddressData?.ResultData?.BillingAddress[0]?.AddressId
  },[defaultSelected,defaultAddressDataLoading])

  const addressJsonCustomerAddress = {
    CustomerId: apiData?.CustomerId,
  };

  const onSelectedValue = item => {
    setCountry(item?.Country);
    setPostCode(item?.PostCode);
    setAddressOne(item?.AddressLine1);
    setAddressTwo(item?.AddressLine2);
    setCity(item?.City);
    setStateCountry(item?.StateCounty);
    postrefRBSheet.current.close();
  };

  const renderDropdownItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onSelectedValue(item)}
      style={styles.rbTouch}>
      <Text style={styles.rbSheetTxt}>
        {item.AddressLine1} {item.AddressLine2}, {item.City}, {item.Country},
        {item.PostCode}, {item.StateCounty}
      </Text>
    </TouchableOpacity>
  );

  const onCountrySelectedValue = item => {
    setCountry(item.Name);
    setPhoneCountryCode(item.CountryCode);
    setCountryId(item.CountryId);
    countryrefRBSheet.current.close();
  };

  const countryDropdownItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onCountrySelectedValue(item)}
      style={styles.rbCountryTouch}>
      <Text style={styles.rbSheetTxt}>{item.Name}</Text>
    </TouchableOpacity>
  );



  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Manage Address'} isSearch={true} />
      </SafeAreaView>
      <View style={styles.scrollView}>
        <View style={styles.dilveryView}>
          <View style={styles.commonView}>
            <TouchableOpacity
              onPress={() => AddressBook()}
              style={
                selectAddress ? styles.deliveryTouch : styles.billingTouch
              }>
              <Text style={selectAddress ? styles.whiteTxt : styles.blackTxt}>
                Delivery
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commonView}>
            <TouchableOpacity
              onPress={() => AddressBook()}
              style={
                selectAddress ? styles.billingTouch : styles.deliveryTouch
              }>
              <Text style={selectAddress ? styles.blackTxt : styles.whiteTxt}>
                Billing
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flatlistView}>
          <FlatList
            data={
              !selectAddress
                ? addressBookData?.addressBookData?.ResultData?.BillingAddress
                : addressBookData?.addressBookData?.ResultData?.Deliveryaddress
            }
            keyExtractor={(item, index) => (item.id ? item.id : index)}
            renderItem={({item}) => (
              console.log('item addressBookData---', item),
              (
                <View style={styles.contentView}>
                  <View
                    style={
                      item.IsDefault || defaultSelected == item.AddressId
                        ? styles.borderContentView
                        : styles.subContentView
                    }>
                    <View style={styles.defaultView}>
                      <View style={styles.addressView}>
                        <Text style={styles.nameTxt}>{item?.Name}</Text>

                        <Text style={styles.addressTxt}>
                          {item?.AddressLine1}
                          {'\n'}
                          {item?.AddressLine2}
                          {'\n'}
                          {item?.City}-{item?.PostCode}
                          {'\n'}
                          {item?.StateCounty}-{item?.Country}
                          {'\n'}
                          {item?.PhoneCountryCode} {item?.PhoneNumber}
                        </Text>
                      </View>
                      {item?.IsCollectionCenter == false ? (
                        <>
                          <View style={styles.checkBoxView}>
                            <CommonCheckBox
                              imageSource={ImageUrl.AddressUnCheck}
                              onToggle={() =>
                                handleAddressToggle(item?.AddressId)
                              }
                              isChecked={
                                defaultSelected
                                  ? defaultSelected != item.AddressId
                                  : !item.IsDefault
                              }
                              uncheckedImage={ImageUrl.AddressCheck}
                            />
                            {item.IsDefault ||
                            defaultSelected == item.AddressId ? (
                              <Text style={styles.defaultTxt}>
                                Default Address
                              </Text>
                            ) : (
                              <Text style={styles.setTxt}>Set As Default</Text>
                            )}
                          </View>
                        </>
                      ) : null}
                    </View>

                    {item?.IsCollectionCenter == false ? (
                      <>
                        <View style={styles.borderView}></View>
                        <View style={styles.commonView}>
                          <View style={styles.removeView}>
                            <TouchableOpacity
                              onPress={() =>
                                handleRemoveAddress(item?.AddressId)
                              }
                              style={styles.removeTouch}>
                              <Image
                                resizeMode="contain"
                                style={styles.removeImg}
                                source={ImageUrl.Remove}
                              />
                              <Text style={styles.removeTxt}>{''} Remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleOpenRBSheet(item, true)}
                              style={styles.editView}>
                              <Image
                                resizeMode="contain"
                                style={styles.editImg}
                                source={ImageUrl.Edit}
                              />
                              <Text style={styles.editTxt}>Edit</Text>
                            </TouchableOpacity>
                          </View>

                          <View style={styles.commonView}></View>
                        </View>
                      </>
                    ) : null}
                  </View>
                </View>
              )
            )}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            onPress={() => handleOpenRBSheet(null, false)}
            color={Colors.Black}
            txtColor={Colors.White}
            title={'Add New Address'}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={hp('65%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade">
        <View style={styles.addressContainer}>
          <View style={styles.left}>
            {!editAddress ? (
              <Text style={styles.newTxt}>Add New Address</Text>
            ) : (
              <Text style={styles.newTxt}>Edit Address</Text>
            )}
          </View>
          <View style={{flex: 8.5}}>
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

                <TouchableOpacity
                  onPress={() => handleCountry()}
                  style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image style={styles.userImage} source={ImageUrl.Country} />
                  </View>
                  <View style={styles.countryfieldView}>
                    <Text
                      style={
                        country ? styles.countryinputBox : styles.countryBox
                      }>
                      {country ? country : 'Select Country *'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleCountry()}
                    style={styles.dropArrow}>
                    <Image
                      style={styles.arrowImg}
                      source={ImageUrl.DropArrow}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
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
                        placeholder="Postcode *"
                        value={postCode}
                      />
                    </View>
                    <TouchableOpacity
                      disabled={!postCode}
                      onPress={handleFindAddress}>
                      <Text style={styles.findText}>Find{'\n'}Address</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 5)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   Address line 1 *"
                      value={addressOne}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 6)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   Address line 2"
                      value={addressTwo}
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 7)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   City / Town *"
                      value={city}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 8)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="   Country / State *"
                      value={stateCountry}
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => onChangeText(text, 9)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="Country Code *"
                      maxLength={3}
                      value={phoneCountryCode}
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
                      maxLength={11}
                      keyboardType="numeric"
                      value={phoneNumber}
                    />
                  </View>
                  <TouchableOpacity onPress={() => setPhoneNumber('')}>
                    <Text style={styles.findText}>Clear</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.notificationView}>
            <Text style={styles.impTxt}>
              This is important for delivery notifiation
            </Text>
            <View style={styles.plusView}>
              {!term ? (
                <TouchableOpacity onPress={() => handleTerms()}>
                  <Image style={styles.boxImage} source={ImageUrl.SquareBox} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleTerms()}>
                  <Image style={styles.boxImage} source={ImageUrl.TickBox} />
                </TouchableOpacity>
              )}
              <View style={styles.receiveView}>
                <Text style={styles.receiveText}>
                  Make this my Billing Address
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.btnMainView}>
            {!editAddress ? (
              <Button
                onPress={() => handleAddaddress()}
                txtColor={Colors.White}
                title={'Add Address'}
                color={Colors.Black}
              />
            ) : (
              <Button
                onPress={() => handleUpdateaddress()}
                txtColor={Colors.White}
                title={'Update Address'}
                color={Colors.Black}
              />
            )}
            <TouchableOpacity
              style={styles.cancelText}
              onPress={handleCloseRBSheet}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        <RBSheet
          ref={countryrefRBSheet}
          openDuration={250}
          closeOnDragDown={true}
          height={340}
          animationType="fade"
          customStyles={{
            container: {
              flex: 1,
              backgroundColor: Colors.LightWhite,
              justifyContent: 'flex-start',
            },
          }}>
          <FlatList
            data={selectCountryData?.ResultData?.CountryList}
            renderItem={countryDropdownItem}
            keyExtractor={(item, index) => index}
          />
        </RBSheet>
        <RBSheet
          ref={postrefRBSheet}
          openDuration={250}
          closeOnDragDown={true}
          animationType="fade"
          customStyles={{
            container: {
              flex: 1,
              backgroundColor: Colors.LightWhite,
              justifyContent: 'flex-start',
            },
          }}>
          <FlatList
            data={addressPostCodeData?.ResultData}
            renderItem={renderDropdownItem}
            keyExtractor={(item, index) => index}
          />
        </RBSheet>
      </RBSheet>

      {addressBookData.addressBookisLoading == true ||
        addressRemoveData.addressRemoveisLoading == true ||
        defaultAddressDataLoading ?(
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      ) : null}
    </View>
  );
};
export default Address;
