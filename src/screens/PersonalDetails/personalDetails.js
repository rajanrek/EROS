import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import styles from './styles';
import FgcHeader from '../../components/Header/FgcHeader';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

const PersonalDetails = props => {
  const {accountData} = useSelector(state => state.accountData.account);

  const details = accountData?.ResultData?.personalDetailResponse;
  console.log('Personal--- ',details)

  return (
    <View style={styles.mainContainer}>
          <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Personal details'} />
      </SafeAreaView>
      <ScrollView  style={styles.scrollView}>
        <View style={styles.subView}>
          <View style={styles.TxtView}>
            <Text
              style={styles.commonTxt}>
              Email
            </Text>
            <TextInput
            // editable={false}
              style={styles.inputTxt}
              placeholderTextColor={Colors.Black}
              placeholder={details?.Email}
            />
          </View>

          <View style={styles.TxtView}>
            <Text
             style={styles.commonTxt}>
              First name
            </Text>
            <TextInput
            //  editable={false}
             style={styles.inputTxt}
             placeholderTextColor={Colors.Black}
              placeholder={details?.FirstName}
            />
          </View>

          <View style={styles.TxtView}>
            <Text
           style={styles.commonTxt}>
              Last name
            </Text>
            <TextInput
            //  editable={false}
             style={styles.inputTxt}
              placeholderTextColor={Colors.Black}
              placeholder={details?.LastName}
            />
          </View>

          <View style={styles.TxtView}>
            <Text
            style={styles.commonTxt}>
              Phone number:
            </Text>
            <TextInput
            //  editable={false}
             style={styles.inputTxt}
              placeholderTextColor={Colors.Black}
              placeholder={details?.MobileCountryCode}
            />
          </View>
        </View>
      </ScrollView >
    </View>
  );
};
export default PersonalDetails;
