import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ImageUrl from '../../../../components/ImageUrl';
import Styles from './styles';
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';

const HeaderCard = props => {
  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };
  return props.screenType == 'Reward Point' ? (
    <>
      <View style={Styles.mainView}>
        <Image
          resizeMode="contain"
          style={Styles.img}
          source={ImageUrl.RewardPoints}
        />

        <RenderHtml
          style={{flexDirection: 'column'}}
          customHTMLElementModels={customHTMLElementModels}
          tagsStyles={{
            body: {
              whiteSpace: 'normal',
              color: 'grey',
              textAlign: 'center',
              fontSize: 16,
            },
            font: {color: '#53b17e', fontWeight: '500', fontSize: 18},
            big: {fontSize: 24, color: 'green'},
          }}
          source={{html: props?.data?.AvailablePointsWithAmountHtml}}
        />

        <View style={Styles.containerView}>
          <Image style={Styles.image} source={{uri: props?.data?.ImageUrl}} />
        </View>
        <View style={Styles.normalTextMainContainer}>
          <Text style={Styles.normalText}>
            Don't worry... you can redeem your points even
          </Text>
          <Text style={Styles.normalText}>if you have less than 1000!</Text>
        </View>
      </View>
    </>
  ) : (
    // Store credit

    <View style={Styles.storeCreditMainScreen}>
      <Image
        resizeMode="contain"
        style={Styles.storeCreditImage}
        source={ImageUrl.StoreCredit}
      />
      <RenderHtml
        style={{flexDirection: 'column'}}
        customHTMLElementModels={customHTMLElementModels}
        tagsStyles={{
          body: {
            whiteSpace: 'normal',
            color: 'grey',
            marginTop: 0,
            textAlign: 'center',
            fontSize: 16,
          },
          font: {color: '#53b17e', fontWeight: '500', fontSize: 18},
          big: {fontSize: 24, color: 'green'},
        }}
        source={{html: props?.data?.AvailableCreditStoreWithAmountHtml}}
      />
    </View>
  );
};
export default HeaderCard;
