import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import FgcHeader from '../../components/Header/FgcHeader';
import Colors from '../../components/Colors/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button/button';
import {
  changePassword,
  deleteAccount,
  personDetails,
} from '../../redux/action/actions';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRegisterUserSuccessAction} from '../../redux/slices/registerSlice';
import {getLoginUserSuccessAction} from '../../redux/slices/loginUserSlice';
import {getCategoryListSuccessAction} from '../../redux/slices/categoryListSlice';
import {current} from '@reduxjs/toolkit';
import {SkypeIndicator} from 'react-native-indicators';
import ImageUrl from '../../components/ImageUrl';
import RBSheet from 'react-native-raw-bottom-sheet';

const AccountSettings = props => {
  const {accountData} = useSelector(state => state.accountData.account);
  const {changePasswordData, changePasswordisLoading} = useSelector(
    state => state.changePass.changePassword,
  );
  const {personalDetailData, personalDetailisLoading} = useSelector(
    state => state.personDetails.personalDetail,
  );
  const navigation = useNavigation();
  const {deleteAccountData} = useSelector(
    state => state.accountDelete.deleteAccount,
  );
  const {registerData} = useSelector(state => state.newuser.user);
  const {data} = useSelector(state => state.loginuser.user);
  const details = accountData?.ResultData?.personalDetailResponse;
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setcountryCode] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [oldshowPwd, setOldShowPwd] = useState(true);
  const [newshowPwd, setNewShowPwd] = useState(true);
  const [confirmshowPwd, setConfirmShowPwd] = useState(true);
  const deleteAccountRBSheet = useRef();

  useEffect(() => {
    setFirstName(firstName ? firstName : details?.FirstName);
    setLastName(lastName ? lastName : details?.LastName);
    setEmail(email ? email : details?.Email);
    setPhone(phone ? phone : details?.MobileNumber);
    setcountryCode(countryCode ? countryCode : details?.MobileCountryCode);
  }, []);

  const onChangeText = (item, type) => {
    if (type == 1) {
      setFirstName(item);
    } else if (type == 2) {
      setLastName(item);
    } else if (type == 3) {
      setEmail(item);
    } else if (type == 4) {
      setcountryCode(item);
    } else if (type == 5) {
      setPhone(item);
    } else if (type == 6) {
      setOldPassword(item);
    } else if (type == 7) {
      setNewPassword(item);
    } else {
      setConfirmPass(item);
    }
  };

  const validateFields = () => {
    if (
      firstName === '' &&
      lastName === '' &&
      email === '' &&
      countryCode === '' &&
      phone === ''
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

    if (email === '') {
      Alert.alert('Enter your Email');
      return false;
    }
    if (countryCode === '') {
      Alert.alert('Enter your country code');
      return false;
    }

    if (phone === '') {
      Alert.alert('Enter your phone number');
      return false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email id is not valid');
      return false;
    }

    return true;
  };

  const validatePassFields = () => {
    if (oldPassword === '' && newPassword === '' && confirmPass === '') {
      Alert.alert('All field is required');
      return false;
    }
    if (oldPassword === '') {
      Alert.alert('Enter your old password');
      return false;
    }
    if (newPassword === '') {
      Alert.alert('Enter your new password');
      return false;
    }

    if (confirmPass === '') {
      Alert.alert('Enter your confirm password');
      return false;
    }

    if (oldPassword == newPassword) {
      Alert.alert('New Password cannot be same as old password');
      return false;
    }

    if (newPassword != confirmPass) {
      Alert.alert('Confirm Password must be same as new password');
      return false;
    }
    return true;
  };

  const handlePressDetail = () => {
    let isvalid = validateFields();
    if (isvalid) {
      const postJson = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        MobileNumber: phone,
        MobileCountryCode: countryCode,
      };

      dispatch(personDetails(postJson, apiData?.CustomerId));
    }
  };

  const handleChangePass = () => {
    let isvalid = validatePassFields();
    if (isvalid) {
      const passwordJson = {
        CustomerId: apiData?.CustomerId,
        OldPassword: oldPassword,
        NewPassword: newPassword,
        ConfirmPassword: confirmPass,
      };

      dispatch(changePassword(passwordJson));
    }
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount(apiData?.CustomerId));

    AsyncStorage.clear();
    dispatch(getRegisterUserSuccessAction(null));
    dispatch(getLoginUserSuccessAction(null));
    dispatch(getCategoryListSuccessAction(null));

    deleteAccountRBSheet.current.close();

    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Account Settings'} />
      </SafeAreaView>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.subView}>
            <View style={styles.personView}>
              <View style={styles.personSubView}>
                <Text style={styles.headingTxt}>Personal Details</Text>
              </View>
              <View style={styles.inputView}>
                <View style={styles.TxtView}>
                  <TextInput
                    // editable={false}
                    onChangeText={text => onChangeText(text, 1)}
                    style={styles.inputTxt}
                    placeholderTextColor={Colors.SemiGrey}
                    placeholder="First Name"
                    value={firstName}
                  />
                </View>

                <View style={styles.TxtView}>
                  <TextInput
                    //  editable={false}
                    onChangeText={text => onChangeText(text, 2)}
                    style={styles.inputTxt}
                    placeholderTextColor={Colors.SemiGrey}
                    placeholder="Last Name"
                    value={lastName}
                  />
                </View>

                <View style={styles.TxtView}>
                  <TextInput
                    //  editable={false}
                    onChangeText={text => onChangeText(text, 3)}
                    style={styles.inputTxt}
                    placeholderTextColor={Colors.SemiGrey}
                    placeholder="Email"
                    value={email}
                  />
                </View>
                <View style={styles.TxtView}>
                  <TextInput
                    //  editable={false}
                    onChangeText={text => onChangeText(text, 4)}
                    style={styles.inputTxt}
                    maxLength={3}
                    placeholderTextColor={Colors.SemiGrey}
                    placeholder="country Code"
                    value={countryCode}
                  />
                </View>
                <View style={styles.TxtView}>
                  <TextInput
                    //  editable={false}
                    onChangeText={text => onChangeText(text, 5)}
                    style={styles.inputTxt}
                    keyboardType="numeric"
                    maxLength={11}
                    placeholderTextColor={Colors.SemiGrey}
                    placeholder="Mobile number"
                    value={phone}
                  />
                </View>
                <View style={styles.btnView}>
                  <Button
                    onPress={() => handlePressDetail()}
                    title={'Submit'}
                    color={Colors.Black}
                    txtColor={Colors.White}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.subView}>
            <View style={styles.changeView}>
              <View style={styles.changeSubView}>
                <Text style={styles.headingTxt}>Change Password</Text>
              </View>
              <View style={styles.changeInput}>
                <View style={styles.inputBox}>
                  <View style={styles.imageView}>
                    <Image style={styles.keyImage} source={ImageUrl.Key} />
                  </View>
                  <View style={styles.emailView}>
                    <TextInput
                      style={styles.emailInput}
                      onChangeText={text => onChangeText(text, 6)}
                      secureTextEntry={oldshowPwd}
                      placeholderTextColor={Colors.SemiGrey}
                      placeholder=" Old Password"
                      value={oldPassword}
                    />
                  </View>

                  <View style={styles.passwordView}>
                    {oldshowPwd ? (
                      <TouchableOpacity
                        onPress={() => setOldShowPwd(!oldshowPwd)}>
                        <Image
                          style={styles.passwordImage}
                          source={ImageUrl.CloseEye}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setOldShowPwd(true)}>
                        <Image
                          style={styles.passwordImage}
                          source={ImageUrl.OpenEye}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View style={styles.inputBox}>
                  <View style={styles.imageView}>
                    <Image style={styles.keyImage} source={ImageUrl.Key} />
                  </View>
                  <View style={styles.emailView}>
                    <TextInput
                      style={styles.emailInput}
                      onChangeText={text => onChangeText(text, 7)}
                      secureTextEntry={newshowPwd}
                      placeholderTextColor={Colors.SemiGrey}
                      placeholder="New Password"
                      value={newPassword}
                    />
                  </View>

                  <View style={styles.passwordView}>
                    {newshowPwd ? (
                      <TouchableOpacity
                        onPress={() => setNewShowPwd(!newshowPwd)}>
                        <Image
                          style={styles.passwordImage}
                          source={ImageUrl.CloseEye}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setNewShowPwd(true)}>
                        <Image
                          style={styles.passwordImage}
                          source={ImageUrl.OpenEye}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View style={styles.inputBox}>
                  <View style={styles.imageView}>
                    <Image style={styles.keyImage} source={ImageUrl.Key} />
                  </View>
                  <View style={styles.emailView}>
                    <TextInput
                      style={styles.emailInput}
                      onChangeText={text => onChangeText(text, 8)}
                      secureTextEntry={confirmshowPwd}
                      placeholderTextColor={Colors.SemiGrey}
                      placeholder="Confirm New Password"
                      value={confirmPass}
                    />
                  </View>

                  <View style={styles.passwordView}>
                    {confirmshowPwd ? (
                      <TouchableOpacity
                        onPress={() => setConfirmShowPwd(!confirmshowPwd)}>
                        <Image
                          style={styles.passwordImage}
                          source={ImageUrl.CloseEye}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setConfirmShowPwd(true)}>
                        <Image
                          style={styles.passwordImage}
                          source={ImageUrl.OpenEye}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View style={styles.btnView}>
                  <Button
                    onPress={() => handleChangePass()}
                    title={'Submit'}
                    color={Colors.Black}
                    txtColor={Colors.White}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.subView}>
            <View style={styles.changeInput}>
              <View style={styles.btnView}>
                <Button
                  onPress={() => deleteAccountRBSheet.current.open()}
                  title={'Delete Account'}
                  color={Colors.Red}
                  txtColor={Colors.White}
                />
              </View>
            </View>
          </View>
          {changePasswordisLoading ||
            (personalDetailisLoading && (
              <View style={styles.IndicatorView}>
                <SkypeIndicator size={100} animationDuration={800} />
              </View>
            ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <RBSheet
        ref={deleteAccountRBSheet}
        height={hp('25%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: hp('0.4%'),
          }}>
          <Text style={styles.cancelbtnTxt}>
            Do you really want to delete your account ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: hp('7%'),
            }}>
            <View
              style={{
                paddingHorizontal: hp('2.5%'),
              }}>
              <TouchableOpacity
                onPress={() => handleDeleteAccount()}
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.Black,
                  paddingHorizontal: hp('3.5%'),
                  paddingVertical: hp('1%'),
                  alignItems: 'center',
                }}>
                <Text style={styles.btnTxt}>Yes</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: hp('2.5%'),
              }}>
              <TouchableOpacity
                onPress={() => deleteAccountRBSheet.current.close()}
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.Black,
                  paddingHorizontal: hp('3.5%'),
                  paddingVertical: hp('1%'),
                  alignItems: 'center',
                }}>
                <Text style={styles.btnTxt}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};
export default AccountSettings;
