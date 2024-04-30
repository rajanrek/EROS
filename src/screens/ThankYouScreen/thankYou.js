import react, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import ImageUrl from '../../components/ImageUrl';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../components/Button/button';
import Colors from '../../components/Colors/colors';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {postReminderDetail} from '../../redux/action/actions';

import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import moment from 'moment';
import Globals from '../../utils/constant';

const ThankYou = (props, {item}) => {
  const refRBSheet = useRef();
  const [checkBox, setCheckBox] = useState(false);
  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const {accountData} = useSelector(state => state.accountData.account);

  const {postReminderDetailData, registerData, data} = useSelector(state => ({
    postReminderDetailData: state.reorderReminder.postReminderDetail,
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
  }));
  console.log('ThankYou', props?.route?.params);
  const Reminder =
    props?.route?.params?.completeOrderDetails.Thankyou?.OrderReminder;

  const orderData = props?.route?.params?.completeOrderDetails;
  const details = accountData?.ResultData?.personalDetailResponse;

  const Email =
    props?.route?.params?.completeOrderDetails.Thankyou?.OrderReminder?.Email;

  const handleRBSheet = item => {
    console.log('item----36', item);
    refRBSheet.current.open();
  };

  let a = props?.route?.params?.completeOrderDetails.Thankyou?.OrderItems.map(
    item => {
      console.log('item-=====', item);
      return item.ProductTypeId != 1;
    },
  );
  const isContactLense = a?.includes(true);

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const handleUpdate = () => {
    const postJson = {
      Email: Email,
      ReminderDate: Date,
      SendEmail: checkBox,
    };

    console.log('Json---', postJson);
    dispatch(postReminderDetail(postJson, apiData?.CustomerId));
  };
  // const handleCloseSheet = () => {
  //   refRBSheet.current.close();
  // };

  // const handleApi = ScheduleJson => {
  //   if (ScheduleJson[0].OrderId != undefined) {
  //     dispatch(postScheduleDate(ScheduleJson[0]));
  //   } else {
  //     dispatch(postChangeScheduleDate(ScheduleJson[0]));
  //   }
  //   console.log('Auto---', ScheduleJson);
  // };

  const handleToggle = () => {
    setCheckBox(!checkBox);
  };

  useEffect(
    () =>
    navigation.addListener("beforeRemove", (e) => {
    // Prevent default behavior of leaving the screen
    e.preventDefault();
    }),
    [navigation]
    );

  const today = moment().format('YYYY-MM-DD');

  let Date = moment(selected).format('DD/MM/YYYY');

  console.log('Date====', Date);

  console.log('post Reminder data===', postReminderDetailData);
  console.log('post Reminder data===', postReminderDetailData);
const onBtnPress =()=>{
  Globals.basketCount=0; 
  Globals.thanku ='thanku';
  navigation.navigate('Shop screen')
}
  return (
    <ScrollView style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        {/* <View style={styles.homeView}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => onBtnPress()}>
            <Image source={ImageUrl.BackArrow} style={styles.arrowImg} />
          </TouchableOpacity>

          <Text style={styles.homeTxt}>Go Home</Text>
        </View> */}

        <View style={styles.placedView}>
          <View>
            <Image
              style={{
                height: hp('15%'),
                width: hp('15%'),
                resizeMode: 'contain',
              }}
              source={ImageUrl.Thankyou}
            />
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.thanksTxt}>Order Received...Thanks!!!</Text>
        </View>
        <View style={styles.thanksView}>
          <Text style={styles.nameTxt}>“{apiData?.UserName}”</Text>
        </View>
        <View style={styles.orderView}>
          <Text style={styles.orderTxt}>Order number:</Text>
          <Text style={styles.orderTxt}>{orderData.OrderRef}</Text>
        </View>

        <View style={{alignItems: 'center', paddingVertical: hp('1%')}}>
          <Button
            title={'View order Details'}
            onPress={onBtnPress}
            color={Colors.Black}
            txtColor={Colors.White}
          />
        </View>
        {props?.route?.params?.AutoReplenishDate !== '' && (
          <View>
            <View style={{alignItems: 'center', paddingVertical: hp('1%')}}>
              <Text style={styles.emailorderTxt}>
                Your next Auto Replenish order will be
              </Text>
              <Text style={styles.emailorderTxt}>
                {' '}
                placed on {props?.route?.params?.AutoReplenishDate}.
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                paddingVertical: hp('1%'),
              }}>
              <Text style={styles.autoTxt}>
                You can change your Auto Replenish date
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.autoTxt}>from </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('autoReplenish')}>
                  <Text style={styles.hereTxt}>here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {Reminder.ReminderDate != '' && (
          <View>
            <View style={{alignItems: 'center', paddingVertical: hp('1%')}}>
              <Text style={styles.emailorderTxt}>Your next order will be</Text>
              <Text style={styles.emailorderTxt}>
                {' '}
                due on {Reminder.ReminderDate}.
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                paddingVertical: hp('1%'),
              }}>
              <Text style={styles.autoTxt}>
                If you want change your reminder date or settings,
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.autoTxt}> you can do so from </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('reOrderReminder')}>
                  <Text style={styles.hereTxt}>here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {Reminder.ReminderDate == '' && isContactLense && (
          <View
            style={{paddingHorizontal: hp('3.5%'), paddingVertical: hp('2%')}}>
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
                paddingVertical: hp('1.3%'),
              }}>
              <View style={{alignItems: 'center', paddingVertical: hp('1%')}}>
                <Text style={styles.wouldTxt}>Would you like a Reminder ?</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text style={styles.autoTxt}>
                      By email to <Text style={styles.emailTxt}>{Email}</Text>
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CommonCheckBox
                      imageSource={ImageUrl.CheckRing}
                      onToggle={handleToggle}
                      isChecked={checkBox}
                      uncheckedImage={ImageUrl.UncheckRing}
                    />
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingVertical: hp('0.4%'),
                  }}>
                  <Text style={styles.autoTxt}>Please send me reminder on</Text>

                  <View>
                    <Text style={styles.woulddateTxt}>
                      {Date ? Date : today}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRBSheet(item)}
                    style={{alignItems: 'center'}}>
                    <Image
                      style={{
                        height: hp('3%'),
                        width: hp('6%'),
                        resizeMode: 'contain',
                      }}
                      source={ImageUrl.Calendar}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{alignItems: 'center', paddingVertical: hp('1%')}}>
                <TouchableOpacity
                  onPress={handleUpdate}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingHorizontal: hp('3%'),
                    paddingVertical: hp('1.2%'),
                    borderRadius: 8,
                    backgroundColor: Colors.Black,
                  }}>
                  <Text style={styles.updateTxt}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <View style={{alignItems: 'center', paddingVertical: hp('3%')}}>
          <Image
            resizeMode="contain"
            style={styles.bannerImg}
            source={ImageUrl.ThankyouBanner}
          />
        </View>
      </SafeAreaView>
      <RBSheet
        ref={refRBSheet}
        height={hp('50%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <View>
          <Calendar
            style={styles.calendar}
            onDayPress={day => {
              setSelected(day.dateString);
              refRBSheet.current.close();
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: Colors.Black,
              },
            }}
            theme={{
              backgroundColor: Colors.Black,
              calendarBackground: Colors.newGrey,
              textSectionTitleColor: Colors.Black,
              selectedDayBackgroundColor: Colors.Black,
              selectedDayTextColor: Colors.White,
              todayTextColor: '#00adf5',
              arrowColor: Colors.Black,
              dayTextColor: Colors.Black,
              textDayFontSize: 18,
              textDisabledColor: Colors.Grey,
            }}
            minDate={today}
          />
        </View>
      </RBSheet>
    </ScrollView>
  );
};

export default ThankYou;
