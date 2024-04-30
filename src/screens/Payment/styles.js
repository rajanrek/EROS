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

  mainView: {flex: 1},
  subView: {
    paddingHorizontal: hp('2.2%'),
    paddingVertical: hp('1%'),
  },
  cardView: {
    flex: 1,
    borderColor: Colors.SemiGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  imageView: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp('3%'),
  },
  image: {height: hp('15%'), width: hp('15%')},

  numberTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 17,
    color: Colors.Black,
    paddingHorizontal: hp('2%'),
  },
  lineTxt: {
    borderColor: Colors.SemiGrey,
    borderWidth: 1,
  },
  removeView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeTouch: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: hp('2%'),
  },
  removeImg: {height: hp('2%'), width: hp('4%')},

  removeTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },

  cardnumberView: {flex: 3, alignItems: 'center'},

  cardTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
  },
  IndicatorView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.White,
  },

  cancelbtnTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 13,
    color: Colors.Black,
  },
});
