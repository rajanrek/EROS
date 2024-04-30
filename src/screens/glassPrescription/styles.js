import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 15,
    backgroundColor: Colors.White,
  },

 scrollView:{flex: 1},

 view:{
  flex: 1
 },
 
 input: {paddingVertical: hp('3%'),
               
 borderColor: Colors.LightGrey,
 borderWidth: 1,
 borderRadius: 10,
 backgroundColor:Colors.White,
 paddingHorizontal: hp('1.5%'),},

 btnView:{flex: 1, alignItems: 'center',paddingVertical:hp('3%')},

 prescriptionView:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: hp('1%'),
  paddingVertical:5
},
prescriptionTxt:{
  fontFamily: Fonts.OpenSansBold,
  fontSize: 16,
  color: Colors.Black,
},
prescriptionTxtinput :{
  borderRadius: 10,
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  borderWidth: 1,
  borderColor: Colors.SemiGrey,
  paddingVertical:hp('1.2%'),
  paddingHorizontal: hp('4%'),
},

lookView:{
  flex: 1,
  paddingHorizontal: hp('1.25%'),
  paddingVertical: hp('.5%'),
},
underlineTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 16,
  color: Colors.Black,
  textDecorationLine: 'underline',
  paddingVertical: hp('0.5%'),
},
prismView:{
  flex: 1,
  flexDirection: 'row',
  paddingHorizontal: hp('1%'),
  alignItems: 'center',
},
prismTxt:{
  fontFamily: Fonts.OpenSansBold,
  fontSize: 16,
  color: Colors.Black,
},
checkedTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 15,
  color: Colors.Black,
},
pupilView:{
  flex: 1,
  paddingHorizontal: hp('1%'),
  paddingVertical: hp('2%'),
},
pupilTxt:{
  fontFamily: Fonts.OpenSansBold,
  fontSize: 16,
  color: Colors.Black,
},
averageView:{paddingVertical: hp('1.7%')},
touchable:{
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.LightGrey,
  paddingVertical: hp('1.5%'),
  alignItems: 'center',
},
notsureTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  color: Colors.DarkGrey,
},
dateView:{
  flex: 1,
  flexDirection:'row',
  justifyContent:'space-between',
  paddingHorizontal:hp('1')

},
powerView:{
  flex: 8,
  flexDirection:'row',
  justifyContent:'space-between',
  paddingHorizontal:hp('1'),
  alignItems:'flex-end'
},
dateTxt:{
  fontFamily: Fonts.OpenSansBold,
  fontSize: 16,
  color: Colors.Black,
},
date:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: hp('1.7%'),
},
dateTouch:{
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.LightGrey,
  paddingVertical: hp('1.3%'),
  width: wp('30%'),
  justifyContent:'center',
  alignItems:'center',
  borderWidth:1,
  
},
dateTouchRed:{
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.Red,
  paddingVertical: hp('1.3%'),
  width: wp('30%'),
  justifyContent:'center',
  alignItems:'center',
  borderWidth:1,
  
},
spareView:{
  borderColor: Colors.LightGrey,
  paddingVertical: hp('1.3%'),
  width: wp('30%'),
  justifyContent:'center',
  alignItems:'flex-start',
  paddingHorizontal:hp('1.25%')
},
spareText:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  color: Colors.Black,
},
monthTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  color: Colors.black,
},
uploadPrescription:{
  flex: 1,
  paddingVertical: hp('0.5%'),
  paddingHorizontal: hp('2%'),
},
uploadTxt:{
  fontFamily: Fonts.OpenSansBold,
  fontSize: 16,
  color: Colors.Black,
},
browseView:{
  flex: 1,
  flexDirection: 'row',
  paddingVertical: hp('1.5%'),
  alignItems: 'center',
  justifyContent:'space-between'
},

browseTouch:{
  borderRadius: 10,
  borderWidth: 1,
  backgroundColor: Colors.SemiGrey,
  borderColor: Colors.SemiGrey,
  paddingVertical: hp('1.3%'),
  paddingHorizontal: hp('5%'),
},
browseTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  color: Colors.Black,
},
selectedTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  color: Colors.Black,
},
informView:{
  flex: 1,
  paddingVertical: hp('0.5%'),

},
informationTxt:{
  fontFamily: Fonts.OpenSansBold,
  fontSize: 16,
  color: Colors.Black,
},
inputTxt:{paddingVertical:hp('1%')},
leftSprBoxred:{
  flex: 1, alignItems: 'flex-end', borderColor:'red', borderWidth:1, borderRadius:10
},
leftSprBox:{
  flex: 1, alignItems: 'flex-end'

},
rightSphrView:{
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
},
rightSphrViewRed:{
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  borderColor:'red', borderWidth:1, borderRadius:10
},
ImgeView:{
  height: 80,
  width: 130,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection:'row'
},
selectedImg:{
  height: 60,
  width: 55,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: 'grey',
}
  
});
