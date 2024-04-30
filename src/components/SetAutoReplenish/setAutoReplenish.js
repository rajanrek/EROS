import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import styles from './styles';
import Colors from '../Colors/colors';
import ImageUrl from '../ImageUrl';
import {Calendar} from 'react-native-calendars';
import Button from '../Button/button';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../CustomsFonts/customFonts';
import {useDispatch, useSelector} from 'react-redux';
import {getReminderDate, postScheduleDate} from '../../redux/action/actions';
import moment from 'moment';

const SetAutoReplenish = props => {
  const [selected, setSelected] = useState('');
  const [isdisable, setIsdisable] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedReminder, setSelectedReminder] = useState('');
  const [reminder, setReminder] = useState('');
  const [replenishremind, setReplenishremind] = useState('');
  const [autoremind, setAutoremind] = useState('');
  const [selectedInterval, setSelectedInterval] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [replenishInterval, setReplenishInterval] = useState('');
  const [replenishReminder, setReplenishReminder] = useState('');
  const [scheduleDate, setscheduleDate] = useState('');

  const refRBSheet = useRef();
  const dispatch = useDispatch();

  const {
    getReminderDetailData,
    getReminderDateData,
    ScheduleDateData,
    registerData,
    data,
    replenishData,
    ChangeScheduleDateData,
  } = useSelector(state => ({
    getReminderDetailData:
      state.reminderDetail.getReminderDetail.getReminderDetailData,
    getReminderDateData:
      state.reminderDate.getReminderDates.getReminderDateData,
    ScheduleDateData: state.dateSchedule.ScheduleDate.ScheduleDateData,
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    replenishData: state.autoReplenish.replenish,
    ChangeScheduleDateData: state.scheduleDateChange.ChangeScheduleDate,
  }));

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData;

  const FullDate = getReminderDateData?.ResultData?.FullReminderDate;

  const handleSelectedWeek = item => {
    setIsdisable(true);
    const orderId = getReminderDetailData?.ResultData?.RecentReminderOrderId;

    const postJson = {
      OrderId: orderId,
      WearingValue: item.key,
    };
    dispatch(getReminderDate(postJson));
    setSelectedWeek(item.value);
    setSelected(FullDate);
    refRBSheet.current.close();
  };

  const handleOpenRBSheet = () => {
    refRBSheet.current.open();
  };

  const IntervalDays = getReminderDateData?.ResultData?.IntervalDays;
  let getDate = getReminderDetailData?.ResultData?.ReminderDate;

