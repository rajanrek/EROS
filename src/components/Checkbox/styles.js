import {StyleSheet} from 'react-native';
import Colors from '../Colors/colors';
import Fonts from '../CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },

  checkMarkImage: {borderWidth: 1, height: 24, width: 24, borderRadius: 15},
  checkMarkImage2: {height: 24, width: 24},

  checkBoxImage: {
    borderColor: Colors.Grey,
    borderWidth: 1,
    height: 24,
    width: 24,
    borderRadius: 15,
  },
  checkBoxImage2: {height: 24, width: 24},

  titleView: {justifyContent: 'center', alignItems: 'center'},
  brandTxt:{
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
    paddingLeft: 7,
  },
  titleTxt:{
    color: Colors.LightGrey, fontSize: 16,fontFamily:Fonts.OpenSansSemiLight
  }
});
