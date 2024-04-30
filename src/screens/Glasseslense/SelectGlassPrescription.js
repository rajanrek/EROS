import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import {useNavigation} from '@react-navigation/native';

import Globals from '../../utils/constant';
import GlassPresCard from './GlassPresCard';
import { useDispatch, useSelector } from 'react-redux';
import { SectionSeccond, deletePrescription, getPrescriptions } from '../../redux/action/actions';
import {SkypeIndicator} from 'react-native-indicators';

const SelectPrescription = props => {
  const param = props.route.params;
  const navigation = useNavigation();
  const {PrescriptionData, registerData, data, DeletePrescriptionData, PrescriptionisLoading} = useSelector(state => ({
      PrescriptionData: state.savedPrescription.Prescription.PrescriptionData,
      PrescriptionisLoading: state.savedPrescription.Prescription.PrescriptionisLoading,
      registerData: state.newuser.user.registerData,
      data: state.loginuser.user.data,
      DeletePrescriptionData: state.deletePres.DeletePrescription.DeletePrescriptionData,
  }));

  const dispatch = useDispatch();

  const handleCheckboxToggle = (id, item) => {

      props.navigation.navigate('glassBasket', {
        ProductId:param.ProductId,
        pkgData: item,
        lastParams: param,
        packages:item,
      from:'forth'

      });
  };
  const apiData = registerData
  ? registerData?.ResultData?.loginResponse
  : data?.ResultData?.loginResponse
  ? data?.ResultData?.loginResponse
  : data?.ResultData;


 const handleSelectItem = (item)=>{
  Globals.IsSelectPres =true

  dispatch(SectionSeccond({ProductId: param.ProductId}));

  navigation.navigate('SectionThird', {
    ProductId: param.ProductId,
    prescriptionData: item,
    
  });
  }
  useEffect(()=>{
    dispatch(getPrescriptions({CustomerId:apiData?.CustomerId}))

  },[DeletePrescriptionData])

  const handleDelete =(item)=>{
console.log("delete item", item)
dispatch(deletePrescription({CustomerId:apiData?.CustomerId, PrescriptionId:item?.PrescriptionId}))
  }
  const handleEdit =(item)=>{
  Globals.IsEditPres =true
    dispatch(SectionSeccond({ProductId: param.ProductId}));
    navigation.navigate('glassPrescription', {
      ProductId: param.ProductId,
      item: item,
      prescriptionData: param,
    });
  }
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Choose your Prescription'} />
      </SafeAreaView>

        <View style={{flex: 1, paddingHorizontal: hp('0.5%'), justifyContent:'center', alignItems:'center'}}>
          {/* <View style={{paddingBottom: 20}}>
            <Text style={styles.headingTxt}>
              Choose your Prescription
            </Text>
          </View> */}
          <FlatList
            data={PrescriptionData?.ResultData}
            showsHorizontalScrollIndicator={false}
            style={{flex: 1}}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <GlassPresCard
                  handleCheckboxToggle={handleCheckboxToggle}
                  handleSelectItem={handleSelectItem}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  item={item}
                />
              );
            }}
            keyExtractor={item => item.EyeGlassCategoryId}
          />
        </View>
        {PrescriptionisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};

export default SelectPrescription;
