import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import {SkypeIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageUrl from '../../components/ImageUrl';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../components/Colors/colors';

const FgcWebView = (props, {backHandler}) => {
  const LoadingIndicatorView = () => {
    return (
      <View style={styles.IndicatorView}>
        <SkypeIndicator size={50} animationDuration={800} />
      </View>
    );
  };
  const navigation = useNavigation();
  const goBack = () => {
    if (backHandler) {
      backHandler();
    }
    navigation.goBack();
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.arrowView}>
        <TouchableOpacity onPress={goBack} style={styles.imageTouch}>
          <Image style={styles.image} source={ImageUrl.BackArrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.web}>
        <View style={styles.webView}>
          <WebView
            originWhitelist={['*']}
            source={{uri: props?.route?.params}}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
          />
        </View>
      </View>
    </View>
  );
};

export default FgcWebView;
