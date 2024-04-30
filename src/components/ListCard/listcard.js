import React, {useState} from 'react';
import {View, Text, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './styles';
import ImageUrl from '../ImageUrl';

export const ListCard = ({item, handleCardPress}) => {
  return (
    <TouchableOpacity onPress={()=>handleCardPress(item)} style={styles.mainContainer}>
      <View style={styles.ImageContainer}>
        <View style={styles.ImageView}>
          <Image style={styles.img} source={{uri: item?.ImageUrl}} />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text>{item.Name}</Text>
      </View>
    </TouchableOpacity>
  );
};
