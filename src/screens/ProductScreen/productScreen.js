import React, { useState, useEffect, useRef } from 'react';
import TabNavigation from '../../components/TabNavigation/tabNavigation';
import FgcHeader from '../../components/Header/FgcHeader';
import { Text, View, ScrollView, Modal, Platform, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AddWishlist, getDetailsPage, getProduct, upgradeProduct } from '../../redux/action/actions';
import Card from '../../components/Card/card';
import RBSheet from 'react-native-raw-bottom-sheet';
import GA4 from '../GA4/GA4';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { useNavigation } from '@react-navigation/native';
import { getProductSuccessAction } from '../../redux/slices/getProductSlice';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Global from '../../utils/Global';
import Colors from '../../components/Colors/colors';
import NewFilter from '../Filter/newFilter';

const ProductScreen = props => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [brandName, setBrandName] = useState('');
  const [tabKey, setTabKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSortingElement, setSelectedSortingElement] = useState(0);
  const [sortingEndPoint,setSortingEndPoint] = useState('')
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const { addWishlist, addwishlistLoading } = useSelector(
    state => state.addWishlist.AddWishlist,
  );
  const { data, registerData, AddBasketData, AddBasketisLoading, detailsData } = useSelector(state => ({
    data: state.loginuser.user.data,
    registerData: state.newuser.user.registerData,
    AddBasketData: state.addToBasket.addBasket.AddBasketData,
    detailsData: state.details.Details.detailsData
  }));

  const [trigger, setTriger] = useState(true);
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
      ? data?.ResultData?.loginResponse
      : data?.ResultData;
  const {
    type,
    manuName,
    tabCategories,
    isSeeAll,
    typeCat,
    isBrand,
    mainType,
    selectedBrand,
    topBrands,
    // TabNames,
    fromFilter,
    parentFilterData,
    fromFilterDataWithOutArray
  } = props?.route?.params;
  const { productData, productList, errors, productIsLoading } = useSelector(
    state => state.getProduct.productDetails,
  );

  const flatListRef = useRef(null);

  const scrollToTop = () => {
    if (filteredData.length > 0) {
      flatListRef.current.scrollToIndex({ index: 0 });
    }
  };
  const commonParam = sortingEndPoint ? sortingEndPoint + '&pagesize=' + 200000 + '&pageIndex=' + page : '?pagesize=' + 200000 + '&pageIndex=' + page; 
  const prescriptionBrand =
    manuName === 'Prescription Sunglasses'
      ? '?IsPrescriptionSunglasses=true&pagesize=' +
      200000 +
      '&pageIndex=' +
      page
      : commonParam;

  const SeeAll = isSeeAll === 'seeall' ? '/all' : sortingEndPoint ? '/all' : '/' + typeCat;
  const postJson = {
    type:
      manuName === 'Prescription Sunglasses'
        ? type + '/all?IsPrescriptionSunglasses=true&' +  prescriptionBrand
        : type + SeeAll  + prescriptionBrand,
    page: page,
  };

  const postJsonBrands = {
    type: type + '/' + selectedBrand  + prescriptionBrand,
  };
  const comfiJson = {
    type: 'contactlenses/' + selectedBrand  + prescriptionBrand,
  };
  useEffect(() => {
    dispatch(
      getProduct(
        isBrand === 'brand'
          ? postJsonBrands
          : isBrand === 'comfi'
            ? comfiJson
            : postJson,
      ),
    );
    refRBSheet.current.close()
    scrollToTop()
  }, [page, trigger,sortingEndPoint]);


  const handleCardPress = item => {
    console.log('pressed item----', item)
    dispatch(
      getDetailsPage({
        type: item?.ID
      }),
    );
    dispatch(
      upgradeProduct({
        ProductId: item?.ID,
        PpcCode: ""
      }),
    );
    navigation.navigate('detailsScreen', { id: item.ID, type: type, comingScreen: props.route.params.manuName, detailsData: detailsData, lenseType: isSeeAll, ProductId: item?.ID });
  };
  const handleWishlist = (item, selectedItem) => {
    setLoading(false)
    if (selectedItem != null || item?.WishlistId != 0) {
      setTriger(!trigger);
    }
    let wishlistJson = {
      CustomerId: apiData?.CustomerId,
      ProductId: item?.ID,
      IsDelete:
        item?.WishlistId != 0 ? false : true,
    };
    dispatch(AddWishlist(wishlistJson));
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  let comingPrams = props.route.name;
  const isAPICall = (productData?.PageIndex + 1) * productData?.PageSize;
  const backHandler = () => {
    console.log('back handler called');
    dispatch(getProductSuccessAction('Empty'));
  };
  const handleTabPress = params => {
    console.log('handle tap ress in listing', params);
    setTabKey(true);
    setBrandName(
      params.Value
        ? params.Value
        : mainType === 'first' ||
          mainType === 'seconditem' ||
          isBrand === 'comfi'
          ? params?.Key
          : params.BrandName,
    );
    scrollToTop();

  };
  const AppendArray = { ID: 0, Name: 'All' };
  const AppendArray2 = { ID: 0, Name: 'All' };

  // setBrandName(brandName == "Alcon/Ciba Vision" ? "Alcon & Ciba Vision" : 
  // brandName=="Cooper Vision"?"CooperVision":brandName);
  const filteredData = productList?.filter(item =>
    mainType === 'firstItem' || mainType === 'second'
      ? brandName?.toLocaleLowerCase()
        .includes(item?.BrandName?.toLocaleLowerCase()) ||
      brandName?.toLocaleLowerCase()
        .includes(item?.ManufacturerName?.toLocaleLowerCase())
      : item?.ProductTypeId == 7 || item?.ProductTypeId == 5
        ? item?.EyeFrameGenderId === Number(brandName) ||
        item?.EyeFrameGenderId == 5
        : item?.ProductCategoryDetails?.includes(brandName?.toLocaleLowerCase()),
  ); 

  const titles =
    isSeeAll === 'seeall' && manuName !== 'allbrands'
      ? 'All ' + manuName : typeCat;
  //: 'All ' + 'Brands';
  const NoProductFound = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: '700' }}>No product found!</Text>
    </View>
  );
  useEffect(() => {
    console.log('100 ', brandName);

    if (brandName === 'All') {
      setBrandName('');
    }
    setTimeout(() => { }, 1000);
  }, [brandName]);

  let tbObj = tabCategories?.length > 0 && tabCategories;
  const combineTabCategory = [...tbObj];
  const combineBrand = [...topBrands];
  combineTabCategory.unshift(AppendArray);
  combineBrand.unshift(AppendArray2);

  // const callSortingHandler=()=>{
  //   scrollToTop()
  // }


  const renderSortingFunction = ({ item, index }) => {
    console.log("renderSortingFunction", item, "---", index);
    return (
      <View>
         <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: 'rgb(248, 248, 247)',
          borderColor: 'gray',
        }}
        onPress={() => {
          refRBSheet.current.close(),
          setSelectedSortingElement(index),
          setSortingEndPoint(`?sort=${item.Key}&sortby=${item.SortBy}`),
          scrollToTop()
          // callSortingHandler()
        }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <Text
            style={[styles.rowtext, { fontSize: 15, padding: 20, fontWeight: selectedSortingElement === index ? 'bold' : 'normal', }]}
            numberOfLines={1}>
            {/* {' '} */}
            {item?.Name}{' '}
          </Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }


  return (
    <View style={styles.mainView}>
      <SafeAreaView
        style={{ height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%') }}>
        <View>
          <FgcHeader
            backHandler={backHandler}
            isFilter={true}
            title={titles}
            name={"productScreen"}
            onPress={() => refRBSheet.current.open()}
          // onPress={() => props.navigation.navigate('filter',{type:Global.Type == 'Sunglasses' ? 'SunglassFilter' : 'EyeFrameFilter'})}
          // props.route.params?.type === "Sunglasses" || props.route.params?.type === "EyeFrames" ? true : false
          />
        </View>
      </SafeAreaView>

      <RBSheet
        ref={refRBSheet}
        height={props.route.params?.type === "Sunglasses" || props.route.params?.type === "EyeFrames" ? hp('95%') : hp('35%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        {props.route.params?.type === "Sunglasses" || props.route.params?.type === "EyeFrames" ?
          <NewFilter Apply={() => refRBSheet.current.close()} close={() => refRBSheet.current.close()} sortingData={productData?.Sortings} />
          :
          <View style={{ borderWidth: 0, width: '100%', backgroundColor: 'rgb(248, 248, 247)' }}>

            <FlatList
              // style={{ marginBottom: 0, borderWidth: 0,width: '100%'   }}
              data={productData?.Sortings}
              renderItem={renderSortingFunction}
              initialNumToRender={10}
              windowSize={50}
              showsVerticalScrollIndicator={false}
            // refreshing={loader}
            />
          </View>
        }

        {/* <Edit item={item?.ItemAttributes} onClose={handleCloseRBSheet} /> */}
      </RBSheet>


      <View>
        <TabNavigation
          tapNames={
            mainType === 'first' || mainType === 'seconditem'
              ? combineTabCategory.length && combineTabCategory
              : isBrand === 'comfi'
                ? TabNames
                : combineBrand
          }
          isBrand={isBrand}
          handleTabPress={handleTabPress}
        />
      </View>
      <View style={styles.bannerView}>
        {/* <Text>Banner Area</Text> */}
      </View>
      <View style={styles.productView}>
        <FlatList
          data={
            filteredData?.length > 0
              ? filteredData
              : tabKey == false ||
                brandName == 'All' ||
                brandName == '' ||
                brandName == undefined
                ? productData?.Products?.length > 0 && productData?.Products
                : filteredData
          }
          numColumns={2}
          ref={flatListRef}
          style={{ marginVertical: 10 }}
          showsVerticalScrollIndicator={false}
          onEndReached={
            isAPICall <= productData?.ProductCount ? handleLoadMore : null
          }
          ListEmptyComponent={() => <NoProductFound />}
          extraData={productData?.Products}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <Card
              handleWishlist={handleWishlist}
              handleCardPress={handleCardPress}
              item={item}
            />
          )}
          keyExtractor={item => item.ID}
        />
      </View>
      {productIsLoading && loading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};
export default ProductScreen;
