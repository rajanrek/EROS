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

subView:{paddingVertical: 10, paddingHorizontal: 14},
TxtView:{paddingVertical: 5},

commonTxt:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: 12,
  color: Colors.DarkGrey,
},

inputTxt:{fontFamily: Fonts.OpenSansBold, fontSize: 12},
scrollView:{flex:1}










 
  
});
