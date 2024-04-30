import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import Colors from '../../components/Colors/colors';
import Button from '../../components/Button/button';
import {useNavigation} from '@react-navigation/native';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import ImageUrl from '../../components/ImageUrl';
import { useDispatch, useSelector } from 'react-redux';
import { SectionSeccond, SectionSeccondList } from '../../redux/action/actions';
import Globals from '../../utils/constant';
import {SkypeIndicator} from 'react-native-indicators';

const GlassesLense = props => {
  const [selectedSection, setSelectedSection] = useState('');
  const {firstSectionData,IsLoading } = useSelector(state => ({
    firstSectionData: state.chooseSection.chooseFirstSection.firstSectionData,
    IsLoading: state.chooseSection.chooseFirstSection.IsLoading,
    AddBasketData:state.addToBasket.addBasket.AddBasketData
  }));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const param = props.route.params;
  const handleCheckboxToggle = (id,checkbox)=> {
    Globals.selectedData2=checkbox
    if (id < 4) {
      dispatch(SectionSeccondList({ProductId:param.ProductId, CustomerId:param.apiData?.CustomerId}))
      setSelectedSection(prevSelectedSection =>
        prevSelectedSection === id ? '' : id,
      );
      
      navigation.navigate('SectionSecond',{ProductId:param.ProductId, selectedData1:param.selectedData1, SelectedData2:checkbox})
    }else{
      dispatch(SectionSeccond({ProductId: param.ProductId}));
      navigation.navigate('SectionThird',{ProductId:param.ProductId, selectedData1:param.selectedData1, SelectedData2:checkbox})

    } 
  
  };
 
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Choose your lenses'} />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
          <View style={styles.mainView}>
            <Text style={styles.headingTxt}>
              What will you see your glasses for?
            </Text>
            {firstSectionData?.ResultData?.map(checkbox => (
              <View
              key={checkbox.EyeGlassCategoryId}
              style={styles.checkboxContainer}>
              <View style={{flex: 2}}>
                <View style={styles.imageView}>
                  <Image
                    style={styles.imgs}
                    source={{uri: checkbox.ImageUrl1}}
                  />
                </View>
              </View>
              <View style={styles.checkboxSubView}>
                <Text style={styles.headingTxt}>{checkbox.EyeGlassCategory}</Text>
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
                  onToggle={() => handleCheckboxToggle(checkbox.EyeGlassCategoryId, checkbox)}
                  isChecked={selectedSection != checkbox.EyeGlassCategoryId}
                  uncheckedImage={ImageUrl.CheckRing}
                />
              </View>
            </View>
            ))}
          </View>
      </ScrollView>
      {IsLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};

export default GlassesLense;
