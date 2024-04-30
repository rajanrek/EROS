import {StyleSheet, Platform} from 'react-native';
import Dimensions from '../../components/Dimensions';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';



export default StyleSheet.create({
  backgroundImage: {
    height: Dimensions.height,
  },

  logoView: {
    flex:3,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
  },

  textContainer: {flex: 2,paddingTop:30, paddingLeft: 25},

  nameView: {
    // flex:1,
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },

  nameText: {
    fontFamily:Fonts.OpenSansBold,
    fontSize: 28,
    color: Colors.SemiGrey,
  },

  thankText: {
  fontFamily:Fonts.OpenSansSemiLight,
    fontSize: 18,
    color: Colors.White
  },

  logoImage:{
width:179,
height:63

  }


});
