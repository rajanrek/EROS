import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import styles from './styles';
import ImageUrl from '../../components/ImageUrl';
import Card from '../../components/Card/card';
import Button from '../../components/Button/button';
import Banner from '../../components/Banner/banner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../components/Colors/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar/searchBar';
import {
  AddWishlist,
  getHomeScreen,
  getReorder,
} from '../../redux/action/actions';
import {useNavigation} from '@react-navigation/native';
import ConfigUrl from '../../ConfigUrl/configUrl';
import Global from '../../utils/Global';
import {getBasketTokenAction} from '../../redux/slices/loginUserSlice';

const HomeScreen = props => {
  const [discount, setDiscount] = useState(true);
  const {registerData} = useSelector(state => state.newuser.user);
  const {data} = useSelector(state => state.loginuser.user);
  const [manuName, setMenuName] = useState(null);
  const [basketNavigationStatus, setBasketNavigationStatus] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData;

  const postJson = {
    PageName: 'Home',
    CustomerId: apiData?.CustomerId,
  };

  const {homeScreenData, homeisLoading} = useSelector(
    state => state.homeScreen.homeScreenType,
  );
  console.log('homeScreenData===', homeScreenData);
  const {Reorder, reorderLoadingStatus, addWishlist} = useSelector(state => ({
    Reorder: state.reorderCall.ReorderData.ReorderScreenData,
    reorderLoadingStatus: state.reorderCall.ReorderData.reorderLoadingStatus,
    addWishlist: state.addWishlist.AddWishlist.addWishlist,
  }));

  const EndPoint =
    manuName === 'Contact Lens'
      ? 'contactlenses'
      : manuName === 'Solutions'
      ? 'Solutions'
      : manuName === 'Eye Care'
      ? 'eyecares'
      : manuName === 'Sunglasses'
      ? 'Sunglasses'
      : manuName === 'Glasses'
      ? 'EyeFrames'
      : manuName === 'Prescription Sunglasses'
      ? 'EyeFrames'
      : manuName === 'Clearance'
      ? 'Clearance'
      : null;
  const isfocused = navigation.isFocused();
  useEffect(() => {
    dispatch(getHomeScreen(postJson));
  }, []);
  useEffect(() => {
    dispatch(getHomeScreen(postJson));
  }, [addWishlist]);
  useEffect(() => {
    dispatch(getHomeScreen(postJson));
    console.log('isfocued on homescreen');
  }, [isfocused]);
  const LastOrder = {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    product: 'comfi Daily Disposable',
    price: '£8.80',
    duration: 'Daily',
  };

  const Banners = homeScreenData?.ResultData?.discoverFGCBanner;
  const BestSellerBanner = homeScreenData?.ResultData?.bestselleruLoveBanner;
  const BecauseLike = homeScreenData?.ResultData?.becauseYoulike;
  const lastOrderData = homeScreenData?.ResultData?.customerLastCLOrder[0];
  const ReferBanner = homeScreenData?.ResultData?.referaFriendBanner;
  const DiscountBanner = homeScreenData?.ResultData?.studentDiscountBanner;
  const isBrandSet = manuName === 'Contact Lens' ? null : 'allbrands';
  console.log('lastOrderData---', lastOrderData);
  const navigateToListing = (params, params2, params3, params4, param5) => {
    const types =
      params2 === 'Contact Lens'
        ? 'contactlenses'
        : params2 === 'Solutions'
        ? 'Solutions'
        : params2 === 'Eye Care'
        ? 'eyecares'
        : params2 === 'Sunglasses'
        ? 'Sunglasses'
        : params2 === 'Glasses'
        ? 'EyeFrames'
        : params2 === 'Prescription Sunglasses'
        ? 'EyeFrames'
        : params2 === 'Clearance'
        ? 'Clearance'
        : null;
    setMenuName(params);
    navigation.navigate('productScreen', {
      type: types,
      isSeeAll: params,
      isBrand: params2,
      manuName: params2,
      typeCat: params?.replace(/ /g, '-'),
      tabCategories: params3,
      mainType: params4,
      TabNames: params3,
      isBrand: params,
      selectedBrand: params,
      topBrands: param5,
    });
  };
  const navigateurl = () => {};
  useEffect(() => {
    if (reorderLoadingStatus == false && basketNavigationStatus == true) {
      Global.ReoderBasketId = Reorder?.ResultData?.BasketId;
      dispatch(getBasketTokenAction(Reorder?.ResultData?.BasketId));
      navigation.navigate('mybasket');
    }
  }, [reorderLoadingStatus]);

  function ReorderFun() {
    var postJson = {
      OrderId: lastOrderData?.OrderId,
      CampaignCodes: '',
      EditOrderItemId: 0,
      CustomerId: apiData?.CustomerId,
      EditProductId: 0,
    };
    dispatch(getReorder(postJson));
    setBasketNavigationStatus(true);
  }
  const handleWishlist = (item, selectedItem) => {
    // setLoading(false)
    if (selectedItem != null || item?.WishlistId != 0) {
      // setTriger(!trigger);
    }
    let wishlistJson = {
      CustomerId: apiData?.CustomerId,
      ProductId: item?.ID,
      IsDelete: item?.WishlistId != 0 ? false : true,
    };
    console.log('wishlistJson= in home==', wishlistJson);
    dispatch(AddWishlist(wishlistJson));
    navigation.navigate('Homescreen');
  };
  const handleCardPress = item => {
    navigation.navigate('detailsScreen', {
      ProductId: item?.ID,
      type: EndPoint,
      productTypeId: item.ProductTypeId,
    });
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <SafeAreaView style={styles.subView}>
        <SearchBar navigation={props.navigation} />
      </SafeAreaView>

      <View style={styles.shopView}>
        <Text style={styles.shopTxt}>Good Afternoon {apiData?.UserName}</Text>
      </View>

      <View style={[styles.shopView, {paddingVertical: 15}]}>
        {/* <View style={styles.discoverTxt}>
          <Text style={styles.lensTxt}>Discover FGC</Text>
        </View> */}
      </View>
      <View style={styles.commonView}>
        <FlatList
          data={Banners}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Banner navigateurl={navigateurl} item={item} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {lastOrderData && (
        <View style={{}}>
          <View style={styles.shopView}>
            <View style={styles.orderTxt}>
              <Text style={styles.lensTxt}>Your last order</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('myOrders')}
              style={styles.previousOrderView}>
              <Text style={styles.previousTxt}>More Orders</Text>
              <Image source={ImageUrl.Arrow} style={styles.arrowImg} />
            </TouchableOpacity>
          </View>

          <View style={styles.orderView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detailsScreen', {
                  ProductId: lastOrderData?.ProductId,
                })
              }
              style={styles.lenseImgView}>
              <Image
                style={styles.lenseImg}
                source={{uri: lastOrderData?.ThumbnailImage}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detailsScreen', {
                  ProductId: lastOrderData?.ProductId,
                })
              }
              style={styles.itemView}>
              <View>
                <Text style={styles.itemTitle}>
                  {lastOrderData?.ProductName}
                </Text>
              </View>
              <View style={styles.priceTextView}>
                {discount ? (
                  <Text style={styles.discountPrice}>
                    {lastOrderData?.DisplayNetPayable}
                  </Text>
                ) : null}
                <Text style={styles.price}>
                  {lastOrderData?.DisplayTotalOrderAmount}
                </Text>
              </View>

              <View>
                <Text style={styles.subTitle}>
                  Boxes : {lastOrderData.BoxesOrdered}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonView}>
            <Button
              title={'Reorder Your Lenses'}
              onPress={() => ReorderFun()}
              txtColor={Colors.White}
              color={Colors.Black}
            />
          </View>
        </View>
      )}
      <View style={styles.space}>
        <View style={styles.shopView}>
          <View style={styles.lenseTxtView}>
            <Text style={styles.lensTxt}>
              {' '}
              Must-Havest, Best Sellers & More
            </Text>
          </View>
        </View>
        <View style={styles.commonView}>
          <FlatList
            data={BestSellerBanner}
            renderItem={({item}) => (
              <View style={styles.brandTitle}>
                <TouchableOpacity>
                  <Image
                    source={{uri: item?.BannerImageUrl}}
                    style={styles.sellerImage}
                  />
                  {/* <Text style={styles.findTxt}>{item.GroupName}</Text> */}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>

      <View>
        <FlatList
          data={BecauseLike}
          renderItem={({item}) => (
            <View style={styles.sellerSubView}>
              <View style={styles.shopView}>
                <View style={styles.orderTxt}>
                  <Text style={styles.findTxt}>Because you like</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigateToListing(
                      'seeall',
                      item?.CategoryName,
                      item?.subProductType,
                      'first',
                      item?.topBrandModelList,
                    )
                  }
                  style={styles.previousOrderView}>
                  <Text style={styles.previousTxt}>See all</Text>
                  <Image source={ImageUrl.Arrow} style={styles.arrowImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.shopView}>
                <Text style={styles.glassTxt}>{item?.banners[0]?.Name}</Text>
              </View>

              <View style={styles.commonView}>
                <FlatList
                  data={item?.productResponse?.Products}
                  horizontal={true}
                  renderItem={({item}) => (
                    <Card
                      handleCardPress={handleCardPress}
                      handleWishlist={handleWishlist}
                      item={item}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
              <View style={[styles.shopView, {paddingVertical: 15}]}>
                <View style={styles.byView}>
                  <Text style={styles.lensTxt}>
                    Shop {item?.banners?.length > 0 && item?.banners[0].Name} by
                    Brands
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>  navigateToListing(
                    'seeall',
                    item?.CategoryName,
                    item?.subProductType,
                    'first',
                    item?.topBrandModelList,
                  )}
                  style={styles.previousOrderView}>
                  <Text style={styles.previousTxt}>See all</Text>
                  <Image source={ImageUrl.Arrow} style={styles.arrowImg} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={item?.topBrandModelList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <View style={styles.brandList}>
                    <View style={styles.brandTouch}>
                      <Image
                        resizeMode="contain"
                        style={styles.brandImg}
                        source={{uri: item?.BrandImage1}}
                      />
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
              <View style={styles.commonView}>
                <FlatList
                  data={item?.banners}
                  renderItem={({item}) => (
                    <View style={styles.brandTitle}>
                      <TouchableOpacity>
                        <Image
                          source={{uri: item?.ImageUrl}}
                          style={styles.sellerImage}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={{paddingVertical: 15, paddingHorizontal: 5}}>
        <View style={[styles.shopView]}>
          <Text style={styles.lensTxt}>Save with FGC</Text>
        </View>

        <View style={styles.commonView}>
          <View style={styles.brandTitle}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('fgcWebView', ConfigUrl.REFER_FRIEND)
              }>
              <Image
                style={styles.sellerImage}
                source={{uri: ReferBanner && ReferBanner[0]?.BannerImageUrl}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.commonView}>
          <View style={styles.brandTitle}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('studentDiscount')}>
              <Image
                style={styles.sellerImage}
                source={{
                  uri: DiscountBanner && DiscountBanner[0]?.BannerImageUrl,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={styles.thanksView}>
        <Image
          resizeMode="contain"
          style={styles.logoImg}
          source={ImageUrl.FgcLogo}
        />
        <Text style={styles.thanksTxt}>Thanks for being with us.</Text>
      </View> */}
    </ScrollView>
  );
};
export default HomeScreen;
