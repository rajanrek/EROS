import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import ImageUrl from '../ImageUrl';
import styles from './styles';
import Card from '../Card/card';
import CheckBox from '@react-native-community/checkbox';
import GlassesLense from '../../screens/Glasseslense/glassesLense';
import {useNavigation} from '@react-navigation/native';
import {SectionOne} from '../../redux/action/actions';
import {useDispatch} from 'react-redux';
import Globals from '../../utils/constant';
import CommonCheckBox from '../commonCheckbox/commonCheckbox';

const GlassDetail = ({
  data,
  handleCardPress,
  sizeInfo,
  handleSizePress,
  apiData,
  handleBasket,
  handleWishlist,
  from
}) => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedItem =
    selectedPackageIndex !== null
      ? data?.Packages?.length && data?.Packages[selectedPackageIndex]
      : null;
  const handleLense = () => {
    Globals.selectedData1 = data;
    dispatch(SectionOne());
    navigation.navigate('glassesLense', {
      ProductId: data.ProductId,
      apiData,
      selectedData1: data,
    });
  };

  return (
    <View style={styles.mainContainer}>
      {data?.ProductTypeId === 5 || data?.ProductTypeId === 7  ? (
        <>
          <View style={styles.subContainer}>
            <View style={styles.sizeView}>
              <View style={styles.sizeSubView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.sizeTxt}>Size</Text>
                  <FlatList
                    data={sizeInfo}
                    renderItem={items => {
                      return (
                        <View style={styles.mainMeasurInner}>
                          <View style={styles.MeasorViewInner}>
                            <Image
                              source={{uri: items?.item?.Img}}
                              style={styles.measerImg}
                            />
                          </View>
                        </View>
                      );
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                  />
                </View>
              </View>
              {data?.Packages?.map((item, index) => (
                <View style={styles.sizeImageView}>
                  <View style={styles.imageView}>
                    {/* <CheckBox
                      disabled={data?.Packages?.length <= 1 ? true : false}
                      tintColors="black"
                      onCheckColor="black"
                      tintColor="black"
                      onTintColor="black"
                      style={styles.checkboxStyle}
                      value={index === selectedPackageIndex}
                      onValueChange={() => {
                        handleSizePress(item);
                        setSelectedPackageIndex(index);
                      }}
                    /> */}

                    <CommonCheckBox
                      imageSource={ImageUrl.UncheckRing}
                      onToggle={() => {
                        handleSizePress(item);
                        setSelectedPackageIndex(index);
                      }}
                      isChecked={
                        index != selectedPackageIndex
                      }
                      uncheckedImage={ImageUrl.CheckRing}
                    />
                  </View>
                  <View style={styles.txtView}>
                    <Text style={styles.Txt}>{item.LensText}</Text>
                    <Text style={styles.Txt}>{item.BridgeText}</Text>
                    <Text style={styles.Txt}>{item.ArmText}</Text>
                    <Text style={styles.Txt}>{item.TotalFrameWidthText}</Text>
                    <Text style={styles.Txt}>{item.FrameDepthText}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.otherView}>
              <Text style={styles.otherTxt}>Other colors</Text>
            </View>
          </View>
          <View style={styles.flatlistView}>
            <FlatList
              data={data?.ProductTypeId === 5 ? data?.SunglassProducts?.LensColors:data?.SunglassProducts?.SimilarProducts}
              horizontal={true}
              renderItem={({item}) => (
                <Card from={from} handleWishlist ={handleWishlist} handleCardPress={handleCardPress} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </>
      ):null}
      {data?.ProductCategoryName?.toLowerCase() === 'eye frames' &&
        data.IsInStock && (
          <View style={styles.btnView}>
            <TouchableOpacity onPress={handleLense} style={styles.btnTouchable}>
              <Text style={styles.lenseTxt}>Choose your lenses</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBasket} style={styles.frameTouch}>
              <Text style={styles.frameTxt}>Buy frame only</Text>
            </TouchableOpacity>
          </View>
        )}
      <View style={styles.uspView}>
        {data?.ShortSpecifications?.map((item, index) => {
          return (
            <Text style={styles.uspTxt}>
              USP {index + 1}: {item}.{' '}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default GlassDetail;
