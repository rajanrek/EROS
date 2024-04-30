import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import ImageUrl from '../ImageUrl';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../Colors/colors';
import RenderHtml from 'react-native-render-html';
import RBSheet from 'react-native-raw-bottom-sheet';
import WriteReview from '../WriteReview/writeReview';
import SelectDropdown from 'react-native-select-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import SetAutoReplenish from '../SetAutoReplenish/setAutoReplenish';
import Edit from '../Edit/edit';
import DeliveryAddress from '../../screens/AddDeliveryAddress/addDeliveryAddress';
import {
  postCancelAutoReplenish,
  postChangeAutoAddress,
  getReorder,
} from '../../redux/action/actions';
import Fonts from '../CustomsFonts/customFonts';
import CommonCheckBox from '../commonCheckbox/commonCheckbox';
import Button from '../../components/Button/button';
import ConfigUrl from '../../ConfigUrl/configUrl';
import Global from '../../utils/Global';
import {getBasketTokenAction} from '../../redux/slices/loginUserSlice';
import Globals from '../../utils/constant';

const OrdersCard = ({
  item,
  handleBtn,
  handleApi,
  HandleUploadPrescription,
  HandleCancelOrder,
  handledeliverySheet,
}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [type, setType] = useState('');
  const [glassDetail, setGlassDetail] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [replenishData, setReplenishData] = useState(null);
  const [checkBox, setCheckBox] = useState(0);
  const [refundBox, setRefundBox] = useState(0);
  const [comment, setComment] = useState('');
  const [basketNavigationStatus, setBasketNavigationStatus] = useState(false);

  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const cancelRBSheet = useRef();
  const menuRBSheet = useRef();
  const orderRBSheet = useRef();
  const cancelOrderRBSheet = useRef();


  const {
    registerData,
    data,
    ChangeAutoAddressData,
    CancelAutoreplenishData,
    Reorder,
    ChangeScheduleDateData,
    reorderLoadingStatus,
  } = useSelector(state => ({
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    ChangeAutoAddressData: state.autoAddressChange.ChangeAutoAddress,
    CancelAutoreplenishData: state.autoReplenishCancel.CancelAutoreplenish,
    Reorder: state.reorderCall.ReorderData.ReorderScreenData,
    reorderLoadingStatus: state.reorderCall.ReorderData.reorderLoadingStatus,
    ChangeScheduleDateData: state.scheduleDateChange.ChangeScheduleDate,
  }));
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleOpenRBSheet = item => {
    setSelectedData(item);
    refRBSheet.current.open();
  };

  const handleMenuRBSheet = item => {
    menuRBSheet.current.open();
  };

  const handleOrderRBSheet = item => {
    orderRBSheet.current.open();
  };

  const handledeliveryRBSheet = item => {
    menuRBSheet.current.close();
setTimeout(() => {
  handledeliverySheet(item);
  
}, 1000);
  };

  const handleCloseSheet = () => {
    refRBSheet.current.close();
  };

  const handleOpenSheet = (item, type) => {
    setType(type);
    setReplenishData(item);
    menuRBSheet.current.close();
    setTimeout(() => {
    refRBSheet.current.open();
      
    }, 1000);

  };

  const handleCancel = item => {
    menuRBSheet.current.close();

    setTimeout(() => {
    cancelRBSheet.current.open();
      
    }, 1000);
  };

  const handleCancelOrder = () => {
    menuRBSheet.current.close();
    setTimeout(() => {
      cancelOrderRBSheet.current.open();
        
      }, 1000);
    
  };

  const handleReturnOrder = item => {
    navigation.navigate('returnOrder', {item});
  };

  const tagsStyle = {
    body: {
      whiteSpace: 'normal',
      color:Colors.Black
    },
    a: {
      color: 'black'
    }
  }

  const RenderTitle = () => {
    return (
      <RenderHtml
        contentWidth={width}
        source={{html: item?.OrderItems[0]?.GlassPrescriptionHtml}}
        tagsStyles={tagsStyle}
      />
    );
  };


  const handleCancelUpdate = () => {
    cancelRBSheet.current.close();
    const updateCancelJson = {
      CustomerId: apiData?.CustomerId,
      AutoReOrderId: item?.AutoReOrderId,
      AppVersion: 1,
    };

    dispatch(postCancelAutoReplenish(updateCancelJson));
  };

  const callCheckout = () => {
    orderRBSheet.current.close();
    let reorderPostJson = {
      OrderId: item?.OrderId,
      CampaignCodes: '',
      EditOrderItemId: 0,
      CustomerId: apiData?.CustomerId,
      EditProductId: 0,
    };
 
    dispatch(getReorder(reorderPostJson));
    setBasketNavigationStatus(true);
  
  };

  useEffect(() => {
    if (reorderLoadingStatus == false && basketNavigationStatus == true) {
      console.log('log outer----', Reorder?.ResultData?.BasketId);
      Globals.globalBasket = Reorder?.ResultData?.BasketId;
      Global.GlobalBasketId = Reorder?.ResultData?.BasketId;
      dispatch(getBasketTokenAction(Reorder?.ResultData?.BasketId));
      navigation.navigate('mybasket');
    }
  }, [Reorder?.ResultData?.BasketId]);

  const handleToggle = id => {
    setCheckBox(prevSelectedSection => (prevSelectedSection === id ? '' : id));
  };

  const handleRefundToggle = id => {
    setRefundBox(prevSelectedSection => (prevSelectedSection === id ? '' : id));
  };

  const DATA = [
    {
      id: '1',
      title: 'Incorrect product',
    },
    {
      id: '2',
      title: 'Product not in stock',
    },
    {
      id: '3',
      title: 'Wrong size',
    },
    {
      id: '4',
      title: 'Duplicate Order',
    },
    {
      id: '5',
      title: 'Incorrect prescription',
    },
    {
      id: '6',
      title: 'Forgot to add discount',
    },
    {
      id: '7',
      title: 'Incorrect delivery address',
    },
    {
      id: '8',
      title: 'Others',
    },
  ];

  const Option = [
    {
      id: '1',
      title: 'Store Credit (Instantly)*',
    },
    {
      id: '2',
      title: 'Original Payment method (3-5 Working Days)',
    },
  ];

  const onCommentText = item => {
    setComment(item);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.borderView}>
          {!item?.AutoReOrderId && (
            <>
              {item?.PayPalOrderMsg !== null && (
                <Text
                  style={{
                    paddingHorizontal: hp('2%'),
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 14,
                    color: Colors.Red,
                  }}>
                  {item?.PayPalOrderMsg}
                </Text>
              )}
              <View style={styles.orderMenu}>
                <View style={styles.refView}>
                  <Text style={styles.refTxt}>
                    Ref: <Text style={styles.fgTxt}>{item?.OrderRef}</Text>
                  </Text>
                  <Text style={styles.dateTxt}>
                    Date: <Text style={styles.date}>{item?.OrderDate}</Text>
                  </Text>
                  <Text style={styles.status}>
                    Status: <Text style={styles.shipped}>{item.Status}</Text>
                  </Text>
                </View>
                {!handleBtn && (
                  <TouchableOpacity
                    onPress={() => {
                      handleOrderRBSheet(item);
                    }}
                    style={{paddingLeft: hp('2%')}}>
                    <Image
                      resizeMode="contain"
                      style={{height: hp('2.5%'), width: hp('5%')}}
                      source={ImageUrl.Menu}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
          {item?.AutoReOrderId && (
            <View style={{flex: 1}}>
              <View style={styles.menuView}>
                <View style={{flex: 8}}>
                  <Text style={styles.fgTxt}>{item?.ScheduleDateMessage}</Text>
                </View>
                <View style={{flex: 2}}>
                  <TouchableOpacity
                    onPress={() => handleMenuRBSheet(item)}
                    style={{alignItems: 'flex-end', paddingVertical: 10}}>
                    <Image
                      resizeMode="contain"
                      style={{height: hp('2.5%'), width: hp('3.5%')}}
                      source={ImageUrl.Menu}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.refView}>
                <Text style={styles.refTxt}>
                  Name:<Text style={styles.fgTxt}>{item?.Name}</Text>
                </Text>
              </View>
            </View>
          )}
          <FlatList
            data={item?.OrderItems}
            ItemSeparatorComponent={<View style={styles.separator} />}
            // keyExtractor={item => item.id}
            keyExtractor={(item, index) => (item.id ? item.id : index)}
            renderItem={({item}) => (
              <View style={styles.image}>
                <View style={styles.contentView}>
                  <View style={styles.subContentView}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('detailsScreen', {
                          ProductId: item?.ProductID,
                        })
                      }
                      style={styles.imageView}>
                      <Image
                        resizeMode="contain"
                        style={styles.lenseImg}
                        source={{uri: item?.ImagePath}}
                      />
                    </TouchableOpacity>
                    <View style={styles.moistView}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('detailsScreen', {
                            ProductId: item?.ProductID,
                          })
                        }>
                        <Text style={styles.acuveTxt}>{item.ProductName}</Text>
                      </TouchableOpacity>
                      {item?.ProductTypeId == 7 && (
                        <View style={styles.polygonView}>
                          <View style={styles.polygonSubView}>
                            <Text style={styles.polysubTitleView}>
                              Lenses Details{' '}
                            </Text>
                            {glassDetail == false ? (
                              <TouchableOpacity
                                onPress={() => setGlassDetail(true)}
                                style={styles.arrow}>
                                <Image
                                  resizeMode="contain"
                                  style={styles.arrowImg}
                                  source={ImageUrl.Polygon}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => setGlassDetail(false)}
                                style={styles.arrow}>
                                <Image
                                  resizeMode="contain"
                                  style={styles.arrowImg}
                                  source={ImageUrl.Polygon}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      )}
                      {glassDetail && RenderTitle()}

                      <>
                        {item?.ProductTypeId == 1 && (
                          <Text style={styles.rightEyeTxt}>
                            {item?.Eye} Eye{' '}
                            <Text style={styles.powerTxt}>
                              [Power: {item?.Attributes?.Power}, Base Curve:{' '}
                              {item?.Attributes?.BaseCurve}, Diameter:{' '}
                              {item?.Attributes?.Diameter}]{' '}
                            </Text>
                          </Text>
                        )}

                        {item?.ProductId == 0 && (
                          <Text style={styles.rightEyeTxt}>
                            {item?.Eye} Eye{' '}
                            <Text style={styles.powerTxt}>
                              {item?.AttributesText}
                            </Text>
                          </Text>
                        )}
                        <Text style={styles.boxTxt}>
                          Boxes: {item?.Quantity}
                        </Text>
                        {/* 
                        {item?.ProductTypeId == 1 && (
                          <TouchableOpacity
                          // onPress={() => refRBSheet.current.open()}
                          >
                            <Text style={styles.changeTxt}>
                              Change Prescription & Reorder
                            </Text>
                          </TouchableOpacity>
                        )} */}
                      </>
                    </View>
                  </View>
                </View>
                {!handleBtn && (
                  <View style={styles.btnView}>
                    <View style={styles.btnsubView}>
                      <TouchableOpacity
                        onPress={() => handleOpenRBSheet(item)}
                        style={styles.writeBtn}>
                        <Text style={styles.autoBtnTxt}>Write a Review</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}
          />

          {handleBtn && (
            <View style={styles.btnView}>
              {!item?.AutoReOrderId ? (
                <View style={styles.replenishView}>
                  <TouchableOpacity
                    onPress={() => handleOpenSheet(item, 1)}
                    style={styles.replenish}>
                    <Text style={styles.btnTxt}>Set Auto-replenish</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )}

          {!handleBtn ? (
            <RBSheet
              ref={refRBSheet}
              height={hp('45%')}
              openDuration={250}
              closeOnDragDown={true}
              animationType="fade"
              customStyles={{
                container: {
                  backgroundColor: Colors.LightWhite,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                },
              }}>
              <WriteReview
                selectedData={selectedData}
                onClose={handleCloseRBSheet}
              />
            </RBSheet>
          ) : (
            <RBSheet
              ref={refRBSheet}
              height={hp('95%')}
              openDuration={250}
              closeOnDragDown={true}
              animationType="fade"
              customStyles={{
                container: {
                  backgroundColor: Colors.LightWhite,
                },
              }}>
              <SetAutoReplenish
                selectedData={replenishData}
                onClose={handleCloseSheet}
                handleBtn={handleBtn}
                // handleDate={handleDate}
                handleApi={handleApi}
                type={type}
              />
            </RBSheet>
          )}

          <RBSheet
            ref={cancelRBSheet}
            height={hp('25%')}
            openDuration={250}
            closeOnDragDown={true}
            animationType="fade"
            customStyles={{
              container: {
                backgroundColor: Colors.LightWhite,
              },
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingHorizontal: hp('0.4%'),
              }}>
              <Text style={styles.cancelbtnTxt}>
                Do you really want to Cancel your Auto-Replenish Schedule ?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: hp('7%'),
                }}>
                <View
                  style={{
                    paddingHorizontal: hp('2.5%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => handleCancelUpdate(item)}
                    style={{
                      borderRadius: 5,
                      backgroundColor: Colors.Black,
                      paddingHorizontal: hp('3.5%'),
                      paddingVertical: hp('1%'),
                      alignItems: 'center',
                    }}>
                    <Text style={styles.btnTxt}>Yes</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    paddingHorizontal: hp('2.5%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => cancelRBSheet.current.close()}
                    style={{
                      borderRadius: 5,
                      backgroundColor: Colors.Black,
                      paddingHorizontal: hp('3.5%'),
                      paddingVertical: hp('1%'),
                      alignItems: 'center',
                    }}>
                    <Text style={styles.btnTxt}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </RBSheet>
        </View>
      </View>

      <RBSheet
        ref={menuRBSheet}
        height={hp('35%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1.5,
              backgroundColor: Colors.newGrey,
              paddingVertical: hp('1.5%'),
              paddingHorizontal: hp('2.5%'),
            }}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansSemiBold,
                fontSize: 16,
                color: Colors.Black,
              }}>
              {item?.OrderItems[0]?.ProductName}
            </Text>
          </View>
          <View style={{flex: 8.5}}>
            <View
              style={{paddingHorizontal: hp('2%'), paddingVertical: hp('1%')}}>
              <TouchableOpacity
                onPress={() => handleOpenSheet(item, 2)}
                style={{
                  borderColor: Colors.Black,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingVertical: hp('1.5%'),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  {' '}
                  Reschedule Date{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: hp('2%'),
                paddingVertical: hp('0.5%'),
              }}>
              <TouchableOpacity
                onPress={() => handledeliveryRBSheet(item)}
                style={{
                  borderColor: Colors.Black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  paddingVertical: hp('1.5%'),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  Change Delivery Address
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{paddingHorizontal: hp('2%'), paddingVertical: hp('1%')}}>
              <TouchableOpacity
                onPress={() => handleCancel(item)}
                style={{
                  borderColor: Colors.Black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  paddingVertical: hp('1.5%'),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.OpenSansSemiBold,
                    fontSize: 16,
                    color: Colors.Black,
                  }}>
                  {' '}
                  Cancel Auto-Replenish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>

      <RBSheet
        ref={orderRBSheet}
        height={hp('42%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <View style={{}}>
          <View
            style={{
              backgroundColor: Colors.Common,
              paddingVertical: hp('2%'),
              paddingHorizontal: hp('2.5%'),
            }}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansSemiBold,
                fontSize: 16,
                color: Colors.Black,
              }}>
              {item?.OrderRef}
            </Text>
          </View>
          <View style={{}}>
            {item?.AllowReorder == true && (
              <View
                style={{
                  paddingHorizontal: hp('2%'),
                  paddingVertical: hp('1%'),
                }}>
                <TouchableOpacity
                  onPress={() => callCheckout()}
                  style={{
                    borderColor: Colors.Black,
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingVertical: hp('1.5%'),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    {' '}
                    Reorder{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {item?.AllowCancel == true && (
              <View
                style={{
                  paddingHorizontal: hp('2%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    orderRBSheet.current.close();
                    handleCancelOrder();
                  }}
                  style={{
                    borderColor: Colors.Black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: 'center',
                    paddingVertical: hp('1.5%'),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    Cancel Order
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {
              // item?.OrderItems[0]?.ProductTypeId == 7 &&
              item?.UploadPrescription == true && (
                <View
                  style={{
                    paddingHorizontal: hp('2%'),
                    paddingVertical: hp('1%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      orderRBSheet.current.close();
                      setTimeout(() => {
                        HandleUploadPrescription(item);
                      }, 1000);
                    }}
                    style={{
                      borderColor: Colors.Black,
                      borderWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      paddingVertical: hp('1.5%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 16,
                        color: Colors.Black,
                      }}>
                      {' '}
                      Upload Prescription
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }

            {item?.Status == 'Shipped' &&
              item?.OrderItems[0]?.ProductTypeId == 1 && (
                <View
                  style={{
                    paddingHorizontal: hp('2%'),
                    paddingVertical: hp('1%'),
                  }}>
                  <TouchableOpacity
                    style={{
                      borderColor: Colors.Black,
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingVertical: hp('1.5%'),
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 16,
                        color: Colors.Black,
                      }}>
                      {' '}
                      Change Prescription
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

            {item?.AllowReturn == true && (
              <View
                style={{
                  paddingHorizontal: hp('2%'),
                  paddingVertical: hp('1%'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    orderRBSheet.current.close();
                    handleReturnOrder(item);
                  }}
                  style={{
                    borderColor: Colors.Black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: 'center',
                    paddingVertical: hp('1.5%'),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    {' '}
                    Return Order
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {item?.ReturnLabel != null && (
              <View
                style={{
                  paddingHorizontal: hp('2%'),
                  paddingVertical: hp('1%'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    orderRBSheet.current.close();
                    navigation.navigate('fgcWebView', ConfigUrl.RETURN_LABEL);
                  }}
                  style={{
                    borderColor: Colors.Black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: 'center',
                    paddingVertical: hp('1.5%'),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    {' '}
                    Create a Returns Label
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {item?.TrackingUrl != '' && (
              <View
                style={{
                  paddingHorizontal: hp('2%'),
                  paddingVertical: hp('1%'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    orderRBSheet.current.close();
                    navigation.navigate('fgcWebView', item?.TrackingUrl);
                  }}
                  style={{
                    borderColor: Colors.Black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: 'center',
                    paddingVertical: hp('1.5%'),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansSemiBold,
                      fontSize: 16,
                      color: Colors.Black,
                    }}>
                    {' '}
                    Track Order
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </RBSheet>

      <RBSheet
        ref={cancelOrderRBSheet}
        height={hp('98%')}
        openDuration={250}
        closeOnDragDown={true}
        onClose={()=>setRefundBox(0)}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <View style={{}}>
          <View
            style={{
              paddingVertical: hp('1.5%'),
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
              Reason for cancellation :
            </Text>
          </View>
          <View
            style={{paddingHorizontal: hp('1%'), paddingVertical: hp('0.2%')}}>
            <FlatList
              data={DATA}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{}}>
                    <CommonCheckBox
                      imageSource={ImageUrl.UncheckRing}
                      onToggle={() => handleToggle(item.id)}
                      isChecked={checkBox != item.id}
                      uncheckedImage={ImageUrl.CheckRing}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 13,
                        color: Colors.Black,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{paddingHorizontal: hp('2.3%')}}>
            <TextInput
              numberOfLines={6}
              minHeight={55}
              onChangeText={text => onCommentText(text)}
              textAlignVertical="top"
              multiline={true}
              placeholderTextColor={Colors.SemiGrey}
              style={styles.Commentinput}
              placeholder="comment..."
              value={comment}
            />
          </View>
          {checkBox == 4 || checkBox == 8 || checkBox == 0 ? (
            <View
              style={{paddingVertical: hp('1%'), paddingHorizontal: hp('1%')}}>
              <Text
                style={{
                  fontFamily: Fonts.OpenSansBold,
                  fontSize: 16,
                  color: Colors.Black,
                  fontWeight: '700',
                  paddingHorizontal: hp('1%'),
                }}>
                Refund Options
              </Text>
              <FlatList
                data={Option}
                renderItem={({item}) => (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CommonCheckBox
                      imageSource={ImageUrl.UncheckRing}
                      onToggle={() => handleRefundToggle(item.id)}
                      isChecked={refundBox != item.id}
                      uncheckedImage={ImageUrl.CheckRing}
                    />

                    <View>
                      <Text
                        style={{
                          fontFamily: Fonts.OpenSansSemiBold,
                          fontSize: 13,
                          color: Colors.Black,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />

              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 13,
                  color: Colors.DarkGrey,
                  paddingHorizontal: hp('2.5%'),
                }}>
                *Once you have opted for 'Store Credit', you{'\n'} cannot change
                your mind. Please see our full T&Cs{'\n'}
                {''} for more information.
              </Text>
            </View>
          ) : (
            <View style={{paddingVertical: hp('3%')}}>
              <Text
                style={{
                  fontFamily: Fonts.OpenSansSemiBold,
                  fontSize: 13,
                  color: Colors.Red,
                  paddingHorizontal: hp('2.5%'),
                }}>
                We can update your order without cancelling, simply contact our
                customer service team on 0800 458 2090, message us on LiveChat,
                Whatsapp +447810 004 929 or email us at cs@feelgoodcontacts.com.
                Alternatively, please click "Proceed" and a member of our team
                will be in touch shortly.
              </Text>
            </View>
          )}

          <View style={{alignItems: 'center', paddingVertical: hp('2.5%')}}>
          {refundBox !=0 &&  <Button
              onPress={() => {
                cancelOrderRBSheet.current.close();
                setTimeout(() => {
                  HandleCancelOrder(item, checkBox, comment, refundBox);
                }, 1000);
              }}
              color={Colors.Black}
              txtColor={Colors.White}
              title={'Proceed'}
            />}
            <TouchableOpacity
              onPress={() => {
                cancelOrderRBSheet.current.close();
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
      </RBSheet>
    </View>
  );
};

export default OrdersCard;
