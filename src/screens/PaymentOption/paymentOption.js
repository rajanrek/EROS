import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const PaymentOption = props => {
  const navigation = useNavigation();

  const ActivityIndicatorElement = () => {
    return (
      <ActivityIndicator
        color="black"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };

  useEffect(
    () =>
    navigation.addListener("beforeRemove", (e) => {
    // Prevent default behavior of leaving the screen
    e.preventDefault();
   
    callAertFun();
    }),
    [navigation]
    );

    const callAertFun=()=>{
      // Alert.alert('Do you want to cancel ?', [
      //   {
      //     text: 'Cancelnn',
      //     onPress: () => console.log('Cancel Pressed'),
      //     // style: 'cancel',
      //   },
      //   {text: 'OKkk', onPress: () => navigation.navigate('Shop')},
      // ]);

      Alert.alert('Do you want to cancel ?', '', [
        
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('shop')},
      ]);
    }

  async function isSuccess (res) {
    console.log('isSuccess=====', res);
    let result= await res
    //  alert(res)
    if (result == 'true') {
      console.log('isSuccess true');
      navigation.navigate('thankYou', {
        completeOrderDetails: props?.route?.params?.makeOrderdata?.ResultData,
        AutoReplenishDate: props?.route?.params?.autoDate,
      });
      //   props.navigation.goBack();
      // props.addToCartHandler(0)
      //   props.navigation.push('MyOrders',{paymentRes : props.route.params.LinkUrl,isFromCheckout:true});
    } else if(result == 'false'){
      console.log('isSuccess else');
      Alert.alert('Payment', 'Payment Failed.');
      //   props.navigation.goBack();
    }
  }

  function thankyouPage() {
    navigation.navigate('thankYou', {
      completeOrderDetails: props?.route?.params?.makeOrderdata?.ResultData,
    });
  }

  console.log(
    'props in payment option ====',
    props?.route?.params?.makeOrderdata?.ResultData?.PaymentUrl,
  );

  console.log(
    'props in payment option date  ====',
    props?.route?.params?.makeOrderdata?.ResultData,
  );


  const injectedJavascript = `setTimeout(function() { window.ReactNativeWebView.postMessage('Success'); }, 0);`;

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: props?.route?.params?.makeOrderdata?.ResultData?.PaymentUrl,
        }}
        renderLoading={ActivityIndicatorElement}
        startInLoadingState={true}
        //  injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        injectedJavaScript={injectedJavascript}
        onMessage={event => {
          isSuccess(event.nativeEvent.data);
        }}
      />
{/* <TouchableOpacity onPress={()=>thankyouPage()}>
        <Text>thankyou page</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
