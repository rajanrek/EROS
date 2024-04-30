import {StyleSheet, Platform} from 'react-native';
import Dimensions from '../../components/Dimensions';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';

export default StyleSheet.create({
  backgroundImage: {
    height: '100%',
  },

  logoView: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
  },

  textContainer: {flex: 2, justifyContent: 'center', paddingLeft: 25},

  nameView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },

  nameText: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 28,
    color: Colors.SemiGrey,
  },

  thankText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 18,
    color: Colors.DarkGrey,
  },
  enjoyText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 18,
    color: Colors.DarkGrey,
  },
  offText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
    color: Colors.White,
    paddingHorizontal: 5,
  },
  orderText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 18,
    color: Colors.DarkGrey,
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textView: {
    // flexDirection: 'row',
    flex: 1,
    // backgroundColor:'red'
  },
  logoImage: {
    width: 179,
    height: 63,
  },
});
