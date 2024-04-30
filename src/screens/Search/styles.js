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
    paddingHorizontal: hp('1.2%'),
    backgroundColor: Colors.White,
  },
  searchView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  BackBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DEDEDE',
    borderRadius: 8,
    height: hp('6%'),
  },
  safearea:{
    paddingTop:hp('1.2%'),
    paddingBottom:hp('3%')
  },
  BackBtnView: {
    flex: 1,
  },
  btnView: {
    flex: 9,
  },
  btn: {
    height: hp('6%'),
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textInput: {
    flex: 1,
    fontSize: hp('1.5%'),
    fontFamily: Fonts.OpenSansSemiLight,
    paddingLeft: hp('1.2%'),
  },
  list: {
    flex: 8,
    paddingHorizontal:hp('2%'),
    justifyContent:'center', 
    paddingVertical:hp('1.5%')
  },

  backImg:{
    height:hp('2.5%'),
    width:hp('2.5%'),
  }
});
