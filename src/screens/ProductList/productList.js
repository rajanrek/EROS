import React, {useState,useEffect} from 'react';
import {View,FlatList} from 'react-native';
import Card from '../../components/Card/card';




const ProductList = () => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Daily',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Two Weekly',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Toric Astigmatism',
        },

        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Multifocal',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Coloured Contact Lenses',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Comfi',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Daily',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Two Weekly',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Toric Astigmatism',
        },

        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Multifocal',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Coloured Contact Lenses',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Comfi',
        },
    ];


  return (
    <View style={{flex:1}}>
    <FlatList
    data={DATA}
    numColumns={4}
    // horizontal={true}
    renderItem={({ item }) =>
    <Card />}
    keyExtractor={item => item.id}
/>
    </View>



    );
  };
  
  export default ProductList;




