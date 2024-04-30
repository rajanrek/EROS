import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import ImageUrl from '../ImageUrl';
import styles from './styles';
import { getOrderHistorySuccessAction } from '../../redux/slices/getOrderHistorySlice';
import { useDispatch } from 'react-redux';
import { getReplenishSuccessAction } from '../../redux/slices/autoReplenishSlice';

const FgcHeader = ({onPress, title,isFilter, backHandler, isSearch, fromScreen,name}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goBackHandle = () => {
    if (name == 'productScreen' || name == 'mybasket') {
      backHandler();
      console.log("navigation",name)
      navigation.navigate("Shop screen")
    }else if(navigation.canGoBack()){
      if(name == 'myOrders' || name == 'autoRep'){
    dispatch(getOrderHistorySuccessAction(null))
    dispatch(getReplenishSuccessAction(null))
    
      backHandler();
      }
      navigation.goBack();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.arrowView}>
        <TouchableOpacity style={styles.backBtn} 
        onPress={goBackHandle}
        >
          <Image source={ImageUrl.BackArrow} style={styles.arrowImg} />
        </TouchableOpacity>
      </View>
      <View
        style={{flex: 6, justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
      <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-end'}}>
        {isFilter && (
          <View style={{paddingHorizontal:10}}>
            <TouchableOpacity onPress={onPress} style={styles.filterTouch}>
              <Image style={styles.filterImg} source={ImageUrl.Filter} />
            </TouchableOpacity>
          </View>
        )}
        {!isSearch && (
          <View style={styles.filterView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('search')}
              style={styles.filterTouch}>
              <Image style={styles.filterImg} source={ImageUrl.BlackSearch} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default FgcHeader;
