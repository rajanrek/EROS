import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import ImageUrl from '../ImageUrl';
import styles from './styles';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import RBSheet from 'react-native-raw-bottom-sheet';
import Otp from '../../screens/Otp/otp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../Colors/colors';
import Edit from '../Edit/edit';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const BasketCard = ({
  item,
  handleUpdate,
  ReduceBasketItem,
  HandleEdit,
  ProductDetail,
}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [detail, setDetail] = useState(false);
  const [glassDetail, setGlassDetail] = useState(false);
  const [num, setNum] = useState(false);
  const refRBSheet = useRef();
  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: Colors.Green,
    },
    a: {
      color: 'black',
    },
  };

  const tagsStyle = {
    body: {
      whiteSpace: 'normal',
      color: Colors.Black,
    },
    a: {
      color: 'black',
    },
  };

  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const RenderTitle = () => {
    return (
      <View style={{width: hp('30')}}>
        <RenderHtml
          contentWidth={width}
          customHTMLElementModels={customHTMLElementModels}
          source={{html: item?.GlassPrescriptionHtml}}
          tagsStyles={tagsStyle}
        />
      </View>
    );
  };

  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleLenseEdit = id => {
    HandleEdit(id);
    navigation.navigate('lenseEdit', {item});
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('detailsScreen', {
              ProductId: item?.ProductID,
            })
          }
          style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={{height: 75, width: 84}}
            source={{uri: item?.ImagePath}}
          />
        </TouchableOpacity>

        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('detailsScreen', {
                ProductId: item?.ProductID,
              })
            }>
            <Text style={styles.productTitle}>{item?.ProductName}</Text>
          </TouchableOpacity>
          {item?.ProductTypeId == 1 && (
            <View style={styles.arrowView}>
              <Text style={styles.subTitleView}>
                {item?.ItemAttributes?.length && item?.ItemAttributes[0]?.Value}{' '}
                {item?.ItemAttributes?.length && item?.ItemAttributes[0]?.Name}{' '}
                Details
              </Text>
              {detail == false ? (
                <TouchableOpacity
                  onPress={() => setDetail(true)}
                  style={styles.arrow}>
                  <Image
                    resizeMode="contain"
                    style={styles.arrowImg}
                    source={ImageUrl.DownArrow}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setDetail(false)}
                  style={styles.arrow}>
                  <Image
                    resizeMode="contain"
                    style={styles.arrowImg}
                    source={ImageUrl.BlackArrow}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {item?.ProductTypeId == 7 && item?.GlassPrescriptionHtml && (
            <View style={styles.polygonView}>
              <View style={styles.polygonSubView}>
                <Text style={styles.polysubTitleView}>Lenses Details</Text>
                {glassDetail == false ? (
                  <TouchableOpacity
                    onPress={() => setGlassDetail(true)}
                    style={styles.arrow}>
                    <Image
                      resizeMode="contain"
                      style={styles.arrowImg}
                      source={ImageUrl.Polygon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setGlassDetail(false)}
                    style={styles.arrow}>
                    <Image
                      resizeMode="contain"
                      style={styles.arrowImg}
                      source={ImageUrl.Polygon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          {glassDetail && RenderTitle()}

          {detail == true ? (
            <View>
              <Text style={styles.powerTxt}>
                {item?.ItemAttributes?.length && item?.ItemAttributes[1]?.Name}{' '}
                :{' '}
                <Text style={styles.numberTxt}>
                  {' '}
                  {item?.ItemAttributes?.length &&
                    item?.ItemAttributes[1]?.Value}
                </Text>
              </Text>
              <Text style={styles.powerTxt}>
                {item?.ItemAttributes?.length && item?.ItemAttributes[2]?.Name}{' '}
                :{' '}
                <Text style={styles.numberTxt}>
                  {' '}
                  {item?.ItemAttributes?.length &&
                    item?.ItemAttributes[2]?.Value}
                </Text>
              </Text>
              <Text style={styles.powerTxt}>
                {item?.ItemAttributes?.length && item?.ItemAttributes[3]?.Name}{' '}
                :{' '}
                <Text style={styles.numberTxt}>
                  {' '}
                  {item?.ItemAttributes?.length &&
                    item?.ItemAttributes[3]?.Value}
                </Text>
              </Text>
            </View>
          ) : null}

          {!item?.GlassPrescriptionHtml && (
            <View style={styles.iconView}>
              <TouchableOpacity
                // disabled = {num <= 1}
                style={{justifyContent: 'center', alignItems: 'center'}}
                //  onPress={() => setNum(num-1)}
                onPress={() => handleUpdate(item, 0)}>
                <Image style={styles.iconImg} source={ImageUrl.Minus} />
              </TouchableOpacity>
              <Text style={styles.boxTxt}> {item?.DisplayQuantityText} </Text>

              <TouchableOpacity onPress={() => handleUpdate(item, 1)}>
                <Image style={styles.iconImg} source={ImageUrl.Plus} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.editView}>
          {item?.ProductTypeId == 1 && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  handleLenseEdit(item?.ProductID);
                  //  HandleEdit(item?.ProductID)
                }}
                style={styles.editBtn}>
                <Text style={styles.editTxt}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.priceView}>
            <Text style={styles.priceTxt}>
              {item?.TotalPrice == 0 ? 'Free' : item?.TotalPriceText}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => ReduceBasketItem(item)}
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingVertical: 8,
              }}>
              <Image
                style={{height: 20, width: 20, resizeMode: 'contain'}}
                source={ImageUrl.Bin}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.deliveryView}>
        <RenderHtml
          contentWidth={width}
          customHTMLElementModels={customHTMLElementModels}
          source={{html: item?.ItemEstimatedDeliveryLabel}}
          tagsStyles={tagsStyle}
        />
        <View style={styles.renderTxt}>
          <RenderHtml
            contentWidth={width}
            customHTMLElementModels={customHTMLElementModels}
            source={{html: item?.ItemEstimatedDeliveryText}}
            tagsStyles={tagsStyles}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={hp('56%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <Edit
          ProductDetail={ProductDetail}
          item={item?.ItemAttributes}
          onClose={handleCloseRBSheet}
        />
      </RBSheet>
    </View>
  );
};

export default BasketCard;
