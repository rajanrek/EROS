import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:Colors.White
  }
 ,
 left:{
  flex: 1,
  paddingHorizontal: 15,
  paddingVertical: hp('0.5%'),
  backgroundColor: Colors.newGrey,
},

editTxt:{
  fontFamily: Fonts.OpenSansSemiBold,
  fontSize: 16,
  color: Colors.Black,
},

mainView:{flex: 5, flexDirection: 'row', paddingVertical: 3},

subView:{
  flex: 3,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingLeft: hp('8%'),
  paddingVertical: hp('1.3%'),
},
tittleTxt:{
  justifyContent: 'center',
  fontFamily: Fonts.OpenSansSemiBold,
  fontSize: 14,
  color: Colors.Black,
},
subTittleView:{flex: 7, paddingRight: hp('6%'),paddingLeft:hp('2%')},
numberView:{
  flex:1,
backgroundColor:Colors.newGrey,
  paddingVertical: hp('0.6%'),
  borderRadius:10,
  justifyContent:'center',
  paddingLeft:10
},
touchable:{
  flex:1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
borderWidth: 1,
borderRadius: 8,
borderColor: Colors.LightGrey,
paddingVertical: hp('1%'),
paddingHorizontal: hp('1%'),
},

subTouchable:{flex:1,justifyContent:'center',alignItems:'flex-end'},

dropDownTxt:{
  fontFamily: Fonts.OpenSansSemiBold,
  fontSize: 11,
  color: Colors.Black,
},

imageView:{flex:1,justifyContent:'center',alignItems:'flex-end',paddingRight:5},

image:{height: 10, width: 10},

stockView:{
  flex: 4,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
},
stockTxt:{
  fontFamily: Fonts.OpenSansSemiBold,
  fontSize: 14,
  color: Colors.Red,
  paddingVertical: 6,
},
btnView:{paddingBottom: 10},

estimatedTxt:{
  fontFamily: Fonts.OpenSansSemiBold,
  fontSize: 11,
  color: Colors.Black,
},

tommorrowTxt:{
  fontFamily: Fonts.OpenSansBold,
  fontSize: 11,
  color: Colors.Green,
},



});
