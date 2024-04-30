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
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import ImageUrl from '../../components/ImageUrl';
import Button from '../../components/Button/button';
import Colors from '../../components/Colors/colors';
import GlassCard from './glassCard';
import RBSheet from 'react-native-raw-bottom-sheet';
import Globals from '../../utils/constant';
import { getPackages } from '../glassPrescription/PrescriptionError';

const ForthSection = props => {
  const [selectedSection4, setSelectedSection4] = useState('');
  const [SelectedPackage, setSelectedPackage] = useState('');
  const [selectedBtn, setSelectedBtn] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [SelectedColor, setSelectedColor] = useState('');
  const [packages, setPackage]=useState('')
  const [excluded, setExcluded]=useState('')

  const param = props.route.params;
  const navigation = useNavigation();
  const refRBSheet = useRef();

useEffect(()=>{
  if(param.item?.Children != null){
    setPackage(param.item)
  }
},[])
  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };
  const handleOpenRBSheet = () => {
    refRBSheet.current.open();
  };
  const handleCheckboxToggle = (id, item) => {
   
    setPackage(item)
    getPackages(item, Globals.sendLater)

    if(item.Children == null){
      props.navigation.navigate('glassBasket', {
        ProductId:param.ProductId,
        pkgData: item,
        lastParams: param,
        packages:item,
      from:'forth'

      });
    }else{
      handleOpenRBSheet();
      console.log('selected item----', item);
      setSelectedData(item);
      setSelectedSection4(prevSelectedSection =>
        prevSelectedSection === id ? '' : id,
      );
    }
    
  };
  const handleCheckboxToggleColor = (id, checkbox) => {
    setSelectedColor(checkbox);

    setSelectedPackage(prevSelectedSection =>
      prevSelectedSection === id ? '' : id,
    );
    console.log('selected color--', SelectedPackage, checkbox);
    if(checkbox.RecomendedPackageId != null ){
      setPackage(checkbox)
      getPackages(checkbox, Globals.sendLater)

    }
    getPackages(packages, Globals.sendLater)

    props.navigation.navigate('glassBasket', {
      ProductId:param.ProductId,
      colorData: checkbox,
      pkgData: selectedData,
      lastParams: param,
      packages:packages,
      from:'forth'
    });
    handleCloseRBSheet();
  };
  const handleBtn = param => {
    setSelectedBtn(param);
    setSelectedValue(param);
  };
  console.log('SelectedColor- param--', param);
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Choose your lenses'} />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          {/* <GlassCard /> */}
        </View>
        <View style={styles.mainView}>
          <View style={{paddingBottom: 20}}>
            <Text style={styles.headingTxt}>
              Choose your package and coating
            </Text>
          </View>
          <FlatList
            data={param?.item?.Children}
            showsHorizontalScrollIndicator={false}
            style={{flex: 1, paddingVertical: 20}}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <GlassCard
                  handleCheckboxToggle={handleCheckboxToggle}
                  item={item}
                  pkg={false}
                  selectedSection=""
                  from='forth'
                />
              );
            }}
            keyExtractor={item => item.EyeGlassCategoryId}
          />
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        openDuration={300}
        height={700}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            flex: 1,
            backgroundColor: Colors.LightWhite,
            justifyContent: 'flex-start',
            height: 2000,
            backgroundColor: Colors.Common,
          },
        }}>
        <View style={{flex: 1, backgroundColor: Colors.White}}>
          <View
            style={{
              backgroundColor: Colors.Common,
              paddingBottom: 25,
              paddingHorizontal: 15,
            }}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>Select Colour</Text>
          </View>
          <FlatList
            data={selectedData?.Children}
            numColumns={2}
            renderItem={({item}) => {
              return (
                <Pressable
                  style={{
                    flex: 0.5,
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                  }}>
                  <View
                    key={item.EyeGlassTypeId}
                    style={styles.checkboxContainerColors}>
                    <View style={{flex: 2}}>
                      <View style={styles.imageView}>
                        {item.ImageUrl1 && (
                          <Image
                            style={styles.colorImg}
                            source={{uri: item.ImageUrl1}}
                          />
                        )}
                      </View>
                    </View>
                    <View style={styles.checkboxSubView}>
                      <Text style={styles.headingTxt}>{item.EyeGlassType}</Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <CommonCheckBox
                        imageSource={ImageUrl.UncheckRing}
                        onToggle={() =>
                          handleCheckboxToggleColor(item.EyeGlassTypeId, item)
                        }
                        isChecked={SelectedPackage != item.EyeGlassTypeId}
                        uncheckedImage={ImageUrl.CheckRing}
                      />
                    </View>
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={item => item.EyeGlassCategoryId}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default ForthSection;
