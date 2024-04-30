import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageUrl from '../ImageUrl';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import Fonts from '../CustomsFonts/customFonts';
import Colors from '../Colors/colors';
import StarRatingDisplay from 'react-native-star-rating-widget';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Card = ({item, handleCardPress, handleWishlist, index, from}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  let CategoryType = item?.ProductCategoryDetails;
  if (CategoryType?.endsWith('|')) {
    if(CategoryType.includes('&amp')){
      const modifiedString = CategoryType.replace(/&amp;/g, '');
      CategoryType = modifiedString;

    }
    CategoryType = CategoryType?.slice(0, -1);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 2, flexDirection: 'row'}}>
        {item?.OfferMsg && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{backgroundColor: Colors.Red, paddingHorizontal: 5}}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.OpenSansBold,
                  color: Colors.White,
                }}>
                {item?.OfferMsg}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {from != 'details' && (
          <View style={styles.heartView}>
            {(item?.WishlistId === selectedItem &&
              item?.WishlistId != null &&
              item?.WishlistId != '') ||
            item?.WishlistId > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  handleWishlist && handleWishlist(item, selectedItem), index;
                  setSelectedItem(null); // Unselect the item
                }}>
                <Image style={styles.heartImg} source={ImageUrl.Wishlist} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleWishlist && handleWishlist(item, selectedItem, index);
                  setSelectedItem(item?.WishlistId);
                }}>
                <Image style={styles.heartImg} source={ImageUrl.Heart} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          handleCardPress && handleCardPress(item);
        }}
        style={{flex: 8}}>
        <View style={styles.glassView}>
          {Platform.OS === 'ios' && Platform.Version <= '13' ? (
            <Image
              style={styles.glassImg}
              source={{uri: item?.ImageUrl ? item?.ImageUrl : item?.Img}}
            />
          ) : (
            <FastImage
              style={styles.glassImg}
              source={{uri: item?.ImageUrl ? item?.ImageUrl : item?.Img}}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        
        </View>

      { item?.ReviewsText && (       
        <View style={styles.starSubView}>
            <StarRatingDisplay
              rating={item?.Rating}
              color="black"
              starSize={hp('1.8%')}
              onChange={() => null}
starStyle={{borderWidth:0,marginHorizontal:1}}
            />
            <Text style={styles.numTxt}>{item?.ReviewsText}</Text>
          </View>
          )}
          
        <View style={styles.titleView}>
          <View style={{flex: 1}}>
            {item?.ProductTypeId === 5 || item?.ProductTypeId === 7 ? (
              <Text style={styles.title}>{item?.BrandName}</Text>
            ) : null}
            <Text
              style={[
                item?.ProductTypeId === 5 || item?.ProductTypeId === 7
                  ? styles.subTitle
                  : styles.title,
              ]}>
              {item?.Name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 3,
            }}>
            {item?.StrikePrice ? (
              <Text style={styles.discountPrice}>{item?.StrikePrice}</Text>
            ) : null}
            <Text style={item?.StrikePrice ? styles.price : styles.MainPrice}>
              {item?.PriceText}
            </Text>
          </View>
          {CategoryType && (
            <View style={{paddingBottom: 5}}>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: Fonts.OpenSansBold,
                  color: Colors.Black,
                }}>
                {CategoryType}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
