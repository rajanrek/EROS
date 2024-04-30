import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageUrl from '../ImageUrl';
import styles from './styles';

const CommonHeader = ({backHandler}) => {
  const navigation = useNavigation();
const goBack =()=>{
  if(backHandler){
    backHandler()
  }
  navigation.goBack()
}
  return (
    <View
      style={styles.mainContainer}>
      <View style={styles.arrowView}>
        <TouchableOpacity 
        style={styles.backBtn}
        onPress={goBack}>
          <Image source={ImageUrl.BackArrow} style={styles.arrowImg} />
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

export default CommonHeader;
