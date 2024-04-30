import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import styles from './styles';
import FgcHeader from '../../components/Header/FgcHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LiveChat = props => {
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Live chat'} />
      </SafeAreaView>
      
    </View>
  );
};
export default LiveChat;
