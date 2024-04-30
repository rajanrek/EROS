import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import Card from '../../components/Card/card';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {AddWishlist, getWishlist} from '../../redux/action/actions';
import {useNavigation} from '@react-navigation/native';
import SearchScreen from '../Search/search';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import {SkypeIndicator} from 'react-native-indicators';
import SearchBar from '../../components/SearchBar/searchBar';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';
import Button from '../../components/Button/button';
const Wishlist = () => {
  const {registerData} = useSelector(state => state.newuser.user);
  const {data} = useSelector(state => state.loginuser.user);
  const {wishlist, wishlistLoading} = useSelector(
    state => state.wishlist.wishlistData,
  );
  const {addWishlist, addwishlistLoading} = useSelector(
    state => state.addWishlist.AddWishlist,
  );
  const dispatch = useDispatch();
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  const postJson = {
    CustomerId: apiData?.CustomerId,
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (apiData?.CustomerId) {
      dispatch(getWishlist(postJson));
    }
  }, [addWishlist, handleWishlist]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getWishlist(postJson));

      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const handleCardPress = item => {
    navigation.navigate('detailsScreen', {id: item.ID});
  };
  const handleWishlist = item => {
    console.log('add wishlist ----', item);
    let wishlistJson = {
      CustomerId: apiData?.CustomerId,
      ProductId: item?.ID,
      IsDelete:
        item?.WishlistId != 0 || item?.WishlistId != null ? false : true,
    };
    dispatch(AddWishlist(wishlistJson));
  };

  const handleclearWishlist = () => {
    let wishlistJson = {
      CustomerId: apiData?.CustomerId,
      IsDelete: true,
    };
    dispatch(AddWishlist(wishlistJson));
  };


  const NoProductFound = () => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: '700'}}>No product found!</Text>
    </View>
  );
  const continueShopping = () => {
    navigation.navigate('shop');
  };
  return (
    <View style={styles.productView}>
      <SafeAreaView
        style={{
          height: Platform.OS === 'android' ? hp('7.5%') : hp('12.5%'),
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{paddingHorizontal: hp('1.3%')}}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansBold,
                fontSize: 20,
                color: Colors.Black,
              }}>
              My Wishlist
            </Text>
          </View>

       { wishlist?.ResultData?.length > 0 && 
         <View style={{flex: 2, alignItems: 'flex-end', paddingRight: 10}}>
            <TouchableOpacity
              style={{paddingBottom: 5}}
              onPress={() => handleclearWishlist()}>
              <Text
                style={{
                  fontFamily: Fonts.OpenSansBold,
                  fontSize: 14,
                  color: Colors.Black,
                  textDecorationColor: Colors.Black,
                  textDecorationLine: 'underline',
                }}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>}
        </View>
      </SafeAreaView>

      <View style={{flex: 1}}>
        <FlatList
          data={wishlist?.ResultData}
          numColumns={2}
          style={{marginVertical: 10}}
          showsVerticalScrollIndicator={false}
          //   onEndReached={
          //     isAPICall <= productData?.ProductCount ? handleLoadMore : null
          //   }
          ListEmptyComponent={() => <NoProductFound />}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <Card
              handleWishlist={handleWishlist}
              handleCardPress={handleCardPress}
              item={item}
            />
          )}
          keyExtractor={item => item.ID}
        />
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={continueShopping}
            title={'Continue Shopping'}
            color={Colors.Black}
            txtColor={Colors.White}
          />
        </View>
      </View>
      {wishlistLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};
export default Wishlist;
