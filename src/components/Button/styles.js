import {StyleSheet, Platform} from 'react-native';
import Dimensions from '../../components/Dimensions';
import Fonts from '../CustomsFonts/customFonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../Colors/colors';


export default StyleSheet.create({
  btnContainer: {
    height: 0.067 * Dimensions.height,
    width: wp('88%'),
    backgroundColor:Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  btnText: {
    
     fontSize: 16,fontFamily:Fonts.OpenSansBold},
});
