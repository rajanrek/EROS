import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import ImageUrl from '../ImageUrl';
import Colors from '../Colors/colors';

const SearchBar = props => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('search')} style={styles.commonView}>
          <View style={styles.searchView}>
            <View style={styles.searchImgView}>
                <Image style={styles.searchImg} source={ImageUrl.Search} />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.textInput} placeholderTextColor={Colors.Grey}>
                Contact lenses, solutions, glasses...
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    </View>
  );
};
export default SearchBar;