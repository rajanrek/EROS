import {StyleSheet} from 'react-native';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  commonView: {
    paddingHorizontal: 15,
  },
  searchView: {
    flexDirection: 'row',
    flex: 1,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical:hp('1%')
  },
  searchImgView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5,
  },
  searchImg: {height: hp('3%'), width: hp('3%')},

  inputView: {
    flex: 9, 
    justifyContent: 'center',
},
  textInput: {
    fontSize: 14,
    fontFamily: Fonts.OpenSansSemiLight,
  },


});
