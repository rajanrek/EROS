import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/button';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../components/Colors/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import FgcHeader from '../../components/Header/FgcHeader';
import RBSheet from 'react-native-raw-bottom-sheet';
import {addBasket} from '../../redux/action/actions';
import {SkypeIndicator} from 'react-native-indicators';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import { Image } from 'react-native';
import ImageUrl from '../../components/ImageUrl';

const LenseEdit = props => {
  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color:  Colors.Green,
    },
    a: {
      color: 'black',
    },
  };
  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const {width} = useWindowDimensions();

  const dispatch = useDispatch();
  const {detailsData, basketToken, registerData, data, detailsLoading} =
    useSelector(state => ({
      detailsData: state.details.Details.detailsData,
      detailsLoading: state.details.Details.detailsLoading,
      basketToken: state.loginuser.user.basketToken,
      registerData: state.newuser.user.registerData,
      data: state.loginuser.user.data,
    }));
  const [selected, setSelected] = useState([]);
  const [mainData, setMainData] = useState('');
  const [selectedValues, setSelectedValues] = useState({});
  const [leftAttributes, setLeftAttributes] = useState([]);
  const [modifedDataAttributes, setDataModified] = useState([]);
  const [UnselectedValue, setUnselectedValue] = useState([]);
  const [Trigger, setTriger] = useState(false);

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  const {item} = props?.route?.params;
  console.log('params in lense===', item);
  const navigation = useNavigation();
  const ProductDetail = detailsData?.ResultData?.ProductDetail;
  const combineLeft = [...modifedDataAttributes, ...UnselectedValue]
  
  const postJson = {
    IsEdit: true,
    CustomerId: apiData?.CustomerId,
    BasketId: basketToken,
    CustBasketId: item?.CustBasketId,
    ProductId: item?.ProductID,
    ProductCode: item?.ProductCode,
    ProductTypeId: item?.ProductTypeId,
    QtyLeft: item?.Eye === 'Left' ? item?.Quantity : 0,
    QtyRight: item?.Eye === 'Right' ? item?.Quantity : 0,
    DispatchDate: 'Today',
    IsProductNotInStock: false,
    LeftAttributes: item?.Eye === 'Left' ? combineLeft : '',
    RightAttributes: item?.Eye === 'Right' ? combineLeft : '',
  };
  useEffect(() => {
    let newData = leftAttributes.map(item => ({
      ID: item.currentAttributeId,
      ValueId: item.ID,
      Value: item.Value,

      // Discarding the old keys using destructuring
      // [delete item.ID]: null,
      // [delete item.Value]: null,
    }));
    setDataModified(newData);
  }, [leftAttributes]);


  useEffect(() => {
    let newArr = [];
    let mainData = modifedDataAttributes;
    let updatedData = ProductDetail?.Attributes?.map(item => {
      let parentAttributeId = item.AttributeId;
      if (item.Attributes?.length <= 1) {
        item.Attributes.map(item => {
          let rawItem = JSON.parse(JSON.stringify(item));
          rawItem.ID = parentAttributeId;
          (rawItem.ValueId = item.ID), newArr.push(rawItem);
        });
      }
    });
    // if(IsColorSelected){
    //   setUnselectedValue(newArr);
    // }
    setUnselectedValue(newArr);
  }, [mainData, leftAttributes]);
  const tempMinus = [];
  const tempPlus = [];
  //do not remove below code
  const dataML =
    selected?.Attributes?.length > 0 &&
    selected.Attributes.map(items => {
      if (items?.Value?.includes('-')) {
        tempMinus.push(items);
      } else {
        tempPlus.push(items);
      }
    });
  const powerRBSheet = useRef();
  const openPowerSheet = item => {
    setTriger(true);
    setSelected(item);
    console.log('openpower sheet', item);
    setSelectedValues(prevValues => ({
      ...prevValues,
      currentAttributeId: item?.AttributeId,
    }));
    setTimeout(() => {
      powerRBSheet.current.open();
    }, 100);
  };

  const onSelectedValue = (Value, item) => {
    setTriger(true);
    const currentAttributeId = selectedValues?.currentAttributeId;
    const valueToSet = Value;
    let rawItemLeft = JSON.parse(JSON.stringify(item));
    rawItemLeft.currentAttributeId = currentAttributeId;
    rawItemLeft.selectedValue = valueToSet; // Update selectedValue
    console.log('currentAttributeId=====', currentAttributeId);

    const existingIndexLeft = leftAttributes.findIndex(
      attr => attr.currentAttributeId === currentAttributeId,
    );
    if (existingIndexLeft !== -1) {
      // Override the existing item with the new rawItemLeft
      const updatedLeftAttributes = [...leftAttributes];
      updatedLeftAttributes[existingIndexLeft] = rawItemLeft; // Update the specific index
      setLeftAttributes(updatedLeftAttributes);
    } else {
      // Add the new rawItemLeft to the leftAttributes array
      setLeftAttributes([...leftAttributes, rawItemLeft]);
    }
    // setSelectedItem(item);
    setSelectedValues(prevState => ({
      ...prevState,
      [currentAttributeId]: Value,
      currentAttributeId: null,
    }));
    powerRBSheet.current.close();
  };
  const updateDetails = () => {
    if(combineLeft.length !== ProductDetail?.Attributes?.length){
      Alert.alert("Please Edit All the fields")
    }else{
      let endPoint = `${apiData?.CodeToAppend}/AddToBasket`;
      dispatch(addBasket(endPoint, postJson));
      navigation.navigate('mybasket');
      setTriger(false);
    }
   
  };
  useEffect(() => {
    setTriger(false);
    setMainData(item?.ItemAttributes);
  }, []);

  const renderDropdownItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onSelectedValue(item.Value, item)}
      style={{
        flex: 1,
        backgroundColor: '#e1e4e6',
        marginVertical: 3,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 16, color: 'black'}}>{item.Value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <FgcHeader  title={`Edit ${item?.Eye} Lense Prescription`} />
      </SafeAreaView>

      <View style={{flex: 6, paddingVertical: 10, paddingHorizontal: 10}}>
        <FlatList
          data={ProductDetail?.Attributes}
          keyExtractor={(item, index) => `${item.AttributeId}-${index}`}
          style={{borderWidth: 0.5, borderRadius: 10, borderColor: 'grey'}}
          renderItem={({item, index}) => {
            let names =
              mainData?.length > 0 && mainData?.slice(1).map(val => val.Value);
            return (
              <View style={styles.mainView}>
                <View style={styles.subView}>
                  <Text style={styles.tittleTxt}>{item.Name}</Text>
                </View>
                <View style={styles.subTittleView}>
                  <TouchableOpacity
                    onPress={() => openPowerSheet(item)}
                    style={styles.numberView}>
                    <Text style={{fontSize: 14, color: 'black'}}>
                      {selectedValues[item.AttributeId]
                        ? selectedValues[item.AttributeId]
                        : names[index]}
                    </Text>
                    {item.Attributes?.length > 1 &&
                    <Image
                    resizeMode="contain"
                    style={styles.arrowImg}
                    source={ImageUrl.DownArrow}

                  />}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
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
        </View>
        <View style={{paddingVertical: 4, alignItems: 'center'}}>
          <Text style={styles.instockTxt}>
            {ProductDetail?.DispatchDetails?.MessageList.length > 0 &&
              ProductDetail?.DispatchDetails?.MessageList[0]?.value}
          </Text>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <Text style={styles.estimatedTxt}>
              {ProductDetail?.DispatchDetails?.MessageList.length > 0 &&
                ProductDetail?.DispatchDetails?.MessageList[1]?.key}
            </Text>
            <RenderHtml
              contentWidth={width}
              customHTMLElementModels={customHTMLElementModels}
              source={{
                html:
                  ProductDetail?.DispatchDetails?.MessageList?.length > 0 &&
                  ProductDetail?.DispatchDetails?.MessageList[1]?.value,
              }}
              tagsStyles={tagsStyles}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.estimatedTxt}>
              {ProductDetail?.DispatchDetails?.MessageList?.length > 0 &&
                ProductDetail?.DispatchDetails?.MessageList[2]?.key}
            </Text>
            <RenderHtml
              contentWidth={width}
              customHTMLElementModels={customHTMLElementModels}
              source={{
                html:
                  ProductDetail?.DispatchDetails?.MessageList?.length > 0 &&
                  ProductDetail?.DispatchDetails?.MessageList[2]?.value,
              }}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </View>
      <RBSheet
        ref={powerRBSheet}
        height={hp('56%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        {selected.AttributeId === 1 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 4}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 10,
                }}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>Minus</Text>
              </View>
              <FlatList
                data={tempMinus?.reverse()}
                renderItem={renderDropdownItem}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                style={{marginBottom: hp('6%')}}
              />
            </View>

            <View style={{width: 1, backgroundColor: Colors.LightGrey}} />
            <View style={{flex: 4}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 10,
                }}>
                <Text style={{fontSize: 17, fontWeight: '700'}}>Plus</Text>
              </View>
              <FlatList
                data={tempPlus}
                renderItem={renderDropdownItem}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                style={{marginBottom: hp('6%')}}
              />
            </View>
          </View>
        ) : (
          <View style={{flex: 4}}>
            <FlatList
              data={selected.Attributes}
              renderItem={renderDropdownItem}
              keyExtractor={item => `${item.id}`}
              showsVerticalScrollIndicator={false}
              style={{marginBottom: hp('6%')}}
            />
          </View>
        )}
      </RBSheet>
      {detailsLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};

export default LenseEdit;
