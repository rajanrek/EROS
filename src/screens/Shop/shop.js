import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import ImageUrl from '../../components/ImageUrl';
import Card from '../../components/Card/card';
import Button from '../../components/Button/button';
import Banner from '../../components/Banner/banner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigation from '../../components/TabNavigation/tabNavigation';
import Colors from '../../components/Colors/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBasketTokenAction,
  getLoginUserSuccessAction,
} from '../../redux/slices/loginUserSlice';
import SearchBar from '../../components/SearchBar/searchBar';
import {
  AddWishlist,
  getListProduct,
  getReorder,
  getWishlistCount,
} from '../../redux/action/actions';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import ClearanceScreen from '../../components/Clearance/clearance';
import {getProductSuccessAction} from '../../redux/slices/getProductSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Global from '../../utils/Global';
import Globals from '../../utils/constant';
const Shop = props => {
  const {categoryListData, detailsLoading} = useSelector(
    state => state.listCategory.categoryList,
  );

  const {Reorder, reorderLoadingStatus} = useSelector(state => ({
    Reorder: state.reorderCall.ReorderData.ReorderScreenData,
    reorderLoadingStatus: state.reorderCall.ReorderData.reorderLoadingStatus,
  }));

  const [discount, setDiscount] = useState(true);
  const [homeloader, setHomeLoader] = useState(false);
  const [forceReload, setForce] = useState(true);
  const [heading1, setHeading1] = useState('');
  const [heading2, setHeading2] = useState('');
  const [commonHeading, setCommonHeading] = useState('');
  const [ProductId, setProductId] = useState('');
  const [homeData, setHomeData] = useState(null);
  const [manuName, setMenuName] = useState(null);
  const [SelectedTap, setSelectedTap] = useState(null);
  const [tabFlag, setTabFlag] = useState(false);
  const [EndPoint, setEndPoint] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [trigger, setTriger] = useState(false);
  const [basketNavigationStatus, setBasketNavigationStatus] = useState(false);

  const {productData} = useSelector(state => state.getProduct.productDetails);
  const dispatch = useDispatch();

  const {
    data,
    registerData,
    wishlistCountData,
    addWishlist,
    basketData,
    loginBasketData,
  } = useSelector(state => ({
    data: state.loginuser.user.data,
    registerData: state.newuser.user.registerData,
    wishlistCountData: state.wishlistcounts.WishlistCount,
    addWishlist: state.addWishlist.AddWishlist.addWishlist,
    basketData: state.myBasket.basket.basketData,
    loginBasketData: state.loginuser.user.loginBasketData,
  }));
  let tempBasketId = loginBasketData?.loginResponse?.ResultData?.BasketId;
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const customerId = apiData?.CustomerId;
  const emailId = apiData?.Email;
  const emailJson = {Email: emailId, CustomerId: customerId};
  const postJson = {
    PageName: 'ShopPage',
    CustomerId: customerId,
    ProductTypeId: SelectedTap?.ProductTypeId
      ? SelectedTap?.ProductTypeId
      : categoryListData?.ResultData?.length &&
        categoryListData?.ResultData[0]?.ProductTypeId,
    MenuName: SelectedTap?.MenuName
      ? SelectedTap?.MenuName
      : categoryListData?.ResultData?.length &&
        categoryListData.ResultData[0]?.MenuName,
  };
  const tempcomfiVal = SelectedTap?.MenuName
    ? SelectedTap?.MenuName
    : categoryListData?.ResultData?.length > 0 &&
      categoryListData?.ResultData[0]?.MenuName;
  const topcomfisection =
    tempcomfiVal === 'Sunglasses' ||
    tempcomfiVal === 'Glasses' ||
    tempcomfiVal === 'Prescription Sunglasses'
      ? tempcomfiVal
      : 'Comfi Range';

  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      let jsonValue = value != null ? JSON.parse(value) : null;
      if (jsonValue?.ResultData === null || jsonValue === null) {
        // value previously stored
        navigation.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        });
      } else {
        console.log('token in else----', jsonValue);
        dispatch(getLoginUserSuccessAction(jsonValue));
        return jsonValue;
      }
    } catch (e) {
      // error reading value
      console.log('err token----', e);
      return e;
    }
  };
  const getHomeData = async () => {
    setHomeLoader(true);
    console.log('home request payload---', postJson);
    let res = await postApiCallWithNewParams({
      url: `${apiData?.CodeToAppend}/GetShopScreenData`,
      json: postJson,
      // header:customerId
    });
    if (res.StatusCode == 1) {
      console.log('res-2--', res?.ResultData);
      if (res?.ResultData?.BasketId && res?.ResultData?.BasketCount > 0) {
        dispatch(getBasketTokenAction(res?.ResultData?.BasketId));
        Globals.basketCount = res?.ResultData?.BasketCount;
      }
      setHomeData(res.ResultData);
      setHomeLoader(false);
      Globals.basketCount = res?.ResultData?.BasketCount;
    } else {
      console.log('error api');
      setHomeLoader(false);
    }
  };
  const wishlistcntJson = {
    CustomerId: apiData?.CustomerId,
  };
  const topBrands = homeData?.topBrandswrtProductType;
  const Banners = homeData?.findwhatbanners;
  const tabCategories = homeData?.subProductType;
  const lastOrderData = homeData?.customerLastCLOrder[0];
  const topConfiProducts = homeData?.topComfiProduct;
  const bestSellers = homeData?.bestSellerProduct?.Products;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (apiData?.CustomerId) {
        dispatch(getWishlistCount(wishlistcntJson));
        getHomeData();
      }
    
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isfocused, apiData?.CustomerId, trigger, addWishlist, bestSellers]);
  useEffect(() => {

    if (apiData?.CustomerId) {
      dispatch(getWishlistCount(wishlistcntJson));
      getHomeData();
    }
    // Return the function to unsubscribe from the event so it gets removed on unmount
  }, [isfocused]);

  useEffect(() => {
    if (apiData?.CustomerId) {
      dispatch(getWishlistCount(wishlistcntJson));
    }
  }, [apiData?.CustomerId, addWishlist]);

  useEffect(() => {
    if (homeData?.BasketId && homeData?.BasketCount > 0) {

      dispatch(getBasketTokenAction(homeData?.BasketId));
    }
    setForce(!forceReload);
  }, []);

  useEffect(() => {
    if (homeData?.BasketId && homeData?.BasketCount > 0) {
      dispatch(getBasketTokenAction(homeData?.BasketId));
    }
    Globals.globalBasket = homeData?.BasketId;
  }, [homeData?.BasketId]);

  useEffect(() => {
    getToken();
    if (customerId) {
      dispatch(getListProduct(emailJson));
    }
  }, [customerId]);
  basketData?.ResultData?.BasketItem?.Items?.len
  useEffect(() => {
    if (categoryListData && manuName !== 'Clearance' && apiData?.CodeToAppend) {
      getHomeData();
    }
  }, [
    categoryListData,
    SelectedTap,
    apiData?.CodeToAppend,
    basketData,
    addWishlist,
  ]);


  let tabCategoriesFlt = homeData?.subProductType?.filter(
    item => item.CategoryName != 'Unisex',
  );



  const isfocused = navigation.isFocused();
  useEffect(() => {
    const isThankyour = props.route.params;
    if (Globals.thanku === 'thanku') {
      setSelectedTap('');
      navigation.navigate('myOrders');
      console.log('inside if shop=', Globals.thanku);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('navigation on shop===', props);
    });

    return unsubscribe;
  }, [isfocused]);

  const handleTabPress = item => {
    setHomeLoader(true);
    console.log('157 item----', item);
    dispatch(getProductSuccessAction('Empty'));

    setProductId(item.MenuId);
    setCommonHeading(item.MenuName);
    setMenuName(item?.MenuName);
    setSelectedTap(item);
    Globals.thanku = '';
    setTabFlag(true);
    // setHeading1(
    //   item.MenuName === 'Contact Lenses'
    //     ? 'Find what you love'
    //     : 'Must haves, Best Sellers & More',
    // );
    setHeading2(
      item.MenuName === 'Solutions'
        ? 'Contact Lens Solutions'
        : item.MenuName === 'Sunglasses' || item.MenuName === 'Glasses'
        ? 'Shop By'
        : item.MenuName === 'Contact Lenses'
        ? 'Contact lens type'
        : item.MenuName === 'Eye Care'
        ? 'Eye Care'
        : item.MenuName,
    );
    if (apiData?.CodeToAppend) {
      getHomeData();
    }
  };
  const navigateToListing = (params, params2, params3, params4) => {
    const TabNames = params3;
    const types =
      SelectedTap?.MenuName === 'Contact Lenses'
        ? 'contactlenses'
        : SelectedTap?.MenuName === 'Solutions'
        ? 'Solutions'
        : SelectedTap?.MenuName === 'Eye Care'
        ? 'eyecares'
        : SelectedTap?.MenuName === 'Sunglasses'
        ? 'Sunglasses'
        : SelectedTap?.MenuName === 'Glasses'
        ? 'EyeFrames'
        : SelectedTap?.MenuName === 'Prescription Sunglasses'
        ? 'EyeFrames'
        : SelectedTap?.MenuName === 'Clearance'
        ? 'Clearance'
        : null;

    navigation?.navigate('productScreen', {
      type: types ? types : EndPoint,
      manuName: manuName ? manuName : params2,
      isSeeAll: params,
      typeCat: params?.replace(/ /g, '-'),
      isBrand: params2,
      selectedBrand: params,
      topBrands: topBrands,
      TabNames: TabNames,
      mainType: params4,
      tabCategories: params3,
    });
    Global.Type = types;
    Global.ScreenType = 'shop';
    Global.DeepLinkEndPoint = '';
  };
  useEffect(() => {
    let nameValues =
      tabFlag === true
        ? manuName
        : categoryListData?.ResultData?.length &&
          categoryListData?.ResultData[0]?.MenuName;
    setHeading2(
      nameValues === 'Solutions'
        ? 'Contact Lenses Solutions'
        : nameValues === 'Sunglasses' || nameValues === 'Glasses'
        ? 'Gender type'
        : nameValues === 'Contact Lenses'
        ? 'Lens type'
        : nameValues === 'Eye Care'
        ? 'Eye Care'
        : nameValues,
    );
    const EndPoint =
      nameValues === 'Contact Lenses'
        ? 'contactlenses'
        : nameValues === 'Solutions'
        ? 'Solutions'
        : nameValues === 'Eye Care'
        ? 'eyecares'
        : nameValues === 'Sunglasses'
        ? 'Sunglasses'
        : nameValues === 'Glasses'
        ? 'EyeFrames'
        : nameValues === 'Prescription Sunglasses'
        ? 'EyeFrames'
        : nameValues === 'Clearance'
        ? 'Clearance'
        : null;
    setEndPoint(EndPoint);
  }, [categoryListData]);
  const isBrandSet = manuName === 'Contact Lenses' ? null : 'allbrands';
  const handleCardPress = item => {
    navigation.navigate('detailsScreen', {
      ProductId: item?.ID,
      type: EndPoint,
      productTypeId: item.ProductTypeId,
    });
  };
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
    dispatch(AddWishlist(wishlistJson));
    setTriger(!trigger);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const navigateurl = item => {
    var sortArray = [];
    var slitEndPoint = item?.BannerLinkUrl?.replace('/sunglasses/all?', '')
      .replace('&sort=createdon&sortby=desc', '')
      .split(/[ =.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);

    console.log('slitEndPoint', sortArray);
    if (item?.ActionName == 'ProductList') {
      Global.Type = 'Sunglasses';
      Global.SplitEndPoint = slitEndPoint;
      Global.CategoryName = '';
      Global.ScreenType = 'shop';
      Global.DeepLinkEndPoint = '';

      navigation.navigate('FilterProductScreen', {
        BannerLinkUrl: item?.BannerLinkUrl,
      });
    }
  };
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
  useEffect(() => {
    console.log(
      'Reorder=====',
      reorderLoadingStatus,
      '---',
      Reorder?.ResultData?.BasketId,
      '---',
    );
    if (reorderLoadingStatus == false && basketNavigationStatus == true) {
      Global.ReoderBasketId = Reorder?.ResultData?.BasketId;
      dispatch(getBasketTokenAction(Reorder?.ResultData?.BasketId));
      navigation.navigate('mybasket');
    }
  }, [reorderLoadingStatus]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <SearchBar navigation={props.navigation} />

        <View style={[styles.shop, {paddingVertical: 10}]}>
          <Text style={styles.shopTxt}>
            {manuName === 'Clearance' ? 'Clearance' : 'Shop'}
          </Text>
        </View>

        <TabNavigation
          tapNames={categoryListData?.ResultData}
          handleTabPress={handleTabPress}
        />
        {manuName === 'Clearance' ? (
          <ClearanceScreen type={'Clearance'} manuName={manuName} />
        ) : (
          <>
            {/* <View style={styles.shopTxtView}>
              <Text style={styles.findTxt}>{heading1}</Text>
            </View> */}
            <View style={styles.bannerView}>
              {homeloader || detailsLoading ? (
                <View style={styles.IndicatorView}>
                  <SkypeIndicator size={100} animationDuration={800} />
                </View>
              ) : (
                <FlatList
                  style={{paddingTop: 10}}
                  data={Banners}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <Banner item={item} navigateurl={navigateurl} />
                  )}
                  keyExtractor={(item, index) => item.id + index}
                />
              )}
            </View>
            {lastOrderData &&
            bestSellers?.length > 0 &&
            bestSellers[0]?.ProductTypeId === 1 ? (
              <View>
                <View style={styles.shop}>
                  <View style={styles.orderTxt}>
                    <Text style={styles.lensTxt}>Your last order</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('myOrders')}
                    style={styles.previousOrderView}>
                    <Text style={styles.previousTxt}>Previous orders</Text>
                    <Image source={ImageUrl.Arrow} style={styles.arrowImg} />
                  </TouchableOpacity>
                </View>

                <View style={styles.orderView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('detailsScreen', {
                        ProductId: lastOrderData?.ProductId,
                        type: 'contactlenses',
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
                    onPress={() => ReorderFun()}
                    title={'Reorder'}
                    txtColor={Colors.White}
                    color={Colors.Black}
                  />
                </View>
              </View>
            ) : null}
            {(bestSellers?.length > 0 && bestSellers[0]?.ProductTypeId === 1) ||
            (bestSellers?.length > 0 && bestSellers[0]?.ProductTypeId === 2) ||
            SelectedTap?.MenuName === 'Eye Care' ? (
              <>
                <View style={styles.shop}>
                  <Text style={styles.findTxt}>
                    {commonHeading === 'Solutions'
                      ? 'Top Seller '
                      : "Best sellers you'll love"}{' '}
                  </Text>
                </View>
                <View>
                  <FlatList
                    data={bestSellers}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    refreshing={addWishlist}
                    extraData={productData?.length && productData?.Products}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({item}) => (
                      <Card
                        handleWishlist={handleWishlist}
                        handleCardPress={handleCardPress}
                        item={item}
                      />
                    )}
                  />
                </View>
              </>
            ) : null}
            <View>
              <View style={styles.shop}>
                <View style={styles.lenseTxtView}>
                  <Text style={styles.lensTxt}>{heading2}</Text>
                </View>
                <TouchableOpacity
                  // onPress={() => props.navigation.navigate('thankYou')}
                  onPress={() =>
                    navigateToListing(
                      'seeall',
                      categoryListData?.ResultData?.length > 0 &&
                        categoryListData?.ResultData[0]?.MenuName,
                      tabCategories,
                      'first',
                    )
                  }
                  style={styles.previousOrderView}>
                  <Text style={styles.previousTxt}>View All</Text>
                  <Image source={ImageUrl.Arrow} style={styles.arrowImg} />
                </TouchableOpacity>
              </View>

              <View style={styles.commonView}>
                <FlatList
                  data={tabCategoriesFlt}
                  renderItem={({item}) => (
                    <View style={styles.brandTitle}>
                      <TouchableOpacity
                        onPress={() => (
                          navigateToListing(
                            item.CategoryName,
                            null,
                            topBrands,
                            'firstItem',
                          ),
                          (Global.CategoryName = item.CategoryName),
                          (Global.DeepLinkEndPoint = ''),
                          (Global.SplitEndPoint = [])
                        )}
                        style={styles.titleTouch}>
                        <Text style={styles.titleTxt}>{item.CategoryName}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item, index) => item.id + index}
                />
              </View>
            </View>

            {/* <View style={styles.shop}>
              <Text style={styles.findTxt}>
                {commonHeading === 'Solutions'
                  ? 'Top Seller '
                  : "Best sellers you'll love"}{' '}
              </Text>
            </View>
            <View>
              <FlatList
                data={bestSellers}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                extraData={productData?.length && productData?.Products}
                keyExtractor={(item, index) => item.id + index}
                renderItem={({item}) => (
                  <Card
                    handleWishlist={handleWishlist}
                    handleCardPress={handleCardPress}
                    item={item}
                  />
                )}
              />
            </View> */}

            <View style={styles.shop}>
              <View style={styles.orderTxt}>
                <Text style={styles.lensTxt}>Shop by Brand</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigateToListing(
                    'seeall',
                    isBrandSet,
                    tabCategories,
                    'second',
                  )
                }
                style={styles.previousOrderView}>
                <Text style={styles.previousTxt}>View All</Text>
                <Image source={ImageUrl.Arrow} style={styles.arrowImg} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={topBrands?.slice(0, 10)}
              numColumns={2}
              renderItem={({item}) => (
                <View style={styles.brandList}>
                  <TouchableOpacity
                    onPress={() => (
                      navigateToListing(
                        item.BrandName,
                        'brand',
                        tabCategories,
                        'seconditem',
                      ),
                      (Global.CategoryName = item.BrandName),
                      (Global.DeepLinkEndPoint = ''),
                      (Global.SplitEndPoint = [])
                    )}
                    style={styles.brandTouch}>
                    {item.ImageUrl ? (
                      <Image
                        style={{
                          height: hp('13%'),
                          width: hp('20%'),
                          resizeMode: 'contain',
                        }}
                        source={{uri: item.ImageUrl}}
                      />
                    ) : (
                      <Text style={styles.brandTxt}>{item.Name}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => item.id + index}
            />
            {(bestSellers?.length > 0 && bestSellers[0]?.ProductTypeId === 5) ||
            (bestSellers?.length > 0 && bestSellers[0]?.ProductTypeId === 7) ? (
              <>
                <View style={styles.shop}>
                  <Text style={styles.findTxt}>
                    {commonHeading === 'Solutions'
                      ? 'Top Seller '
                      : "Best sellers you'll love"}{' '}
                  </Text>
                </View>
                <View>
                  <FlatList
                    data={bestSellers}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    extraData={productData?.length && productData?.Products}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({item}) => (
                      <Card
                        handleWishlist={handleWishlist}
                        handleCardPress={handleCardPress}
                        item={item}
                      />
                    )}
                  />
                </View>
              </>
            ) : null}
            {SelectedTap?.MenuName === 'Contact Lenses' ||
            SelectedTap?.MenuName === 'Solutions' ||
            SelectedTap?.MenuName === 'Eye Care' ? (
              <View>
                <View style={styles.shop}>
                  <View style={styles.lenseTxtView}>
                    <Text style={styles.lensTxt}>Shop {topcomfisection}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToListing(
                        topcomfisection === 'Comfi Range' ? 'comfi' : 'seeall',
                        topcomfisection === 'Comfi Range'
                          ? 'comfi'
                          : isBrandSet,
                        topConfiProducts?.ActiveCategoryList,
                        'seconditem',
                      )
                    }
                    style={styles.previousOrderView}>
                    <Text style={styles.previousTxt}>View All</Text>
                    <Image source={ImageUrl.Arrow} style={styles.arrowImg} />
                  </TouchableOpacity>
                </View>
                <View>
                  <FlatList
                    data={topConfiProducts?.ProductList?.Products}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <Card
                        handleWishlist={handleWishlist}
                        handleCardPress={handleCardPress}
                        item={item}
                      />
                    )}
                    keyExtractor={(item, index) => item.id + index}
                  />
                </View>
              </View>
            ) : null}
          </>
        )}
      </SafeAreaView>
      {/* {reorderLoadingStatus && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )} */}
    </ScrollView>
  );
};
export default Shop;
