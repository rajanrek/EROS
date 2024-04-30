import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 15,
    backgroundColor: Colors.White,
  },

  scrollView: {flex: 1},
  pointsView: {flex: 1, paddingHorizontal: 14},

  Txt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
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

  dilveryView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: hp('2%'),
    // paddingVertical: hp('1%'),
  },
  commonView: {flex: 1},

  deliveryTouch: {
    justifyContent: 'center',
    paddingVertical: hp('2.5%'),
    alignItems: 'center',
    backgroundColor: Colors.Black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.newGrey,
  },

  billingTouch: {
    justifyContent: 'center',
    paddingVertical: hp('2.5%'),
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.newGrey,
  },
  whiteTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.White,
  },
  blackTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  flatlistView: {flex: 8},
  contentView: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('2.2%'),
  },

  subContentView: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
    paddingVertical: hp('2%'),
  },

  borderContentView: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.goldYellow,
    paddingVertical: hp('2%'),
  },
  defaultView: {flexDirection: 'row'},

  addressView: {
    flex: 8,
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('4%'),
  },

  nameTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },
  addressTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Black,
    paddingVertical: hp('1%'),
  },
  checkBoxView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: hp('1.5%'),
  },
  defaultTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.goldYellow,
  },
  setTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Grey,
  },
  borderView: {
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
  },
  removeView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('0.5%'),
  },
  removeTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp('4%'),
  },
  removeImg: {height: hp('2.5%'), width: hp('2.5%')},

  removeTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Black,
  },

  editView: {flexDirection: 'row', alignItems: 'center'},
  editImg: {height: hp('4.5%'), width: hp('4.5%')},

  editTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Black,
  },
  btnView: {flex: 1, alignItems: 'center'},

  addressContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },

  boxView: {flex: 1, paddingHorizontal: hp('2%')},
  fieldView: {
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    flex: 9,
  },
  countryfieldView: {
    flex: 9,
    paddingVertical: hp('2%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  postfieldView: {
    flex: 9,
  },
  countryinputBox: {
    fontSize: 11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.Black,
  },

  countryBox: {
    fontSize: 11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.Grey,
  },

  inputBox: {
    fontSize: 11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.Black,
    height: hp('6%'),
  },

  postinputBox: {
    fontSize: 11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.Black,
    height: hp('6%'),
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
    fontFamily: Fonts.OpenSansSemiLight,
    borderRadius: 5,
    marginVertical: hp('0.6%'),
    alignItems: 'center',
  },
  postView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
    fontFamily: Fonts.OpenSansSemiLight,
    borderRadius: 5,
    marginVertical: hp('0.6%'),
    alignItems: 'center',
    // width: hp('39%'),
  },

  plusMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    height: wp('4%'),
    width: wp('4%'),
  },

  accountImage: {
    height: wp('4%'),
    width: wp('4%'),
  },

  plusView: {
    // flex: 1,
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingTop: 10,
  },

  boxImage: {
    height: hp('3%'),
    width: hp('3%'),
  },

  receiveText: {
    // paddingLeft: hp('1%'),
    color: Colors.Black,
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
  },

  receiveView: {
    flexDirection: 'row',
    paddingHorizontal: hp('0.5%'),

    // alignContent: 'center',
    // alignItems: 'flex-start',
  },
  findText: {
    color: Colors.goldYellow,
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
    paddingRight: hp('1.3%'),
  },
  impTxt: {
    color: Colors.Grey,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 11,
    paddingHorizontal: hp('1%'),
  },

  left: {
    flex: 0.5,
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('0.2%'),
    justifyContent: 'center',
    backgroundColor: Colors.newGrey,
  },

  newTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },

  cancelText: {
    color: Colors.Black,
    paddingVertical: hp('0.5%'),
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
  },

  inputMainView: {flex: 1},

  dropArrow: {paddingRight: hp('1%')},
  arrowImg: {
    resizeMode: 'contain',
    height: hp('1.6%'),
    width: hp('1.6%'),
  },
  notificationView: {
    // flex: 1,
    paddingHorizontal: hp('1.5%'),
    // paddingVertical: hp('1%'),
  },

  btnMainView: {
    // flex: 1,
    alignItems: 'center',
    // paddingVertical: hp('2%'),
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

  rbSheetTxt: {
    fontSize: 12,
    fontFamily: Fonts.OpenSansSemiBold,
    color: Colors.Black,
  },
  rbTouch: {
    flex: 1,
    backgroundColor: '#e1e4e6',
    marginVertical: hp('0.7%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('1.5%'),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  rbCountryTouch: {
    flex: 1,
    backgroundColor: '#e1e4e6',
    marginVertical: hp('0.7%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  
});
