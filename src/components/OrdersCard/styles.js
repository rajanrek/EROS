import {StyleSheet} from 'react-native';
import Colors from '../Colors/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fonts from '../CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingVertical: 12,
    marginVertical: 10,
    backgroundColor: Colors.newGrey,
  },

  subContainer: {flex: 1, paddingVertical: 10, paddingHorizontal:5},

  borderView: {
    flex: 1,
    borderColor: Colors.Grey,
    borderWidth: 1,
    borderRadius: 8,
  },

  refView: {
    flex: 4,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  menuView: {
    flex: 1,
    // justifyContent: 'flex-start',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingLeft: 5,
    alignItems: 'center',
  },

  orderMenu: {
    // flex: 4,
    // backgroundColor:'green',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  refTxt: {
    flex:7,
    fontFamily: Fonts.BrandingBold,
    fontSize: 12,
    color: Colors.Black,
  },
  fgTxt: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    color: Colors.Black,
  },
  dateTxt: {
    fontFamily: Fonts.BrandingBold,
    fontSize: 12,
    color: Colors.Black,
  },
  date: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    color: Colors.Black,
  },
  status: {
    fontFamily: Fonts.BrandingBold,
    fontSize: 12,
    color: Colors.Black,
  },
  shipped: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    color: Colors.Black,
  },
  contentView: {flex: 6},
  subContentView: {flexDirection: 'row'},

  imageView: {
    // paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 3,
    justifyContent: 'center',
  },

  lenseImg: {height: 80, width: 80},
  

  moistView: {flex: 7},

  acuveTxt: {
    fontFamily: Fonts.BrandingBold,
    fontSize: 14,
    color: Colors.Black,
    paddingVertical: 7,
  },

  rightEyeTxt: {
    fontFamily: Fonts.BrandingBold,
    fontSize: 12,
    color: Colors.Black,
  },
  powerTxt: {
    fontFamily: Fonts.BrandingMedium,
    fontSize: 12,
    color: Colors.Black,
  },
  boxTxt: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    color: Colors.Black,
    paddingVertical: 5,
  },

  changeTxt: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    textDecorationLine: 'underline',
    color: Colors.Black,
    paddingVertical: 2,
  },

  Commentinput: {
    alignSelf: 'center',
    height: hp('6%'),
    width: hp('40%'),
    // alignSelf:'center',
    // paddingVertical: hp('1%'),
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: hp('1%'),
  },

  dayView: {flex: 7, paddingVertical: 10},
  moistTxt: {
    fontFamily: Fonts.BrandingBold,
    fontSize: 14,
    color: Colors.Black,
    paddingVertical: 7,
  },

  leftEyeTxt: {
    fontFamily: Fonts.BrandingMedium,
    fontSize: 12,
    color: Colors.Black,
  },
  curveTxt: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    color: Colors.Grey,
  },
  boxes1Txt: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    color: Colors.Black,
    paddingVertical: 5,
  },
  presecriptionTxt: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 12,
    textDecorationLine: 'underline',
    color: Colors.Black,
    paddingVertical: 2,
  },
  btnView: {backgroundColor: 'white', paddingVertical: 10},
  btnsubView: {
    alignItems: 'flex-end',
    // paddingVertical: 10,
    // paddingHorizontal: 5,
  },
  writeBtn: {
    // backgroundColor: Colors.goldYellow,
    borderRadius: 8,
    alignItems: 'center',
    height: 41,
    width: 160,
    justifyContent: 'center',
  },
  btnTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.White,
  },

  autoBtnTxt: {
    textDecorationLine: 'underline',
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.goldYellow,
  },
  cancelbtnTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 13,
    color: Colors.Black,
  },

  yesbtnTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 13,
    color: Colors.White,
  },
  reorderView: {
    backgroundColor: Colors.Black,
    borderRadius: 8,
    alignItems: 'center',
    height: 41,
    width: 160,
    justifyContent: 'center',
  },
  replenish: {
    backgroundColor: Colors.Black,
    borderRadius: 8,
    alignItems: 'center',
    height: hp('5.5%'),
    width: hp('43%'),
    justifyContent: 'center',
  },

  buttonPress: {
    // backgroundColor: Colors.Black,
    // borderRadius: 8,
    // alignItems: 'center',
    // height: hp('3.5%'),
    // width: hp('10%'),
    // justifyContent: 'space-around',
  },

  pressTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 10,
    color: Colors.Black,
    textDecorationLine: 'underline',
  },

  reorderTXt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.White,
  },
  replenishView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  subTitleView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  polysubTitleView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.White,
  },

  polygonView: {flexDirection: 'row', alignItems: 'center', paddingVertical: 5},

  polygonSubView: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  arrowImg: {height: 10, width: 10},
  arrowView: {flexDirection: 'row', alignItems: 'center', paddingVertical: 9},

  separator: {
    height: 1,
    backgroundColor: Colors.Black,
  },
  image: {
    paddingVertical: 10,
    backgroundColor: Colors.White,
  },

  //

  addressContainer: {
    flex: 1,
    backgroundColor: Colors.White,
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

  inputMainView: {flex: 1},
  boxView: {flex: 1, paddingHorizontal: hp('2%')},

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
  imgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountImage: {
    height: wp('4%'),
    width: wp('4%'),
  },
  fieldView: {
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    flex: 9,
  },
  inputBox: {
    fontSize: 11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.Black,
    height: hp('6%'),
  },
  userImage: {
    height: wp('4%'),
    width: wp('4%'),
  },

  accountImage: {
    height: wp('4%'),
    width: wp('4%'),
  },
  plusMainView: {
    flexDirection: 'row',
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
  imgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  postfieldView: {
    flex: 9,
  },

  postinputBox: {
    fontSize: 11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.Black,
    height: hp('6%'),
  },

  btnMainView: {
    // flex: 1,/
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    // paddingVertical: hp('2%'),
  },

  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  dropdownButtonStyle: {
    width: hp('30%'),
    height: hp('5%'),
    backgroundColor: Colors.Common,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    // flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Black,
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: Colors.newGrey,
    borderRadius: 8,
    height: hp('15%'),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
  },
  dropdownItemTxtStyle: {
    // flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
    textAlign: 'center',
  },
  returnimageView: {
    // paddingVertical: 10,
  
    paddingHorizontal: 10,
    // flex: 3,
    height: 150,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexStyle:{
    flex: 8.5
  },

  ActiveflexStyle:{
    flex: 8.5,
    paddingBottom: hp('12%')
  }
});
