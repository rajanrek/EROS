import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import styles from './styles';
import ImageUrl from '../../components/ImageUrl';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import SvgComponent from '../../utils/svgImages';
import Globals from '../../utils/constant';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
const GlassPresCard = ({item, handleSelectItem, handleDelete, handleEdit}) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };
  return (
    <View style={styles.mainGlassCardCoatinPres}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>
          {item.PrescriptionName}
        </Text>
      </View>
      <View style={{flex: 7}}>
        {/* <RenderHtml
          source={{
            html: item?.EyePrescriptionHtml,
          }}
          contentWidth={width}
          customHTMLElementModels={customHTMLElementModels}
        /> */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 9, alignItems: 'center'}}>
              {item?.LeftPrescription.map(innerItem => (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize: 14, fontWeight: '500'}}>
                    {innerItem.AttName}
                  </Text>
                </View>
              ))}
              {item?.PrismLeftPrescription?.length > 0 &&
                item?.PrismLeftPrescription.map(innerItem => (
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 14, fontWeight: '500'}}>
                      {innerItem.AttName}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          <View
            style={{
              flex: 6,
              flexDirection: 'row',
              // justifyContent: 'space-between',
            }}>
            {/* <View style={{flex: 1}}></View> */}
            <View style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontWeight: '600'}}>Left</Text>
              </View>
              {item?.LeftPrescription.map(innerItem => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Text style={{fontSize: 14}}>{innerItem.Value}</Text>
                </View>
              ))}
              {item?.PrismLeftPrescription?.length > 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 1,
                  }}>
                  <Text style={{fontSize: 14}}>
                    {item?.PrismLeftPrescription[0].Value}
                  </Text>
                </View>
              )}
              {item?.PrismRightPrescription?.length > 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 5,
                  }}>
                  <Text style={{fontSize: 14}}>
                    {item?.PrismRightPrescription[0].Value}
                  </Text>
                </View>
              )}
            </View>
            <View style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontWeight: '600'}}>Right</Text>
              </View>
              {item?.RightPrescription.map(innerItem => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Text style={{fontSize: 14}}>{innerItem.Value}</Text>
                </View>
              ))}
              {item?.PrismRightPrescription?.length > 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Text style={{fontSize: 14}}>
                    {item?.PrismLeftPrescription[1].Value}
                  </Text>
                </View>
              )}
              {item?.PrismRightPrescription?.length > 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 5,
                  }}>
                  <Text style={{fontSize: 14}}>
                    {item?.PrismRightPrescription[1].Value}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={()=>handleSelectItem(item)}
            style={{
              backgroundColor: Colors.Black,
              height: 50,
              width:150,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: Fonts.PoppinsBold,
                fontSize: 14,
                color: Colors.White,
              }}>
              Select
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={{
              // backgroundColor: Colors.Black,
              // paddingVertical: 12,
              height: 50,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Image
              style={{height: 23, width: 23, tintColor: Colors.Black, resizeMode:'contain'}}
              source={ImageUrl.Edit2}
            />
          </TouchableOpacity>
        </View>
        {item?.IsNamedPrescription && <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => handleDelete(item)}
            style={{
              // backgroundColor: Colors.Black,
              // paddingVertical: 12,
              height: 50,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Image
              style={{height: 25, width: 25, tintColor: Colors.Black, resizeMode:'contain'}}
              source={ImageUrl.Remove}
            />
          </TouchableOpacity>
        </View>}
       
      </View>
    </View>
  );
};

export default GlassPresCard;
