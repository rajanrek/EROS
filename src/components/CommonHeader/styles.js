import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer:{
 paddingVertical:hp('1.5%')
  
  },
  arrowImg: {width: hp('2%'), height: hp('2%')},
  arrowView:{flex: 1},



});
