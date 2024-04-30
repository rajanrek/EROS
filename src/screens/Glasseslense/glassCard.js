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

const GlassCard = ({
  item,
  handleMoreInforToggle,
  handleCheckboxToggle,
  pkg,
  buttonView,
  selectedSection,
  isFree,
  from,
}) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const {width} = useWindowDimensions();
  return (
    <View
      style={
        selectedSection == item.EyeGlassPackageId
          ? styles.mainGlassCardSelected
          : from ==='last' ? styles.mainGlassCard : styles.mainGlassCardCoatin
      }>
      <View
        style={{
          flex: 3,
        }}>
        {!item.ImageUrl1 && (
          <View
            style={{
              flex: 1,
              paddingVertical: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#97c8f0',
            }}>
            {Globals._recommended.includes(
              item?.EyeGlassPackageId?.toString(),
            ) && (
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.White,
                  fontWeight: '700',
                }}>
                Recommended
              </Text>
            )}
            <Text
              style={{
                fontSize: 18,
                color: Colors.Black,
                fontWeight: '700',
              }}>
              {item.EyeGlassType}
            </Text>
          </View>
        )}
        {pkg && (
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#97c8f0',
              backgroundColor: Globals._recommended.includes(
                item?.EyeGlassPackageId?.toString(),
              )
                ? '#09a7eb'
                : '#74868B',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            {Globals._recommended.includes(
              item?.EyeGlassPackageId?.toString(),
            ) && (
              <Text
                style={{
                  fontSize: 18,
                  color: 'yellow',
                  fontWeight: '700',
                }}>
               Recommended
              </Text>
            )}
            <Text
              style={{
                fontSize: 18,
                color: Colors.White,
                fontWeight: '700',
                paddingBottom: 15,
              }}>
              {item.PackageName}
            </Text>
          </View>
        )}
        <View style={pkg ? styles.ImgWrapper2 : styles.ImgWrapper}>
          <View style={pkg ? styles.cardImgView2 : styles.cardImgView}>
            {item.ImageUrl1.includes('.svg') ? (
              <SvgComponent uri={item.ImageUrl1} />
            ) : (
              <Image
                style={pkg ? styles.cardImg2 : styles.cardImg}
                source={{uri: item.ImageUrl1}}
              />
            )}

            {/* <Text style={{fontSize: 11, fontWeight: '600'}}>
              {item?.AttributeNames?.length > 0 && item?.AttributeNames[0].Name}
            </Text> */}
          </View>
          {/* <Image style={styles.shadowimg} source={ImageUrl.ShadowImg} /> */}
        </View>
      </View>
      {!pkg && (
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontFamily: Fonts.OpenSansBold,
              fontSize: 14,
              color: '#6E6E6E',
              textAlign: 'center',
            }}>
            {item.Description}
          </Text>
        </View>
      )}

      <View
        style={{
          flex: 7,
          paddingBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 7,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 35,
          }}>
          <FlatList
            data={item.AttributeNames}
            style={{flex: 1, paddingTop: 25}}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}>
                  {item.IconUrl && (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Image
                        height={22}
                        width={22}
                        source={{uri: item.IconUrl}}
                      />
                    </View>
                  )}

                  <View style={{paddingLeft: 10, paddingRight: 5}}>
                    <Text style={{fontSize: 13, color: 'black'}}>
                      {item.Name}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
        {item.Description &&(
       from === 'last'  && <View>
          <TouchableOpacity onPress={() => handleMoreInforToggle(item.Description, item)}>
            <Text style={{
              fontFamily: Fonts.OpenSansBold,
              fontSize: 14,
              color:'black',
              textAlign: 'center',
              textDecorationLine: 'underline',
              textDecorationColor: 'black',
            }}>
              More Info
            </Text>
          </TouchableOpacity>
        </View>)}
        <View
          style={{
            flex: pkg ? 1 : 2,
            paddingVertical: 10,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          {from === 'forth' ? (
            <Text
              style={{
                fontSize: 24,
                color: Colors.Black,
                fontWeight: '700',
              }}>
              {item.UnitPriceText}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 24,
                color: Colors.Black,
                fontWeight: '700',
              }}>
              {item?.EyeGlassPackageId == 1 || isFree == item.EyeGlassPackageId
                ? 'Free'
                : item.UnitPriceText}
            </Text>
          )}
        </View>

        {!pkg ? (
          <TouchableOpacity
            onPress={() => handleCheckboxToggle(item.EyeGlassTypeId, item)}
            style={{
              backgroundColor: Colors.Black,
              paddingVertical: 12,
              paddingHorizontal: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: Fonts.PoppinsBold,
                fontSize: 12,
                color: Colors.White,
              }}>
              Select
            </Text>
          </TouchableOpacity>
        ) : (
          buttonView
        )}
      </View>
    </View>
  );
};

export default GlassCard;
