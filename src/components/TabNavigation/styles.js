import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({

      brandList:{ flex: 1, padding: 4,justifyContent: 'center' ,paddingHorizontal:hp('1.8%')},
     brandTouch:{  paddingVertical: 5,},
  
      brandTxt:{fontSize: 14, color: Colors.Black,fontFamily:Fonts.OpenSansSemiLight },

      UnderlineTxt:{fontSize: 15, color: Colors.Black,fontFamily:Fonts.OpenSansSemiBold},

      underlineView:{width:wp('20%'),top:hp('0.6%'),height:2.5,backgroundColor:Colors.Black},

      lineView:{width:hp('100%'),height:2,borderWidth:1}



      


});
