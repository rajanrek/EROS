import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Modal, Platform, FlatList } from 'react-native';
import TabNavigation from '../../components/TabNavigation/tabNavigation';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AddWishlist, getDetailsPage, getFilteredData, getProduct } from '../../redux/action/actions';
import FgcHeader from '../../components/Header/FgcHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { FlatList } from 'react-native-gesture-handler';
import Card from '../../components/Card/card';
import Global from '../../utils/Global';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import NewFilter from '../Filter/newFilter';
import Colors from '../../components/Colors/colors';
import DeepLinkUrl from '../../ConfigUrl/deeplinkurl';
const FilterProductScreen = props => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [brandName, setBrandName] = useState('');
  const [brandNameId, setBrandNameId] = useState('')
  const [splitEndPoint, setSplitEndPoint] = useState([])
  const [tabKey, setTabKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { registerData } = useSelector(state => state.newuser.user);
  const { data } = useSelector(state => state.loginuser.user);
  const refRBSheet = useRef();
  
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
    fromFilterDataWithOutArray,
    mainFilterData,
    apiMainPoint,
    isSearch,
    BannerLinkUrl,
    sortingData,
    filterStatus
  } = props?.route?.params;
  const { productData, productList, errors, productIsLoading } = useSelector(
    state => state.getProduct.productDetails,
  );
  const { filtered, filteredisLoading , detailsData, SearchByTermObj} = useSelector(state => ({
    filtered: state.getFilteredData.filtered.filteredData.ResultData,
    filteredisLoading: state.getFilteredData.filtered.filteredisLoading,
    detailsData: state.details.Details.detailsData,
    SearchByTermObj: state.searchTerm.SearchByTermObj,
  }));

  var deeplinkUrl1 = props?.route?.path;
  var deeplinkUrl2 = props?.route?.params?.params?.path;
  const deepLinkDataFromProduct = productData?.Products
  
  console.log("filtered---",filtered?.Products, mainFilterData, filterStatus, BannerLinkUrl)
  const searchProductList=SearchByTermObj?.searchByTermData?.ResultData?.Products;
  const commonParam = '?pagesize=' + 200000 + '&pageIndex=' + page;
  const prescriptionBrand =
    manuName === 'Prescription Sunglasses'
      ? '?IsPrescriptionSunglasses=true&pagesize=' +
      200000 +
      '&pageIndex=' +
      page
      : commonParam;

  let replString = typeCat?.replaceAll(' ', '-');
  const SeeAll = isSeeAll === 'seeall' ? '/all' : '/' + replString;
  const postJson = {
    type:
      manuName === 'Prescription Sunglasses'
        ? type + '/all?IsPrescriptionSunglasses=true&' + prescriptionBrand
        : type + SeeAll + prescriptionBrand,
    page: page,
  };
  const postJsonBrands = {
    type: type + '/' + selectedBrand + prescriptionBrand,
  };

  const comfiJson = {
    type: 'contactlenses/' + selectedBrand + prescriptionBrand,
  };

  function removeWordsFromString(str, wordsToRemove) {
    // Create a regular expression pattern to match the words to remove
    const pattern = new RegExp('\\b(' + wordsToRemove?.join('|') + ')\\b', 'gi');
    // Replace the matched words with an empty string
    return str.replace(pattern, '');
}

