import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import FgcHeader from '../../components/Header/FgcHeader';
import Colors from '../../components/Colors/colors';
import ImageUrl from '../../components/ImageUrl';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import Button from '../../components/Button/button';
import SetAutoReplenish from '../../components/SetAutoReplenish/setAutoReplenish';
import {useDispatch, useSelector} from 'react-redux';
import {getReminderDetail, postReminderDetail} from '../../redux/action/actions';
import moment from 'moment';
import {SkypeIndicator} from 'react-native-indicators';
import {
  HTMLContentModel,
  HTMLElementModel,
  RenderHTML,
} from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

const ReorderReminder = props => {
  const [email, setEmail] = useState('');
  const [sms, setSms] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [selectsms, setSelectsms] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [Date, setDate] = useState('');
  const {width} = useWindowDimensions();


  const dispatch = useDispatch();
  const {getReminderDetailData, registerData, data, postReminderDetailData} =
    useSelector(state => ({
      getReminderDetailData:
        state.reminderDetail.getReminderDetail.getReminderDetailData,
      registerData: state.newuser.user.registerData,
      data: state.loginuser.user.data,
      postReminderDetailData: state.reorderReminder.postReminderDetail,
    }));

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const details = getReminderDetailData?.ResultData;
  const navigation = useNavigation();

  const refRBSheet = useRef();

  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleOpenRBSheet = item => {
    refRBSheet.current.open();
  };

  const handleToggle = param => {
    if (param == 1) {
      setEmail(!email);
    } else {
      setSelectsms(!selectsms);
    }
  };
  const isfocused=navigation.isFocused()
useEffect(()=>{
  dispatch(getReminderDetail(apiData?.CustomerId));

},[isfocused])
  const onChangeText = (item, type) => {
    if (type == 1) {
      setPhoneCode(item);
    } else if (type == 2) {
      setSms(item);
    }
  };

  useEffect(() => {
    setSms(sms ? sms : getReminderDetailData?.ResultData?.PhoneNumber);
    setPhoneCode(
      phoneCode
        ? phoneCode
        : getReminderDetailData?.ResultData?.PhoneCountryCode,
    );
    setEmail(email ? email : getReminderDetailData?.ResultData?.SendEmail);
    setSelectsms(
      selectsms ? selectsms : getReminderDetailData?.ResultData?.SendSMS,
    );
  }, [getReminderDetailData]);

  const handleUpdate = () => {
    const postJson = {
      Email: details?.Email,
      PhoneCountryCode: phoneCode,
      PhoneNumber: sms,
      ReminderDate: Date,
      SendEmail: email,
      SendSMS: selectsms,
      WearingFrequency: '',
    };
    dispatch(postReminderDetail(postJson, apiData?.CustomerId));
  };


  const handleDate = (item, param) => {
    console.log('item---', item, 'Param---', param);
    let newDate = item?.length > 0 && item?.split('-').reverse().join('-');
    let updatedDate = newDate.length > 0 && newDate?.replaceAll('-', '/');
    if (param?.length > 0) {
      setReminderDate(param);
      setDate(param);
    }
  };

  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black'
    },
    a: {
      color: 'black'
    },
    font: {
      color: 'red'
    }
  }
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeContainer}>
        <FgcHeader title={'Re-order reminder'} />
      </SafeAreaView>
      <ScrollView>
        <View style={styles.commonView}>
          <View style={styles.subView}>
            <Text style={styles.reminderTxt}>
              My current re-order reminder date:
            </Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.reminderDateTxt}>Reminder date:</Text>
            <View style={styles.dateSubView}>
              <View style={styles.backgroundView}>
                <Text style={styles.dateTxt}>
                  {reminderDate
                    ? reminderDate
                    : getReminderDetailData?.ResultData?.ReminderDate}
                </Text>
              </View>
              <View style={styles.btnView}>
                <Button
                  onPress={handleOpenRBSheet}
                  txtColor={Colors.White}
                  color={Colors.Black}
                  title={'Change my re-order reminder date'}
                />
              </View>
            </View>
          </View>

          <View style={styles.likeView}>
            <View>
              <Text style={styles.likeTxt}>
                I'd like to receive my re-order reminder via:
              </Text>
              <Text style={styles.tickTxt}>(Please tick)</Text>
            </View>
            <View style={styles.emailView}>
              <View style={styles.emailSubView}>
                <Text style={styles.emailTxt}>Email</Text>

                <View style={styles.mailView}>
                  <View style={styles.commonView}>
                    <Text style={styles.mailTxt}>{details?.Email}</Text>
                  </View>
                  <View style={styles.commonCheckView}>
                    <CommonCheckBox
                      imageSource={ImageUrl.CheckRing}
                      onToggle={() => handleToggle(1)}
                      isChecked={email}
                      uncheckedImage={ImageUrl.UncheckRing}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.smsView}>
                <Text style={styles.smsTxt}>SMS</Text>

                <View style={styles.smsSubView}>
                  <View style={styles.codeView}>
                    <TextInput
                      style={styles.inputTxt}
                      onChangeText={text => onChangeText(text, 1)}
                      value={phoneCode}
                      maxLength={2}
                      keyboardType="numeric"
                      // placeholder="44"
                      placeholderTextColor={Colors.LightGrey}
                    />
                  </View>

                  <View style={styles.numberView}>
                    <TextInput
                      style={styles.inputTxt}
                      onChangeText={text => onChangeText(text, 2)}
                      value={sms}
                      maxLength={10}
                      keyboardType="numeric"
                      placeholder="Enter mobile"
                      placeholderTextColor={Colors.LightGrey}
                    />
                  </View>
                  <View style={styles.checkView}>
                    <CommonCheckBox
                      imageSource={ImageUrl.CheckRing}
                      onToggle={() => handleToggle(2)}
                      isChecked={selectsms}
                      uncheckedImage={ImageUrl.UncheckRing}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.btn}>
              <Button
                onPress={handleUpdate}
                title={'Update'}
                txtColor={Colors.White}
                color={Colors.Black}
              />
            </View>
          </View>
        </View>
        {/* {postReminderDetailData.postReminderDetailisLoading && (
          <View style={styles.IndicatorView}>
            <SkypeIndicator size={100} animationDuration={800} />
          </View>
        )} */}

        <View style={{alignItems:'center',paddingVertical:hp('1%')}}>
          <RenderHTML
            contentWidth={width}
            customHTMLElementModels={customHTMLElementModels}
            source={{html: getReminderDetailData?.ResultData?.ReminderText}}
            tagsStyles={tagsStyles}
          />
        </View>
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        height={Platform.OS === 'ios' ? hp('90%') : hp('95%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
            paddingBottom: Platform.OS === 'ios' ? hp('1.8%') : 0,
          },
        }}>
        <SetAutoReplenish
          handleBtn={'reOrderReminder'}
          onClose={handleCloseRBSheet}
          handleDate={handleDate}
        />
      </RBSheet>
    </View>
  );
};
export default ReorderReminder;
