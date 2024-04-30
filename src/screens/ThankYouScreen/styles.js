import {StyleSheet, Platform} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.LightWhite,
  },
  homeView: {flexDirection: 'row', alignItems: 'center'},

  homeTxt: {fontFamily: Fonts.OpenSansBold, fontSize: 16, color: Colors.Black},
  arrowImg: {width: hp('1.5%'), height: hp('1.5%')},

  thanksView: {alignItems: 'center'},

  thanksTxt: {
    fontFamily: Fonts.InterRegular,
    fontSize: 20,
    color: Colors.Black,
  },

  backarrowImg: {width: hp('2.6%'), height: hp('2.6%')},
  backBtn: {
    paddingVertical: hp('3%'),
    paddingHorizontal: hp('3%'),
  },

  placedView: {alignItems: 'center', paddingVertical: hp('2%')},

  placedsubView: {
    height: hp('17%'),
    width: wp('100%'),
    backgroundColor: Colors.LightGrey,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  placedTxt: {
    fontFamily: Fonts.InterRegular,
    fontSize: 25,
    color: Colors.Black,
  },

  orderView: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  orderTxt: {
    fontFamily: Fonts.InterRegular,
    fontSize: 14,
    color: Colors.Black,
    fontWeight: '400',
  },

  dateTxt: {fontFamily: Fonts.InterRegular, fontSize: 14, color: Colors.Black},

  emailView: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: hp('4%'),
  },
  emailTxt: {fontFamily: Fonts.InterRegular, fontSize: 14, color: Colors.Black},

  reminderView: {
    height: hp('15%'),
    width: wp('90%'),
    backgroundColor: Colors.White,
    alignSelf: 'center',
    paddingHorizontal: 20,
    alignContent: 'center',
    paddingVertical: 10,
  },
  subView: {flexDirection: 'row'},

  reorderView: {flex: 7},

  reminderTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    color: Colors.Black,
  },

  changeView: {flex: 3, flexDirection: 'row'},

  changeTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Black,
  },

  nextView: {paddingVertical: 20},

  emailorderTxt: {
    fontFamily: Fonts.InterBold,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.Black,
  },

  dateTxt: {fontFamily: Fonts.OpenSansBold, fontSize: 12, color: Colors.Black},

  bannerImg: {height: hp('42%'), width: hp('60%')},

  thanksTxt: {
    fontWeight: '400',
    fontFamily: Fonts.InterBold,
    fontSize: 22,
    color: Colors.Green,
  },

  nameTxt: {
    fontWeight: '400',
    fontFamily: Fonts.InterBold,
    fontSize: 22,
    color: Colors.Black,
  },

  autoTxt: {
    fontFamily: Fonts.InterRegular,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.Black,
  },
  hereTxt: {
    textDecorationLine: 'underline',
    textDecorationColor: Colors.Black,
    fontFamily: Fonts.InterBold,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.Black,
  },

  wouldTxt: {
    fontFamily: Fonts.InterBold,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Black,
  },

  emailTxt: {
    fontFamily: Fonts.InterBold,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.Black,
  },

  woulddateTxt: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.Black,
    left: hp('0.5%'),
  },

  updateTxt: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.White,
  },
  calendar: {
    width: wp('100%'),
    borderRadius: 10,
    backgroundColor: Colors.newGrey,
    height: 50,
  },
});
