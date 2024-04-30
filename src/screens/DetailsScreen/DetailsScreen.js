import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import styles from './styles';
import ImageUrl from '../../components/ImageUrl';
import FgcHeader from '../../components/Header/FgcHeader';
// import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Card from '../../components/Card/card';
import Reviews from '../../components/Reviews/reviews';
import AddBasket from '../../components/AddBasket/addBasket';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddWishlist,
  GetProductId,
  addBasket,
  getDetailsPage,
  getStock,
} from '../../redux/action/actions';
import {SkypeIndicator} from 'react-native-indicators';
import {SliderBox} from 'react-native-image-slider-box';
import CheckBox from '@react-native-community/checkbox';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import GlassDetail from '../../components/GlassDetail/glassDetail';
import {getBasketData} from '../../redux/slices/loginUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import {getaddBasketRemoveAction} from '../../redux/slices/addToBasketSlice';
import {getStockDataSuccessAction} from '../../redux/slices/getStockSlice';
import {upgradeProductSuccessAction} from '../../redux/slices/upgradeProductSlice';
import {useToast} from 'react-native-toast-notifications';
import ImageViewer from 'react-native-image-zoom-viewer';
const DetailsScreen = props => {
  const [detail, setDetail] = useState(false);
  const [leftAttributes, setLeftAttributes] = useState([]);
  const [rightAttributes, setRightAttributes] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [leftAttri, setLeftAttri] = useState([]);
  const [rightAttri, setRightAttri] = useState([]);
  const [productMeasurement, setProductMeasor] = useState(false);
  const [Description, setDescription] = useState(true);
  const [handleCalled, setHandleCalled] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(null); // Track active tab
  const [Boxes, setBoxs] = useState('');
  const dispatch = useDispatch();
  const [packs, setPacks] = useState(true);
  const [leftQty, setLeftQty] = useState(null);
  const [rightQty, setRightQty] = useState(null);
  const [toggleCheckBoxRight, setToggleCheckBoxRight] = useState(true);
  const [toggleCheckBoxLeft, setToggleCheckBoxLeft] = useState(true);
  const {width} = useWindowDimensions();
  const [selectedValues, setSelectedValues] = useState(null);
  const [selectedValuesRight, setSelectedValuesRight] = useState(null);
  const [currentSide, setCurrentSide] = useState('');
  const [unselectedValue, setUnselectedValue] = useState([]);
  const refRBSheet = useRef();
  const upgradRBSheet = useRef();
  const [GlassId, setGlassColorId] = useState('');
  const [IsColorSelected, setIsColorSelected] = useState(false);
  const [canNavigate, setCanNavigate] = useState(false);
  const [selectedColour, setSelectedColor] = useState(null);
  const [colourQty, setColourQty] = useState(null);
  const [stockError, setStockError] = useState('');
  const [AltId] = useState('');
  const [trigger2, setTriger2] = useState(true);
  const [openImageModel, setOpenImageModel] = useState(false);
  const [SelectedImgIndex, setSelectedImgIndex] = useState('');

  const param = props.route.params;
  // const param2 = props.route?.name ? props.route?.name : props.route.params;

  const {
    data,
    registerData,
    AddBasketData,
    AddBasketisLoading,
    loginBasketData,
    stockData,
    basketToken,
    UpgradeProdcutObj,
    addWishlist,
  } = useSelector(state => ({
    data: state.loginuser.user.data,
    registerData: state.newuser.user.registerData,
    AddBasketData: state.addToBasket.addBasket.AddBasketData,
    AddBasketisLoading: state.addToBasket.addBasket.AddBasketisLoading,
    loginBasketData: state.loginuser.user.loginBasketData,
    stockData: state.stocksSlice.Stocks.stockData,
    basketToken: state.loginuser.user.basketToken,
    UpgradeProdcutObj: state.upgradeProdcut.UpgradeProdcutObj,
    addWishlist: state.addWishlist.AddWishlist.addWishlist,
  }));

  const {productId, productisLoading} = useSelector(
    state => state.productId.product,
  ); 

  const {detailsLoading, detailsData, AddBasketErrors} = useSelector(
    state => state.details.Details,
  );
  let mainData = detailsData?.ResultData?.ProductDetail;

  let DetailData = detailsData?.ResultData?.ProductDetailMore;
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  let tempBasketId = loginBasketData?.loginResponse?.ResultData?.BasketId;

  let newBasketId = basketToken;

  const combinCategery = param?.type?.toLowerCase();
  const ProductIdPrams = param?.ProductId;

  const getBasket = async () => {
    try {
      const value = await AsyncStorage.getItem('userBasketData');
      let jsonValue = value != null ? JSON.parse(value) : null;
      if (value === null || jsonValue == null) {
        // value previously stored
        console.log('userBasketData in ----', value);
      } else {
        console.log('userBasketData in else----', jsonValue);
        dispatch(getBasketData(jsonValue));
        return jsonValue;
      }
    } catch (e) {
      // error reading value
      console.log('err userBasketData----', e);
      return e;
    }
  };
  const toast = useToast();
  const showToast = () => {
    // toast.show("Task finished successfully", {
    //   type: "success",
    //   placement: "bottom",
    //   duration: 6000,
    //   offset: 2,
    //   animationType: "zoom-in",
    // });
  };
  const HandleMappingAttributes = () => {

    let Data = currentSide == 'left' ? leftAttributes : rightAttributes;
    let newData = Data.map(item => ({
      // ...item,
      ID: item.currentAttributeId,
      ValueId: item.ID,
      Value: item.Value,

      // Discarding the old keys using destructuring
      // [delete item.ID]: null,
      // [delete item.Value]: null,
    }));
    let aId = rightAttributes?.map(
      item => item?.currentAttributeId == 3 || item?.currentAttributeId == 4,
    );
    if (currentSide == 'left') {
      setLeftAttri(newData);
      if (aId.includes(true)) {
        setRightAttri(newData);
      }
    } else {
      setRightAttri(newData);
    }

    setTrigger(true);
  };
  useEffect(() => {
    HandleMappingAttributes();
  }, [leftAttributes, rightAttributes, handleBasket]);

  useEffect(() => {
    if (UpgradeProdcutObj?.UpgradeData?.ResultData) {
    }
  }, []);
  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleCardPress = item => {
    console.log('item in seleted ', item);
    setGlassColorId(item?.ProductId ? item?.ProductId : item.ID);
    item.ID;
    dispatch(getStockDataSuccessAction(null));
  };

  const handleSizePress = item => {
    setGlassColorId(item?.ProductId);
  };

  // getProductIdSlice
  useEffect(() => {
    if(props.route.params?.screen){
      dispatch(
        GetProductId({
          type: props.route.params?.screen
        }),
      );
    }
  }, []);

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: Colors.Green,
    },
    a: {
      color: 'black',
    },
  };

  const tagsStyle = {
    body: {
      whiteSpace: 'normal',
      color: Colors.Black,
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
  const onSelectedValue = async (value, item) => {
    if (currentSide === 'leftQty' || currentSide === 'supply') {
      console.log('leftQty--391', value);
      setLeftQty(item);
    }
    if (currentSide === 'rightQty') {
      console.log('rightQty--394', value, item);

      setRightQty(item);
    }
    if (currentSide === 'colourQty') {
      setColourQty(item);
      setLeftQty(item);
    }
    if (currentSide === 'colour') {
      const currentAttributeId = selectedValues?.currentAttributeId;
      let rawItem = JSON.parse(JSON.stringify(item));
      rawItem.ID = currentAttributeId;
      rawItem.Value = item.Value;
      rawItem.ValueID = item.ID;
      setSelectedColor(rawItem);
      console.log('raw item=====', rawItem);
    }
    if (currentSide === 'left') {
      const currentAttributeId = selectedValues?.currentAttributeId;
      const valueToSet = value; // Value to set on the right side

      // Update leftAttributes
      let rawItemLeft = JSON.parse(JSON.stringify(item));
      rawItemLeft.currentAttributeId = currentAttributeId;
      rawItemLeft.selectedValue = valueToSet; // Update selectedValue

      // Check if an item with the same currentAttributeId already exists in the leftAttributes array
      const existingIndexLeft = leftAttributes.findIndex(
        attr => attr.currentAttributeId === currentAttributeId,
      );
      if (existingIndexLeft !== -1) {
        // Override the existing item with the new rawItemLeft
        const updatedLeftAttributes = [...leftAttributes];
        updatedLeftAttributes[existingIndexLeft] = rawItemLeft;
        setLeftAttributes(updatedLeftAttributes);
      } else {
        // Add the new rawItemLeft to the leftAttributes array
        setLeftAttributes([...leftAttributes, rawItemLeft]);
      }

      // Update selectedValues
      setSelectedValues(prevValues => ({
        ...prevValues,
        [currentAttributeId]: value,
        currentAttributeId: null,
      }));

      // Check if the currentAttributeId is 3 or 4
      if (currentAttributeId === 3 || currentAttributeId === 4) {
        // Find the corresponding item in rightAttributes and update its Value
        const existingIndexRight = rightAttributes.findIndex(
          attr => attr.currentAttributeId === currentAttributeId,
        );
        if (existingIndexRight !== -1) {
          // Override the existing item's Value with the valueToSet
          const updatedRightAttributes = [...rightAttributes];
          updatedRightAttributes[existingIndexRight].Value = valueToSet;
          setRightAttributes(updatedRightAttributes);
        } else {
          // Add a new item with currentAttributeId and valueToSet to rightAttributes
          const rawItemRight = {
            ...rawItemLeft, // Copying properties from rawItemLeft
            Value: valueToSet, // Setting Value
          };
          setRightAttributes([...rightAttributes, rawItemRight]);
        }
        setSelectedValuesRight(prevValues => ({
          ...prevValues,
          [currentAttributeId]: value,
          currentAttributeId: null,
        }));
      }
    } else if (currentSide === 'right') {
      const currentAttributeId = selectedValuesRight?.currentAttributeId;
      const valueToSet = value; // Value to set on the left side

      // Update rightAttributes
      let rawItemRight = JSON.parse(JSON.stringify(item));
      rawItemRight.currentAttributeId = currentAttributeId;
      rawItemRight.Value = valueToSet; // Update Value

      // Check if an item with the same currentAttributeId already exists in the rightAttributes array
      const existingIndexRight = rightAttributes.findIndex(
        attr => attr.currentAttributeId === currentAttributeId,
      );
      if (existingIndexRight !== -1) {
        // Override the existing item with the new rawItemRight
        const updatedRightAttributes = [...rightAttributes];
        updatedRightAttributes[existingIndexRight] = rawItemRight;
        setRightAttributes(updatedRightAttributes);
      } else {
        // Add the new rawItemRight to the rightAttributes array
        setRightAttributes([...rightAttributes, rawItemRight]);
      }

      // Update selectedValuesRight
      setSelectedValuesRight(prevValues => ({
        ...prevValues,
        [currentAttributeId]: value,
        currentAttributeId: null,
      }));

      // Check if the currentAttributeId is 3 or 4
      if (currentAttributeId === 3 || currentAttributeId === 4) {
        // Find the corresponding item in leftAttributes and update its selectedValue
        const existingIndexLeft = leftAttributes.findIndex(
          attr => attr.currentAttributeId === currentAttributeId,
        );
        if (existingIndexLeft !== -1) {
          // Override the existing item's selectedValue with the valueToSet
          const updatedLeftAttributes = [...leftAttributes];
          updatedLeftAttributes[existingIndexLeft].selectedValue = valueToSet;
          setLeftAttributes(updatedLeftAttributes);
        } else {
          // Add a new item with currentAttributeId and valueToSet to leftAttributes
          const rawItemLeft = {
            ...rawItemRight, // Copying properties from rawItemRight
            selectedValue: valueToSet, // Setting selectedValue
          };
          setLeftAttributes([...leftAttributes, rawItemLeft]);
        }
        setSelectedValues(prevValues => ({
          ...prevValues,
          [currentAttributeId]: value,
          currentAttributeId: null,
        }));
      }

      refRBSheet.current.close();
    } else {
      setBoxs(value);
    }

    refRBSheet.current.close();
  };
  useEffect(() => {
    dispatch(
      getDetailsPage({
        // type: GlassId ? GlassId : ProductIdPrams ? ProductIdPrams : param?.id,
        type: GlassId ? GlassId : ProductIdPrams ? ProductIdPrams : props.route.params?.screen ? productId.ResultData : param?.id,
        CustomerId:apiData?.CustomerId,
      }),
    );
  }, [param?.id, GlassId, addWishlist,productId]);

  useEffect(() => {
    setTimeout(() => {
      if (UpgradeProdcutObj?.UpgradeData?.StatusCode === 1) {
        console.log(
          'UpgradeProdcutObj insideif------',
          UpgradeProdcutObj?.UpgradeData,
        );
        upgradRBSheet.current.open();
      }
    }, 1000);
  }, [UpgradeProdcutObj?.UpgradeData?.StatusCode]);

  useEffect(() => {
    let newArr = [];
    let mainData = detailsData?.ResultData?.ProductDetail;
    let updatedData = mainData?.Attributes?.map(item => {
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
  }, [mainData, leftAttributes, rightAttributes]);

  const handlePackChange = (checkPack, packages) => {
    console.log('packages000---', packages);

    setGlassColorId(packages?.ProductId);

    if (checkPack === 0) {
      setPacks(true);
    } else {
      setPacks(false);
    }
  };
  const removeDuplicates = (array, property) => {
    return array.filter((obj, index, self) => {
      return index === self.findIndex(item => item[property] === obj[property]);
    });
  };
  const uniqueArrayleft = removeDuplicates(leftAttri, 'ID');

  const uniqueArrayRight = removeDuplicates(rightAttri, 'ID');
  const combineLeft = [...unselectedValue, ...uniqueArrayleft];
  const combineRight = [...unselectedValue, ...uniqueArrayRight];
  useEffect(() => {
    const OOSJson = {
      ProductId: GlassId ? GlassId : param?.ProductId,
      QtyLeft: 1,
      LeftAttributes: combineLeft,
      QtyRight: 0,
      RightAttributes: combineRight,
    };
    const stockJson = {
      ProductId: mainData?.ProductId
        ? mainData?.ProductId
        : GlassId
        ? GlassId
        : ProductIdPrams
        ? ProductIdPrams
        : param?.id,
      Qty: 1,
    };
    console.log('combinCategery==========', combinCategery);
    if (
      mainData?.ProductTypeId === 2 ||
      mainData?.ProductTypeId === 3 ||
      mainData?.ProductTypeId === 5 ||
      mainData?.ProductTypeId === 7 ||
      mainData?.ProductTypeId === 4 ||
      mainData?.ProductTypeId === 6 ||
      param.comingScreen === 'filter'
    ) {
      let endPoint = `${apiData?.CodeToAppend}/ProductDispatchDateOther`;
      dispatch(getStock(endPoint, stockJson));
      console.log('getStock@@ if-----', stockData);
    } else {
      let endPoint = `${apiData?.CodeToAppend}/ProductDispatchDate`;
      console.log('OOS json', OOSJson);
      dispatch(getStock(endPoint, OOSJson));
      console.log('getStock@@ else-----', stockData);
    }
  }, [
    selectedValues,
    selectedValuesRight,
    leftQty,
    rightQty,
    leftAttributes,
    rightAttributes,
    Boxes,
    GlassId,
    AltId,
    handleCalled,
  ]);
  useEffect(() => {
    setCanNavigate(AddBasketData?.StatusCode);

    if (
      (!AddBasketisLoading && AddBasketData?.StatusCode === 1) ||
      canNavigate === 1
    ) {
      console.log('300--------', loginBasketData);
      props.navigation.navigate('Basketscreen');
      dispatch(getaddBasketRemoveAction());
      setCanNavigate('');
    }
  }, [trigger, AddBasketisLoading, stockData, AddBasketData]);
  useEffect(() => {
    if (!toggleCheckBoxRight) {
      setSelectedValuesRight('');
      setRightAttributes([]);
      setRightQty('');
    }

    if (!toggleCheckBoxLeft) {
      setSelectedValues('');
      setLeftQty('');

    }
  }, [toggleCheckBoxLeft, toggleCheckBoxRight]);

  const handleBasket = async () => {
    HandleMappingAttributes();
    // if(mainData.ProductTypeId === 1){
    //   const id1Exists = leftAttri.some(item => item.ID === 1);

    //   if(id1Exists) {
    //       console.log("success")
    //   }else{
    //     Alert.alert("Please select all the fields")

    //   }
    // }
    console.log('combineLeft---', combineLeft);
    console.log('uniqueArrayleft---', uniqueArrayleft);

    const postJson = {
      IsEdit: false,
      CustomerId: apiData?.CustomerId,
      BasketId: newBasketId ? newBasketId : null,
      ProductId: mainData?.ProductId,
      ProductCode: mainData?.ProductCode,
      ProductTypeId: mainData?.ProductTypeId,
      CampaignCodes: '',
      QtyLeft:
        combinCategery === 'sunglasses' ||
        combinCategery === 'eyeframes' ||
        combinCategery === 'clearance'
          ? 1
          : toggleCheckBoxLeft
          ? Number(leftQty.ID)
          : 0,
      QtyRight: IsColorSelected
        ? 0
        : mainData?.ProductTypeId == 1 && toggleCheckBoxRight
        ? rightQty.ID
        : 0,
      DispatchDate: 'Today',
    };
    if (IsColorSelected) {
      postJson.LeftAttributes = [
        selectedColour,
        {ID: 1, Value: 0.0, ValueId: 2},
        {ID: 3, Value: 8.6, ValueId: 80},
        {ID: 4, Value: 14.2, ValueId: 77},
      ];
      console.log('currentSide inside if');
    } else {
      postJson.LeftAttributes = combineLeft;
      postJson.RightAttributes = combineRight;
    }

    setHandleCalled(true);
    if (stockData?.ResultData?.EnableAddToBasket == false) {
      setStockError(stockData?.ResultData?.Message);
    }

    if (stockError && stockData?.ResultData?.EnableAddToBasket == false) {
      Alert.alert('Sorry!!!', stockError, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            props.navigation.navigate('detailsScreen', {
              id: stockData?.ResultData?.altProductId,
            });
            setLeftAttri([]);
            setRightAttri([]);
            setLeftAttributes([]);
            setRightAttributes([]);
            setSelectedValues([]);
            setSelectedValuesRight([]);
            setTrigger(false);
            setHandleCalled(false);
          },
        },
      ]);
    }
    if (
      toggleCheckBoxLeft &&
      combineLeft?.length !=
        detailsData?.ResultData?.ProductDetail?.Attributes?.length &&
      stockError &&
      !IsColorSelected
    ) {
      Alert.alert('All fields required');
      return;
    } else if (
      toggleCheckBoxRight &&
      combineRight?.length !=
        detailsData?.ResultData?.ProductDetail?.Attributes?.length &&
      !IsColorSelected
    ) {
      Alert.alert('All fields required');
    } else {
      console.log(
        'outside add basket condition -------',
        trigger,
        stockData?.ResultData?.EnableAddToBasket,
      );

      if (trigger && stockData?.ResultData?.EnableAddToBasket) {
        let endPoint = `${apiData?.CodeToAppend}/AddToBasket`;
        dispatch(addBasket(endPoint, postJson));
        if (apiData.BasketId == null) {
          await getBasket();
        }

        setLeftAttri([]);
        setRightAttri([]);
        setLeftAttributes([]);
        setRightAttributes([]);
        setSelectedValues([]);
        setSelectedValuesRight([]);
        setTrigger(false);
        // setAltId('');
        setHandleCalled(false);
      }
    }
    // if(combineLeft?.length === detailsData?.ResultData?.ProductDetail?.Attributes?.length)
    // detailsData?.ResultData?.ProductDetail?.Attributes?.length
  };

  const getDescription = params => {
    return (
      <View style={{paddingVertical: 10, flex: 1}}>
        {Description && (
          <RenderHtml
            contentWidth={width}
            customHTMLElementModels={customHTMLElementModels}
            source={{html: DetailData?.ProductDescription}}
          />
        )}

        {detail &&
          DetailData?.ProductDetails?.map(item => {
            return (
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{flex: 4}}>
                  <Text
                    style={{fontSize: 15, fontWeight: '600', paddingRight: 20}}>
                    {item.Key} :
                  </Text>
                </View>

                <View style={{flex: 6}}>
                  <Text style={{fontSize: 14}}>{item.Value}</Text>
                </View>
              </View>
            );
          })}

        {productMeasurement && (
          <FlatList
            data={DetailData?.SizeInfo}
            renderItem={items => {
              return (
                <View style={styles.mainMeasurInner}>
                  <View style={styles.MeasorViewInner}>
                    <Text
                      style={{
                        fontSize: 15,

                        fontWeight: '600',
                      }}>
                      {items?.item?.Name}
                    </Text>
                  </View>

                  <View style={styles.MeasorViewInner}>
                    <Image
                      source={{uri: items?.item?.Img}}
                      style={styles.measerImg}
                    />
                  </View>

                  <View style={styles.MeasorViewInner}>
                    <Text style={{fontSize: 14}}>{items?.item?.Value}</Text>
                  </View>
                </View>
              );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    );
  };


  const handleCollaps = params => {
    console.log('params--157--', params);

    if (params === 'description') {
      setDescription(!Description);
      setDetail(false);

      setProductMeasor(false);
    } else if (params === 'details') {
      setDetail(!detail);
      setDescription(false);
      setProductMeasor(false);
    } else {
      setProductMeasor(!productMeasurement);
      setDetail(false);
      setDescription(false);
    }
  };

  const handleExpand = sectionIndex => {
    setActiveTabIndex(prevActiveTabIndex => {
      if (prevActiveTabIndex === sectionIndex) {
        return null;
      } else {
        return sectionIndex;
      }
    });
  };

  const handleOpenRBSheet = (AttributeId, side) => {
    console.log('229-----', AttributeId);
    setCurrentSide(side);

    if (side === 'left' || side === 'colour') {
      setSelectedValues(prevValues => ({
        ...prevValues,
        currentAttributeId: AttributeId,
      }));
    } else {
      setSelectedValuesRight(prevValues => ({
        ...prevValues,
        currentAttributeId: AttributeId,
      }));
    }
    refRBSheet.current.open();
  };
  useEffect(() => {
    if (
      mainData?.BrandName != 'comfi' &&
      mainData?.ProductCategoryDetails?.includes('Daily')
    ) {
      setLeftQty(mainData?.Quantity?.Attributes[1]);
      setRightQty(mainData?.Quantity?.Attributes[1]);
    } else {
      setLeftQty(mainData?.Quantity?.Attributes[0]);
      setRightQty(mainData?.Quantity?.Attributes[0]);
    }
    if (
      mainData?.ProductTypeId === 2 ||
      mainData?.ProductTypeId === 3 ||
      mainData?.ProductTypeId === 6
    ) {
      setBoxs(mainData?.Quantity?.Attributes[0]?.Value);
    }
  }, [mainData]);

  const handleWishlist = (item, selectedItem) => {
    console.log('add wishlist in details', item);
    // setLoading(false)
    if (mainData?.WishlistId != 0 || mainData?.WishlistId != null) {
      setTriger2(!trigger2);
    }
    let wishlistJson = {
      CustomerId: apiData?.CustomerId,
      ProductId: item?.ProductId
        ? item?.ProductId
        : item?.ID
        ? item.ID
        : mainData?.ProductId,
      IsDelete: mainData?.WishlistId != 0 ? false : true,
    };
    dispatch(AddWishlist(wishlistJson));
  };
  const leftQtyCal = leftQty?.ID == null ? 0 : leftQty?.ID;
  const rightQtyCal = rightQty?.ID == null ? 0 : rightQty?.ID;
  var valuesplit = Boxes?.split(' ')[0] == '' ? 0 : Boxes?.split(' ')[0];
  const totalqty =
    param.type?.toLowerCase() === 'solutions' ||
    param.type?.toLowerCase() === 'eyecares'
      ? valuesplit
      : 1;
  const rewardPointsCL =
    Math.round(
      Number(mainData?.Price * (Number(leftQtyCal) + Number(rightQtyCal))),
    ) * Number(mainData?.RewardPoints);
  const rewardPoints =
    Math.round(Number(mainData?.Price) * totalqty) *
    Number(mainData?.RewardPoints);

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

  const renderDropdown = ({item}) => (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.powerView}>
        <View style={styles.powerSubView}>
          <Text style={styles.leftText}>{item.Name}</Text>
        </View>

        <View style={styles.powerSubView1}>
          <View style={styles.arrowView}>
            <TouchableOpacity
              onPress={() => {
                if (item?.Attributes?.length > 1) {
                  handleOpenRBSheet(item.AttributeId, 'left');
                }
              }}
              disabled={!toggleCheckBoxLeft}
              style={[
                !toggleCheckBoxLeft
                  ? styles.DisableFields
                  : styles.powerTouchable3,
              ]}>
              <Text style={{fontSize: 15}}>
                {item?.Attributes?.length <= 1
                  ? item?.Attributes[0].Value
                  : selectedValues
                  ? selectedValues[item.AttributeId] || '---'
                  : '---'}
              </Text>

              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                {item?.Attributes?.length > 1 && (
                  <Image
                    resizeMode="contain"
                    style={styles.spnr_enable}
                    source={ImageUrl.DropArrow}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.powerSubView2}>
          <View style={styles.arrowView}>
            <TouchableOpacity
              onPress={() => {
                if (item?.Attributes.length > 1) {
                  handleOpenRBSheet(item.AttributeId, 'right');
                }
              }}
              disabled={!toggleCheckBoxRight}
              style={[
                !toggleCheckBoxRight
                  ? styles.DisableFields
                  : styles.powerTouchable3,
              ]}>
              <Text style={{fontSize: 15}}>
                {item?.Attributes?.length <= 1
                  ? item?.Attributes[0]?.Value
                  : selectedValuesRight
                  ? selectedValuesRight[item?.AttributeId] || '---'
                  : '---'}
              </Text>

              <View style={styles.arrowImgView}>
                {item?.Attributes?.length > 1 && (
                  <Image
                    resizeMode="contain"
                    style={styles.spnr_enable}
                    source={ImageUrl.DropArrow}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  let singleColourData =
    mainData?.Attributes?.length > 0 &&
    mainData?.Attributes?.filter(item => {
      if (item?.AttributeId == 7) {
        return item;
      }
    });
  let tempAttributes =
    mainData?.Attributes?.length > 0 &&
    mainData?.Attributes?.filter(item => {
      if (item?.AttributeId == 1) {
        return item;
      }
    });

  const tempMinus = [];
  const tempPlus = [];
  //do not remove below code
  const dataML =
    tempAttributes[0]?.Attributes?.length > 0 &&
    tempAttributes[0].Attributes.map(item => {
      if (item?.Value?.includes('-')) {
        tempMinus.push(item);
      } else {
        tempPlus.push(item);
      }
    });

  const getTabDetails = params => {
    return <RenderHtml contentWidth={width} source={{html: params?.TabText}} />;
  };

  const renderItems = (params, index) => {
    const isExpanded = activeTabIndex === index;

    return (
      <View style={styles.descriptionView}>
        <View>
          {isExpanded ? (
            <>
              <TouchableOpacity
                onPress={() => handleExpand(index)}
                style={styles.descriptionSubView}>
                <Text style={styles.productText}>{params?.TabName}</Text>

                <TouchableOpacity onPress={() => handleExpand(index)}>
                  <Image
                    resizeMode="contain"
                    style={styles.arrow_disable}
                    source={ImageUrl.UpArrow}
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              {getTabDetails(params)}
            </>
          ) : (
            <TouchableOpacity
              onPress={() => handleExpand(index)}
              style={styles.detailSubView}>
              <Text style={styles.productText}>{params?.TabName}</Text>

              <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  style={styles.arrow_enable}
                  source={ImageUrl.DropArrow}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const imagesZoom = mainData?.ImagesLarge.map(url => ({url}));

  console.log(imagesZoom);

  return (
    <View style={styles.mainView}>
      {detailsLoading || AddBasketisLoading || productisLoading ? (
        <SkypeIndicator size={100} color="black" animationDuration={800} />
      ) : (
        <>
          <SafeAreaView style={{height: hp('13%')}}>
            <FgcHeader
              title={mainData?.BrandName}
              onPress={() => props.navigation.navigate('filter')}
            />
          </SafeAreaView>
          {mainData?.StopedProductDetails?.AltProductId ? (
            <ScrollView style={[styles.mainView, {paddingBottom: 20}]}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                {mainData?.StopedProductDetails?.ProductName}
              </Text>
              <View style={{paddingVertical: 20}}>
                <Image
                  height={hp('11%')}
                  width={hp('34%')}
                  style={{resizeMode: 'contain'}}
                  source={{uri: mainData?.StopedProductDetails?.ImgProduct1}}
                />
              </View>

              <RenderHtml
                contentWidth={width}
                customHTMLElementModels={customHTMLElementModels}
                source={{html: mainData?.StopedProductDetails?.Description1}}
                tagsStyles={tagsStyle}
              />
              <View style={{paddingVertical: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    setGlassColorId(
                      mainData?.StopedProductDetails?.AltProductId,
                    )
                  }
                  style={{
                    padding: 18,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                    Try Alternater Product
                  </Text>
                </TouchableOpacity>
              </View>

              <RenderHtml
                contentWidth={width}
                customHTMLElementModels={customHTMLElementModels}
                source={{html: mainData?.StopedProductDetails?.Description2}}
                tagsStyles={tagsStyle}
              />
            </ScrollView>
          ) : (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.mainView}>
                <View style={styles.flexView}>
                  <View style={styles.productName}>
                    <View style={styles.productView}>
                      <Text style={styles.productText}>
                        {mainData?.ProductTypeId === 5 ||
                        mainData?.ProductTypeId === 7 ||
                        mainData?.ProductTypeId === 1 ||
                        mainData?.ProductTypeId === 2
                          ? mainData.Name
                          : mainData?.BrandName}
                      </Text>
                    </View>

                    {param?.type === 'contactlenses' ? (
                      <View style={styles.pacKView}>
                        <TouchableOpacity
                          onPress={() =>
                            handlePackChange(0, mainData?.Packages[0])
                          }>
                          <Text style={[packs ? styles.pack : styles.packText]}>
                            {mainData?.Packages?.length &&
                              mainData?.Packages[0]?.PackInfo}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            handlePackChange(1, mainData?.Packages[1])
                          }>
                          <Text
                            style={[!packs ? styles.pack : styles.packText]}>
                            {mainData?.Packages?.length &&
                              mainData?.Packages[1]?.PackInfo}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.imageFlex}>
                    <View>
                      <SliderBox
                        images={
                          mainData?.ImagesLarge?.length > 0 &&
                          mainData?.ImagesLarge
                        }
                        sliderBoxHeight={hp('32%')}
                        onCurrentImagePressed={index => {
                          setSelectedImgIndex(index);
                          setOpenImageModel(true);
                          console.warn(
                            `image ${index} pressed ${mainData?.ImagesLarge[index]}`,
                          );
                        }}
                        firstItem={
                          param.comingScreen === 'Prescription Sunglasses'
                            ? mainData?.TintImageIndex
                            : 0
                        }
                        dotColor="black"
                        inactiveDotColor="#90A4AE"
                        autoplay
                        circleLoop
                        resizeMethod={'resize'}
                        resizeMode={'contain'}
                        paginationBoxVerticalPadding={20}
                      />
                    </View>

                    <View style={styles.textFlex}>
                      <View style={styles.textFlex}>
                        <Text style={styles.discountPrice}>
                          {mainData?.StrikePrice}
                        </Text>
                        <Text
                          style={
                            mainData?.StrikePrice
                              ? styles.totalTextdiscount
                              : styles.totalText
                          }>
                          {mainData?.PriceText}
                        </Text>
                      </View>
                      <Text style={styles.rewardText}>
                        <Text style={styles.text}>
                          {' '}
                          Earn{' '}
                          {param?.type === 'contactlenses'
                            ? rewardPointsCL
                            : rewardPoints}{' '}
                          Reward Points
                        </Text>
                      </Text>
                    </View>

                    {mainData?.ProductTypeId == 5 ||
                    mainData?.ProductTypeId == 7 ? (
                      <View>
                        <RenderHtml
                          contentWidth={width}
                          customHTMLElementModels={customHTMLElementModels}
                          source={{
                            html: mainData?.StockAvailableText,
                          }}
                          tagsStyles={tagsStyles}
                        />
                      </View>
                    ) : null}

                    {mainData?.DispatchDetails?.MessageList?.length > 0 && (
                      <View
                        style={{
                          // flex: 1,
                          flexDirection: 'row',
                          paddingVertical: 4,
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.inStockTxt}>
                            {mainData?.DispatchDetails?.MessageList?.length >
                              0 &&
                              mainData?.DispatchDetails?.MessageList[0]?.value}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,

                            paddingVertical: 5,
                            justifyContent: 'center',

                            alignItems: 'center',
                          }}>
                          <Text style={styles.estimatedTxt}>
                            {mainData?.DispatchDetails?.MessageList?.length >
                              0 &&
                              mainData?.DispatchDetails?.MessageList[1]?.key}
                          </Text>
                          <RenderHtml
                            contentWidth={width}
                            customHTMLElementModels={customHTMLElementModels}
                            source={{
                              html:
                                mainData?.DispatchDetails?.MessageList?.length >
                                  0 &&
                                mainData?.DispatchDetails?.MessageList[1]
                                  ?.value,
                            }}
                            tagsStyles={tagsStyles}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,

                            alignItems: 'center',

                            justifyContent: 'center',
                          }}>
                          <Text style={styles.estimatedTxt}>
                            {mainData?.DispatchDetails?.MessageList?.length >
                              0 &&
                              mainData?.DispatchDetails?.MessageList[2]?.key}
                          </Text>
                          <RenderHtml
                            contentWidth={width}
                            customHTMLElementModels={customHTMLElementModels}
                            source={{
                              html:
                                mainData?.DispatchDetails?.MessageList?.length >
                                  0 &&
                                mainData?.DispatchDetails?.MessageList[2]
                                  ?.value,
                            }}
                            tagsStyles={tagsStyles}
                          />
                        </View>
                      </View>
                    )}
                  </View>

                  <GlassDetail
                    handleSizePress={handleSizePress}
                    handleCardPress={handleCardPress}
                    sizeInfo={DetailData?.SizeInfo}
                    data={mainData}
                    apiData={apiData}
                    handleBasket={handleBasket}
                    handleWishlist={handleWishlist}
                    from={'details'}
                  />

                  {mainData?.ProductTypeId === 2 ||
                  mainData?.ProductTypeId === 3 ||
                  mainData?.ProductTypeId === 6 ? (
                    <View>
                      <View style={styles.supplyView}>
                        <View style={styles.supplySubView}>
                          <Text style={styles.otherTxt}>Supply</Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => handleOpenRBSheet(null, 'supply')}
                          style={styles.packSubView}>
                          <Text style={styles.pack}>
                            {Boxes ? Boxes : '---'}
                          </Text>

                          <Image
                            resizeMode="contain"
                            style={styles.spnr_enable}
                            source={ImageUrl.DropArrow}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  {mainData?.DiscontinueMessage && (
                    <View
                      style={{
                        backgroundColor: Colors.newGrey,
                        padding: 10,
                        borderRadius: 8,
                      }}>
                      <RenderHtml
                        contentWidth={width}
                        customHTMLElementModels={customHTMLElementModels}
                        source={{html: mainData?.DiscontinueMessage?.Message}}
                        tagsStyles={tagsStyle}
                      />
                    </View>
                  )}
                </View>
                {(mainData?.ProductTypeId == 1 ||
                  mainData?.ProductTypeId == 4) &&
                mainData?.ProductCategoryName === 'Coloured Contact Lenses' &&
                singleColourData[0]?.AttributeId === 7 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 10,
                      backgroundColor: '#92d2f7',
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CommonCheckBox
                        imageSource={ImageUrl.CheckRing}
                        onToggle={() => setIsColorSelected(!IsColorSelected)}
                        isChecked={IsColorSelected}
                        uncheckedImage={ImageUrl.UncheckRing}
                      />
                    </View>
                    <View
                      style={{
                        flex: 9,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontWeight: '500',
                        }}>
                        I don't need vision correction (zero power 0.00/ plano)
                      </Text>
                    </View>
                  </View>
                ) : null}
                {mainData?.ProductTypeId == 1 && (
                  <View style={styles.subView}>
                    {!IsColorSelected && (
                      <View style={styles.leftView}>
                        <View style={[styles.subView, {paddingLeft: 40}]}>
                          {/* <Text style={{fontSize: 15, fontWeight: '500'}}>Eye</Text> */}
                        </View>

                        <View style={styles.leftsubView}>
                          <CheckBox
                            disabled={false}
                            value={toggleCheckBoxLeft}
                            tintColors="black"
                            onCheckColor="black"
                            tintColor="black"
                            onTintColor="black"
                            style={styles.checkboxStyle}
                            onValueChange={newValue =>
                              setToggleCheckBoxLeft(newValue)
                            }
                          />

                          <Text style={styles.leftText}>Left Eye</Text>
                        </View>

                        <View style={styles.leftsubView}>
                          <CheckBox
                            disabled={false}
                            value={toggleCheckBoxRight}
                            style={styles.checkboxStyle}
                            tintColors="black"
                            onCheckColor="black"
                            tintColor="black"
                            onTintColor="black"
                            onValueChange={newValue =>
                              setToggleCheckBoxRight(newValue)
                            }
                          />

                          <Text style={styles.leftText}>Right Eye</Text>
                        </View>
                      </View>
                    )}

                    {IsColorSelected ? (
                      <View style={[styles.powerView]}>
                        <View style={{justifyContent: 'center'}}>
                          <Text style={styles.leftBoxText}>Colour</Text>
                        </View>
                        <View
                          style={[
                            styles.powerView,
                            {paddingVertical: 10, paddingLeft: 65},
                          ]}>
                          <View style={[styles.LeftBoxView]}>
                            <TouchableOpacity
                              onPress={() =>
                                handleOpenRBSheet(
                                  singleColourData[0]?.AttributeId,
                                  'colour',
                                )
                              }
                              disabled={!toggleCheckBoxLeft}
                              style={[
                                !toggleCheckBoxLeft
                                  ? styles.DisableFields
                                  : styles.powerTouchable3,
                              ]}>
                              <Text style={{fontSize: 15}}>
                                {selectedColour?.Value
                                  ? selectedColour.Value
                                  : '---'}
                              </Text>

                              <View
                                style={[
                                  styles.dropdownArrowView,
                                  {paddingHorizontal: 5},
                                ]}>
                                <Image
                                  resizeMode="contain"
                                  style={styles.spnr_enable}
                                  source={ImageUrl.DropArrow}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.powerView}>
                        <FlatList
                          data={mainData?.Attributes}
                          renderItem={renderDropdown}
                          keyExtractor={item => `${item.AttributeId}`}
                        />
                      </View>
                    )}
                  </View>
                )}

                {!mainData?.IsInStock && (
                  <View style={styles.stockView}>
                    <View style={styles.stockSubView}>
                      <Text style={styles.stockText}>Out Of Stock</Text>
                    </View>
                  </View>
                )}
                {mainData?.ProductTypeId == 4 && (
                  <View style={styles.boxContainer}>
                    <View
                      style={
                        IsColorSelected
                          ? {flex: 2, justifyContent: 'center'}
                          : styles.boxHeadingView
                      }>
                      <Text style={styles.leftBoxText}>Boxes</Text>
                    </View>
                    <View style={styles.LeftBoxView}>
                      <TouchableOpacity
                        onPress={() => handleOpenRBSheet(null, 'supply')}
                        disabled={!toggleCheckBoxLeft}
                        style={[
                          !toggleCheckBoxLeft
                            ? styles.DisableFields
                            : styles.powerTouchable3,
                        ]}>
                        <Text style={{fontSize: 15}}>
                          {leftQty?.Value ? leftQty.Value : '---'}
                        </Text>

                        <View style={styles.dropdownArrowView}>
                          <Image
                            resizeMode="contain"
                            style={styles.spnr_enable}
                            source={ImageUrl.DropArrow}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {mainData?.ProductTypeId == 1 ? (
                  <View style={styles.boxContainer}>
                    <View
                      style={
                        IsColorSelected
                          ? {flex: 2, justifyContent: 'center'}
                          : styles.boxHeadingView
                      }>
                      <Text style={styles.leftBoxText}>Boxes</Text>
                    </View>
                    {IsColorSelected ? (
                      <View style={styles.LeftBoxView}>
                        <TouchableOpacity
                          onPress={() => handleOpenRBSheet(null, 'colourQty')}
                          disabled={!toggleCheckBoxLeft}
                          style={[
                            !toggleCheckBoxLeft
                              ? styles.DisableFields
                              : styles.powerTouchable3,
                          ]}>
                          <Text style={{fontSize: 15}}>
                            {colourQty?.Value ? colourQty.Value : '---'}
                          </Text>

                          <View style={styles.dropdownArrowView}>
                            <Image
                              resizeMode="contain"
                              style={styles.spnr_enable}
                              source={ImageUrl.DropArrow}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.LeftBoxView}>
                        <TouchableOpacity
                          onPress={() => handleOpenRBSheet(null, 'leftQty')}
                          disabled={!toggleCheckBoxLeft}
                          style={[
                            !toggleCheckBoxLeft
                              ? styles.DisableFields
                              : styles.powerTouchable3,
                          ]}>
                          <Text style={{fontSize: 15}}>
                            {leftQty?.Value ? leftQty.Value : '---'}
                          </Text>

                          <View style={styles.dropdownArrowView}>
                            <Image
                              resizeMode="contain"
                              style={styles.spnr_enable}
                              source={ImageUrl.DropArrow}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                    {!IsColorSelected && (
                      <View style={styles.rightBoxView}>
                        <TouchableOpacity
                          onPress={() => handleOpenRBSheet(null, 'rightQty')}
                          disabled={!toggleCheckBoxRight}
                          style={[
                            !toggleCheckBoxRight
                              ? styles.DisableFields
                              : styles.powerTouchable3,
                          ]}>
                          <Text style={{fontSize: 15}}>
                            {rightQty?.Value ? rightQty?.Value : '---'}
                          </Text>

                          <View style={styles.dropdownArrowView}>
                            <Image
                              resizeMode="contain"
                              style={styles.spnr_enable}
                              source={ImageUrl.DropArrow}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ) : null}
                <View style={styles.productOverView}>
                  <Text style={styles.overView}>Product Overview</Text>

                  {mainData?.ProductTypeId === 7 ||
                  mainData?.ProductTypeId === 5 ? (
                    <>
                      <View style={styles.descriptionView}>
                        <View>
                          {Description ? (
                            <>
                              <TouchableOpacity
                                onPress={() => handleCollaps('description')}
                                style={styles.descriptionSubView}>
                                <Text style={styles.productText}>
                                  Product Description
                                </Text>

                                <TouchableOpacity
                                  onPress={() => handleCollaps('description')}>
                                  <Image
                                    resizeMode="contain"
                                    style={styles.arrow_disable}
                                    source={ImageUrl.UpArrow}
                                  />
                                </TouchableOpacity>
                              </TouchableOpacity>

                              {getDescription()}
                            </>
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleCollaps('description')}
                              style={styles.detailSubView}>
                              <Text style={styles.productText}>
                                Product Description
                              </Text>

                              <TouchableOpacity>
                                <Image
                                  resizeMode="contain"
                                  style={styles.arrow_enable}
                                  source={ImageUrl.DropArrow}
                                />
                              </TouchableOpacity>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>

                      <View style={styles.detailView}>
                        <View>
                          {detail ? (
                            <>
                              <TouchableOpacity
                                onPress={() => handleCollaps('details')}
                                style={styles.detailSubView}>
                                <Text style={styles.productText}>
                                  Product Detail
                                </Text>

                                <TouchableOpacity
                                  onPress={() => handleCollaps('details')}>
                                  <Image
                                    resizeMode="contain"
                                    style={styles.arrow_disable}
                                    source={ImageUrl.UpArrow}
                                  />
                                </TouchableOpacity>
                              </TouchableOpacity>

                              {getDescription()}
                            </>
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleCollaps('details')}
                              style={styles.detailSubView}>
                              <Text style={styles.productText}>
                                Product Detail
                              </Text>

                              <TouchableOpacity
                                onPress={() => handleCollaps('details')}>
                                <Image
                                  resizeMode="contain"
                                  style={styles.arrow_enable}
                                  source={ImageUrl.DropArrow}
                                />
                              </TouchableOpacity>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>

                      <View style={styles.measureView}>
                        <View>
                          {productMeasurement ? (
                            <>
                              <TouchableOpacity
                                onPress={() => handleCollaps('measur')}
                                style={styles.measureSubView}>
                                <Text style={styles.productText}>
                                  Product Measurements
                                </Text>

                                <TouchableOpacity
                                  onPress={() => handleCollaps('measur')}>
                                  <Image
                                    resizeMode="contain"
                                    style={styles.arrow_disable}
                                    source={ImageUrl.UpArrow}
                                  />
                                </TouchableOpacity>
                              </TouchableOpacity>

                              {getDescription()}
                            </>
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleCollaps('measur')}
                              style={styles.detailSubView}>
                              <Text style={styles.productText}>
                                Product Measurements
                              </Text>

                              <TouchableOpacity>
                                <Image
                                  resizeMode="contain"
                                  style={styles.arrow_enable}
                                  source={ImageUrl.DropArrow}
                                />
                              </TouchableOpacity>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      {DetailData?.ProductInfoTabs?.map((item, index) => (
                        <View key={index}>{renderItems(item, index)}</View>
                      ))}
                    </>
                  )}
                </View>

                {mainData?.RecommendedProducts && (
                  <View style={styles.customerView}>
                    <View style={styles.customerSubView}>
                      <Text style={styles.shopTxt}>Customers also bought</Text>
                    </View>

                    <View style={styles.cardView}>
                      <FlatList
                        data={mainData?.RecommendedProducts}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                          <Card
                            handleWishlist={handleWishlist}
                            handleCardPress={handleCardPress}
                            item={item}
                          />
                        )}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  </View>
                )}

                <View>
                  <Reviews
                    mainData={mainData}
                    TotalReviews={mainData?.TotalReviews}
                    rating={mainData?.Rating}
                  />
                </View>
              </ScrollView>
              {mainData?.ProductTypeId !== 7 && (
                <View style={{paddingBottom: 30, paddingRight: 10}}>
                  <AddBasket
                    handleBasket={() => {
                      handleBasket();
                    }}
                    handleWishlist={handleWishlist}
                    isDisabledStock={
                      mainData?.ProductTypeId == 1
                        ? !stockData?.ResultData?.EnableAddToBasket
                        : !mainData?.IsInStock
                    }
                    isDisabled={
                      combinCategery === 'eyecares' ||
                      combinCategery === 'solutions'
                        ? !Boxes
                        : combinCategery === 'contactlenses'
                        ? !leftQty
                        : false
                    }
                    mainData={mainData}
                  />
                </View>
              )}
            </>
          )}

          <RBSheet
            ref={refRBSheet}
            openDuration={250}
            closeOnDragDown={true}
            animationType="fade"
            customStyles={{
              container: {
                flex: 1,
                backgroundColor: Colors.LightWhite,
                justifyContent: 'flex-start',
              },
            }}>
            {(currentSide != 'supply' &&
              tempAttributes[0]?.AttributeId ===
                selectedValues?.currentAttributeId) ||
            tempAttributes[0]?.AttributeId ===
              selectedValuesRight?.currentAttributeId ? (
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
            ) : currentSide === 'colour' ? (
              <FlatList
                data={singleColourData[0]?.Attributes}
                renderItem={renderDropdownItem}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <FlatList
                data={
                  currentSide === 'left' || currentSide === 'right'
                    ? mainData?.Attributes.find(item =>
                        currentSide === 'left'
                          ? item.AttributeId ===
                              selectedValues?.currentAttributeId &&
                            selectedValues?.currentAttributeId != 1
                          : item.AttributeId ===
                            selectedValuesRight?.currentAttributeId,
                      )?.Attributes
                    : mainData?.Quantity?.Attributes
                }
                renderItem={renderDropdownItem}
                keyExtractor={item => `${item.id}`}
              />
            )}
          </RBSheet>
        </>
      )}
      <Modal visible={openImageModel} transparent={false}>
        <View style={{flex: 1}}>
          <View
            style={{
              // height: 150,
              alignItems: 'flex-end',
              backgroundColor: 'black',
              paddingTop:hp('5%'),
              paddingRight:hp('2%')
           
            }}>

            <TouchableOpacity
            style={{paddingVertical:20}}
                  onPress={() => setOpenImageModel(false)}>
              <Text style={{fontSize: 25, fontWeight: '600', color:"white"}}>X</Text>
            </TouchableOpacity>
          </View>
          <ImageViewer index={SelectedImgIndex} imageUrls={imagesZoom} />
        </View>
      </Modal>
      <RBSheet
        ref={upgradRBSheet}
        height={hp('50%')}
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
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <View style={{flex: 1, paddingTop: 10, alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>
                {UpgradeProdcutObj?.UpgradeData?.ResultData?.Name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(upgradeProductSuccessAction(null));
                upgradRBSheet.current.close();
              }}>
              <Text style={{fontSize: 25, fontWeight: '800'}}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 5, alignItems: 'center', paddingVertical: 10}}>
            <Image
              height={hp('20%')}
              width={hp('42%')}
              source={{
                uri: UpgradeProdcutObj?.UpgradeData?.ResultData?.ImageUrl,
              }}
            />
          </View>
          <View style={{flex: 3, paddingHorizontal: 10, paddingBottom: 20}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <RenderHtml
                source={{
                  html: UpgradeProdcutObj?.UpgradeData?.ResultData?.Message,
                }}
                tagsStyles={tagsStyle}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center',paddingVertical:10}}>
              <TouchableOpacity
                onPress={() => {
                  setGlassColorId(
                    UpgradeProdcutObj?.UpgradeData?.ResultData?.ID,
                  );
                  dispatch(upgradeProductSuccessAction(null));
                  upgradRBSheet.current.close();
                }}
                style={{
                  backgroundColor: 'black',
                  paddingVertical: hp('1.8%'),
                  paddingHorizontal: hp('4%'),
                  borderRadius: 8,
                }}>
                <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                  Upgrade Today
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default DetailsScreen;
