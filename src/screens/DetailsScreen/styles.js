import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: Colors.White,
  },
  subView: {
    flex: 3,
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexView: {
    flex: 1,
    paddingVertical: 12,
  },

  productName: {
    flex: 1,
    flexDirection: 'row',
  },

  productView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pacKView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  packText: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 11,
    color: Colors.Black,
    textDecorationLine: 'underline',
    right: 7,
  },
  pack: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 11,
    color: Colors.Grey,
    paddingHorizontal: 10,
  },

  imageFlex: {
    flex: 7,

  },
  textFlex:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  productImage: {
    height: wp('60%'),
    width: hp('45%'),
  },
  productText: {
    fontFamily: Fonts.PoppinsLight,
    fontSize: 14,
    color: Colors.Black,
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopTxt: {color: Colors.Black, fontSize: 16, fontFamily: Fonts.OpenSansBold},
  heartView: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  totalText: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 18,
    color: Colors.Black,
  },
  totalTextdiscount: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 18,
    color: Colors.Red,
    left:5
  },
  rewardText: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 12,
    color: Colors.Black,
  },
  discountPrice: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.Black,
    paddingRight: 5,
    textDecorationLine: 'line-through',
  },
  text: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  estimatedTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 11,
    color: Colors.Black,

  },
  inStockTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.Green,

  },
  leftText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
    paddingLeft: 10,
  },
  checkboxStyle: {
    height: hp('2.5%'),
    width: hp('2.5%'),
  },
  curveText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
    color: Colors.Black,
  },
  curveTouchable: {
    height: 33,
    width: 110,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },

  powerTouchable: {
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerTouchable2: {
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },

  powerTouchable3: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.newGrey,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DisableFields: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.newGrey,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.newGrey,
  },
  powerTouchable4: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.newGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerTouchableFileds2: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.newGrey,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.newGrey,
  },
  heartImg: {height: hp('5%'), width: hp('5%'), resizeMode: 'contain'},
  glassView: {flex: 4, justifyContent: 'center', alignItems: 'center'},

  glassImg: {height: 90, width: 170},

  leftView: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'green'
  },
  powerView: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  powerSubView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  powerSubView1: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  powerSubView2: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  powerCurveView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },

  leftsubView: {
    flex: 7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    //  backgroundColor:'red',
    paddingHorizontal: 20,
  },

  spnr_enable: {
    height: hp('1%'),
    width: hp('2%'),
  },
  stockView: {flex: 3},
  stockSubView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor:Colors.LightGrey,
    borderRadius:10
  },

  stockText: {fontFamily: Fonts.PoppinsBold, fontSize: 16, color: Colors.Red, fontWeight:'600'},
  btnView: {flexDirection: 'row', alignContent: 'center'},

  btnSubView: {flex: 8, alignItems: 'center'},
  basketText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.White,
  },

  heartTouchable: {
    height: 50,
    width: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow_enable: {
    height: hp('1%'),
    width: hp('2%'),
  },

  arrow_disable: {
    height: hp('5%'),
    width: hp('3%'),
  },
  heartImg: {height: hp('3.5%'), width: hp('3.5%')},
  btnTouchable: {
    height: 50,
    width: 300,
    borderRadius: 5,
    backgroundColor: Colors.Black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowView: {flex: 1, paddingVertical: 6},
  arrowImgView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  lenseTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.LightGrey,
  },

  diameterView: {flex: 1, paddingVertical: 6, justifyContent: 'center'},

  detailView: {paddingVertical: hp('1%')},

  detailSubView: {
    flexDirection: 'row',
    backgroundColor: Colors.newGrey,
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: hp('2%'),
  },

  measureView: {paddingVertical: hp('1%')},

  measureSubView: {
    flexDirection: 'row',
    backgroundColor: Colors.newGrey,
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: hp('2%'),
  },

  descriptionView: {paddingVertical: hp('1%')},

  descriptionSubView: {
    flexDirection: 'row',
    backgroundColor: Colors.newGrey,
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: hp('2%'),
  },
  customerView: {paddingVertical: hp('1%')},

  customerSubView: {paddingVertical: hp('1%')},

  cardView: {paddingVertical: hp('0.4%')},
  overView: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: 16,
    color: Colors.Black,
  },

  productOverView: {paddingVertical: hp('2%')},
  otherTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 16,
    color: Colors.Black,
  },

  supplyView: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  supplySubView: {flex: 7},

  packSubView: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  MeasorViewInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  measerImg: {
    height: hp('2.7%'),
    width: hp('2.7%'),
  },
  mainMeasurInner: {
    flex: 1,
    paddingVertical: hp('1.25%'),
    paddingHorizontal: 4,
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxHeadingView:{
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: hp('1.4%'),
  },
  LeftBoxView:{
    flex: 4,
    paddingLeft: hp('4.5%'),
    paddingRight: 4,
    center: 'flex-start',
    justifyContent: 'flex-start',
  },
  leftBoxText:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },
  dropdownArrowView:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },
  rightBoxView:{
    flex: 4,
    center: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 6,
  }
});
