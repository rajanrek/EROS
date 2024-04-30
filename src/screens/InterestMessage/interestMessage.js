import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button/button';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const InterestMessage = () => {

    const navigation = useNavigation();

    const [nextBtn, setNextbtn] = useState(1)
    const handleNextBtn = (skip) => {

        setNextbtn(nextBtn + 1)
        if (nextBtn === 2) {
            navigation.navigate('congratsMsg')
        }

    }

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
            {nextBtn == 2 ?
                <View style={styles.titleView}>
                    <Text style={styles.historytxt}>Quickly find products relevant to your interests by allowing us to use your browsing history.</Text>

                </View> : <View style={styles.titleView}>
                    <Text style={styles.historytxt}>Don’t miss out. Stay up to
                     date with our latest{'\n'}offers, sales and{'\n'}discounts.</Text>

                </View>}

            <View style={styles.btnView}>
                <Button onPress={handleNextBtn} title={'Next'} color={'white'} txtColor={'black'} />

                <Text
                      onPress={() => handleNextBtn(1)}
                    style={styles.skipTxt}>
                    Skip 
                </Text>
            </View>
            </SafeAreaView>
        </View>
    )

}
export default InterestMessage;
