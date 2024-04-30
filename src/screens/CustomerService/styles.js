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
  mainView: {paddingHorizontal: hp('2%')},

  phoneView: {
    flex: 1,
    flexDirection: 'row',
    // paddingVertical: hp('0.15%'),
    justifyContent: 'space-between',
  },
  phoneSubView: {
    paddingVertical: hp('1.5%'),

    justifyContent: 'space-between',
  },

  numberTouchable: {
    flex: 1,
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: hp('2.5%'),
    paddingHorizontal: hp('5%'),
  },
  phoneImg: {height: hp('8%'), width: hp('8%')},

  numberTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
    paddingVertical: hp('1%'),
  },
  freeTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 11,
    color: Colors.Black,
  },
  whatsView: {
    paddingVertical: hp('1.5%'),
    alignItems: 'flex-end',
  },
  whatsAppTouch: {
    flex: 1,
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: hp('4%'),
  },
  whatsAppImg: {
    height: hp('8%'),
    width: hp('8%'),
  },

  whatsppnumberTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
    paddingVertical: hp('1%'),
  },

  whatsApp: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 11,
    color: Colors.Black,
  },
  mailTouch: {
    flex: 1,
    flexDirection: 'row',
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  mailTouchSubview: {
    flex: 3,
    alignItems: 'flex-end',
    paddingVertical: hp('1%'),
  },

  emailImg: {height: hp('10%'), width: hp('10%')},

  mailIdView: {
    flex: 7,
    alignItems: 'flex-start',
    paddingHorizontal: hp('1.5%'),
    justifyContent: 'center',
  },
  mailIdTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },
  pleaseTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
    color: Colors.Grey,
    paddingVertical: hp('0.5%'),
  },
  watchView: {paddingVertical: hp('2%')},
  watchSubView: {
    flex: 1,
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.newGrey,
  },

  watch: {
    flex: 4,
    alignItems: 'center',
    paddingVertical: hp('2.5%'),
  },
  watchImg: {height: hp('8%'), width: hp('8%')},

  workingView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
    paddingVertical: hp('1%'),
  },

  monView: {flex: 4, flexDirection: 'row'},

  monSubView: {flex: 1, alignItems: 'center'},

  subView: {paddingVertical: hp('1%')},

  monTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  timeTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Black,
  },

  satView: {paddingVertical: hp('1.5%')},
  satTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },

  bankView: {flex: 1, alignItems: 'center'},
  bankSubView: {paddingVertical: hp('1%')},

  bankHolidayTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  addressTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Grey,
  },
  christmasView: {
    flex: 2,
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  christmasTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Red,
  },
  returnView: {
    flex: 1,
    flexDirection: 'row',
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  imageView: {
    flex: 3,
    alignItems: 'flex-end',
    paddingVertical: hp('1.5%'),
  },
  image: {height: hp('10%'), width: hp('10%')},

  returnSubView: {
    flex: 7,
    alignItems: 'flex-start',
    paddingHorizontal: hp('1.7%'),
    paddingVertical: hp('1.5%'),
    justifyContent: 'center',
  },
  returnTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },

  addressreturnTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
    color: Colors.Black,
    paddingVertical: hp('0.5%'),
  },

  return: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
    color: Colors.Grey,
  },
  clickView: {
    paddingVertical: hp('2%'),
  },

  clickSubView: {
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  collectView: {
    flex: 1,
    flexDirection: 'row',
  },

  collect: {
    flex: 3,
    alignItems: 'flex-end',
    paddingVertical: hp('1.5%'),
  },

  collectImg: {height: hp('10%'), width: hp('10%')},

  collectFreeView: {
    flex: 7,
    alignItems: 'flex-start',
    paddingHorizontal: hp('1.7%'),
    paddingVertical: hp('1.5%'),
    justifyContent: 'center',
  },

  freeCollect: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },
  itsFree: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Green,
  },
  feelGoodView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
    color: Colors.Black,
    paddingVertical: hp('0.5%'),
  },
  openingTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 12,
    color: Colors.Black,
    paddingVertical: hp('0.4%'),
  },
  pmTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 12,
    color: Colors.Black,
  },
  addressImgView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addressImg: {height: hp('24%'), width: wp('90%')},

  quiryView: {paddingVertical: hp('2%')},

  quiryTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  emailTxt: {paddingVertical: hp('2%')},

  emailTxtInput: {
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    borderRadius: 8,
    paddingHorizontal: hp('2%'),
    height:hp('6%')
  },

  inputView: {
    paddingVertical: hp('2%'),
  },
  enquireTouch: {
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: hp('2%'),
  },
  enquireTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.Black,
  },

  enquireplaceTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: 'grey',
  },

  arrowImg: {height: hp('1.5%'), width: hp('1.5%')},

  entrySubView: {
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    borderRadius: 8,
    paddingHorizontal: hp('2%'),
    height:hp('6%')

  },
  commentView: {paddingVertical: hp('2%')},

  commentTxtInput: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    borderColor: Colors.DarkGrey,
    borderRadius: 8,
    paddingHorizontal: hp('2%'),
    height:hp('10%'),
    borderWidth: 1,
  },

  captchaView: {
    flex: 1,

    flexDirection: 'row',
  },
  captchaimgView: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    marginRight: 5,
  },
  captchaImg: {height: hp('6%'), width: wp('27%')},

  refereshImg: {height: hp('3.4%'), width: wp('15%')},

  enterView: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    marginLeft: 5,
  },

  enterCaptchView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 20,
    color: Colors.Black,
    paddingHorizontal: hp('2%'),
  },

  enterplaceCaptchView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    paddingHorizontal: hp('2%'),
  },
  btnView: {paddingVertical: hp('3%'), alignItems: 'center'},

  IndicatorView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
