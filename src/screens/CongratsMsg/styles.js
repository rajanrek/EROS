import {StyleSheet} from 'react-native';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 30,
  },

  congratsView: {flex: 8, paddingTop: 30},

  congratsText: {
    fontSize: 28,
    fontFamily: Fonts.OpenSansSemiBold,
    color: Colors.LightGrey,
  },

  shopTxt: {
    fontFamily: Fonts.OpenSansSemiLight,
    fontSize: 16,
    color: Colors.LightGrey,
    paddingVertical: 20,
  },

  btnView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
