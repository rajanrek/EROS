import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RadioButton,
  Linking,
  Alert,
  TextInput
} from 'react-native';
import styles from './styles';
import {SkypeIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import Colors from '../../components/Colors/colors';
import Button from '../../components/Button/button';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import ImageUrl from '../../components/ImageUrl';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch} from 'react-redux';
import {checkForError} from './PrescriptionError';
import Globals from '../../utils/constant';
import moment from 'moment';
import DocumentPicker, {
} from 'react-native-document-picker';

import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation} from '@react-navigation/native';
const fs = RNFetchBlob.fs;

const GlassPrescription = props => {
  const [checked, setChecked] = useState(false);
  const [information, setinformation] = useState('');
  const [leftSphr, setLeftSphr] = useState({});
  const [RightSphr, setRightSphr] = useState({});
  const [RightCyldr, setRightCyldr] = useState({});
  const [LeftCyldr, setLeftCyldr] = useState({});
  const [LeftAxis, setLeftAxis] = useState({});
  const [RightAxis, setRightAxis] = useState({});
  const [RightAdd, setRightAdd] = useState({});
  const [LeftAdd, setLeftAdd] = useState({});
  const [LeftPrims, setLeftPrism] = useState({});
  const [RightPrims, setRightPrism] = useState({});
  const [RightBase, setRightBase] = useState({});
  const [LeftBase, setLeftBase] = useState({});
  const [PD, setPD] = useState({});
  const [ErrorMsg, setErrorMsg] = useState('');
  const [IsError, setIsError] = useState(false);
  const [errorFrom, setIsErrorFrom] = useState('');
  const [prescriptionName, setPrescName] = useState('');

  const [selectedSide, setSelectedSide] = useState('');
  const [dropdwonData, setDropdownData] = useState([]);
  const refRBSheet = useRef();

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selecteImage, setSelectedImage] = useState(null);
  const [base64, setBase64] = useState('');

  let dateString = `${selectedDay} ${selectedMonth} ${selectedYear}`;
  let date = moment(dateString, 'D MMMM YYYY');
  let formattedDate = date.format('DD/MM/YYYY');
  const navigation = useNavigation();
  const param = props.route.params;
  const dispatch = useDispatch();
  console.log('props in pres======', param);
  const isFocused = navigation.isFocused();
