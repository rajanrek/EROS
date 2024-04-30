import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import {useNavigation} from '@react-navigation/native';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import ImageUrl from '../../components/ImageUrl';
import {useDispatch, useSelector} from 'react-redux';
import {SectionSeccond, getPrescriptions} from '../../redux/action/actions';
import Globals from '../../utils/constant';
import RBSheet from 'react-native-raw-bottom-sheet';
import Colors from '../../components/Colors/colors';
import {SkypeIndicator} from 'react-native-indicators';

const SecondSection = props => {
  const [selectedSection2, setSelectedSection2] = useState(false);
  const [selectedSection3, setSelectedSection3] = useState(false);
  const navigation = useNavigation();
  const param = props.route.params;
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  const {SecondListSectionData, data, registerData, IsLoading} = useSelector(state => ({
    SecondListSectionData:
      state.secondList.SecondListSection.SecondListSectionData,
      IsLoading:
      state.secondList.SecondListSection.IsLoading,
      registerData: state.newuser.user.registerData,
      data: state.loginuser.user.data,
  }));
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  const dummyData = [
    {
      id: 1,
      Description: 'I would like to enter my prescription now',
      ImageUrl:
        'https://static.lensgroup.co/eyeframes/frame-icons/enter-prescription.png',
      SendLater: false,
      Title: 'Enter now',
    },
    {
      id: 2,
      Description: 'I would like to enter my prescription now222222',
      ImageUrl:
        'https://static.lensgroup.co/eyeframes/frame-icons/enter-prescription.png',
      SendLater: false,
      Title: 'Enter now2',
    },
    {
      id: 3,
      Description: 'I would like to enter my prescription now333',
      ImageUrl:
        'https://static.lensgroup.co/eyeframes/frame-icons/enter-prescription.png',
      SendLater: false,
      Title: 'Enter now',
    },
    {
      id: 4,
      Description: 'I would like to enter my prescription now44444',
      ImageUrl:
        'https://static.lensgroup.co/eyeframes/frame-icons/enter-prescription.png',
      SendLater: false,
      Title: 'Enter now2',
    },
    {
      id: 5,
      Description: 'I would like to enter my prescription now555555',
      ImageUrl:
        'https://static.lensgroup.co/eyeframes/frame-icons/enter-prescription.png',
      SendLater: false,
      Title: 'Enter now',
    },
    {
      id: 6,
      Description: 'I would like to enter my prescription now26666666',
      ImageUrl:
        'https://static.lensgroup.co/eyeframes/frame-icons/send-later.png',
      SendLater: false,
      Title: 'Enter now2',
    },
   
   
  ];

  const handleCheckboxToggle = (id, title) => {
    if (id == 2) {
      Globals.sendLater = true;
    } else {
      Globals.sendLater = false;
    }
    setSelectedSection2(prevSelectedSection =>
      prevSelectedSection === id ? '' : id,
    );
    if (title === 'Send later') {
      Globals.IsSelectPres=false
      dispatch(SectionSeccond({ProductId: param.ProductId}));
      navigation.navigate('SectionThird', {
        ProductId: param.ProductId,
        SelectedData3: param,
      });
    }
    let prescriptionData={
      prescriptionData:SecondListSectionData?.ResultData,
    }
    if (title === "Enter now") {
      Globals.IsSelectPres=false
      // refRBSheet.current.open();
      dispatch(SectionSeccond({ProductId: param.ProductId}));
      navigation.navigate('glassPrescription', {
        ProductId: param.ProductId,
        prescriptionData: prescriptionData,
        SelectedData3: param,
      });
    }
    if(title === "Select prescription"){
      dispatch(getPrescriptions({CustomerId:apiData?.CustomerId}))
      navigation.navigate('SelectPrescription', {
        ProductId: param.ProductId,
        prescriptionData: SecondListSectionData?.ResultData,
        SelectedData3: param,
        dummyData:dummyData
      });
    }
  };

  useEffect(() => {
    if (selectedSection3) {
      refRBSheet.current.open();
    }
  }, [selectedSection3]);
  
 
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Choose your lenses'} />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainView}>
          <Text style={styles.headingTxt}>Your Glasses Prescription</Text>
          {/* <View style={styles.checkboxContainer}>
            <View style={{flex: 2}}>
              <View style={styles.imageView}>
                <Image
                  style={[styles.imgs]}
                  source={{
                    uri: 'https://static.lensgroup.co/eyeframes/frame-icons/send-later.png',
                  }}
                />
              </View>
            </View>
            <View style={styles.checkboxSubView}>
              <Text style={styles.headingTxt}>Select Prescription</Text>
              <View style={{paddingTop: 10}}>
                <Text style={styles.subTxt}>
                  I would like to Select Prescription
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <CommonCheckBox
                imageSource={ImageUrl.CheckRing}
                onToggle={() => handleCheckboxToggle()}
                isChecked={selectedSection3}
                uncheckedImage={ImageUrl.UncheckRing}
              />
            </View>
          </View> */}
          {SecondListSectionData?.ResultData?.PrescriptionTypes?.map(
            (checkbox, index) => (
              <View key={checkbox.id} style={styles.checkboxContainer}>
                <View style={{flex: 2}}>
                  <View style={styles.imageView}>
                    <Image
                      style={[styles.imgs]}
                      source={{uri: checkbox.ImageUrl}}
                    />
                  </View>
                </View>
                <View style={styles.checkboxSubView}>
                  <Text style={styles.headingTxt}>{checkbox.Title}</Text>
                  <View style={{paddingTop: 10}}>
                    <Text style={styles.subTxt}>{checkbox.Description}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <CommonCheckBox
                    imageSource={ImageUrl.UncheckRing}
                    onToggle={() => handleCheckboxToggle(index, checkbox.Title)}
                    isChecked={selectedSection2 !== index}
                    uncheckedImage={ImageUrl.CheckRing}
                  />
                </View>
              </View>
            ),
          )}
         
        </View>
      </ScrollView>
      {IsLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
      <RBSheet
        ref={refRBSheet}
        height={hp('55%')}
        openDuration={250}
        onClose={() => setSelectedSection3(false)}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <View style={{flex: 1, paddingBottom:20}}>
          <FlatList
            data={dummyData}
            // onEndReached={()=>handleEndReached()}
            style={{paddingHorizontal: 10}}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View height={4} />}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => refRBSheet.current.close()}
                style={{
                  flex: 1,
                  backgroundColor: 'grey',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius:8
                }}>
                <Text>render list here {item.Title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default SecondSection;
