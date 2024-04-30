import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';




const Banner = ({item, navigateurl}) => {
    return (
        <TouchableOpacity style={styles.mainContainer} onPress={() => navigateurl(item)}>
           
            <View style={styles.glassView}>
                <Image
                    style={styles.glassImg}
                    source={{uri:item.BannerImageUrl}}
                />
            </View>
 

        </TouchableOpacity>
    );
}

export default Banner;



