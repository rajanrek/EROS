import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import CustomeCheckbox from '../../components/Checkbox/customCheckbox';
import Button from '../../components/Button/button';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Preferences } from '../../redux/action/actions';
import Colors from '../../components/Colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';


const InterestScreen = (props) => {

    const dispatch = useDispatch()
    const { Interestdata, isLoading } = useSelector((state) => state.preferences.interestData);
    const { data,registerData, errors } = useSelector((state) => state.newuser.user);
    const customerId = data?.ResultData?.loginResponse?.CustomerId;
    console.log('Interest----data----18',registerData?.ResultData?.activeMenu)
    const [selectedData, setSelecteddata] = useState([])
    const [allselectedData, setAllselectedData] = useState([])
    const values = allselectedData.length ? allselectedData : selectedData

  const postJson = {'PreferredCategories':values.toString(),"CustomerId":customerId}

    useEffect(() => {
        if (selectedData) {
            setAllselectedData([])
        }
    }, [])
    useEffect(() => {
        if (Interestdata?.StatusCode == 1) {
            props.navigation.navigate('interestMessage')
        }
    }, [Interestdata, handleNext])

    const handleNext = () => {
        console.log('----handleNext  intrest ', selectedData, allselectedData)
        dispatch(Preferences(postJson));
        props.navigation.navigate('interestMessage')


    }
    const handleSelect = (selected, selectedAll) => {
        setSelecteddata(selected)
        setAllselectedData(selectedAll)

    }
    console.log('---outside ', selectedData, allselectedData)
    let objNew ={
        MenuName: 'Select All',
        MenuId: 0
    }
let activeMenu = registerData?.ResultData?.activeMenu;
let newOptions = [...activeMenu]
newOptions.push(objNew)

console.log('---customer Id',customerId)

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
            <View style={styles.titleView}>
                <View style={styles.personView}>
                <Text style={styles.quesTxt}>To personalise your experience, please answer the question below:</Text>

                </View>
                <View style={styles.subTitleView}>
                    <Text style={styles.interestedText}>Which product are you most interested in?</Text>

                </View>
            </View>
            <View style={styles.boxView}>
                <ScrollView
                    style={styles.checkBoxView}>
                    <CustomeCheckbox handleSelect={handleSelect} options={newOptions} />
                </ScrollView>

            </View>
            <View style={styles.btnView}>
                <Button onPress={() => handleNext()} title={'Next'} color={Colors.White} txtColor={Colors.Black} />

                <Text
                    //   onPress={{}}
                    style={styles.skipTxt}>
                    Skip
                </Text>
            </View>
            </SafeAreaView>
        </View>
    )
}
export default InterestScreen;
