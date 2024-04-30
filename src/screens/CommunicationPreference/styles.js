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
  contentView: {
    flex: 1,
    paddingHorizontal: hp('2%'),
    // paddingVertical: hp('1%'),
  },
  subContentView: {
    flex: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.LightGrey,
  },
  offerView: {
    flex: 0.5,
    borderRadius: 8,
    borderColor: Colors.Red,
    backgroundColor: Colors.newGrey,
    paddingHorizontal: hp('3%'),
    paddingVertical: hp('2.5%'),
  },
  offerTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
    paddingVertical: hp('0.5%'),
  },
  receiveTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  moneyTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Green,
  },
  lenseView: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2%'),
  },
  lenseTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  lineView: {borderColor: Colors.newGrey, borderWidth: 1},

  sunglass: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2%'),
  },
  sunglassTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  glassView: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2%'),
  },
  glassTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  healthView: {flex:3 , paddingVertical: hp('2%')},

  adviceView: {
    flex: 0.8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.Grey,
  },
  tipsView: {
    flex: 0.4,
    borderRadius: 8,
    // borderColor: Colors.Red,
    backgroundColor: Colors.newGrey,
    paddingHorizontal: hp('3%'),
    paddingVertical: hp('2.5%'),
  },
  healthTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
    paddingVertical: hp('0.5%'),
  },
  receiveTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  healthAdviceView: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2%'),
  },

  policyView: {alignItems: 'center'},
  respectTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.LightGrey,
  },
  privacyTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.goldYellow,
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

  btnView: {alignItems: 'center', paddingVertical: hp('1%')},
});
