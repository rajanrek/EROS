import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';


const TabNavigation = ({handleTabPress, tapNames, isBrand}) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {

    if (!selectedIndex) setSelectedIndex(0);
  }, []);
  return (
    <View>
      <FlatList
        data={tapNames && tapNames}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item?.MenuId ? item.MenuId : item.Key ? item.Key : index
        }
        renderItem={({item, index}) => (
          <View style={styles.brandList}>
            <TouchableOpacity
              style={styles.brandTouch}
              onPress={() => {
                setSelectedIndex(index);
                handleTabPress && handleTabPress(item);
              }}>
              <Text
                style={
                  index === selectedIndex 
                    ? styles.UnderlineTxt
                    : styles.brandTxt
                }>
                {item?.MenuName
                  ? item?.MenuName
                  :item?.BrandName ? item?.BrandName 
                  : item?.Name ? item?.Name :item?.CategoryName }
              </Text>
            </TouchableOpacity>
            <View
              style={
                index === selectedIndex 
                  ? {
                      width: wp(
                        `${
                          item?.MenuName
                            ? item?.MenuName?.length * 1.8
                           :item?.BrandName ? item?.BrandName?.length * 1.8
                            : item?.Name ? item?.Name?.length * 1.8  : item?.CategoryName?.length * 1.8
                        }`,
                      ),
                      top: hp('0.6%'),
                      height: 2.5,
                      backgroundColor: Colors.Black,
                    }
                  : null
              }
            />
          </View>
        )}
      />
      <View
        style={{
          width: hp('100%'),
          height: 2,
          borderWidth: 1,
          borderColor: Colors.Grey,
        }}
      />
    </View>
  );
};
export default TabNavigation;
