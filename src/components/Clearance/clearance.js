import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Modal} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
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
import {useNavigation} from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Card from '../Card/card';
import { getProductSuccessAction } from '../../redux/slices/getProductSlice';
import { AddWishlist, getProduct } from '../../redux/action/actions';
const ClearanceScreen = props => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [brandName, setBrandName] = useState('');
  const [tabKey, setTabKey] = useState('');
  const [NewFilteredData, setFilteredData] = useState();
  const navigation = useNavigation();

  const {productData, productList, errors, productIsLoading} = useSelector(
    state => state.getProduct.productDetails,
    
  );
  const { data, registerData} = useSelector(state => ({
    data: state.loginuser.user.data,
    registerData: state.newuser.user.registerData,
   
  }));
  const commonParam = 'Clearance/all?pagesize=200000&pageIndex=0'

  const postJsonBrands = {
    type: commonParam
  };

  const apiData = registerData
  ? registerData?.ResultData?.loginResponse
  : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  useEffect(() => {
    dispatch(
      getProduct(postJsonBrands));
  }, []);

  const handleCardPress = item => {
    navigation.navigate('detailsScreen', {id: item.ID, type: props.type});
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const isAPICall = (productData?.PageIndex + 1) * productData?.PageSize;
  const backHandler = () => {

    dispatch(getProductSuccessAction('Empty'));
  };
  const handleTabPress =(params)=>{
    console.log("handle tap ress in listing",params)
    setBrandName(params.Value ? params.Value : params.BrandName)
  }
  useEffect(()=>{
    const filteredData = productList?.filter((item)=> item?.BrandName === brandName)
    setFilteredData(filteredData)

  },[brandName])
  const handleWishlist = item => {
    let wishlistJson = {
      CustomerId: apiData?.CustomerId,
      ProductId: item?.ID,
      IsDelete:
        item?.WishlistId != 0 || item?.WishlistId != null ? false : true,
    };
    dispatch(AddWishlist(wishlistJson));
  };
  return (
    <View style={styles.mainView}>

      <View>
      </View>
      <View style={styles.bannerView}></View>
      <View style={styles.productView}>
        <FlatList
          data={NewFilteredData?.length > 0 ? NewFilteredData : productList && productList}
          numColumns={2}
          style={{marginVertical: 10}}
          showsVerticalScrollIndicator={false}
          onEndReached={
            isAPICall <= productData?.ProductCount ? handleLoadMore : null
          }
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <Card handleWishlist={handleWishlist} handleCardPress={handleCardPress} item={item} />
          )}
          keyExtractor={item => item.ID}
        />
      </View>
      {productIsLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};
export default ClearanceScreen;
