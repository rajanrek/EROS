import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageUrl from '../ImageUrl';
import styles from './styles';
import { Button } from 'react-native-paper';

const AddBasket = ({isDisabled, handleBasket, isDisabledStock, handleWishlist, mainData}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.btnView}>
      <View style={styles.btnSubView}>
        <TouchableOpacity
          onPress={handleBasket}
          disabled={isDisabled ? isDisabled : isDisabledStock}
          style={[isDisabled  || isDisabledStock ? styles.btnDisable : styles.btnTouchable]}>
          <Text style={styles.basketText}>
            {isDisabledStock ? 'Out of Stock' : 'Add to Basket'}
          </Text>
        </TouchableOpacity>

{/* <Button  title={'Add to Basket'} color={Colors.Black} txtColor={Colors.White} /> */}
      </View>
      <View style={styles.heartView}>
        <TouchableOpacity onPress={handleWishlist} style={styles.heartTouchable}>
          <Image
            resizeMode="contain"
            style={mainData?.WishlistId != null &&
              mainData?.WishlistId != '' &&
            mainData?.WishlistId > 0 ? styles.heartImgFav : styles.heartImg}
            source={mainData?.WishlistId != null &&
              mainData?.WishlistId != '' &&
            mainData?.WishlistId > 0 ? ImageUrl.favorite : ImageUrl.BlankHeart}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBasket;
