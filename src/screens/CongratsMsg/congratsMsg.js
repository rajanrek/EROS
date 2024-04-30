import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/Button/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationActions} from '@react-navigation/stack';
import styles from './styles';
import Colors from '../../components/Colors/colors';

const CongratsMsg = props => {
  const removeToken = () => {
    // AsyncStorage.removeItem('token')
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Shop'}],
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.congratsView}>
        <Text style={styles.congratsText}>Congratulations!</Text>

        <Text style={styles.shopTxt}>
          You are now part of the Feel Good Contacts community. Happy Shopping.
        </Text>
      </View>

      <View style={styles.btnView}>
        <Button
          onPress={() => removeToken()}
          title={'Start Shopping'}
          color={Colors.White}
          txtColor={Colors.Black}
        />
      </View>
    </View>
  );
};
export default CongratsMsg;
