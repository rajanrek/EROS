import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Styles from './styles';



const MultiCard = props => {
    console.log("multiCardddddd=======>",props)
    return (
        props.screenType === 'Reward Point' ?
        <>
        <View style={Styles.mainView}>
         <View style={Styles.innerView}>
         <Text style={Styles.DateText}>{props.data.Date}</Text>
         <Text style={Styles.RewardNameText}>{props.data.RewardName}</Text>
         <Text style={Styles.OrderRefText}>{props.data.OrderRef}</Text>
         </View>
         <View style={Styles.nextView}>
            {
                props?.buttonData?.earnedRewardButtonStatus ? 
                <>
                <Text style={Styles.pointsText}>{props?.data?.Earned}</Text>
                 <Text style={Styles.TextStyle}>Earned Points</Text>
                </>
                :null
            }

            {
                props?.buttonData?.redeemedButtonStatus ? 
                <>
                <Text style={Styles.pointsText}>{props?.data?.Redeemed}</Text>
                 <Text style={Styles.TextStyle}>Redeemed Points</Text>
                </>
                :null
            }
            
         </View>
         
        </View>
        </>
        :
        <>
        <View style={Styles.mainView}>
         <View style={Styles.innerView}>
         <Text>{props.data.CreatedOn}</Text>
         <Text>{props.data.OrderRef}</Text>
         </View>
         <View style={Styles.nextView}>
            {
                props?.buttonData?.earnedRewardButtonStatus ? 
                <>
                <Text style={Styles.pointsText}>{props?.data?.CreditAmountText}</Text>
                 <Text style={Styles.TextStyle}>{props?.data?.CreditTypeDesc}</Text>
                </>
                :null
            }

            {
                props?.buttonData?.redeemedButtonStatus ? 
                <>
                <Text style={Styles.pointsText}>{props?.data?.CreditAmountText}</Text>
                 <Text style={Styles.TextStyle}>{props?.data?.CreditTypeDesc}</Text>
                </>
                :null
            }
            
         </View>
         
        </View>
        </>
    );
};
export default MultiCard;
