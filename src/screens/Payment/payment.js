import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import ImageUrl from '../../components/ImageUrl';
import styles from './styles';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import Fonts from '../../components/CustomsFonts/customFonts';
import {getPaymentCard, postDeleteCard} from '../../redux/action/actions';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import RBSheet from 'react-native-raw-bottom-sheet';

const Payment = props => {
  const [selected, setSelected] = useState('');
  const {
    paymentCardData,
    registerData,
    data,
    deletePaymentCardData,
    paymentCardisLoading,
  } = useSelector(state => ({
    paymentCardData: state.cardDetails.paymentCard.paymentCardData,
    paymentCardisLoading: state.cardDetails.paymentCard.paymentCardisLoading,
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    deletePaymentCardData:
      state.deleteCard.deletePaymentCard.deletePaymentCardData,
  }));

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const cancelRBSheet = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentCard(apiData?.CustomerId));
  }, []);

  const handleRemoveCard = item => {
    console.log('59---', item);
    setSelected(item);
    cancelRBSheet.current.open();
  };

  useEffect(() => {
    dispatch(getPaymentCard(apiData?.CustomerId));
  }, [deletePaymentCardData]);

  const handleCancel = item => {
  
    const RemoveJson = {
      CustomerId: apiData?.CustomerId,
      TransactionID: item?.TransactionID,
    };
    dispatch(postDeleteCard(RemoveJson));

    cancelRBSheet.current.close();
  };
  

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader isSearch={true} title={'Payment'} />
      </SafeAreaView>

      <View style={styles.mainView}>
        <FlatList
          data={paymentCardData?.ResultData}
          renderItem={({item}) => {
            return (
              <View style={styles.subView}>
                <View style={styles.cardView}>
                  <View style={styles.imageView}>
                    <Image
                      resizeMode="contain"
                      style={styles.image}
                      source={{uri: item?.Image}}
                    />
                    <Text style={styles.numberTxt}>
                      **** {item?.Last4Digits}
                    </Text>
                  </View>
                  <View style={styles.lineTxt}></View>
                  <View style={styles.removeView}>
                    <TouchableOpacity
                      onPress={() => handleRemoveCard(item)}
                      style={styles.removeTouch}>
                      <Image
                        resizeMode="contain"
                        style={styles.removeImg}
                        source={ImageUrl.Remove}
                      />
                      <Text style={styles.removeTxt}>Remove</Text>
                    </TouchableOpacity>

                    <View style={styles.cardnumberView}>
                      <Text style={styles.cardTxt}>{item?.Expiry}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
        {paymentCardisLoading && (
          <View style={styles.IndicatorView}>
            <SkypeIndicator size={100} animationDuration={800} />
          </View>
        )}

        <RBSheet
          ref={cancelRBSheet}
          height={hp('25%')}
          openDuration={250}
          closeOnDragDown={true}
          animationType="fade"
          customStyles={{
            container: {
              backgroundColor: Colors.LightWhite,
            },
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: hp('0.4%'),
            }}>
            <Text style={styles.cancelbtnTxt}>
              Do you really want to Remove your card ?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: hp('7%'),
              }}>
              <View
                style={{
                  paddingHorizontal: hp('2.5%'),
                }}>
                <TouchableOpacity
                  onPress={() => handleCancel(selected)}
                  style={{
                    borderRadius: 5,
                    backgroundColor: Colors.Black,
                    paddingHorizontal: hp('3.5%'),
                    paddingVertical: hp('1%'),
                    alignItems: 'center',
                  }}>
                  <Text style={styles.btnTxt}>Yes</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  paddingHorizontal: hp('2.5%'),
                }}>
                <TouchableOpacity
                  onPress={() => cancelRBSheet.current.close()}
                  style={{
                    borderRadius: 5,
                    backgroundColor: Colors.Black,
                    paddingHorizontal: hp('3.5%'),
                    paddingVertical: hp('1%'),
                    alignItems: 'center',
                  }}>
                  <Text style={styles.btnTxt}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
};

export default Payment;