console.log('Get Reminder',getReminderDateData)

  useEffect(() => {
    setSelectedReminder(
      FullDate ? FullDate : getReminderDetailData?.ResultData?.ReminderDate,
    ),
      setSelectedInterval(
        IntervalDays
          ? IntervalDays
          : getReminderDetailData?.ResultData?.IntervalDays,
      ),
      setSelectedWeek(
        selectedWeek
          ? selectedWeek
          : getReminderDetailData?.ResultData?.WearingFrequency,
      );

    // handleSelectDate(FullDate, 2);
  }, [getDate, getReminderDateData, getReminderDetailData]);
  useEffect(() => {
    let tempSelectedDate = moment(selected).format('dddd, MMMM D YYYY');
    const IsoDateTo = moment(getDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let temp2 = moment(IsoDateTo).format('dddd, MMMM D YYYY');

    setSelectedReminder(selected ? tempSelectedDate : temp2),
      setSelectedInterval(getReminderDetailData?.ResultData?.IntervalDays);
    // setSelectedWeek(getReminderDetailData?.ResultData?.WearingFrequency);

    // handleSelectDate(FullDate, 2);
  }, [selectedDate, getDate, selected]);

  useEffect(() => {
    setReplenishInterval(
      replenishInterval
        ? replenishInterval
        : props?.selectedData?.AutomateOrderInfo?.RenewalInterwalDays,
    );

    const IsoDateTo = moment(
      props?.selectedData?.ScheduleDate,
      'DD/MM/YYYY',
    ).format('YYYY-MM-DD');
    let temp2 = moment(IsoDateTo).format('dddd, MMMM D YYYY');

    setReplenishReminder(replenishReminder ? replenishReminder : temp2);

    const IsScheduleDate = moment(
      props?.selectedData?.OrderDate,
      'DD/MM/YYYY',
    ).format('YYYY-MM-DD');
    console.log('is---',IsScheduleDate)

    let dateschedule = moment(IsScheduleDate).format('dddd, MMMM D YYYY');

    setscheduleDate(dateschedule);
  }, []);

  useEffect(() => {
    let reminder = moment(selectedReminder).format('DD/MM/YYYY');
    console.log('reminder 147',reminder)
    let remind = moment(reminder, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log('remind 149',remind)

    setReminder(remind);

    let replenishremind = moment(replenishReminder).format('DD/MM/YYYY');
    let remindreplenish = moment(replenishremind, 'DD/MM/YYYY').format(
      'YYYY-MM-DD',
    );
    setReplenishremind(remindreplenish);

    let remindauto = moment(scheduleDate).format('DD/MM/YYYY');
    let autoreminder = moment(remindauto, 'DD/MM/YYYY').format('YYYY-MM-DD');
    setAutoremind(autoreminder);
  }, []);

  const handleSelectDate = (date, type) => {
    setIsdisable(true);
    let temp2 = moment(date).format('dddd, MMMM D YYYY');
    setReplenishReminder(temp2);
    setscheduleDate(temp2);
    setSelected(date);
    if (type == 1) {
      let newDate = moment(date).format('dddd, MMMM D YYYY');
      setSelectedDate(newDate);
    } else {
      setSelectedDate(date);
    }
  };

  const today = moment().format('YYYY-MM-DD');

  const onChangeText = item => {
    setReplenishInterval(item);
  };

  const handleAutoRepelnish = () => {
    const AutoDate = moment(selected).format('DD/MM/YYYY');

    let ScheduleJson = [];
    if (props.type == 1) {
      let ScheduleJson1 = {
        CustomerId: apiData?.CustomerId,
        OrderId: props?.selectedData?.OrderId,
        Date: AutoDate,
        IntervalDays: replenishInterval,
      };
      ScheduleJson.push(ScheduleJson1);
    } else {
      let ScheduleJson2 = {
        CustomerId: apiData?.CustomerId,
        AutoReOrderId: props?.selectedData?.AutoReOrderId,
        Date: AutoDate,
        IntervalDays: replenishInterval,
      };
      ScheduleJson.push(ScheduleJson2);
    }

    props?.handleApi(ScheduleJson);
    props.onClose();
  };

  console.log('scheduledate',scheduleDate)
  console.log('replenish reminder',replenishReminder)
  console.log('select reminder',selectedReminder)
  console.log('selected date',selected)
  console.log('reminder 211',reminder)




  return (
    <View style={styles.mainContainer}>
      <View style={styles.left}>
        {props?.handleBtn == 'reOrderReminder' ? (
          <Text style={styles.editTxt}>Re-order Reminder</Text>
        ) : (
          <Text style={styles.editTxt}>Set Auto-replenish</Text>
        )}
      </View>

      {/* <View style={styles.left}>
          <Text style={styles.editTxt}>Set Auto-replenish</Text>
        </View> */}

      {props?.handleBtn == 'reOrderReminder' ||
      props?.handleBtn == 'Checkout' ? (
        <View style={styles.oftenView}>
          <View style={styles.lenseView}>
            <Text style={styles.oftenTxt}>
              How often do you wear contact lenses a week ?
            </Text>
          </View>
          <View style={styles.selectView}>
            <TouchableOpacity
              onPress={handleOpenRBSheet}
              style={styles.selectTouch}>
              <View style={styles.selectsubView}>
                <Text style={styles.selectTxt}>
                  {selectedWeek ? selectedWeek : 'Select'}
                </Text>
              </View>
              <View style={styles.imgView}>
                <Image style={styles.img} source={ImageUrl.DropArrow} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View style={styles.satView}>
        <View style={styles.satsubView}>
          {props?.handleBtn == 'reOrderReminder' ? (
            <Text style={styles.reorderDate}>Your current re-order date:</Text>
          ) : null}

          {props?.handleBtn == 'reOrderReminder' ||
          props?.handleBtn == 'Checkout' ? (
            <Text style={styles.satTxt}>{selectedReminder}</Text>
          ) : (
            <Text style={styles.satTxt}>
              {scheduleDate == 'Invalid date'
                ? replenishReminder
                : scheduleDate}
            </Text>
          )}

          <View style={styles.everyView}>
            <Text style={styles.everyTxt}>and every {'  '}</Text>
            {props?.handleBtn == 'reOrderReminder' ||
            props?.handleBtn == 'Checkout' ? (
              <Text style={styles.Inputinterval}>{selectedInterval}</Text>
            ) : (
              <TextInput
                style={styles.TxtInput}
                onChangeText={text => onChangeText(text)}
                maxLength={3}
                keyboardType="numeric"
                value={replenishInterval?.toString()}
              />
            )}
            {/* <Text style={styles.Inputinterval}>{selectedInterval}</Text> */}
            <Text style={styles.daysTxt}>{'   '}days after this date</Text>
          </View>
        </View>
      </View>
      <View style={styles.calendarView}>
        <View style={styles.calendarSubView}>
          <Calendar
            style={styles.calendar}
            onDayPress={day => {
              handleSelectDate(day.dateString, 1);
            }}
            markedDates={{
              // [selected]: {
              //   selected: true,
              //   disableTouchEvent: true,
              //   selectedDotColor: Colors.Black,
              // },
              [selected]: {
                selected: true,
                selectedColor: 'black',
              },
              [reminder]: {
                selected: true,
                selectedColor: 'black',
              },
              [autoremind]: {
                selected: true,
                selectedColor: 'black',
              },
              [replenishremind]: {
                selected: true,
                selectedColor: 'black',
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
      </View>
      <View style={styles.btnView}>
        {props?.handleBtn == 'reOrderReminder' ||
        props?.handleBtn == 'Checkout' ? (
          <Button
            onPress={() => {
              props.handleDate(selected, getReminderDateData?.ResultData?.ReminderDate);
              props?.onClose();
            }}
            title={'Update'}
            color={isdisable ? Colors.Black : Colors.Grey}
            disable={!isdisable}
            txtColor={Colors.White}
            btnClicked={true}
          />
        ) : (
          <Button
            onPress={() => handleAutoRepelnish()}
            title={'Update Auto-replenish'}
            color={isdisable ? Colors.Black : Colors.Grey}
            disable={!isdisable}
            txtColor={Colors.White}
          />
        )}
        <TouchableOpacity
          onPress={() => props?.onClose('cancel')}
          style={styles.cancelBtn}>
          <Text style={styles.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={hp('40%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.White,
          },
        }}>
        <View style={{flex: 1}}>
          <FlatList
            data={getReminderDetailData?.ResultData?.Questions}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectedWeek(item)}
                style={{
                  marginVertical: 5,
                  backgroundColor: Colors.newGrey,
                  alignItems: 'center',
                  paddingVertical: hp('0.5%'),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 13,
                    color: Colors.Black,
                  }}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default SetAutoReplenish;
