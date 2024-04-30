import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ImageUrl from '../../components/ImageUrl';
import Colors from '../../components/Colors/colors';
import Button from '../../components/Button/button';
import Global from '../../utils/Global';
import { RadioButton } from 'react-native-paper';
import CustomeCheckbox from '../../components/Checkbox/customCheckbox';
import { getFilter } from '../../redux/action/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import { useNavigation } from '@react-navigation/native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import { remove } from './array-lib.js'

var resArray = [];
var resGlassArray = [];
var resObj = [];
const Filter = (props) => {
  const dispatch = useDispatch();
  const [termcondition, setTermCondition] = useState(false);
  const [parentFilterData, setParentFilterData] = useState([]);
  const [childFilterData, setChildfilterData] = useState([]);
  const [stateChangerCompo, setStatChangerCompo] = useState('');
  const [subFilterData, setSubFilterData] = useState([]);
  const [checked, setChecked] = useState('');
  const [selectedChildRow, setChildClick] = useState(0);
  const [selectedParentRow, setParentClick] = useState(0);
  const [parentSelectedItem,setParentSelectedItem] = useState('');
  const [clearStatus, setClearStatus] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [previousSelection, setPreviousSelection] = useState('');
  const [childfilterDataWithoutArray, setChildfilterDataWithoutArray] = useState('');
  const [sortItem, setsortItem] = useState(false);
  const [brandItem, setbrandItem] = useState(false); 
  const [subFilterItems, setSubFilterItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterLength,setfilterLength] = useState('')
  const [selectedItems, setSelectedItem] = useState(false);
  const [selectedData, setSelecteddata] = useState([]);
  const [allselectedData, setAllselectedData] = useState([]);
  const { registerData } = useSelector(state => state.newuser.user);
  const { data } = useSelector(state => state.loginuser.user);

  const navigation = useNavigation();

  const {
    type,
    splitEndPoint
   } = props?.route?.params;

  const { filter,filterisLoading } = useSelector(state => ({
    filter: state.getFilter.filter.filterData,
    filterisLoading: state.getFilter.filter.filterisLoading

  }));

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
      ? data?.ResultData?.loginResponse
      : data?.ResultData;

  const ApplyFilterFun = () => {
  let sortArray = [];
  if (Global.Type === 'Sunglasses') {
    resArray?.map((resArrayItem)=>{
      resArrayItem.resData.map((resDataItem)=>{
        if(resDataItem.isChecked == true){
          sortArray.push({
            key:resArrayItem.Key,
            id:resDataItem.ID
          })
        }
      })
    })
  }else{
    resGlassArray?.map((resArrayItem)=>{
      resArrayItem.resData.map((resDataItem)=>{
        if(resDataItem.isChecked == true){
          sortArray.push({
            key:resArrayItem.Key,
            id:resDataItem.ID
          })
        }
      })
    })
  }
   console.log("sortArray",sortArray,"resArray",resArray)
    props.navigation.navigate('FilterProductScreen',
      {
        mainFilterData : sortArray,
        apiMainPoint :  props?.route?.params?.mainManuName
      })
      // Global.Type = props?.route?.params?.mainManuName;
      // setParentClick(0)
  }

  // console.log("splitEndPoint==",Global.SplitEndPoint);

  useEffect(() => {
    // let endPoint = `${apiData?.CodeToAppend}/SunglassFilter`;
    const unsubscribe = navigation.addListener('focus', () => {
      if (Global.Type === 'Sunglasses') {
        var endPoint1 =  `${apiData?.CodeToAppend}/SunglassFilter`
        dispatch(getFilter(endPoint1));
      } else if (Global.Type === 'EyeFrames') {
        var endPoint2 =  `${apiData?.CodeToAppend}/EyeFrameFilter`
        dispatch(getFilter(endPoint2));
      }
  })
  return unsubscribe;
  }, []);

  useEffect(()=>{
    console.log("log1222222222222")
      setPreviousSelection(Global.CategoryName)
      filterData();
  },[filter,clearStatus])

  const rerenderFun=(data)=>{
    subFilterFun(data)
    Global.SplitEndPoint?.length > 0 ? 
    splitEndPointFun()
    :  
    previousValueOnFilter();
  }

  const splitEndPointFun=()=>{
    if(Global.Type === 'Sunglasses'){
        resArray = resArray?.map((item1, index1) => {
          if(item1.Key == 'gender'){
            var resData =  item1?.resData?.map((resItem)=>{
              let data22 = Global.SplitEndPoint?.includes(resItem.ID);
              // console.log("resData----",data22)
               return { ...resItem, isChecked:  data22 };
            })
            // console.log("resData----",resData)
          }else if(item1.Key == 'mnfs'){
            var resData =  item1?.resData?.map((resItem)=>{
              
              let data22 = Global.SplitEndPoint?.includes(resItem.ID);
              // console.log("resData----",data22)
               return { ...resItem, isChecked:  data22 };
            })
            console.log("resData----",resData)
          }
          else{
            var resData =  item1?.resData?.map((resItem)=>{
              return { ...resItem, isChecked: false };
            })
          }
         
          return ({
            Key: item1.Key,
            Name: item1.Name,
            IsRadionOptions: item1.IsRadionOptions,
            resData
          })
        })
     
      
     console.log("resArray------",resArray) 
    }else{
      resGlassArray = resGlassArray?.map((item1, index1) => {
        if(item1.Key == 'mnfs'){
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked:  resItem.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
          })
        }else if(item1.Key == 'gender'){
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked:  resItem.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
          })
        }
        else{
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked: false };
          })
        }
       
        return ({
          Key: item1.Key,
          Name: item1.Name,
          IsRadionOptions: item1.IsRadionOptions,
          resData
        })
      })
    }
  }

  const subFilterFun=(data)=>{
    console.log("subFilterFun",parentSelectedItem)
    
    let arrynew = []
    data.map((item)=>{
      if(item.Key == 'gender'){
        item?.resData?.map((resItem)=>{
          let data22 = Global.SplitEndPoint?.includes(resItem.ID);
          arrynew.push({...resItem,
            isChecked: data22 ? data22 : resItem?.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
            // isChecked: item.Key === 'mnfs' ?  resItem.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false  : resItem.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
          })
        })
      }
    })
    console.log("arrynew===",arrynew)
    setSubFilterItems(arrynew)
  }

  const previousValueOnFilter=()=>{
    console.log("subFilterFun",parentSelectedItem)
    if(Global.Type === 'Sunglasses'){
      resArray = resArray?.map((item1, index1) => {
        if(item1.Key == 'mnfs'){
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked:  resItem.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
          })
        }else if(item1.Key == 'gender'){
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked:  resItem.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
          })
        }
        else{
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked: false };
          })
        }
       
        return ({
          Key: item1.Key,
          Name: item1.Name,
          IsRadionOptions: item1.IsRadionOptions,
          resData
        })
      })
      
    }else{
      resGlassArray = resGlassArray?.map((item1, index1) => {
        if(item1.Key == 'mnfs'){
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked:  resItem.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
          })
        }else if(item1.Key == 'gender'){
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked:  resItem.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
          })
        }
        else{
          var resData =  item1?.resData?.map((resItem)=>{
            return { ...resItem, isChecked: false };
          })
        }
       
        return ({
          Key: item1.Key,
          Name: item1.Name,
          IsRadionOptions: item1.IsRadionOptions,
          resData
        })
      })
    }
  
  }

  const sunGlassesFun=()=>{
    setPreviousSelection(Global.CategoryName)
    filter?.ResultData?.Filters?.length == 12 && filter?.ResultData?.Filters?.map((item1, index1) => {
       
      let resData = item1?.Items?.map((item, index) =>
      // Global.SplitEndPoint > 0 ? Global.SplitEndPoint?.includes(item.ID) :
      // let data22 = Global.SplitEndPoint?.includes(item.ID);
      // console.log("resData----",data22)
      //  return { ...resItem, isChecked:  data22 };
      ({
        ...item,
        isChecked: item.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
        NewKey : `${item1.Key}_${item.Name}`
      }) 
    
      
      )
      resArray.push({
        Key: item1.Key,
        Name: item1.Name,
        IsRadionOptions: item1.IsRadionOptions,
        resData
      })
    })
    console.log("resData subGlass====",resArray,previousSelection)
    setSubFilterData(resArray);
    setLoader(false);
    subFilterFun(resArray);
    setClearStatus(false);
  }

  const eyeFrameFun=()=>{
    setPreviousSelection(Global.CategoryName)
    filter?.ResultData?.Filters?.length == 11 && filter?.ResultData?.Filters?.map((item1, index1) => {
     
      let resData = item1?.Items?.map((item, index) =>
      ({
        ...item,
        isChecked: item1.Key === 'mnfs' ?  item.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false  : item.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
        NewKey : `${item1.Key}_${item.Name}`
      }))
      resGlassArray.push({
        Key: item1.Key,
        Name: item1.Name,
        IsRadionOptions: item1.IsRadionOptions,
        resData
      })
    })
     console.log("resData eyeframs====",resGlassArray,previousSelection)
    setSubFilterData(resGlassArray);
    subFilterFun(resGlassArray);
    setClearStatus(false);
    
  }

  const filterData = () =>{
    if(Global.Type === 'Sunglasses'){
      console.log("Global.Type====",Global.Type)
      // dispatch(getFilter(`${apiData?.CodeToAppend}/${type}`));
      resGlassArray = [];
      resArray.length > 0  ?  rerenderFun(resArray) : sunGlassesFun()
       
    }else{
      resArray=[];
      // console.log("resArray=======",resArray)
      resGlassArray.length > 0 ?  rerenderFun(resGlassArray) : eyeFrameFun()
    
    }
  }

  const handleCheckboxToggle = (item, id, isCheckedd,index) => {
      // console.log("checkbox====",parentSelectedItem)
    if(Global.Type === 'Sunglasses'){
    resArray = resArray?.map((item1, index1) => {
      console.log("checkbox====",item1.Key)


        if(item1.Key === 'frmclrs'){
          var resData = item1?.resData?.map((product, index) => {
          if (product.NewKey=== item.NewKey )  { 
            if(product.isChecked == true){
              return { ...product, isChecked: !product.isChecked };
            }else{
              return { ...product, isChecked: true };
            }  
              }
               else{
                return { ...product, isChecked: product.isChecked };
              }
            })
        }else if(item1.Key === 'lnsclrs'){
          var resData = item1?.resData?.map((product, index) => {
            if (product.NewKey === item.NewKey )  { 
              if(product.isChecked == true){
                return { ...product, isChecked: !product.isChecked };
              }else{
                return { ...product, isChecked: true };
              }  
                }
                 else{
                  return { ...product, isChecked: product.isChecked };
                }
              })
        }
        else if(item1.Key !== 'lnsclrs' &&  item1.Key !== 'frmclrs'){
          var resData = item1?.resData?.map((product, index) => {
            if (product.Name === item.Name )  { 
              if(product.isChecked == true){
                return { ...product, isChecked: !product.isChecked };
              }else{
                return { ...product, isChecked: true };
              }  
                }
                 else{
                  return { ...product, isChecked: product.isChecked };
                }
              })
        }

     return ({
        Key: item1.Key,
        Name: item1.Name,
        IsRadionOptions: item1.IsRadionOptions,
        resData
      })
    })

    resArray.map((item22,index2)=>{
      console.log("item22---",item22.Key)
     item22?.resData?.map((item321)=>{
     
    
      if(item22.Key == "frmclrs"){
        if(item321.NewKey == item.NewKey){
          setSubFilterItems(item22.resData) 
        }
      }else if(item22.Key == "lnsclrs"){
        if(item321.NewKey == item.NewKey){
          setSubFilterItems(item22.resData) 
        }
      }else{
        if(item321.Name == item.Name){
          setSubFilterItems(item22.resData) 
        }
      }
    })
    })
    // renderChildItemsFunction(item,index)
    setSubFilterData(resArray);
    // setLoader(true);
  }else{
    resGlassArray = resGlassArray?.map((item1, index1) => {
      console.log("item.isChecked",item1)
    if(item1.Key === 'mnfs'){
      var resData = item1?.resData?.map((product, index) => {
        if (product.RewriteName === item.RewriteName )  { 
          console.log("product.Name === item.Name",product , item, previousSelection )
          if(product.isChecked == true){
            return { ...product, isChecked: !product.isChecked };
          }else{
            return { ...product, isChecked: true };
          }  
            }
             else{
              
              return { ...product, isChecked: product.isChecked };
            }
          })
    }else if(item1.Key === 'frmclrs'){
      var resData = item1?.resData?.map((product, index) => {
      if (product.NewKey=== item.NewKey )  { 
        if(product.isChecked == true){
          return { ...product, isChecked: !product.isChecked };
        }else{
          return { ...product, isChecked: true };
        }  
          }
           else{
            return { ...product, isChecked: product.isChecked };
          }
        })
    }else if(item1.Key === 'lnsclrs'){
      var resData = item1?.resData?.map((product, index) => {
        if (product.NewKey === item.NewKey )  { 
          if(product.isChecked == true){
            return { ...product, isChecked: !product.isChecked };
          }else{
            return { ...product, isChecked: true };
          }  
            }
             else{
              return { ...product, isChecked: product.isChecked };
            }
          })
    }
    else{
      var resData = item1?.resData?.map((product, index) => {
        if (product.Name === item.Name )  { 
          console.log("product.Name === item.Name ",product , item )
          if(product.isChecked == true){
            return { ...product, isChecked: !product.isChecked };
          }else{
            return { ...product, isChecked: true };
          }  
            } else{
              
              return { ...product, isChecked: product.isChecked };
            }
          })}
   
     return ({
        Key: item1.Key,
        Name: item1.Name,
        IsRadionOptions: item1.IsRadionOptions,
        resData
      })
    })

    resGlassArray.map((item22,index2)=>{
        item22.resData.map((item321)=>{
          if( item22.Key !== 'mnfs' && item321.Name == item.Name){
            console.log("item22---",item22.resData)
            setSubFilterItems(item22.resData) 
          }else if( item22.Key == 'mnfs' && item321.RewriteName == item.RewriteName){
            console.log("item22---",item321.RewriteName , item.RewriteName, item22.resData)
            setSubFilterItems(item22.resData) 
          }
      })
     
    })
    // renderChildItemsFunction(item,index)
    setSubFilterData(resGlassArray);
    // setLoader(true);
  }
    // resArray = [];
    setChecked(prevSelectedSection =>
      id
    );
  };

  const renderChildItemsFunction = ({ item, index }) => {
    // console.log("checkbox====",item)
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',

          // backgroundColor:
          //   selectedParentRow === index ? '#FAF9F6' : 'transparent',
        }}
        onPress={() => {
          setChildClick(index)
        }}
      >
        <View>
          <CommonCheckBox
            imageSource={ImageUrl.UncheckRing}
            onToggle={() => handleCheckboxToggle(item, index)}
            isChecked={!item?.isChecked}
            uncheckedImage={ImageUrl.CheckRing}
          />
         
        </View>

        <Text
          style={[styles.rowtext, { height: 45, width: '90%', left: 0, padding: 10 }]}
          numberOfLines={2}>
          {' '}
          {item?.Name == '' ? item?.RewriteName : item?.Name}{' '}
        </Text>
      </TouchableOpacity>
    )
  };

  const renderParentItemsFunction = ({ item, index }) => {
   
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor:
            selectedParentRow === index ? 'transparent' : '#ffff',
          borderWidth: 0.4,
          borderColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          setParentClick(index),
          console.log("left tab---", item),
          setSubFilterItems(item.resData),
          setParentSelectedItem(item.Key)
        }}>
        <Text
          style={[styles.rowtext, { height: 45, width: '80%', top: 15, fontSize: 17, fontWeight: selectedParentRow === index ? 'bold' : 'normal', }]}
          numberOfLines={1}>
          {' '}
          {item?.Name}{' '}
        </Text>

      </TouchableOpacity>
    );
  };

  const clearAll=()=>{
    if (Global.Type === 'Sunglasses') {
     resArray=[];
     Global.CategoryName = 'null';
     Global.SplitEndPoint = [];
     setPreviousSelection('null');
     sunGlassesFun();
     setClearStatus(true)
     setParentClick(0);
    } else if (Global.Type === 'EyeFrames') {
     resGlassArray=[];
     Global.CategoryName = 'null'
     setPreviousSelection('null');
     eyeFrameFun();
     setClearStatus(true);
     setParentClick(0)
    }
  }

  const closeFun=()=>{
   navigation.goBack();
  }

  console.log("subFilterItems===", previousSelection);
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.filterView}>
        <Text style={styles.filterText}>Filters</Text>
        <TouchableOpacity onPress={()=>clearAll()}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.subView}>

    <View style={{ borderWidth: 0, width: '40%', justifyContent: 'center', }}>
        <FlatList
          data={Global.Type === 'Sunglasses' ?  resArray : resGlassArray }
          renderItem={renderParentItemsFunction}
          initialNumToRender={10}
          windowSize={50}
          showsVerticalScrollIndicator={false}
          refreshing={loader}
        />
      </View>
  
          <View style={{ borderWidth: 0, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0 }}>
            
            <FlatList
              style={{ marginBottom: 0, borderWidth: 0, width: '100%' }}
              data={subFilterItems}
              // data={subFilterData}
              renderItem={renderChildItemsFunction}
              initialNumToRender={10}
              windowSize={50}
              showsVerticalScrollIndicator={false}
              refreshing={loader}
            />
          </View>
          {filterisLoading  && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
        </View>
    {/* } */}

      <View style={styles.btnView}>
        <View>
        <Button
          color={Colors.Black}
          txtColor={Colors.White}
          title={'Close'}
          width={150}
          onPress={() => closeFun()} 
        />
        </View>
       
        <View>
        <Button
          color={Colors.Black}
          txtColor={Colors.White}
          title={'Apply Filter'}
          width={150}
          onPress={() => ApplyFilterFun()}
        />
        </View>
      </View>
     
    </SafeAreaView>
  );
};

export default Filter;