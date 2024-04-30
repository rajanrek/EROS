import {
  View,
  Text,
  Platform,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Button from '../../components/Button/button';
import Colors from '../../components/Colors/colors';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import styles from './styles';
import ImageUrl from '../../components/ImageUrl';
import FgcHeader from '../../components/Header/FgcHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addBasket} from '../../redux/action/actions';
import {useDispatch, useSelector} from 'react-redux';
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import GlassCard from './glassCard';
import RBSheet from 'react-native-raw-bottom-sheet';
import SvgComponent from '../../utils/svgImages';
import Globals from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../../components/CustomsFonts/customFonts';

const AddGlassBasket = props => {
  const [freeLense, setFreeLense] = useState(false);
  const [terms, setTerms] = useState(false);
  const [freePackageSelected, setFreeSelected] = useState(false);
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const [selectedData, setSelectedData] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectPkg, setSelectPkg] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [leftAtriString, setLeftAtriString] = useState('');
  const [rightAtriString, setRightAtriString] = useState('');
  const [convertedArray, setConvertedArray] = useState([]);
  const [htmlString, setHtmlString] = useState([]);
  const [hydoCoating, setHydoCoating] = useState([]);
  const [hydoCoatingPackageId, setHydoCoatingPackageId] = useState('');
  const [combineAllData, setcombineAllData] = useState('');
  const [hydroCoatingUnitPrice, setHydroCoatingUnitPrice] = useState('');
  const navigation = useNavigation();
  const idToRemove = Globals._excluded;

  const handlePackageToggle = (id, item) => {
    console.log('handlePackageToggle item----', selectPkg, 'id', id, item);
    setSelectedPackage(item);
    setHydoCoating(item.item.EyeGlassExtraPackageResponse);
    // setHydoCoatingPackageId(item.item.EyeGlassExtraPackageIds);
    setSelectPkg(id === selectPkg ? '' : id);
  };
  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
    },
    a: {
      color: 'black',
    },
  };
  const {
    AddBasketData,
    AddBasketPkgData,
    AddBasketisLoading,
    registerData,
    data,
    basketToken,
  } = useSelector(state => ({
    AddBasketData: state.addToBasket.addBasket.AddBasketData,
    registerData: state.newuser.user.registerData,
    data: state.loginuser.user.data,
    AddBasketisLoading: state.addToBasket.AddBasketisLoading,
    AddBasketPkgData: state.addToBasket.addBasket.AddBasketPkgData,
    basketToken: state.loginuser.user.basketToken,
  }));
  const {item, lastParams, ProductId, from, packages, SelectedData3} =
    props.route.params;
    console.log("lastParams====222=", props.route.params)

  const refRBSheet = useRef();
  const refHydroCoatingRBSheet = useRef();
  let unitPrice =
    item?.EyeGlassTypeId == 3 || item?.EyeGlassTypeId == 2
      ? lastParams?.SelectedData3?.SelectedData2?.UnitPrice
      : lastParams?.selectedData5?.SelectedData3?.SelectedData2?.UnitPrice;
  let ProductCode = Globals.selectedData1?.ProductCode;
  let lensTypeId = Globals.selectedData2.EyeGlassCategoryId;
  const glassCategeryId =
    item?.EyeGlassTypeId == 3 || item?.EyeGlassTypeId == 2
      ? lastParams?.SelectedData3?.SelectedData2?.EyeGlassCategory
      : lastParams?.selectedData5?.SelectedData3?.SelectedData2
          ?.EyeGlassCategory;

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  const newArray =
    AddBasketPkgData?.ResultData?.length > 0 &&
    AddBasketPkgData?.ResultData?.filter(
      item => !idToRemove?.includes(String(item.EyeGlassPackageId)),
    );
    console.log("lastParams=====", lastParams)

  useEffect(() => {
    let leftAttry = lastParams?.updatedLeftAttri
      ? lastParams?.updatedLeftAttri
      : lastParams?.selectedData5?.updatedLeftAttri;

    let rightAttri = lastParams?.updatedRightAttri
      ? lastParams?.updatedRightAttri
      : lastParams?.selectedData5?.updatedRightAttri;

    let rightPrism = lastParams?.updatedRightPrism
      ? lastParams?.updatedRightPrism
      : lastParams?.selectedData5?.updatedRightPrism;
    let leftPrism = lastParams?.updatedLeftPrism
      ? lastParams?.updatedLeftPrism
      : lastParams?.selectedData5?.updatedLeftPrism;

    const margeLenseAttr = [];
    let autoPrimsLeft = [];
    let autoPrimsRight = [];
    autoPrimsLeft.push(lastParams?.prescriptionData?.PrismLeftPrescription[0]);
    autoPrimsLeft.push(lastParams?.prescriptionData?.PrismRightPrescription[1]);
    autoPrimsRight.push(lastParams?.prescriptionData?.PrismLeftPrescription[1]);
    autoPrimsRight.push(
      lastParams?.prescriptionData?.PrismRightPrescription[0],
    );
    const combinePrims = [];
    let rowLeft = {
      Key: 'LeftAttributesJson',
      Value: Globals.IsSelectPres
        ? lastParams?.prescriptionData?.LeftPrescription
        : leftAttry,
    };
    let rowRight = {
      Key: 'RightAttributesJson',
      Value: Globals.IsSelectPres
        ? lastParams?.prescriptionData?.RightPrescription
        : rightAttri,
    };

    let rowLeftPrism = {
      Key: 'LeftEyeJson',
      Value: Globals.IsSelectPres
        ? lastParams?.prescriptionData?.PrismLeftPrescription
        : leftPrism,
    };
    let rowRightPrims = {
      Key: 'RightEyeJson',
      Value: Globals.IsSelectPres
        ? lastParams?.prescriptionData?.PrismRightPrescription
        : rightPrism,
    };
  
    //------------------------------------------------------------------------------
    margeLenseAttr.push(rowLeft);
    margeLenseAttr.push(rowRight);
    combinePrims.push(rowLeftPrism);
    combinePrims.push(rowRightPrims);
 
    const packageNamesArray =
      selectedPackage?.item?.AttributeNames?.length > 0 &&
      selectedPackage?.item?.AttributeNames.map(items => items.Name);

    const pkgStr = packageNamesArray?.length && packageNamesArray.join('|');
    const packageNamesArray2 =
      selectedPackage?.AttributeNames?.length > 0 &&
      selectedPackage?.AttributeNames.map(items => items.Name);
    const pkgStr2 = packageNamesArray2?.length && packageNamesArray2.join('|');

    let newArr = [
      {
        Title: 'Your prescription',
        Key: 'LensAttributes',
        Value: JSON.stringify(margeLenseAttr),
      },
      {
        Title: 'Prism',
        Key: 'PrismAttributes',
        Value: JSON.stringify(combinePrims),
      },
      {
        Title: 'Coatings',
        Key: item?.EyeGlassType,
        Value: item?.UnitPriceText,
      },
      {
        Title: 'Package',
        Key: selectedPackage?.item?.PackageName,
        Value: selectedPackage?.item?.UnitPriceText,
      },
      {
        Title: 'Package Details',
        Key: 'Package Details',
        Value: pkgStr == undefined ? pkgStr2 : pkgStr,
      },
      {
        Title: 'Extra Package',
        Key: 'Hydrophobic Coating',
        Value: hydroCoatingUnitPrice,
      },
    ];
    console.log('hydroCoatingUnitPrice', hydroCoatingUnitPrice);
    setcombineAllData(newArr);
    let convertedLeft = JSON.stringify(leftAttry);

    setLeftAtriString(convertedLeft);

    let convertedRight = JSON.stringify(rightAttri);

    setRightAtriString(convertedRight);
  }, [selectedPackage]);


  var pkgJson = {
    ProductId: lastParams?.ProductId,
    BasketId: basketToken,
    CustomerId: apiData?.CustomerId,
    DocName: Globals.PrescImgName,
    DocBytes: Globals.prescriptionImg,
    ProductCode: ProductCode,
    LensTypeId: lensTypeId,
    CoatTypeId: item?.EyeGlassTypeId
      ? item?.EyeGlassTypeId
      : lastParams?.item?.EyeGlassTypeId,
    CoatTypeId: item?.EyeGlassTypeId
      ? item?.EyeGlassTypeId
      : lastParams?.item?.EyeGlassTypeId,
    IsBlueLightGlasses: item?.EyeGlassTypeId
      ? item?.EyeGlassTypeId == 3
        ? true
        : false
      : lastParams?.item?.EyeGlassTypeId == 3
      ? true
      : false,
    PackageId: selectPkg,
    ExtraPackageId: '',
    HasLensAttributes: true,
    PrescriptionName: Globals.IsSelectPres
      ? lastParams?.prescriptionData?.PrescriptionName
      : lastParams?.prescriptionName,
    PrescriptionText: Globals.IsSelectPres
      ? lastParams?.prescriptionData?.PrescriptionName
      : lastParams?.prescriptionName,
    PrspDate: Globals.formattedDate,
    // PrspDate: lastParams?.selectedYear ? lastParams?.selectedYear  : lastParams?.selectedData5?.selectedYear,
    LeftAttributesJson: leftAtriString,
    RightAttributesJson: rightAtriString,
    GlassPropertiesHtml: JSON.stringify(combineAllData),
  };

  useEffect(() => {
    let endPoint = `${apiData?.CodeToAppend}/EyeGlassPackages`;
    dispatch(
      addBasket(endPoint, {ProductId: lastParams?.ProductId}, 'package'),
    );
    setSelectPkg(Globals._recommended[0]);
    // let temObj = {item: {AttributeNames: newArray[0]}};
    setSelectedPackage(newArray[0]);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
  setSelectPkg(false)

      if (AddBasketPkgData?.ResultData?.length > 0) {
        setHydoCoating(
          AddBasketPkgData?.ResultData[0]?.EyeGlassExtraPackageResponse,
        );
        // setHydoCoatingPackageId(AddBasketPkgData?.ResultData[0]?.EyeGlassExtraPackageIds);
      }
    });
    return unsubscribe;
  }, []);

  const openRbSheetFun = () => {
    if(hydoCoating?.length>0){
    refHydroCoatingRBSheet.current.open();
    setHydroCoatingUnitPrice(hydoCoating[0]?.UnitPriceText);
  }else{
    AddGlassToBasket('0')
  }
  };

  const AddGlassToBasket = val => {
    // console.log("log AddGlassToBasket", hydoCoating, '-----',selectPkg,'-----' ,AddBasketPkgData)
    // val == false ? setHydoCoatingPackageId('0') : setHydoCoatingPackageId('1');
    pkgJson.ExtraPackageId = val;
    refHydroCoatingRBSheet.current.close();
    let endPoint = `${apiData?.CodeToAppend}/AddGlassToBasket`;
    console.log('log add glasses to basket json---', pkgJson);
    dispatch(addBasket(endPoint, pkgJson, 'glassbasket'));
    if (!AddBasketisLoading) {
      Globals.prescriptionImg = '';
      Globals.PrescImgName = '';
      props.navigation.navigate('Basketscreen', {ProductId: ProductId});
      Globals.IsSelectPres = false;
      Globals.IsEditPres = false;
    }
  };
  const handleOpenRBSheet = item => {
    refRBSheet.current.open();
  };
  const handleCheckboxToggle = (id, item) => {
    handleOpenRBSheet();
    console.log('selected item----', item);
    setSelectedData(item);
    setSelectedSection(prevSelectedSection =>
      prevSelectedSection === id ? '' : id,
    );
  };
  const handleMoreInforToggle = (Description, item) => {
    handleOpenRBSheet();
    setSelectedInfo(Description);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('12.5%')}}>
        <FgcHeader  isSearch={true} title={'Choose your lenses'} />
      </SafeAreaView>
      {!idToRemove.includes('1') && (
        <View
          style={{
            paddingHorizontal: 20,
            flex: 0.5,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CommonCheckBox
            imageSource={ImageUrl.CheckRing}
            onToggle={() => setFreeSelected(!freePackageSelected)}
            isChecked={freePackageSelected}
            uncheckedImage={ImageUrl.UncheckRing}
          />
          <Text>Continue with Free Standard lenses</Text>
        </View>
      )}
      <View style={{flex: 6.5}}>
        <FlatList
          data={
            idToRemove.includes('1')
              ? newArray
              : !freePackageSelected
              ? newArray.length > 0 && newArray.slice(1)
              : newArray.length > 0 && newArray
          }
          horizontal={true}
          style={{flex: 1, paddingHorizontal: 5}}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={<View style={{height: 20}} />}
          renderItem={(item, index) => {
            return (
              <View style={{flex: 1}}>
                <GlassCard
                  handleMoreInforToggle={handleMoreInforToggle}
                  handleCheckboxToggle={handleCheckboxToggle}
                  item={item.item}
                  pkg={true}
                  freePackageSelected={freePackageSelected}
                  index={index}
                  isFree={Globals.FrPkgId}
                  selectedSection={selectPkg}
                  from="last"
                  buttonView={
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CommonCheckBox
                        imageSource={ImageUrl.GreenCheck}
                        uncheckedImage={ImageUrl.UncheckRing}
                        onToggle={() =>
                          handlePackageToggle(item.item.EyeGlassPackageId, item)
                        }
                        // Globals._recommended.includes(item?.EyeGlassPackageId?.toString()
                        isChecked={selectPkg === item.item.EyeGlassPackageId}
                      />
                    </View>
                  }
                />
              </View>
            );
          }}
          keyExtractor={item => item.EyeGlassPackageId}
        />
      </View>
      <View style={{flex: 2.8, paddingHorizontal: 10}}>
        <View style={styles.confirmView}>
          <View style={[styles.confirmSubView]}>
            <View style={{flex: 9, paddingHorizontal: 10}}>
              <Text style={styles.continueTxt}>
                I confirm that I’ve read and agree to the terms & conditions. I
                hereby certify that I am not a person who is registered blind or
                is partially sighted and under the age of 16.
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <CommonCheckBox
                imageSource={ImageUrl.CheckRing}
                onToggle={() => setTerms(!terms)}
                isChecked={terms}
                uncheckedImage={ImageUrl.UncheckRing}
              />
            </View>
          </View>
        </View>

        <View style={styles.btnView}>
          <Button
            onPress={openRbSheetFun}
            title={'Add to Basket'}
            color={terms && selectPkg ? Colors.Black : Colors.LightGrey}
            txtColor={Colors.White}
            disable={!terms || !selectPkg}
          />
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={hp('45%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
            paddingLeft: 10,
          },
        }}>
        <RenderHTML
          contentWidth={width}
          customHTMLElementModels={customHTMLElementModels}
          source={{html: selectedInfo}}
          tagsStyles={tagsStyles}
        />
        {/* <Text>{selectedInfo}</Text> */}
      </RBSheet>

      {/* For Hydo Coating */}
      <RBSheet
        ref={refHydroCoatingRBSheet}
        height={hp('65%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.White,
            paddingLeft: 10,
          },
        }}>
        <Text
          style={{
            fontFamily: Fonts.OpenSansBold,
            fontSize: 17,
            color: Colors.Black,
          }}>
          Hydro Coating
        </Text>
        <RenderHTML
          contentWidth={width}
          customHTMLElementModels={customHTMLElementModels}
          source={{html:hydoCoating?.length>0 && hydoCoating[0]?.Description}}
          tagsStyles={tagsStyles}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '16%',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: 20,
              marginBottom: 10,
            }}>
            {hydoCoating?.length>0  && hydoCoating[0]?.UnitPriceText}
          </Text>
          <TouchableOpacity
            style={{backgroundColor: '#000', padding: 10, borderRadius: 5}}
            onPress={() => AddGlassToBasket('1')}>
            {/*  { setPackageValueStatus(0); addToBasket(1); }}> */}
            <Text
              style={{
                fontFamily: Fonts.OpenSansBold,
                fontSize: 14,
                color: Colors.White,
              }}>
              Yes, I'd like to protect my lens
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => AddGlassToBasket('0')}>
            <Text
              style={{
                fontFamily: Fonts.OpenSansBold,
                fontSize: 14,
                color: Colors.Black,
                textDecorationLine: 'underline',
                paddingVertical: 8,
              }}>
              Not this time
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      {/* For Hydo Coating */}
    </View>
  );
};

export default AddGlassBasket;
