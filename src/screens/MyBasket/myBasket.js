import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, SafeAreaView, FlatList} from 'react-native';
import styles from './styles';
import BasketCard from '../../components/BasketCard/basketCard';
import Card from '../../components/Card/card';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {
  deleteBasket,
  getBasket,
  getCheckout,
  getDetailsPage,
  updateBasket,
} from '../../redux/action/actions';
import Button from '../../components/Button/button';
import Colors from '../../components/Colors/colors';
import {useNavigation} from '@react-navigation/native';
import FgcHeader from '../../components/Header/FgcHeader';
import Global from '../../utils/Global';

const MyBasket = props => {
  const [count, setCount] = useState(0);
  const [checkoutNavigationStatus, setCheckoutNavigationStatus] =
    useState(false);
  // const {registerData} = useSelector(state => state.newuser.user);
  // const {data} = useSelector(state => state.loginuser.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {deleteBasketData, deleteBasketisLoading} = useSelector(
    state => state.deleteBasketItems.deleteBasket,
  );
  const {UpdateBasketData, UpdateBasketisLoading} = useSelector(
    state => state.updateBasketQuantity.updateBasket,
  );
  const {AddBasketData, AddBasketisLoading} = useSelector(
    state => state.addToBasket.addBasket,
  );
  const {checkout} = useSelector(state => state);
  const {data, registerData, loginBasketData, basketToken, detailsData} =
    useSelector(state => ({
      registerData: state.newuser.user.registerData,
      data: state.loginuser.user.data,
      basketToken: state.loginuser.user.basketToken,
      loginBasketData: state.loginuser.user.loginBasketData,
      detailsData: state.details.Details.detailsData,
    }));
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  let tempBasketId = loginBasketData?.loginResponse?.ResultData?.BasketId;

  const {basketData, basketisLoading} = useSelector(
    state => state.myBasket.basket,
  );

  const DeliveryId = basketData?.ResultData?.BasketSummary?.DeliveryOptionId;
  const DeliveryCountryId =
    basketData?.ResultData?.BasketSummary?.DeliveryCountryId;

  var postJson = {
    BasketId: basketToken,
    CustomerId: apiData?.CustomerId,
  };
  useEffect(() => {
    postJson.basketToken = basketToken;
  }, [basketToken]);
  useEffect(() => {
    dispatch(getBasket(postJson));
  }, [deleteBasketData, UpdateBasketData, updateBasketItem, basketToken]);

  const isFocused = navigation.isFocused();
  useEffect(() => {
    // console.log("11111111111122222222", postJson)
    dispatch(getBasket(postJson));
  }, [isFocused]);

  useEffect(() => {
    console.log(
      'checkout.checkoutData.checkoutScreenData.ResultData',
      checkout.checkoutData.checkoutScreenData.ResultData,
    );
    if (
      checkoutNavigationStatus == true &&
      checkout.checkoutData.checkoutScreenData.ResultData !== undefined
    ) {
      setCheckoutNavigationStatus(false);
      navigation.navigate('Checkout');
    }
  }, [checkout.checkoutData.checkoutScreenData.ResultData]);

  const ReduceBasketItem = item => {
    const deleteJson = {
      BasketId: basketToken,
      CustBasketId: item?.CustBasketId,
    };
    dispatch(deleteBasket(deleteJson));
  };

  const updateBasketItem = (item, countype) => {
    console.log('called increse and decr', countype, item);
    let count = countype == 1 ? item?.Quantity + 1 : item?.Quantity - 1;
    setCount(count);
    console.log('---count 72', count, countype);

    if (item?.Quantity <= 1 && countype == 0) {
      const deleteJson = {
        BasketId: basketToken,
        CustBasketId: item?.CustBasketId,
      };
      dispatch(deleteBasket(deleteJson));
      setCount(null);
    } else {
      console.log('---count', count);
      const QuantityJson = {
        BasketId: basketToken,
        CustBasketId: item?.CustBasketId,
        Quantity: count,
        CustomerId: apiData?.CustomerId,
        DeliveryOptionId: DeliveryId,
        DeliveryCountryId: DeliveryCountryId,
      };
      dispatch(updateBasket(QuantityJson));
      setCount(null);
    }
  };

  const backHandler = () => {
    navigation.navigate('Shop');
  };

  const proceedToCheckoutFun = data => {
    const postJson = {
      BasketId: basketToken,
      CustomerId: apiData?.CustomerId,
      DeliveryCountryId: Global.BasketDataSummry.CountryId,
      DeliveryOptionId: Global.BasketDataSummry.DeliveryOptionId,
      IsPayPal: false,
      ItemToEdit: null,
      LeftEyeAttributes: null,
    };
    Global.BasketDataSummry?.AddressId == ''
      ? null
      : (postJson.DeliveryAddressId = Global.BasketDataSummry.AddressId);
    Global.BasketDataSummry?.BillingAddressId == ''
      ? null
      : (postJson.BillingAddressId = Global.BasketDataSummry.BillingAddressId);
    dispatch(getCheckout(postJson));
    // Global.BasketDataSummry.DeliveryOptionId = data.DeliveryOptionId;
    // Global.BasketDataSummry.AddressId = '';
    // Global.BasketDataSummry.CountryId = data.DeliveryCountryId;
    console.log('log proceedToCheckoutFun', checkout, postJson, '---', data);
    setCheckoutNavigationStatus(true);
  };
  const HandleEdit = id => {
    console.log('handle edit=====', id);
    dispatch(
      getDetailsPage({
        type: id,
      }),
    );
  };
  return (
    <View style={styles.mainView}>
      <SafeAreaView>
        <FgcHeader
          name={'mybasket'}
          title={'My Basket'}
          backHandler={backHandler}
        />
      </SafeAreaView>

      {basketData?.ResultData?.BasketItem == null && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '700', color: 'red'}}>
            No Items in the Basket
          </Text>
        </View>
      )}

      <View style={{flex: 7}}>
        <FlatList
          data={basketData?.ResultData?.BasketItem?.Items}
          renderItem={({item}) => (
            <BasketCard
              ReduceBasketItem={ReduceBasketItem}
              handleUpdate={updateBasketItem}
              item={item}
              HandleEdit={HandleEdit}
              ProductDetail={detailsData?.ResultData?.ProductDetail}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {basketData?.ResultData?.BasketItem?.Items?.length > 0 ? (
        <View style={{flex: 2}}>
          <View style={styles.totalView}>
            <Text style={styles.totalTxt}>Total</Text>
            <Text style={styles.priceTxt}>
              {basketData?.ResultData?.BasketItem?.BasketTotalText}
            </Text>
          </View>

          <View style={styles.rewardView}>
            <Text style={styles.rewardTxt}>Reward Points</Text>
            <Text style={styles.rewardPriceTxt}>
              {basketData?.ResultData?.BasketSummary?.EarnedRewardPoints}
            </Text>
          </View>
          <View style={styles.line}>
            <View style={styles.lineView}></View>
          </View>
        </View>
      ) : null}

      {basketData?.ResultData?.BasketItem != null &&
        basketData?.ResultData?.RecommendedProduct != null ? (
          <View style={styles.basketView}>
            <View style={styles.addView}>
              <Text style={styles.addTxt}>Add to your Basket...</Text>
            </View>

            <View>
              <FlatList
                data={basketData?.ResultData?.RecommendedProduct}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Card item={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        ): null}
      {basketData?.ResultData?.BasketItem?.Items?.length > 0 ? (
        <View style={{alignItems: 'center', paddingBottom: 15}}>
          <Button
            title={'Proceed to checkout'}
            color={Colors.Black}
            txtColor={Colors.White}
            onPress={() =>
              proceedToCheckoutFun(basketData?.ResultData?.BasketSummary)
            }
          />
        </View>
      ) : null}
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            textDecorationLine: 'underline',
            paddingBottom: 15,
            textDecorationColor: Colors.Black,
          }}
          onPress={() => {
            navigation.navigate('shop');
          }}>
          Continue Shopping
        </Text>
      </View>
      {deleteBasketisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}

      {basketisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}

      {checkoutNavigationStatus && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};
export default MyBasket;