// if(Globals.IsSelectPres){
//         console.log("value checked=====")
//         setChecked(true)
//       }
  useEffect(() => {
    console.log('props in pres=22222=====', param?.item?.LeftPrescription);

    const getItemByAttributeName = (array, attributeName) => {
      return array?.find(item => item.AttName === attributeName);
    };
    let PDTmp = getItemByAttributeName(param?.item?.LeftPrescription, 'PD');
    let spareLeft = getItemByAttributeName(
      param?.item?.LeftPrescription,
      'Sphere',
    );
    let spareRight = getItemByAttributeName(
      param?.item?.RightPrescription,
      'Sphere',
    );
    let CylinderLeft = getItemByAttributeName(
      param?.item?.LeftPrescription,
      'Cylinder',
    );
    let CylinderRight = getItemByAttributeName(
      param?.item?.RightPrescription,
      'Cylinder',
    );
    let AxisLeft = getItemByAttributeName(
      param?.item?.LeftPrescription,
      'Axis',
    );
    let AxisRight = getItemByAttributeName(
      param?.item?.RightPrescription,
      'Axis',
    );
    let AddLeft = getItemByAttributeName(param?.item?.LeftPrescription, 'Add');
    let AddRight = getItemByAttributeName(
      param?.item?.RightPrescription,
      'Add',
    );
    let PrismRight = getItemByAttributeName(
      param?.item?.PrismRightPrescription,
      'Prism',
    );
    let RightBase = getItemByAttributeName(
      param?.item?.PrismRightPrescription,
      'Base Direction',
    );
    let PrismLeft = getItemByAttributeName(
      param?.item?.PrismLeftPrescription,
      'Prism',
    );
    let LeftBase = getItemByAttributeName(
      param?.item?.PrismLeftPrescription,
      'Base Direction',
    );
    if (Globals.IsSelectPres || Globals.IsEditPres) {
      console.log('spareLeft=== inside if', PrismLeft);
      // setChecked(true)
      if(PrismLeft || PrismRight){
        console.log("value checked=====", PrismLeft)
        setChecked(true)
      }
      setPrescName(param?.item?.PrescriptionName);
      setPD(PDTmp);
      setLeftSphr(spareLeft);
      setLeftCyldr(CylinderLeft);
      setLeftAxis(AxisLeft);
      setLeftAdd(AddLeft);
      setRightAdd(AddRight);
      setRightAxis(AxisRight);
      setRightSphr(spareRight);
      setRightCyldr(CylinderRight)
      setLeftPrism(PrismLeft)
      setRightPrism(PrismRight)
      setLeftBase(LeftBase)
      setRightBase(RightBase)

    
    }
  }, [
    isFocused,
    param?.item?.LeftPrescription,
    param?.item?.RightPrescription,
    // RightSphr,
    // LeftCyldr,
    // RightCyldr,
    // LeftAxis,
    // RightAxis,
    // LeftPrims,
    // RightPrims,
    // RightBase,
    // LeftBase,
    // RightAdd,
    // LeftAdd,
    checked
  ]);
  const chooseFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles, DocumentPicker.types.images],
      });
      console.log('res-----', res);
      if (res[0].size > 1000000) {
        Alert.alert('Document size must be less than 1 MB');
        return;
      }
      setSelectedImage(res[0]);
      convertToBase64(res[0].uri);
      Globals.PrescImgName = res[0].name;
    } catch (e) {
      if (!DocumentPicker.isCancel(e)) {
        console.log(e);
      }
    }
  };
  const convertToBase64 = async paramUri => {
    let imagePath = paramUri;
    // set the image/video path here
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', imagePath) // the file is now downloaded at local storage
      .then(resp => {
        imagePath = resp.path(); // to get the file path
        return resp.readFile('base64'); // to get the base64 string
      })
      .then(base64 => {
        // here base64 encoded file data is returned
        Globals.prescriptionImg = base64;

        setBase64(base64);
        return fs.unlink(imagePath); // to remove the file from local storage
      });
  };
  console.log('param pescription', param);
  const leftAttributes = {
    leftSphr,
    LeftCyldr,
    LeftAxis,
    LeftAdd,
  };
  const RightAttributes = {
    RightSphr,
    RightCyldr,
    RightAxis,
    RightAdd,
  };

  const leftPrism = {
    LeftPrims,
    LeftBase,
  };
  const RightPrism = {
    RightPrims,
    RightBase,
  };
  const updatedLeftAttris = Object.values(leftAttributes);
  const updatedRightAttris = Object.values(RightAttributes);
  const updatedLeftPrisms = Object.values(leftPrism);
  const updatedRightPrisms = Object.values(RightPrism);
  function removeEmptyObjects(arr) {
    return arr.filter(obj => Object.keys(obj).length !== 0);
  }

  const onChangeText = item => {
    setinformation(item);
  };
  let defaultSelectedPd =
    param?.prescriptionData?.prescriptionData?.Attributes[4]?.Attributes[8]
      ?.Value;

  useEffect(() => {
    console.log('useeffect 101------', leftSphr, RightSphr);
    setLeftSphr('');
    setRightSphr('');
    setLeftAxis('');
    setRightAxis('');
    setLeftCyldr('');
    setRightCyldr('');
    setPD(defaultSelectedPd);
  }, []);

  useEffect(() => {
    //  validateValue(leftSphr, RightSphr,LeftCyldr,RightCyldr);
    ValidateSelection(
      leftSphr,
      RightSphr,
      LeftCyldr,
      RightCyldr,
      LeftPrims,
      RightPrims,
      RightBase,
      LeftBase,
    );
    let dateString = `${selectedDay} ${selectedMonth} ${selectedYear}`;
    let date = moment(dateString, 'D MMMM YYYY');
    let formattedDate = date.format('DD/MM/YYYY');
    dateValidation(formattedDate);
  }, [
    leftSphr,
    RightSphr,
    LeftCyldr,
    RightCyldr,
    LeftAxis,
    RightAxis,
    LeftPrims,
    RightPrims,
    RightBase,
    LeftBase,
    checked,
    ErrorMsg,
    selectedDay,
    selectedMonth,
    selectedYear,
  ]);

  const onSelectedValue = async item => {
    const newArray = [];
    console.log('selectedSide ----', selectedSide, item);
    if (selectedSide === 'CylLeft' || selectedSide === 'CylRight') {
      if (
        item.Value === '---' ||
        item.Value === 'PLANO' ||
        item.Value === 'INFINITY (∞)' ||
        item.Value === 'BALANCE' ||
        item.Value === 'DS'
      ) {
        WarningAlert(selectedSide);
      }
    }
    if (selectedSide === 'AxisLeft') {

      if (
        LeftCyldr.Value === '---' ||
        LeftCyldr.Value === 'PLANO' ||
        LeftCyldr.Value === 'INFINITY (∞)' ||
        LeftCyldr.Value === 'BALANCE' ||
        LeftCyldr.Value === 'DS'
      ) {
        WarningAlert(selectedSide);
      }
    }

    if (selectedSide === 'AxisRight') {
      if (
        RightCyldr.Value === '---' ||
        RightCyldr.Value === 'PLANO' ||
        RightCyldr.Value === 'INFINITY (∞)' ||
        RightCyldr.Value === 'BALANCE' ||
        RightCyldr.Value === 'DS'
      ) {
        WarningAlert(selectedSide);
      }
    }
    switch (selectedSide) {
      case 'left':
        setLeftSphr(item);
        break;
      case 'right':
        setRightSphr(item);
        break;
      case 'CylLeft':
        setLeftCyldr(item);
        break;
      case 'CylRight':
        setRightCyldr(item);
        break;
      case 'AxisLeft':
        setLeftAxis(item);
        break;
      case 'AxisRight':
        setRightAxis(item);
        break;
      case 'AddLeft':
        setLeftAdd(item);
        break;
      case 'AddRight':
        setRightAdd(item);
        break;
      case 'leftPrism':
        setLeftPrism(item);

        break;
      case 'rightPrism':
        setRightPrism(item);

        break;
      case 'leftBase':
        setLeftBase(item);
        break;
      case 'rightBase':
        setRightBase(item);
        break;
      case 'PD':
        setPD(item);
        break;
      case 'DD':
        setSelectedDay(item);
        break;
      case 'MM':
        setSelectedMonth(item);
        break;
      case 'YYYY':
        setSelectedYear(item);
        break;
      default:
      // Do something for all other cases
    }
    refRBSheet.current.close();
  };
  const validateValue = () => {
    console.log('vlaidate----', leftSphr, LeftCyldr);

    const sum = parseFloat(leftSphr.Value) + parseFloat(LeftCyldr);
    if (sum > 8 || sum < -12) {
      console.log('inside condition');
      WarningAlert();
      return true;
    } else if (LeftCyldr == 'PLANO') {
      WarningAlert();
      setLeftAxis('');
    } else {
      console.log('Condition not met1');
      return false;
    }
  };

  const dateValidation = dateString => {
    var givenDate = moment(dateString, 'DD/MM/YYYY');

    // Get today's date using Moment.js
    let todayStr = moment();

    // Calculate the difference in years
    // var yearDifference = today.diff(givenDate, 'years');
    var givenDateNew = new Date(givenDate);
    var todayNew = new Date(todayStr);
    var timeDifference = todayNew.getTime() - givenDateNew.getTime();

    // Convert milliseconds to years
    var millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; // Taking into account leap years
    var yearDifference = timeDifference / millisecondsInYear;

    // Check if the absolute value of the difference is less than or equal to 2
    if (Math.abs(yearDifference) <= 2) {
      console.log('The given date is within 2 years from today.');
      return true;
    } else {
      console.log('The given date is not within 2 years from today.');
      setErrorMsg(
        'The date of your prescription should be within the last two years.',
      );
      return false;
    }

    return true;
  };
  const handleNext = () => {
    Globals.sphereLeft = leftSphr;
    Globals.sphereRight = RightSphr;
    Globals.cylinderLeft = LeftCyldr;
    Globals.cylinderRight = RightCyldr;
    let updatedLeftAttri = removeEmptyObjects(updatedLeftAttris);
    let updatedRightAttri = removeEmptyObjects(updatedRightAttris);
    let updatedLeftPrism = removeEmptyObjects(updatedLeftPrisms);
    let updatedRightPrism = removeEmptyObjects(updatedRightPrisms);
    Globals.formattedDate = formattedDate;
    props.navigation.navigate('SectionThird', {
      ProductId: param.ProductId,
      AddPrescPrams: param,
      updatedLeftAttri,
      updatedRightAttri,
      updatedLeftPrism,
      updatedRightPrism,
      PD,
      formattedDate,
      prescriptionName,
    });
  };

  const ValidateSelection = (
    leftSphr,
    RightSphr,
    LeftCyldr,
    RightCyldr,
    LeftPrims,
    RightPrims,
    RightBase,
    LeftBase,
  ) => {
    const errorRecived = checkForError(
      leftSphr,
      RightSphr,
      LeftCyldr,
      RightCyldr,
    );

    setErrorMsg(errorRecived);

    console.log('errorRecived---230', errorRecived);
    console.log('in validation fn------', LeftCyldr, RightCyldr);
    if (leftSphr === '' || RightSphr === '') {
      setErrorMsg('Sphere is required');
    } else {
      if (LeftCyldr != '') {
        if (
          (LeftCyldr.Value != '---' ||
            LeftCyldr.Value != 'PLANO' ||
            LeftCyldr.Value != 'INFINITY (∞)' ||
            LeftCyldr.Value != 'BALANCE' ||
            LeftCyldr.Value != 'DS') &&
          (LeftAxis.Value === '---' || LeftAxis === '')
        ) {
          console.log('in insdie 284 fn------', LeftAxis);

          setErrorMsg('Axis is required');
        }
      }
      if (RightCyldr != '') {
        if (
          (RightCyldr.Value != '---' ||
            RightCyldr.Value != 'PLANO' ||
            RightCyldr.Value != 'INFINITY (∞)' ||
            RightCyldr.Value != 'BALANCE' ||
            RightCyldr.Value != 'DS') &&
          (RightAxis.Value === '---' || RightAxis === '')
        ) {
          console.log('in insdie 284 fn------', LeftAxis);

          setErrorMsg('Axis is required');
        }
      }
    }

    if (checked) {
      console.log('LeftBase 294', leftPrism, 'right base', RightPrism);
      if (
        (leftPrism.LeftPrims === '---' ||
          leftPrism.LeftPrims.Value != 'None') &&
        (RightPrism.RightPrims === '---' ||
          RightPrism.RightPrims.Value != 'None')
      ) {
        if (
          (RightPrism.RightBase === '---' && RightPrism.RightPrims != '---') ||
          (leftPrism.LeftBase === '---' && leftPrism.LeftPrims != '---')
        ) {
          setErrorMsg('Prism required');
        } else if (
          (RightPrism.RightBase != '---' && RightPrism.RightPrims === '---') ||
          (leftPrism.LeftBase != '---' && leftPrism.LeftPrims === '---')
        ) {
          setErrorMsg('Prism required');
        } else if (
          leftPrism.LeftPrims === '---' &&
          RightPrism.RightPrims === '---'
        ) {
          setErrorMsg('Prism required');
        }
      } else {
        if (RightPrism.RightPrims.Value === 'None') {
          setRightBase('---');
        }
        if (leftPrism.LeftPrims.Value === 'None') {
          setLeftBase('---');
        }
      }
    } else {
      setLeftPrism('---');
      setRightPrism('---');
      setLeftBase('---');
      setRightBase('---');
    }
  };

  const WarningAlert = selectedSide => {
    console.log('selectedSide----', selectedSide);
    if (selectedSide === 'CylLeft' || selectedSide === 'AxisLeft') {
      setLeftAxis('---');
    } else {
      setRightAxis('---');
    }
    if (selectedSide === 'CylRight' || selectedSide === 'AxisRight') {
      setRightAxis('---');
    }
    Alert.alert(
      'If your cylinder is one of the following',
      `
      0.0
      Plano
      Infinity sign
      D
      Balance

      You can not have an Axis. Please leave this blank (---)`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (selectedSide === 'CylLeft' || selectedSide === 'AxisLeft') {
              setLeftAxis('---');
            }
            if (selectedSide === 'CylRight' || selectedSide === 'AxisRight') {
              setRightAxis('---');
            }
          },
        },
      ],
    );
  };
  const handleOpenRBSheet = side => {
    // Generate day values (1 to 31)
    const days = Array.from({length: 31}, (_, i) => i + 1);

    // Generate month values (1 to 12)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Generate last three years' values
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 3}, (_, i) => currentYear - i);

    console.log('side-----', side);
    console.log('insde base---', param?.prescriptionData?.prescriptionData);
    setSelectedSide(side);
    if (side == 'left' || side == 'right') {
      const newData =
        param?.prescriptionData?.prescriptionData?.Attributes[0].Attributes.map(
          ({ID, IsSelected, ...rest}) => ({
            ...rest,
            Text: ID,
            Id: param?.prescriptionData?.prescriptionData?.Attributes[0]
              .AttributeId,
            AttName:
              param?.prescriptionData?.prescriptionData?.Attributes[0].Name,
          }),
        );
      setDropdownData(newData);
    } else if (side == 'CylLeft' || side == 'CylRight') {
      const newData =
        param?.prescriptionData?.prescriptionData?.Attributes[1].Attributes.map(
          ({ID, IsSelected, ...rest}) => ({
            ...rest,
            Text: ID,
            Id: param?.prescriptionData?.prescriptionData?.Attributes[1]
              .AttributeId,
            AttName:
              param?.prescriptionData?.prescriptionData?.Attributes[1].Name,
          }),
        );

      setDropdownData(newData);
    } else if (side == 'AxisLeft' || side == 'AxisRight') {
      const newData =
        param?.prescriptionData?.prescriptionData?.Attributes[2].Attributes.map(
          ({ID, IsSelected, ...rest}) => ({
            ...rest,
            Text: ID,
            Id: param?.prescriptionData?.prescriptionData?.Attributes[2]
              .AttributeId,
            AttName:
              param?.prescriptionData?.prescriptionData?.Attributes[2].Name,
          }),
        );
      setDropdownData(newData);
    } else if (side == 'AddLeft' || side == 'AddRight') {
      const newData =
        param?.prescriptionData?.prescriptionData?.Attributes[3].Attributes.map(
          ({ID, IsSelected, ...rest}) => ({
            ...rest,
            Text: ID,
            Id: param?.prescriptionData?.prescriptionData?.Attributes[3]
              .AttributeId,
            AttName:
              param?.prescriptionData?.prescriptionData?.Attributes[3].Name,
          }),
        );
      setDropdownData(newData);
    } else if (side == 'leftPrism' || side == 'rightPrism') {
      const newData =
        param?.prescriptionData?.prescriptionData?.PrismAttributes[0].Attributes.map(
          ({ID, IsSelected, ...rest}) => ({
            ...rest,
            Id: param?.prescriptionData?.prescriptionData?.PrismAttributes[0]
              .AttributeId,
            Title:
              param?.prescriptionData?.prescriptionData?.PrismAttributes[0]
                .Name,
            AttName:
              param?.prescriptionData?.prescriptionData?.PrismAttributes[0]
                .Name,
          }),
        );
      setDropdownData(newData);
    } else if (side == 'leftBase' || side == 'rightBase') {
      const newData =
        param?.prescriptionData?.prescriptionData?.PrismAttributes[1].Attributes.map(
          ({ID, IsSelected, ...rest}) => ({
            ...rest,
            // Text: ID,
            Id: param?.prescriptionData?.prescriptionData?.PrismAttributes[1]
              .AttributeId,
            Title:
              param?.prescriptionData?.prescriptionData?.PrismAttributes[1]
                .Name,
            AttName:
              param?.prescriptionData?.prescriptionData?.PrismAttributes[1]
                .Name,
          }),
        );
      setDropdownData(newData);
    } else if (side == 'PD') {
      const newData =
        param?.prescriptionData?.prescriptionData?.Attributes[4].Attributes.map(
          ({ID, IsSelected, ...rest}) => ({
            ...rest,
            Text: ID,
            Id: param?.prescriptionData?.prescriptionData?.Attributes[4]
              .AttributeId,
            AttName:
              param?.prescriptionData?.prescriptionData?.Attributes[4].Name,
          }),
        );
      setDropdownData(newData);
    } else if (side == 'DD') {
      setDropdownData(days);
    } else if (side == 'MM') {
      setDropdownData(months);
    } else if (side == 'YYYY') {
      setDropdownData(years);
      // dateValidation();
    }
    refRBSheet.current.open();
  };
  console.log('selectedDate------', selectedDay, selectedMonth, selectedYear);
  const LinksData = Globals.IsSelectPres || Globals.IsEditPres
    ? param.SelectedData3?.prescriptionData?.Links
    : param?.prescriptionData?.prescriptionData?.Links;
  const renderDropdownItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onSelectedValue(item)}
      style={{
        flex: 1,
        backgroundColor: '#e1e4e6',
        marginVertical: 3,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 16, color: 'black'}}>
        {selectedSide == 'DD' || selectedSide == 'MM' || selectedSide == 'YYYY'
          ? item
          : item.Value}
      </Text>
    </TouchableOpacity>
  );
  console.log('param?.item?.PrescriptionName==', param?.item?.PrescriptionName);
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <FgcHeader
          style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}
        />
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.view}>
          <View style={styles.prescriptionView}>
            <Text style={styles.prescriptionTxt}>Prescription name</Text>
            <View style={{paddingHorizontal: 10, flex: 0.8}}>
              <TextInput
                style={styles.prescriptionTxtinput}
                placeholder="Enter name.."
                placeholderTextColor={Colors.DarkGrey}
                value={prescriptionName}
                onChangeText={text => setPrescName(text)}
              />
            </View>
          </View>
          <View style={{paddingBottom: 20}}>
            <View style={{flex: 1, paddingVertical: 20, flexDirection: 'row'}}>
              <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <View style={styles.spareView}>
                  <Text style={styles.spareText}>Sphere</Text>
                </View>
              </View>
              <View style={styles.powerView}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text>Left</Text>
                  </View>
                  <View style={styles.leftSprBox}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('left')}
                      style={[
                        errorFrom === 'leftSphr' && IsError
                          ? styles.dateTouchRed
                          : styles.dateTouch,
                        ,
                        {width: wp('32%')},
                      ]}>
                      <Text style={styles.monthTxt}>
                        {leftSphr?.Value ? leftSphr?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Right</Text>
                  </View>
                  <View style={styles.rightSphrView}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('right')}
                      style={[
                        errorFrom === 'RightSphr' && IsError
                          ? styles.dateTouchRed
                          : styles.dateTouch,
                        {width: wp('32%')},
                      ]}>
                      <Text style={styles.monthTxt}>
                        {RightSphr?.Value ? RightSphr?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
              <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <View style={styles.spareView}>
                  <Text style={styles.spareText}>Cylinder</Text>
                </View>
              </View>
              <View style={styles.powerView}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('CylLeft')}
                      style={[styles.dateTouch, {width: wp('32%')}]}>
                      <Text style={styles.monthTxt}>
                        {LeftCyldr?.Value ? LeftCyldr?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('CylRight')}
                      style={[styles.dateTouch, {width: wp('32%')}]}>
                      <Text style={styles.monthTxt}>
                        {RightCyldr?.Value ? RightCyldr?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
              <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <View style={styles.spareView}>
                  <Text style={styles.spareText}>Axis</Text>
                </View>
              </View>
              <View style={styles.powerView}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('AxisLeft')}
                      style={[styles.dateTouch, {width: wp('32%')}]}>
                      <Text style={styles.monthTxt}>
                        {LeftAxis?.Value ? LeftAxis?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('AxisRight')}
                      style={[styles.dateTouch, {width: wp('32%')}]}>
                      <Text style={styles.monthTxt}>
                        {RightAxis?.Value ? RightAxis?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <View style={styles.spareView}>
                  <Text style={styles.spareText}>Add</Text>
                </View>
              </View>
              <View style={styles.powerView}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('AddLeft')}
                      style={[styles.dateTouch, {width: wp('32%')}]}>
                      <Text style={styles.monthTxt}>
                        {LeftAdd?.Value ? LeftAdd?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleOpenRBSheet('AddRight')}
                      style={[styles.dateTouch, {width: wp('32%')}]}>
                      <Text style={styles.monthTxt}>
                        {RightAdd?.Value ? RightAdd?.Value : '---'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 15, color: 'red'}}>{ErrorMsg}</Text>
          </View>

          {LinksData &&
            LinksData.map(item => {
              return (
                <View style={styles.lookView}>
                  <TouchableOpacity onPress={() => Linking.openURL(item.Value)}>
                    <Text style={styles.underlineTxt}>{item.Key}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}

          <View style={styles.prismView}>
            <Text style={styles.prismTxt}>
              Prism{' '}
              <Text style={styles.checkedTxt}>(check here to add Prism)</Text>
            </Text>
            <View style={{paddingVertical: 10}}>
              <CommonCheckBox
                imageSource={ImageUrl.UncheckRing}
                onToggle={() => setChecked(!checked)}
                isChecked={!checked}
                uncheckedImage={ImageUrl.CheckRing}
              />
            </View>
          </View>
          {checked && (
            <View style={{flex: 1}}>
              <View style={{flex: 1, paddingBottom: 20, flexDirection: 'row'}}>
                <View style={{flex: 2, justifyContent: 'flex-end'}}>
                  <View style={styles.spareView}>
                    <Text style={styles.spareText}>Right</Text>
                  </View>
                </View>
                <View style={styles.powerView}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        // flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                      }}>
                      <Text>Prism</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() => handleOpenRBSheet('rightPrism')}
                        style={[styles.dateTouch, {width: wp('32%')}]}>
                        <Text style={styles.monthTxt}>
                          {RightPrims?.Value ? RightPrims?.Value : '---'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>Base Direction</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => handleOpenRBSheet('rightBase')}
                        style={[styles.dateTouch, {width: wp('32%')}]}>
                        <Text style={styles.monthTxt}>
                          {RightBase?.Value ? RightBase?.Value : '---'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
                <View style={{flex: 2, justifyContent: 'flex-end'}}>
                  <View style={styles.spareView}>
                    <Text style={styles.spareText}>Left</Text>
                  </View>
                </View>
                <View style={styles.powerView}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() => handleOpenRBSheet('leftPrism')}
                        style={[styles.dateTouch, {width: wp('32%')}]}>
                        <Text style={styles.monthTxt}>
                          {LeftPrims?.Value ? LeftPrims?.Value : '---'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => handleOpenRBSheet('leftBase')}
                        style={[styles.dateTouch, {width: wp('32%')}]}>
                        <Text style={styles.monthTxt}>
                          {LeftBase?.Value ? LeftBase?.Value : '---'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.pupilView}>
            <Text style={styles.pupilTxt}> Pupil Distance (PD)</Text>
            <View style={styles.averageView}>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet('PD')}
                style={styles.touchable}>
                <Text style={styles.notsureTxt}>
                  {PD?.Value ? PD.Value : defaultSelectedPd}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
            <Text style={styles.dateTxt}>Date of Prescription</Text>
          </View>

          <View style={styles.dateView}>
            <View>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet('DD')}
                style={styles.dateTouch}>
                <Text style={styles.monthTxt}>
                  {selectedDay ? selectedDay : '--DD--'}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet('MM')}
                style={styles.dateTouch}>
                <Text style={styles.monthTxt}>
                  {selectedMonth ? selectedMonth : '--MM--'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet('YYYY')}
                style={styles.dateTouch}>
                <Text style={styles.monthTxt}>
                  {selectedYear ? selectedYear : '--YYYY--'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.uploadPrescription}>
            <Text style={styles.uploadTxt}>Upload Prescription</Text>
            <View style={styles.browseView}>
              <View>
                <TouchableOpacity
                  onPress={chooseFile}
                  style={styles.browseTouch}>
                  <Text style={styles.browseTxt}>Browse</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.ImgeView}>
                {selecteImage ? (
                  <>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        paddingRight: 5,
                      }}>
                      1 Selected File
                    </Text>
                    <Image
                      style={styles.selectedImg}
                      source={
                        selecteImage.type === 'application/pdf'
                          ? ImageUrl.Document
                          : {uri: selecteImage.uri}
                      }
                    />
                  </>
                ) : (
                  <Text style={styles.selectedTxt}> No File Selected</Text>
                )}
              </View>
            </View>

            <View style={styles.informView}>
              <Text style={styles.informationTxt}>More Information </Text>

              <View style={styles.inputTxt}>
                <TextInput
                  numberOfLines={5}
                  onChangeText={text => onChangeText(text)}
                  textAlignVertical="top"
                  multiline={true}
                  style={styles.input}
                  value={information}
                />
              </View>
              <View style={styles.btnView}>
                <Button
                  onPress={handleNext}
                  title={'Next'}
                  color={ErrorMsg ? Colors.newGrey : Colors.Black}
                  txtColor={ErrorMsg ? Colors.DarkGrey : Colors.White}
                  disable={ErrorMsg ? true : false}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
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
          data={dropdwonData}
          renderItem={renderDropdownItem}
          keyExtractor={item => `${item.ID}`}
        />
      </RBSheet>
    </View>
  );
};
export default GlassPrescription;
