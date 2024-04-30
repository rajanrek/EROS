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
// import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {
    SkypeIndicator
} from 'react-native-indicators';

import { remove } from './array-lib.js'

var resArray = [];
var resGlassArray = [];
var resSortingArray = [];
var resObj = [];
const NewFilter = ({ props, close, Apply, sortingData }) => {
    const dispatch = useDispatch();
    const [termcondition, setTermCondition] = useState(false);
    const [parentFilterData, setParentFilterData] = useState([]);
    const [childFilterData, setChildfilterData] = useState([]);
    const [stateChangerCompo, setStatChangerCompo] = useState('');
    const [subFilterData, setSubFilterData] = useState([]);
    const [checked, setChecked] = useState('');
    const [selectedChildRow, setChildClick] = useState(0);
    const [selectedParentRow, setParentClick] = useState(0);
    const [parentSelectedItem, setParentSelectedItem] = useState('');
    const [childFilterName, setChildFilterName] = useState('')
    const [clearStatus, setClearStatus] = useState(false);
    const [newArray, setNewArray] = useState([]);
    const [previousSelection, setPreviousSelection] = useState('');
    const [childfilterDataWithoutArray, setChildfilterDataWithoutArray] = useState('');
    const [sortItem, setsortItem] = useState(false);
    const [brandItem, setbrandItem] = useState(false);
    const [subFilterItems, setSubFilterItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const [filterLength, setfilterLength] = useState('')
    const [selectedItems, setSelectedItem] = useState(false);
    const [selectedData, setSelecteddata] = useState([]);
    const [allselectedData, setAllselectedData] = useState([]);
    const [childItemStatus, setChildItemStatus] = useState(false)
    const [parentItemStatus, setParentItemStatus] = useState(true)
    const [sliderOneChanging, setSliderOneChanging] = useState(false);
    const [sortingStatus,setSortingStatus] = useState(false)
    const [sortingSelectedItem,setSortingSelectedItem] = useState('')
    const [sortingSelectedItemData,setSortingSelectedItemData] = useState('')
    const [sliderOneValue, setSliderOneValue] = useState([5]);
    const [multiSliderValue, setMultiSliderValue] = useState([3, 7]);
    const { registerData } = useSelector(state => state.newuser.user);
    const { data } = useSelector(state => state.loginuser.user);


    const navigation = useNavigation();
    const { filter, filterisLoading } = useSelector(state => ({
        filter: state.getFilter.filter.filterData,
        filterisLoading: state.getFilter.filter.filterisLoading
    }));



    const apiData = registerData
        ? registerData?.ResultData?.loginResponse
        : data?.ResultData?.loginResponse
            ? data?.ResultData?.loginResponse
            : data?.ResultData;

    const ApplyFilterFun = () => {
        Global.ScreenType = '';
        let sortArray = [];
        if (Global.Type === 'Sunglasses') {
            resArray?.map((resArrayItem) => {
                resArrayItem.resData.map((resDataItem) => {
                    if (resDataItem.Selected == true) {
                        sortArray.push({
                            key: resArrayItem.Key,
                            id: resDataItem.ID
                        })
                    }
                })
            })
        } else {
            resGlassArray?.map((resArrayItem) => {
                resArrayItem.resData.map((resDataItem) => {
                    if (resDataItem.Selected == true) {
                        sortArray.push({
                            key: resArrayItem.Key,
                            id: resDataItem.ID
                        })
                    }
                })
            })
        }
        console.log("logsortArray", sortArray, "resArray", resArray,'-----', sortingSelectedItemData)
        Apply()
        navigation.navigate('FilterProductScreen',
            {
                mainFilterData: sortArray,
                apiMainPoint: props?.route?.params?.mainManuName,
                sortingData : sortingSelectedItemData,
                filterStatus:true
            })
        // setParentClick(0)

    }

    // console.log("splitEndPoint==",Global.SplitEndPoint);

    useEffect(() => {
        if(resSortingArray?.length == 0 ){
            let defaultSorting = sortingData?.filter(item => item.Selected)[0]?.Name
            setSortingSelectedItem(defaultSorting)
        }else if(resSortingArray?.length > 0 ){
            let defaultSorting = resSortingArray?.filter(item => item.Selected)[0]?.Name
            setSortingSelectedItem(defaultSorting)
        }

        if (Global.ScreenType == 'shop') {
            resArray = [];
        }

        if (resArray.length > 0) {
            console.log("log111100000", resArray.length)

        } else {
            if (Global.Type === 'Sunglasses') {
                var endPoint1 = `${apiData?.CodeToAppend}/SunglassFilter`
                dispatch(getFilter(endPoint1));
                // resSortingArray = sortingData
            } else if (Global.Type === 'EyeFrames') {
                var endPoint2 = `${apiData?.CodeToAppend}/EyeFrameFilter`
                dispatch(getFilter(endPoint2));
                // resSortingArray = sortingData
            }
        }

    }, []);

    useEffect(() => {
        setPreviousSelection(Global.CategoryName)
        filterData();
    }, [filter, clearStatus, Global.DeepLinkEndPoint])

    const rerenderFun = (data) => {
        console.log("Global.DeepLinkEndPoint",Global.DeepLinkEndPoint)
        subFilterFun(data)
        Global.SplitEndPoint?.length > 0 ?
            bannerFilterFun()
            :
            Global.DeepLinkEndPoint !== '' ? 
            DeepLinkFun() 
            :
            previousValueOnFilter();
    }

    const bannerFilterFun = () => {
        console.log("logsplitEndPoint", Global.Type)
        if (Global.Type === 'Sunglasses') {
            resArray = resArray?.map((item1, index1) => {
                if (item1.Key == 'gender' && Global.ScreenType == 'shop') {
                    var resData = item1?.resData?.map((resItem) => {
                        let data22 = Global.SplitEndPoint?.includes(resItem.ID);
                        // console.log("resData----",data22)
                        return { ...resItem, Selected: data22 };
                    })
                    // console.log("resData----",resData)
                } else if (item1.Key == 'mnfs' && Global.ScreenType == 'shop') {
                    var resData = item1?.resData?.map((resItem) => {

                        let data22 = Global.SplitEndPoint?.includes(resItem.ID);
                        // console.log("resData----",data22)
                        return { ...resItem, Selected: data22 };
                    })
                    console.log("resData----", resData)
                }
                else {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.Selected };
                    })
                }

                return ({
                    Key: item1.Key,
                    Name: item1.Name,
                    IsRadionOptions: item1.IsRadionOptions,
                    resData
                })
            })


            console.log("logresArray------", resArray)
        } else {
            resGlassArray = resGlassArray?.map((item1, index1) => {
                // if(item1.Key == 'mnfs'){
                //   var resData =  item1?.resData?.map((resItem)=>{
                //     return { ...resItem, Selected:  resItem.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
                //   })
                // }else if(item1.Key == 'gender'){
                //   var resData =  item1?.resData?.map((resItem)=>{
                //     return { ...resItem, Selected:  resItem.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
                //   })
                // }
                // else{
                var resData = item1?.resData?.map((resItem) => {
                    return { ...resItem, Selected: resItem.Selected };
                })
                // }

                return ({
                    Key: item1.Key,
                    Name: item1.Name,
                    IsRadionOptions: item1.IsRadionOptions,
                    resData
                })
            })
        }
    }

    const DeepLinkFun = () =>{
        let splitVar = Global.DeepLinkEndPoint.split('-')
        console.log('deeplink url fun',Global.DeepLinkEndPoint,resArray,splitVar[0])
       
        if (Global.Type === 'Sunglasses') {
            resArray = resArray?.map((item1, index1) => {
                if (item1.Key == 'mnfs' && Global.ScreenType == 'shop') {
                    var resData = item1?.resData?.map((resItem) => {
                         
                        let data22 = splitVar[0]?.includes(resItem?.Name?.split(' ')[0]);
                       console.log("resData deeplink----",data22)
                        return { ...resItem, Selected: data22 };
                    })
                    console.log("resData----", resData)
                }
                else {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.Selected };
                    })
                }

                return ({
                    Key: item1.Key,
                    Name: item1.Name,
                    IsRadionOptions: item1.IsRadionOptions,
                    resData
                })
            })


            console.log("logresArray------", resArray)
        }else {
            let glassesSplitVar = splitVar[0]?.toLowerCase()
            resGlassArray = resGlassArray?.map((item1, index1) => {
                if (item1.Key == 'mnfs' ) {
                var resData = item1?.resData?.map((resItem) => {
                    let data22 = glassesSplitVar?.includes(resItem?.RewriteName?.split('-')[0]);
                    console.log("resData deeplink2----",resItem?.RewriteName?.split('-')[0],glassesSplitVar)
                     return { ...resItem, Selected: data22 };
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

    const subFilterFun = (data) => {
        console.log("subFilterFun", parentSelectedItem)

        let arrynew = []
        data.map((item) => {
            if (item.Key == 'gender') {
                item?.resData?.map((resItem) => {
                    let data22 = Global.SplitEndPoint?.includes(resItem.ID);
                    arrynew.push({
                        ...resItem,
                        Selected: resItem?.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
                        // Selected: item.Key === 'mnfs' ?  resItem.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false  : resItem.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
                    })
                })
            }
        })
        console.log("arrynew===", arrynew)
        setSubFilterItems(arrynew)
    }

    const previousValueOnFilter = () => {

        if (Global.Type === 'Sunglasses') {

            resArray = resArray?.map((item1, index1) => {

                console.log("log previousValueOnFilter", item1);
                if (item1.Key == 'mnfs' && Global.ScreenType == 'shop') {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.RewriteName.toLowerCase() === Global.CategoryName?.toLowerCase() ? true : false };
                    })
                } else if (item1.Key == 'gender' && Global.ScreenType == 'shop') {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.Name.toLowerCase() === Global.CategoryName?.toLowerCase() ? true : false };
                    })
                }

                else {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.Selected };
                    })
                }

                return ({
                    Key: item1.Key,
                    Name: item1.Name,
                    IsRadionOptions: item1.IsRadionOptions,
                    resData
                })
            })

        } else {
            resGlassArray = resGlassArray?.map((item1, index1) => {
                if (item1.Key == 'mnfs' && Global.ScreenType == 'shop') {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
                    })
                } else if (item1.Key == 'gender' && Global.ScreenType == 'shop') {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false };
                    })
                }
                else {
                    var resData = item1?.resData?.map((resItem) => {
                        return { ...resItem, Selected: resItem.Selected };
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

    const sunGlassesFun = () => {
        setPreviousSelection(Global.CategoryName)
        filter?.ResultData?.Filters?.length == 12 && filter?.ResultData?.Filters?.map((item1, index1) => {

            let resData = item1?.Items?.map((item, index) =>
            // Global.SplitEndPoint > 0 ? Global.SplitEndPoint?.includes(item.ID) :
            // let data22 = Global.SplitEndPoint?.includes(item.ID);
            // console.log("resData----",data22)
            //  return { ...resItem, Selected:  data22 };
            ({
                ...item,
                Selected: item.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
                NewKey: `${item1.Key}_${item.Name}`
            })


            )
            resArray.push({
                Key: item1.Key,
                Name: item1.Name,
                IsRadionOptions: item1.IsRadionOptions,
                resData
            })
        })

        let number = 1;
        let swapingValue = resArray.slice(-number);
        let swapingLenth = resArray.slice(0, resArray.length - number);
        resArray = swapingValue.concat(swapingLenth);

        console.log("resData subGlass====", resArray, previousSelection)
        setSubFilterData(resArray);
        setLoader(false);
        subFilterFun(resArray);
        setClearStatus(false);
    }

    const eyeFrameFun = () => {
        setPreviousSelection(Global.CategoryName)
        filter?.ResultData?.Filters?.length == 11 && filter?.ResultData?.Filters?.map((item1, index1) => {

            let resData = item1?.Items?.map((item, index) =>
            ({
                ...item,
                Selected: item1.Key === 'mnfs' ? item.RewriteName.toLowerCase() === previousSelection?.toLowerCase() ? true : false : item.Name.toLowerCase() === previousSelection?.toLowerCase() ? true : false,
                NewKey: `${item1.Key}_${item.Name}`
            }))
            resGlassArray.push({
                Key: item1.Key,
                Name: item1.Name,
                IsRadionOptions: item1.IsRadionOptions,
                resData
            })
        })


        let number = 7;
        let swapingValue = resGlassArray.slice(-number);
        let swapingLenth = resGlassArray.slice(0, resGlassArray.length - number);
        resGlassArray = swapingValue.concat(swapingLenth);


        console.log("resData eyeframs====", resGlassArray, previousSelection)
        setSubFilterData(resGlassArray);
        subFilterFun(resGlassArray);
        setClearStatus(false);

    }

    const filterData = () => {
        if (Global.Type === 'Sunglasses') {
            console.log("Global.Type====", Global.Type)
            // dispatch(getFilter(`${apiData?.CodeToAppend}/${type}`));
            resGlassArray = [];
            resArray.length > 0 ? rerenderFun(resArray) : sunGlassesFun()

        } else {
            resArray = [];
            // console.log("resArray=======",resArray)
            resGlassArray.length > 0 ? rerenderFun(resGlassArray) : eyeFrameFun()

        }
    }

    const handleSortingCheckboxToggle = (item, id)=>{
       let updatedResSortingArray =  resSortingArray.map((arrayItem, index)=>{
            if(arrayItem.Name == item.Name){
                return {...arrayItem, Selected: !arrayItem.Selected}
            }else{
                return {...arrayItem, Selected: false}
            }
        })
        // console.log("handleSortingCheckboxToggle abc",updatedResSortingArray)
        resSortingArray = updatedResSortingArray;
        setSubFilterItems(resSortingArray);
        setSortingSelectedItem(item.Name);
        setSortingSelectedItemData(item);
    }

    const handleCheckboxToggle = (item, id, Selectedd, index) => {
        // console.log("checkbox====",parentSelectedItem)
        if (Global.Type === 'Sunglasses') {
            resArray = resArray?.map((item1, index1) => {
                console.log("checkbox====", item1.Key)


                if (item1.Key === 'frmclrs') {
                    var resData = item1?.resData?.map((product, index) => {
                        if (product.NewKey === item.NewKey) {
                            if (product.Selected == true) {
                                return { ...product, Selected: !product.Selected };
                            } else {
                                return { ...product, Selected: true };
                            }
                        }
                        else {
                            return { ...product, Selected: product.Selected };
                        }
                    })
                } else if (item1.Key === 'lnsclrs') {
                    var resData = item1?.resData?.map((product, index) => {
                        if (product.NewKey === item.NewKey) {
                            if (product.Selected == true) {
                                return { ...product, Selected: !product.Selected };
                            } else {
                                return { ...product, Selected: true };
                            }
                        }
                        else {
                            return { ...product, Selected: product.Selected };
                        }
                    })
                }
                else {
                    var resData = item1?.resData?.map((product, index) => {
                        if (product.NewKey === item.NewKey) {
                            if (product.Selected == true) {
                                return { ...product, Selected: !product.Selected };
                            } else {
                                return { ...product, Selected: true };
                            }
                        }
                        else {
                            return { ...product, Selected: product.Selected };
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

            resArray.map((item22, index2) => {
                console.log("item22---", item22.Key)
                item22?.resData?.map((item321) => {


                    if (item22.Key == "frmclrs") {
                        if (item321.NewKey == item.NewKey) {
                            setSubFilterItems(item22.resData)
                        }
                    } else if (item22.Key == "lnsclrs") {
                        if (item321.NewKey == item.NewKey) {
                            setSubFilterItems(item22.resData)
                        }
                    }else if( item22.Key == 'frmshps'){
                        if (item321.NewKey == item.NewKey) {
                            setSubFilterItems(item22.resData)
                        }
                    }else if( item22.Key == 'fcshps'){
                        if (item321.NewKey == item.NewKey) {
                            setSubFilterItems(item22.resData)
                        }
                    }
                     else {
                        if (item321.Name == item.Name) {
                            setSubFilterItems(item22.resData)
                        }
                    }
                })
            })

            setSubFilterData(resArray);
            // setLoader(true);
        } else {
            resGlassArray = resGlassArray?.map((item1, index1) => {
                console.log("item.Selected", item1)
                if (item1.Key === 'mnfs') {
                    var resData = item1?.resData?.map((product, index) => {
                        if (product.RewriteName === item.RewriteName) {
                            console.log("product.Name === item.Name", product, item, previousSelection)
                            if (product.Selected == true) {
                                return { ...product, Selected: !product.Selected };
                            } else {
                                return { ...product, Selected: true };
                            }
                        }
                        else {

                            return { ...product, Selected: product.Selected };
                        }
                    })
                } else if (item1.Key === 'frmclrs') {
                    var resData = item1?.resData?.map((product, index) => {
                        if (product.NewKey === item.NewKey) {
                            if (product.Selected == true) {
                                return { ...product, Selected: !product.Selected };
                            } else {
                                return { ...product, Selected: true };
                            }
                        }
                        else {
                            return { ...product, Selected: product.Selected };
                        }
                    })
                } else if (item1.Key === 'lnsclrs') {
                    var resData = item1?.resData?.map((product, index) => {
                        if (product.NewKey === item.NewKey) {
                            if (product.Selected == true) {
                                return { ...product, Selected: !product.Selected };
                            } else {
                                return { ...product, Selected: true };
                            }
                        }
                        else {
                            return { ...product, Selected: product.Selected };
                        }
                    })
                }
                else {
                    var resData = item1?.resData?.map((product, index) => {
                        if (product.Name === item.Name) {
                            console.log("product.Name === item.Name ", product, item)
                            if (product.Selected == true) {
                                return { ...product, Selected: !product.Selected };
                            } else {
                                return { ...product, Selected: true };
                            }
                        } else {

                            return { ...product, Selected: product.Selected };
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

            resGlassArray.map((item22, index2) => {
                item22.resData.map((item321) => {
                    if (item22.Key !== 'mnfs' && item321.Name == item.Name) {
                        console.log("item22---", item22.resData)
                        setSubFilterItems(item22.resData)
                    } else if (item22.Key == 'mnfs' && item321.RewriteName == item.RewriteName) {
                        console.log("item22---", item321.RewriteName, item.RewriteName, item22.resData)
                        setSubFilterItems(item22.resData)
                    }
                })

            })

            setSubFilterData(resGlassArray);
            // setLoader(true);
        }
        // resArray = [];
        setChecked(prevSelectedSection =>
            id
        );
    };
    const sliderOneValuesChangeStart = () => setSliderOneChanging(true);

    const sliderOneValuesChange = values => setSliderOneValue(values);

    const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

    const multiSliderValuesChange = values => setMultiSliderValue(values);

    const renderChildItemsFunction = ({ item, index }) => {
        console.log("renderChildItemsFunction====",item, childFilterName)
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-around',
                        alignItems: 'center',

                        backgroundColor: 'rgb(248, 248, 247)'
                        //   selectedParentRow === index ? '#FAF9F6' : 'transparent',
                    }}
                    onPress={() => {
                        // setChildClick(index)
                        sortingStatus ? handleSortingCheckboxToggle(item, index) :
                        handleCheckboxToggle(item, index)
                    }}
                >
                   
                    {item?.Img == null ? 
                    <Text
                    style={[styles.rowtext, { height: 45,  left: 0,width: '90%', padding: 15,borderWidth:0, }]}
                    numberOfLines={2}>
                    {' '}
                    {item?.Name == '' ? item?.RewriteName.toUpperCase() : item?.Name.toUpperCase()}{' '}
                </Text>
                :
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',left:'0%',width: '90%',borderWidth:0}}>
                   <Image source={{uri:item?.Img}} style={{
                    height: 
                    childFilterName == 'Frame Shapes' ? 18 : 
                    childFilterName == 'Type of Frame' ? 17  :
                    childFilterName == 'Frame Colours' ? 25  :
                    childFilterName == 'Lens Colours' ? 25: 
                    childFilterName == 'Top Brands' ? 25 : 25,
                    width: 
                    childFilterName == 'Frame Colours' ? 25 :
                    childFilterName == 'Lens Colours' ? 25 :
                    childFilterName == 'Top Brands' ? 60 : 40,
                    borderWidth:0
                    }}/>

                    <Text
                        style={[styles.rowtext, { height: 45,  left: 0, padding: 15,borderWidth:0, }]}
                        numberOfLines={2}>
                        {' '}
                        {item?.Name == '' ? item?.RewriteName.toUpperCase() : item?.Name.toUpperCase()}{' '}
                    </Text>
                   </View>
                }
                 <View>
                        <CommonCheckBox
                            imageSource={ImageUrl.UncheckRing}
                            onToggle={() => sortingStatus ? handleSortingCheckboxToggle(item, index) : handleCheckboxToggle(item, index)}
                            isChecked={!item?.Selected}
                            uncheckedImage={ImageUrl.CheckRing}
                        />
                    </View>
                   
                </TouchableOpacity>
            </View>
        )
    };

    const renderParentItemsFunction = ({ item, index }) => {

        let count = item?.resData?.filter((itmm) => {
            return itmm?.Selected == true
        }).length
        // console.log("log renderParentItemsFunction count", item);
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    backgroundColor:
                        selectedParentRow === index ? 'rgb(248, 248, 247)' : 'rgb(248, 248, 247)',
                    //   borderWidth: 0.4,
                    borderColor: 'gray',
                    //   justifyContent: 'center',
                    //   alignItems: 'center'
                }}
                onPress={() => {
                    setParentClick(index),
                        console.log("left tab---", item),
                        setSubFilterItems(item.resData),
                        setParentSelectedItem(item.Key),
                        setChildFilterName(item.Name),
                        setChildItemStatus(true),
                        setParentItemStatus(false),
                        setSortingStatus(false)
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text
                        style={[styles.rowtext, { height: 65, width: '90%', fontSize: 15, padding: 20, fontWeight: selectedParentRow === index ? 'bold' : 'normal', }]}
                        numberOfLines={1}>
                        {' '}
                        {item?.Name}{' '}
                    </Text>
                    <Text style={{ top: -2 }}>{count == 0 ? null : count}</Text>
                    <Image source={ImageUrl.RightBlackArrow} style={{ color: '#ffff', height: 60, width: 30, top: 10, }} />
                </View>


            </TouchableOpacity>
        );
    };

    const clearAll = () => {
        if (Global.Type === 'Sunglasses') {
            setParentItemStatus(true);
            setChildItemStatus(false);
            resArray = [];
            Global.CategoryName = 'null';
            Global.SplitEndPoint = [];
            setPreviousSelection('null');
            sunGlassesFun();
            setClearStatus(true)
            setParentClick(0);
        } else if (Global.Type === 'EyeFrames') {
            setParentItemStatus(true);
            setChildItemStatus(false);
            resGlassArray = [];
            Global.CategoryName = 'null'
            setPreviousSelection('null');
            eyeFrameFun();
            setClearStatus(true);
            setParentClick(0)
        }
    }

    const closeFun = () => {
        navigation.goBack();
    }

    const backArrowFilterFun = () => {
        setParentItemStatus(true);
        setChildItemStatus(false);
        setSortingStatus(false);
    }

    const sortingFun=()=>{
        if(resSortingArray?.length == 0){
            resSortingArray = sortingData
        }
        
        console.log("sortingFun",resSortingArray)
        setSubFilterItems(resSortingArray),
        setSortingStatus(true)
        // setParentSelectedItem(item.Key),
        // setChildFilterName(item.Name),
        setChildItemStatus(true),
        setParentItemStatus(false)
    }



    console.log("subFilterItems===", previousSelection);
    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.filterView}>
                {childItemStatus == false ?
                    <TouchableOpacity onPress={close}>
                        <Image source={ImageUrl.Close} style={{ height: 70, width: 70 }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => backArrowFilterFun()}>
                        <Image source={ImageUrl.BackArrowFilter} style={{ height: 60, width: 60, top: 5 }} />
                    </TouchableOpacity>}


                <Text style={[styles.filterText, { left: childItemStatus == true ? -40 : 0 }]}>{sortingStatus ?  'Sort By' : childItemStatus == false ? 'Filter & Sort' : childFilterName}</Text>

                <TouchableOpacity onPress={() => clearAll()}>
                    <Text style={styles.clearFilterText}>{childItemStatus == false ? 'Clear filters' : null}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.subView}>
                
                {parentItemStatus == true ?
                    <View style={{ borderWidth: 0, width: '100%', justifyContent: 'center', }}>
                        {/* <MultiSlider
                    selectedStyle={{
                        backgroundColor: 'black',
                        color: 'red'
                    }}
                    unselectedStyle={{
                        backgroundColor: 'black',
                        color: 'red'
                    }}

                    trackStyle={{
                        height: 1,
                        backgroundColor: 'red',
                        color: 'blue'
                    }}

                    markerStyle={{
                        backgroundColor: 'black',
                        height: 15,
                        width: 15,
                        borderRadius: 20,
                        shadowOpacity: 0
                    }}

                    isMarkersSeparated={true}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={110}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={10}
                    step={1}
                    allowOverlap
                    snapped
                /> */}
                {sortingData !== undefined ? 
                <View style={{backgroundColor:'rgb(248, 248, 247)'}}>
                    <TouchableOpacity onPress={()=>sortingFun()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.rowtext, { height: 65,  fontSize: 15,width:'38%',borderWidth:0, padding: 20, }]}>Sort By</Text>
                <Text style={[styles.rowtext, { height: 65, fontSize: 15, padding: 20,borderWidth:0,width:'50%',textAlign:'right' }]}>{sortingSelectedItem ? sortingSelectedItem :'Recommended'}</Text>
                <Image source={ImageUrl.RightBlackArrow} style={{ color: '#ffff', height: 60, width: 30, top: 10, }} />
                    </View>
                    </TouchableOpacity>
                </View> :
                null}
               
                        <FlatList
                            data={Global.Type === 'Sunglasses' ? resArray : resGlassArray}
                            renderItem={renderParentItemsFunction}
                            initialNumToRender={10}
                            windowSize={50}
                            showsVerticalScrollIndicator={false}
                            refreshing={loader}
                        />
                    </View> : null}

                {childItemStatus == true ?
                    <View style={{ borderWidth: 0, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10, backgroundColor: 'rgb(248, 248, 247)' }}>

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
                    </View> : null}

                {filterisLoading == true  ?
                    <View style={styles.IndicatorView}>
                        <SkypeIndicator size={100} animationDuration={800} />
                    </View>
                :null}
            </View>
            {/* } */}

            <View style={styles.btnView}>

                <View>
                    <Button
                        color={Colors.Black}
                        txtColor={Colors.White}
                        title={'Show Items'}
                        //   width={150}
                        onPress={() => { ApplyFilterFun() }}
                    />
                </View>
            </View>

        </SafeAreaView>
    );
};

export default NewFilter;