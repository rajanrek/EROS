import { StyleSheet } from 'react-native';
import Colors from '../Colors/colors';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
    margin:4, flex:1, marginBottom:20,borderRadius:8},

    glassView: {  height:hp('23%'), width:wp('50%'),justifyContent:'center',alignItems:'center'},

    glassImg: { height:hp('23%'), width: hp('23%'),borderRadius:10},

});
