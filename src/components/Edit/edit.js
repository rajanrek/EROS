import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/button';
import {useSelector, useDispatch} from 'react-redux';
import {GetOtp, updateBasket} from '../../redux/action/actions';
import Colors from '../../components/Colors/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../CustomsFonts/customFonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ImageUrl from '../ImageUrl';
import { SelectList } from 'react-native-dropdown-select-list'

const Edit = ({item,ProductDetail , openPowerSheet}) => {
  const dispatch = useDispatch();
  const {UpdateBasketData, UpdateBasketisLoading} = useSelector(
    state => state.updateBasketQuantity.updateBasket,
  );
  const [selected, setSelected] = useState("");

  const updateDetails = () => {
    dispatch(updateBasket(postJson));
  };


  const postJson = {
    BasketId: '12DA572D-57D4-4B9B-95BD-4E4B55D17CD6',
    CustomerId: '1186801',
  };


  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.left}>
          <Text style={styles.editTxt}>
            Edit {item[0]?.Value} eye prescription
          </Text>
        </View>

        <View>
          <FlatList
            data={ProductDetail?.Attributes}
            keyExtractor={(item, index) =>
              item?.MenuId ? item.MenuId : item.Key ? item.Key : index
            }
            renderItem={({item, index}) => 
          {    const transformedArray = item?.Attributes.map(item => ({
            key: item.ID,
            value: item.Value,
            disabled: item.IsAutoSelected
          }));
           return   <View style={styles.mainView}>
                <View style={styles.subView}>
                  <Text style={styles.tittleTxt}>{item.Name}</Text>
                </View>
                <View style={styles.subTittleView}>
                  <TouchableOpacity onPress={openPowerSheet} style={styles.numberView}>
                    <Text>---</Text>
{/*                     
                    <SelectList
                      setSelected={val =>onSelectedValue(val)}
                      data={transformedArray}
                      onSelect={()=>onSelectedValue(selected)}
                      save="value"
                      placeholder="---"
                      // search={false}
                    /> */}
                  </TouchableOpacity>
                </View>
              </View>}
            }
          />
        </View>

        <View style={styles.stockView}>
          {/* <Text style={styles.stockTxt}>Out of stock</Text> */}
          <View style={styles.btnView}>
            <Button
              onPress={updateDetails}
              color={Colors.Black}
              txtColor={Colors.White}
              title={'Update details'}
            />
            {/* <Button
              onPress={updateDetails}
              color={Colors.Black}
              txtColor={Colors.White}
              title={'Change And Reorder'}
            /> */}
          </View>
          <Text style={styles.estimatedTxt}>
            Estimated Delivery is{' '}
            <Text style={styles.tommorrowTxt}>tomorrow</Text>
          </Text>
          <Text style={styles.estimatedTxt}>
            Order within<Text style={styles.tommorrowTxt}> 12hrs 54mins</Text>{' '}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Edit;
