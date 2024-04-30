import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  btnView: {flexDirection: 'row', alignContent: 'center'},

  btnSubView: {flex: 8, alignItems: 'center'},
  basketText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.White,
  },
  heartView:{
    flex:2,
  },
  heartTouchable: {
    // paddingVertical: hp('1.8%'),
    // paddingHorizontal: wp('2%'),
    height: hp('5.8%'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartImg: {height: hp('3%'), width: hp('5%')},
  heartImgFav:{
    height: hp('5.8%'), width: hp('6%')
  },
  btnTouchable: {
    paddingVertical: hp('1.8%'),
    paddingHorizontal: hp('11%'),
    borderRadius: 5,
    backgroundColor: Colors.Black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisable: {
    paddingVertical: hp('1.8%'),
    paddingHorizontal: hp('11%'),
    borderRadius: 5,
    backgroundColor: Colors.SemiGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
