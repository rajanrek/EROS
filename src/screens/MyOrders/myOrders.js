import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import styles from './styles';
import {SkypeIndicator} from 'react-native-indicators';
import ImageUrl from '../../components/ImageUrl';
import FgcHeader from '../../components/Header/FgcHeader';
import OrdersCard from '../../components/OrdersCard/ordersCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCancelOrder,
  getOrderHistory,
  uploadPrescription,
} from '../../redux/action/actions';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ConfigUrl from '../../ConfigUrl/configUrl';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

import RNFetchBlob from 'rn-fetch-blob';
import Globals from '../../utils/constant';
const fs = RNFetchBlob.fs;
const MyOrders = props => {
  const [page, setPage] = useState(0);
  const [ShowBtn, setShowBtn] = useState(false);

  const dispatch = useDispatch();
  const {orderData, orderisLoading} = useSelector(
    state => state.orderHistory.order,
  );
  const {registerData} = useSelector(state => state.newuser.user);
  const {data} = useSelector(state => state.loginuser.user);
  const {accountData} = useSelector(state => state.accountData.account);
  const {cancelRequestData} = useSelector(
    state => state.cancelOrder.cancelRequest,
  );

  const commonParam = '?pagesize=' + 10 + '&pageIndex=' + page;
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const reward = accountData?.ResultData?.rewardPointsResponse;
  const credit = accountData?.ResultData?.creditStoreResponse;
  const navigation = useNavigation();

  const handleEndReached = () => {
    console.log('46 called=====');
    // setPage(page + 1);
    setShowBtn(true);
  };
  const postJson = {
    type: apiData?.CustomerId + commonParam,
  };
  useEffect(() => {
    dispatch(getOrderHistory(postJson));
    scrollToTop()
  }, [page]);

  const isforcusd = navigation.isFocused();

  useEffect(() => {
    Globals.thanku = '';
    dispatch(getOrderHistory(postJson));
    console.log('order history focus======');
  }, [isforcusd]);

  const backHandler = () => {
    console.log(' back');
    setPage(0);
  };
  const flatListRef = useRef(null);

  const scrollToTop = () => {
    if (orderData.length > 0) {
      flatListRef.current.scrollToIndex({ index: 0 });
    }
  };

  const HandleUploadPrescription = async e => {
    console.log('e=====', e);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles, DocumentPicker.types.images],
      });
      console.log('res-----', res);
      if (res[0].size > 1000000) {
        Alert.alert('Document size must be less than 1 MB');
        return;
      }
      convertToBase64(res[0], e.OrderId);
    } catch (e) {
      if (!DocumentPicker.isCancel(e)) {
        console.log(e);
      }
    }
  };
  const convertToBase64 = async (paramUri, OrderId) => {
    console.log('order id in 64===', OrderId);
    let imagePath = paramUri.uri;
    // set the image/video path here
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', imagePath) // the file is now downloaded at local storage
      .then(resp => {
        imagePath = resp.path(); // to get the file path
        return resp.readFile('base64'); // to get the base64 string
      })
      .then(base64 => {
        // here base64 encoded file data is returned
        Globals.prescriptionImg = base64;
        let prescriptionImgJson = {
          CustomerId: apiData?.CustomerId,
          OrderId: OrderId,
          DocName: paramUri?.name,
          DocBytes: base64,
        };
        console.log('pres json=====', prescriptionImgJson);
        dispatch(uploadPrescription(prescriptionImgJson));
        return fs.unlink(imagePath); // to remove the file from local storage
      });
  };

  const HandleCancelOrder = (item, checkBox, comment, refundBox) => {
    const cancelJson = {
      CustomerId: apiData?.CustomerId,
      OrderId: item?.OrderId,
      ReasonComment: comment,
      RefundReasonOption: checkBox,
      RefundOption: refundBox,
    };

    dispatch(getCancelOrder(cancelJson));
    dispatch(getOrderHistory(postJson));
  };
  console.log('page===', page);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader
          backHandler={backHandler}
          name={'myOrders'}
          title={'My Orders'}
        />
      </SafeAreaView>
      {/* <ScrollView style={styles.scrollView}> */}
      <View style={styles.pointsView}>
        <Text style={styles.Txt}>My points and credit</Text>

        <View style={styles.rewardView}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('RewardPoints', {
                screenName: 'Reward Point',
              })
            }
            style={styles.commonView}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={ImageUrl.Reward} />
            </View>
            <View style={styles.imageView}>
              <Text style={styles.numberTxt}>{reward?.TotalEarned} (£1)</Text>
            </View>
            <Text style={styles.pointTxt}>Reward points</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('fgcWebView', ConfigUrl.REFER_FRIEND)
            }
            style={styles.friendView}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={ImageUrl.Friend} />
            </View>
            <View style={styles.imageView}>
              <Text style={styles.numberTxt}>£10</Text>
            </View>
            <Text style={styles.pointTxt}>Refer a friend</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('RewardPoints', {
                screenName: 'Store credit',
              })
            }
            style={styles.creditView}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={ImageUrl.Wallet} />
            </View>
            <View style={styles.imageView}>
              <Text style={styles.numberTxt}>{credit?.TotalCreditAmount}</Text>
            </View>
            <Text style={styles.pointTxt}>Store credit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 7}}>
        <View style={{flex: 9}}>
          <FlatList
            data={orderData}
            ref={flatListRef}
            // onEndReached={() => handleEndReached()}
            // onEndReachedThreshold={0.5}
            style={{flex: 1}}
            refreshing={cancelRequestData}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({item}) => (
              <OrdersCard
                item={item}
                HandleUploadPrescription={HandleUploadPrescription}
                HandleCancelOrder={HandleCancelOrder}
              />
            )}
            // ListFooterComponent={orderisLoading && <SkypeIndicator />}
          />
        </View>

        <View
          style={styles.nextView}>
          <TouchableOpacity
            style={styles.BtnNext}
            onPress={() => setPage(page - 1)}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 14}}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BtnNext}
            onPress={() => setPage(page + 1)}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 14}}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}

      {orderisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};
export default MyOrders;
