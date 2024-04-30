import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import Button from '../../components/Button/button';
import SelectDropdown from 'react-native-select-dropdown';

import {useDispatch, useSelector} from 'react-redux';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import ImageUrl from '../../components/ImageUrl';
import FgcHeader from '../../components/Header/FgcHeader';
import {getRetrunOrder} from '../../redux/action/actions';

const ReturnOrder = props => {
  const [refundBox, setRefundBox] = useState(false);
  const [refundBoxCheck, setRefundBoxCheck] = useState(false);
  const [opened, setOpened] = useState('');
  const [returnBox, setReturnBox] = useState([]);
  const [comment, setComment] = useState('');
  const [reason, setReason] = useState(null);
  const [exchangeBox, setExchangeBox] = useState(false);
  const [refundCheck, setRefundCheck] = useState(false);
  const navigation = useNavigation();

  const param = props.route.params;

  const dispatch = useDispatch();

  const {registerData, data, returnRequestData} = useSelector(state => ({
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    returnRequestData: state.returnOrder.returnRequest.returnRequestData,
  }));

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const handleReturnBox = id => {
    setReturnBox(prevSelectedSection => {
      if (prevSelectedSection.includes(id)) {
        // If the ID is already selected, remove it from the array
        return prevSelectedSection.filter(selectedId => selectedId !== id);
      } else {
        // If the ID is not selected, add it to the array
        return [...prevSelectedSection, id];
      }
    });
  };

  const OpenedData = ['opened', 'unopened'];

  const ReasonOption = [
    'Incorrect Product',

    'Incorrect Prescription',

    'Prescription updated',

    'Quality Issues',

    'Other: Please specify in the field',
  ];

  const onCommentText = item => {
    setComment(item);
  };

  const handleProceed = () => {
    const reasonType = exchangeBox ? 'exchange' : 'refund';
    const refundType = refundBoxCheck ? 2: 1;

    const postJson = {
      OrderId: param?.item?.OrderId,
      RefundOption: !exchangeBox ? refundType : '',
      ReasonOptionValue: reasonType,
      ReasonText: comment,
      Comments: comment,
      ReturnItems: [
        {
          ProductName: param?.item?.OrderItems[0]?.ProductName,
          Quantity: param?.item?.OrderItems[0]?.Quantity,
          ProductTypeId: param?.item?.OrderItems[0]?.ProductTypeId,
          Prescription: JSON.stringify(param?.item?.OrderItems[0]?.Attributes),
          ReasonId: reason,
          Comments: comment,
        },
      ],
    };

    console.log('Return json', postJson);
    dispatch(getRetrunOrder(postJson));
  };


  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <FgcHeader title={'Return Order'} isSearch={true} />
      </SafeAreaView>
      <View
        style={{
          paddingVertical: hp('2%'),
          backgroundColor: Colors.Common,
          justifyContent: 'center',
          paddingHorizontal: hp('2%'),
        }}>
        <Text
          style={{
            fontFamily: Fonts.OpenSansBold,
            fontSize: 15,
            color: Colors.Black,
          }}>
          Return Order - {param?.item?.OrderRef}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: hp('2%'),
          // paddingVertical: hp('1%'),
        }}>
        <Text
          style={{
            fontFamily: Fonts.OpenSansSemiBold,
            fontSize: 14,
            color: Colors.Grey,
          }}>
          Product to Return :-{' '}
        </Text>
      </View>
      <View
        style={{
          flex: 8,
          paddingHorizontal: hp('1%'),
          // paddingVertical: hp('0.2%'),
        }}>
        <FlatList
          data={param?.item?.OrderItems}
          // showsHorizontalScrollIndicator={false}
          // horizontal={true}
          style={{flex: 1}}
          ItemSeparatorComponent={
            <View style={{height: 1, backgroundColor: 'black'}} />
          }
          renderItem={({item}) => {
            console.log('Item--- 147777', item);
            return (
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('detailsScreen', {
                        ProductId: item?.ProductID,
                      })
                    }
                    style={styles.returnimageView}>
                    <Image
                      style={styles.returnlenseImg}
                      source={{uri: item.ImagePath}}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <CommonCheckBox
                    imageSource={ImageUrl.CheckRing}
                    onToggle={() => handleReturnBox(item?.OrderItemId)}
                    isChecked={returnBox.includes(item?.OrderItemId)}
                    uncheckedImage={ImageUrl.UncheckRing}
                  />

                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 14,
                      color: Colors.Black,
                    }}>
                    {item?.ProductName}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: hp('1.2%'),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 14,
                      color: Colors.Black,
                    }}>
                    Boxes: {item?.Quantity}
                  </Text>

                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 14,
                      color: Colors.Black,
                    }}>
                    {item?.Eye} Eye :{' '}
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 14,
                        color: Colors.Black,
                      }}>
                      {/* Colour: {item?.OrderItems[0]?.Attributes?.Colour},{'\n'} */}
                      Power: {item?.Attributes?.Power},{'\n'}
                      Base Curve: {item?.Attributes?.BaseCurve},{'\n'}
                      Diameter: {item?.Attributes?.Diameter}
                    </Text>
                  </Text>
                </View>

                {returnBox.includes(item?.OrderItemId) && (
                  <View
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: hp('1%'),
                      paddingTop: hp('2%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 14,
                        color: Colors.Black,
                        paddingVertical: hp('1%'),
                      }}>
                      *No. of boxes to return :
                    </Text>

                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {item?.Quantity}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 14,
                        color: Colors.Black,
                        paddingVertical: hp('1%'),
                      }}>
                      * Unopened/Opened:
                    </Text>

                    <SelectDropdown
                      data={OpenedData}
                      onSelect={(selectedItem, index) => {
                        console.log('Select Data--1522--', selectedItem, index);
                        setOpened(selectedItem);
                      }}
                      renderButton={(selectedItem, isOpen) => {
                        return (
                          <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                              {selectedItem || '--Select--'}
                            </Text>
                          </View>
                        );
                      }}
                      renderItem={(item, index, isSelected) => {
                        return (
                          <View
                            style={{
                              ...styles.dropdownItemStyle,
                              ...(isSelected && {
                                backgroundColor: '#D2D9DF',
                              }),
                            }}>
                            <Text style={styles.dropdownItemTxtStyle}>
                              {item}
                            </Text>
                          </View>
                        );
                      }}
                      dropdownStyle={styles.dropdownMenuStyle}
                    />
                    <View style={{paddingVertical: hp('1.2%')}}>
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSansSemiBold,
                          fontSize: 14,
                          color: Colors.Black,
                          paddingVertical: hp('1%'),
                        }}>
                        *Reason for Return (Please Select):
                      </Text>
                      <SelectDropdown
                        data={ReasonOption}
                        onSelect={(selectedItem, index) => {
                          console.log(
                            'Select Data- 15---',
                            selectedItem,
                            index,
                          );
                          setReason(index + 1);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                          return (
                            <View style={styles.dropdownButtonStyle}>
                              <Text style={styles.dropdownButtonTxtStyle}>
                                {selectedItem || 'Select reason'}
                              </Text>
                            </View>
                          );
                        }}
                        renderItem={(item, index, isSelected) => {
                          return (
                            <View
                              style={{
                                ...styles.dropdownItemStyle,
                                ...(isSelected && {
                                  backgroundColor: '#D2D9DF',
                                }),
                              }}>
                              <Text style={styles.dropdownItemTxtStyle}>
                                {item}
                              </Text>
                            </View>
                          );
                        }}
                        dropdownStyle={styles.dropdownMenuStyle}
                      />
                    </View>

                    {reason == 5 ? (
                      <TextInput
                        numberOfLines={6}
                        minHeight={100}
                        onChangeText={text => onCommentText(text)}
                        textAlignVertical="top"
                        multiline={true}
                        placeholderTextColor={Colors.SemiGrey}
                        style={styles.Commentinput}
                        placeholder="comment..."
                        value={comment}
                      />
                    ) : null}

                    {opened == 'opened'
                      ? Alert.alert(
                          'Information',
                          'Please contact our customer services team on 0800 458 2090, message us on LiveChat, Whatsapp us on +44 7810 004 929 or email us at cs@feelgoodcontacts.com to help assist you with the next steps of your return.',
                        )
                      : null}

                    {opened == 'unopened' && reason != null && (
                      <View
                        style={{
                          paddingVertical: hp('1%'),
                          paddingHorizontal: hp('1%'),
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts.OpenSansBold,
                            fontSize: 16,
                            color: Colors.Black,
                            fontWeight: '700',
                            paddingHorizontal: hp('1%'),
                          }}>
                          Please confirm how you would like us to proceed
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                              flex: 1,
                              paddingHorizontal: 40,
                              paddingVertical: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <CommonCheckBox
                                imageSource={ImageUrl.CheckRing}
                                onToggle={() => {
                                  setRefundCheck(false);
                                  setExchangeBox(true);
                                }}
                                isChecked={exchangeBox}
                                uncheckedImage={ImageUrl.UncheckRing}
                              />
                              <Text
                                style={{
                                  fontFamily: Fonts.OpenSansSemiBold,
                                  fontSize: 13,
                                  color: Colors.Black,
                                }}>
                                Exchange
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <CommonCheckBox
                                imageSource={ImageUrl.CheckRing}
                                onToggle={() => {
                                  setRefundCheck(true);
                                  setExchangeBox(false);
                                }}
                                isChecked={refundCheck}
                                uncheckedImage={ImageUrl.UncheckRing}
                              />
                              <Text
                                style={{
                                  fontFamily: Fonts.OpenSansSemiBold,
                                  fontSize: 13,
                                  color: Colors.Black,
                                }}>
                                Refund
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}

                    {refundCheck && opened != 'opened' ? (
                      <View
                        style={{
                          paddingVertical: hp('1%'),
                          paddingHorizontal: hp('1%'),
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts.OpenSansBold,
                            fontSize: 16,
                            color: Colors.Black,
                            fontWeight: '700',
                            paddingHorizontal: hp('3%'),
                          }}>
                          Refund Options
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            // justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              // flexDirection: 'row',
                              // alignItems: 'center',
                              justifyContent: 'space-around',
                              // flex:1,
                              paddingHorizontal: 40,
                              paddingVertical: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <CommonCheckBox
                                imageSource={ImageUrl.CheckRing}
                                onToggle={() => {
                                  setRefundBoxCheck(false);
                                  setRefundBox(true);
                                }}
                                isChecked={refundBox}
                                uncheckedImage={ImageUrl.UncheckRing}
                              />
                              <Text
                                style={{
                                  fontFamily: Fonts.OpenSansSemiBold,
                                  fontSize: 13,
                                  color: Colors.Black,
                                }}>
                                Store Credit (Instantly)*
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <CommonCheckBox
                                imageSource={ImageUrl.CheckRing}
                                onToggle={() => {
                                  setRefundBoxCheck(true);
                                  setRefundBox(false);
                                }}
                                isChecked={refundBoxCheck}
                                uncheckedImage={ImageUrl.UncheckRing}
                              />
                              <Text
                                style={{
                                  fontFamily: Fonts.OpenSansSemiBold,
                                  fontSize: 13,
                                  color: Colors.Black,
                                }}>
                                Original Payment method (3-5 Working Days)
                              </Text>
                            </View>
                          </View>
                        </View>

                        <Text
                          style={{
                            fontFamily: Fonts.OpenSansSemiBold,
                            fontSize: 13,
                            color: Colors.DarkGrey,
                            paddingHorizontal: hp('2.5%'),
                          }}>
                          *Once you have opted for 'Store Credit', you{'\n'}{' '}
                          cannot change your mind. Please see our full T&Cs
                          {'\n'}
                          {''} for more information.
                        </Text>
                      </View>
                    ) : null}
                  </View>
                )}
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: hp('1%'),
                  }}>
                  {(returnBox == item?.OrderItemId && exchangeBox && opened == 'unopened') ||
                  (returnBox == item?.OrderItemId && refundBox && opened == 'unopened' ) ||
                  (returnBox == item?.OrderItemId && refundBoxCheck && opened == 'unopened') 
                  // (returnBox == item?.OrderItemId && opened == 'unopened' ) 
                  ? (
                    <Button
                      onPress={() => handleProceed()}
                      color={Colors.Black}
                      txtColor={Colors.White}
                      title={'Proceed'}
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={{paddingVertical: hp('1.7%')}}>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 15,
                        color: Colors.DarkGrey,
                        textDecorationLine: 'underline',
                        textDecorationColor: 'black',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
export default ReturnOrder;
