import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import Colors from '../../components/Colors/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageUrl from '../../components/ImageUrl';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListCard} from '../../components/ListCard/listcard';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailsPage, getSearch, getSearchbyTerm} from '../../redux/action/actions';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = props => {
  const dispatch = useDispatch();
  const {SearchObj, detailsData, SearchByTermObj} = useSelector(state => ({
    SearchObj: state.searchProduct.SearchObj,
    detailsData: state.details.Details.detailsData,
    SearchByTermObj: state.searchTerm.SearchByTermObj,
    
  }));
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
console.log("SearchByTermObj in serch page====", filteredData)
  useEffect(() => {
    if (searchTerm?.length > 2) {
      dispatch(getSearch({type: searchTerm.toString()}));
    } else {
      setFilteredData([]);
    }
  }, [searchTerm]);
console.log("search res on page=====", SearchObj)
  useEffect(() => {
    if (searchTerm.length > 2) {
      setFilteredData(SearchObj?.searchData?.ResultData);
    }
  }, [SearchObj?.searchData?.ResultData]);

  const handleSearch = text => {
    setSearchTerm(text);
    const filtereData = SearchObj?.searchData?.ResultData?.filter(item => {
      const nameLowerCase = item.Name.toLowerCase();
      //   const emailLowerCase = item.email.toLowerCase();
      const searchTermLowerCase = text.toLowerCase();

      return nameLowerCase.includes(searchTermLowerCase);
      //    || emailLowerCase.includes(searchTermLowerCase);
    });
    if (text.length <= 0) {
      setFilteredData([]);
    }
    setFilteredData(filtereData);
  };
  const ref_to_input = useRef();
  useEffect(() => {
    ref_to_input.current.focus();
  }, []);

  console.log('SearchObj?.searchTopBrand====', SearchObj?.searchTopBrand);

  const handleCardPress = item => {
    const Lastwords = item?.Name?.split(' ');
    const Categery = Lastwords[Lastwords?.length - 1];
    console.log('Categery====', Categery);
    const wordsToRemove = [
      'All',
      'Glasses',
      'Sunglasses',
      'Solution',
      'Eyecare',
    ];
    const pattern = new RegExp(
      '\\b(' + wordsToRemove?.join('|') + ')\\b',
      'gi',
    );
    let finalBrand;
    finalBrand = item?.Name?.replace(pattern, '').trim();

    console.log('item in search====', item);
    if (item?.ActionName == 'productlist' && finalBrand) {
     let qMark= item?.LinkUrl.includes('?')
      const pageSize=qMark ? '&pagesize=1000' : '?pagesize=1000'
      let param=item?.LinkUrl + pageSize
      dispatch(getSearchbyTerm({type: param}));
      navigation.navigate('FilterProductScreen', {
        searchProductList:SearchByTermObj?.searchByTermData?.ResultData?.Products,
        isSearch:true
      });
     
    } else if(item?.ActionName == 'productpage'){
      dispatch(
        getDetailsPage({
          type: item?.LinkUrl,
        }),
      );
      navigation.navigate('detailsScreen', {
        id: item?.LinkUrl,
        ProductId: item?.LinkUrl,
      });
    }else{
      Alert.alert("No result found")
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.searchView}>
          <View style={styles.BackBtnView}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
                setFilteredData([]);
              }}
              style={styles.BackBtn}>
              <Image style={styles.backImg} source={ImageUrl.BackArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnView}>
            <View style={styles.btn}>
              <TextInput
                ref={ref_to_input}
                value={searchTerm}
                placeholder=" Contact lenses, solutions, glasses..."
                onChangeText={handleSearch}
                style={styles.textInput}
                placeholderTextColor={Colors.Grey}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.list}>
        <FlatList
          style={styles.flatlistStyle}
          data={filteredData}
          renderItem={({item}) => (
            <ListCard handleCardPress={handleCardPress} item={item} />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={{backgroundColor: '#dee0e0', height: 1}} />
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
