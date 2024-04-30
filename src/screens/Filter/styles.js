import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: 'rgb(248, 248, 247)',
  },

  filterView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(248, 248, 247)',
    alignItems: 'center',
    // paddingHorizontal: 15,
    
  },
clearText:{fontFamily:Fonts.OpenSansRegular,fontSize:12,color:Colors.Black},

sortView:{flex:4,backgroundColor:Colors.White},

lightTxtTouch:{borderColor:Colors.newGrey,borderWidth:1,padding:15,paddingHorizontal:15},

lightTxt:{fontFamily:Fonts.OpenSansRegular,fontSize:14,color:Colors.Black},

boldTxtTouch:{borderColor:Colors.newGrey,borderWidth:1,padding:15,paddingHorizontal:15,backgroundColor:Colors.newGrey},

boldTxt:{fontFamily:Fonts.OpenSansBold,fontSize:14,color:Colors.Black},

radioView:{flex: 6, backgroundColor: Colors.newGrey},

radioSubView:{flexDirection: 'row', alignItems: 'center'},

brandView:{
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 10,
},

brandTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  color: Colors.Black,
  paddingLeft: 7,
},
radioBtnTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 14,
  color: Colors.Black,
},

sortSubView:{flexDirection:'column',justifyContent:'flex-start'},

subView:{flex:8,flexDirection:'row',backgroundColor:Colors.White},

filterText:{
  fontFamily:Fonts.OpenSansSemiBold,
  fontSize:20,fontWeight:'600',
  color:Colors.Black,
  bottom:8,
  left:0
},
clearFilterText:{
  fontFamily:Fonts.OpenSansSemiBold,
  fontSize:15,
  fontWeight:'600',
  color:Colors.DarkGrey,
  bottom:8,
  right:10
},
  boxImage: {
    height: wp('5.6%'),
    width: wp('5.6%'),
  },

  btnView:{
    flex: 1,
    // width: wp('90.6%'),
    // flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10,
    backgroundColor: Colors.White,
  }
});