const postJsonDeepLinkBrands = 'contactlenses/' + props.route.params.screen + commonParam ;
  
  useEffect(() => {
    let mnfs = [];
    let gender = [];
    let lnsszs = [];
    let frmtps = [];
    let fcshps = [];
    let frmclrs = [];
    let lnsclrs = [];
    let sprttps = [];
    let mtrls = [];
    let prcrng = [];
    let frmshps = [];
    mainFilterData?.length > 0 && mainFilterData?.map((item)=>{
        console.log("getFilterDataUseeFfect",item.key)
        if(item.key === 'mnfs'){
            mnfs.push(item.id);
        }
        if(item.key === 'gender'){
            gender.push(item.id);
        }
        if(item.key === 'frmshps'){
            frmshps.push(item.id);
        }
        if(item.key === 'lnsszs'){
            lnsszs.push(item.id);
        }
        if(item.key === 'frmtps'){
            frmtps.push(item.id);
        }
        if(item.key === 'fcshps'){
            fcshps.push(item.id);
        }
        if(item.key === 'frmclrs'){
            frmclrs.push(item.id);
        }
        if(item.key === 'lnsclrs'){
            lnsclrs.push(item.id);
        }
        if(item.key === 'sprttps'){
            sprttps.push(item.id);
        }
        if(item.key === 'mtrls'){
            mtrls.push(item.id);
        }
        if(item.key === 'prcrng'){
            prcrng.push(item.id);
        }

    })
    console.log("apiMainPoint",apiMainPoint,sortingData, BannerLinkUrl)
    let mnfsString = mnfs.length > 0 ? `&mnfs=${mnfs.toString()}` : '' 
    let genderString =  gender.length > 0 ? `&gender=${gender.toString()}` : '' 
    let lnsszsString =  lnsszs.length > 0 ? `&lnsszs=${lnsszs.toString()}` : '' 
    let frmtpsString =  frmtps.length > 0 ? `&frmtps=${frmtps.toString()}` : ''
    let fcshpsString =  fcshps.length > 0 ? `&fcshps=${fcshps.toString()}` : ''
    let frmclrsString = frmclrs.length > 0 ? `&frmclrs=${frmclrs.toString()}` : ''
    let lnsclrsString =  lnsclrs.length > 0 ? `&lnsclrs=${lnsclrs.toString()}` : ''
    let sprttpsString =  sprttps.length > 0 ? `&sprttps=${sprttps.toString()}` : ''
    let mtrlsString =   mtrls.length > 0 ? `&mtrls=${mtrls.toString()}` : ''
    let mprcrngString =  prcrng.length > 0 ? `&prcrng=${prcrng.toString()}` : ''
    let frmshpsString =  frmshps.length > 0 ? `&frmshps=${frmshps.toString()}` : ''
    let sortingValue = sortingData ? `&sort=${sortingData.Key}&sortby=${sortingData.SortBy}` : ''
   
  
    var endPoint = `${apiData?.CodeToAppend}/GetProducts/${Global.Type}/all?${frmshpsString}${mnfsString}${genderString}${lnsszsString}${frmtpsString}${fcshpsString}${frmclrsString}${lnsclrsString}${sprttpsString}${mtrlsString}${mprcrngString}${sortingValue}&pagesize=2000&pageindex=0`;
    var bannerEndPoint = `${apiData?.CodeToAppend}/GetProducts${BannerLinkUrl}&pagesize=2000&pageindex=0`;
    var deepLinkUrl = `${apiData?.CodeToAppend}/GetProducts${deeplinkUrl1 == undefined ? deeplinkUrl2 : deeplinkUrl1}/all?&pagesize=100&pageindex=0`;

    if(
      props.route.path !== undefined || 
      props.route.params.screen == 'prescription-sunglasses' || 
      props.route.params.screen == DeepLinkUrl(props.route.params.screen)[0] ||
      props.route.params?.screen == 'brand' ||
      props.route.params?.screen == 'frameshape' || 
      props.route.params?.screen == 'shape'
      ){
      let comingparam = props.route.name;
      console.log("comingParam=======",comingparam)
      let newType=comingparam === 'sunglasses' ? 'sunglasses' 
      : comingparam === 'glasses' ||  comingparam === 'sunglasses/prescription-sunglasses'  ? 'EyeFrames' 
      : comingparam === 'eye-care' ? 'eyecares' 
      : comingparam === 'contact-lenses' ? 'contactlenses'
      : comingparam === 'clearance' ? 'Clearance'
      :'solutions';
      let routingPoint = props.route.name == "sunglasses" ? "sunglasses" : 'EyeFrames'
      let newTypePrescription='EyeFrames'+ '/all' + '?IsPrescriptionSunglasses=true&pagesize=' + 200000 + '&pageIndex=' + page;
      let newTypebrand=`${routingPoint}/${props.route.params?.params?.screen}`+'?pagesize='+ 200000 + '&pageIndex=' + 0;
      let newTypebrandWithShape=`EyeFrames/${props.route.params?.param?.screen}`+'?pagesize='+ 200000 + '&pageIndex=' + 0;

      Global.DeepLinkEndPoint = props?.route?.params?.params?.screen?.toUpperCase();
      Global.Type = props.route.name == 'sunglasses' ? 'Sunglasses' : props.route.name == 'glasses' ? 'EyeFrames' : null;

      dispatch(
        getProduct(
         { type:props.route.params.screen == "prescription-sunglasses" ? newTypePrescription :props.route.params.screen == 'shape' ? newTypebrandWithShape : props.route.params.screen == 'brand'  ? newTypebrand :  props.route.params.screen == DeepLinkUrl(props.route.params.screen)[0] ?  postJsonDeepLinkBrands : newType + commonParam}
        ),
      );
    }else{
      dispatch(getFilteredData( BannerLinkUrl ? bannerEndPoint : endPoint));
    }

    var slitEndPoint = BannerLinkUrl?.replace('/sunglasses/all?','').replace('&sort=createdon&sortby=desc','').split(/[ =.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
    setSplitEndPoint(slitEndPoint)

  }, [mainFilterData, BannerLinkUrl]);

  const handleCardPress = item => {
    dispatch(
      getDetailsPage({
        type: item?.ID
      }),
    );
    navigation.navigate('detailsScreen', { id: item.ID, type: type, comingScreen: 'filter' ,detailsData:detailsData, ProductId:item?.ID});
  };
  const handleWishlist = (item, selectedItem) => {
    console.log('add wishlist ----', item, "selectedItem", selectedItem);
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
    // console.log('back handler called');
    dispatch(getProductSuccessAction('Empty'));
  };
  const handleTabPress = params => {
    console.log('handle tap ress in listing', params);
    setTabKey(true);
    setBrandName(
      params.ValKey
        ? params.Value
        : mainType === 'first' ||
          mainType === 'seconditem' ||
          isBrand === 'comfi' 
          // Global.MainType === 'first' ||
          // Global.MainType === 'seconditem' 
          
          ? params?.Key
          : params.Name,
    );
    setBrandNameId(params?.Key);
    // console.log('top brandname==', productList);
  };
 

  var filteredData = productList?.filter(item =>
    //  console.log("Global.MainType",parentFilterData?.parentFilterKey)
    mainType === 'firstItem' || mainType === 'second'
    ? brandName
      ?.toLocaleLowerCase()
      .includes(item?.BrandName?.toLocaleLowerCase())
    : item?.ProductTypeId == 7 || item?.ProductTypeId == 5
      ? item?.EyeFrameGenderId === Number(brandName) ||
      item?.EyeFrameGenderId == 5
      : item?.ProductCategoryDetails?.includes(brandName?.toLocaleLowerCase()),
);

// var myFilterData = productList?.filter((item,index) =>{
//     let result = mainFilterData?.Name
//     // item?.BrandName?.toLocaleLowerCase().includes("RAY-BAN".toLocaleLowerCase())
//     console.log("result===",result)
//     return result;
// })

let includesSelected = productList?.filter(item =>
     mainFilterData?.includes((item.BrandName.toLocaleLowerCase() && item?.EyeFrameGenderId)|| (item.BrandName.toLocaleLowerCase()))
    );
    // var filteredKeywords = productList?.filter((value) => mainFilterData?.Name?.includes(value));
 
  console.log("filteredisLoading--",filteredisLoading )
  const titles =  Global.Type
  //: 'All ' + 'Brands';
  const NoProductFound = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: '700' }}>No product found!</Text>
    </View>
  );
  const filterData = [{
    ID: 19,
ImageUrl: "https://static.lensgroup.co/images/sunglasses/brands/rayban.png",
Name: "Filtered",
RewriteName: "ray-ban"
   }];

   const filterFun=()=>{
    refRBSheet.current.open()
    // props.navigation.navigate('filter',{topBrands:topBrands,mainType:mainType,brandName:brandName,mainManuName: manuName})
    // Global.SplitEndPoint=splitEndPoint
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
            onPress={()=> refRBSheet.current.open()}
            // onPress={()=>filterFun()}

          />
        </View>
      </SafeAreaView>

      <RBSheet
        ref={refRBSheet}
        height={hp('95%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          }
        }}>
          <NewFilter  close={()=>refRBSheet.current.close()} Apply={()=>refRBSheet.current.close()} sortingData={productData?.Sortings}/>
        {/* <Edit item={item?.ItemAttributes} onClose={handleCloseRBSheet} /> */}
      </RBSheet>
      
      <View>
      
      <TabNavigation
      tapNames={filterData}
    //   isBrand={isBrand}
      handleTabPress={handleTabPress}
    />
      </View>

     
      <View style={styles.bannerView}>
      </View>
      <View style={styles.productView}>
        <FlatList
          data={ 
            // mainFilterData == undefined ? deepLinkDataFromProduct : isSearch ? searchProductList :
            // filtered?.Products?.length > 0 && filtered?.Products
            filterStatus == true && filtered?.Products?.length > 0 ? filtered?.Products : 
            BannerLinkUrl !== undefined ? filtered?.Products :
            isSearch ? searchProductList : 
            mainFilterData == undefined && filterStatus == undefined ? deepLinkDataFromProduct : null
          }
          numColumns={2}
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
        //   keyExtractor={item => item.ID}
        />
      </View>
      {filteredisLoading && loading  && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}

      {productIsLoading || filteredisLoading ?  
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View> : null
      }

    </View>
  );
};
export default FilterProductScreen;
