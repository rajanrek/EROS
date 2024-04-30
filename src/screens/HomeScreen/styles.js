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
    // paddingHorizontal: 2,
    // paddingVertical: 15,
    backgroundColor: Colors.White,
  },
  subView: {
    paddingVertical: hp('2.5%'),
  },
  lenseView: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 15,
  },

  mustView: {
    flex: 1,
    flexDirection: 'row',
    // paddingBottom: 5,
    paddingHorizontal: 15,
  },

  lensTxt: {fontFamily: Fonts.OpenSansBold, fontSize: 20, color: Colors.Black},

  shopView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  productView: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  orderView: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 15,
  },

  shopTxtView: {paddingHorizontal: 15, paddingBottom: hp('2%')},
  shopTxtView1: {paddingVertical: 25, paddingHorizontal: 20},
  // shopview:{
  //   paddingHorizontal: 15, paddingVertical: hp('1.5%')
  // },
  shopTxt: {color: Colors.Black, fontSize: 24, fontFamily: Fonts.OpenSansBold},

  findTxt: {color: Colors.Black, fontSize: 20, fontFamily: Fonts.OpenSansBold},

  orderTxt: {flex: 6, paddingVertical: hp('1%')},

  saveTxt: {
    flex: 6,
    paddingHorizontal: hp('2.5%'),
    paddingVertical: hp('2.5%'),
  },

  discoverTxt: {flex: 6},

  byView: {flex: 7},

  sunView: {
    flex: 7,
  },

  previousOrderView: {
    flexDirection: 'row',
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // right: 15,
  },

  sunOrderView: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 10,
  },
  previousTxt: {
    fontSize: 16,
    paddingRight: 7,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.goldYellow,
  },

  arrowImg: {height: hp('1.4%'), width: hp('1.9%'), resizeMode: 'contain'},

  lenseImgView: {flex: 1},

  lenseImg: {height: hp('10%'), width: hp('20%')},

  itemView: {flex: 1, justifyContent: 'flex-start'},

  itemTitle: {
    fontSize: 14,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.Black,
  },

  price: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsBold,
    color: Colors.Red,
    left: 5,
  },

  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.OpenSansSemiBold,
    color: Colors.Black,
  },

  buttonView: {paddingVertical: 10, alignItems: 'center'},

  lenseTxtView: {flex: 7},

  brandTitle: {justifyContent:'center',alignItems:'center',paddingVertical:10 },

  titleTouch: {
    width: wp('90%'),
    height: hp('40%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    // paddingVertical: 10,
   
  },

  titleTxt: {fontFamily: Fonts.OpenSansBold, fontSize: 18, color: Colors.Black},

  glassTxt: {
    fontFamily: Fonts.OpenSansSemiLight,
    fontSize: 16,
    color: Colors.Black,
  },

  brandList: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  brandTouch: {justifyContent:'center'},

  brandTxt: {fontFamily: Fonts.OpenSansBold, fontSize: 18, color: Colors.Black},

  commonView: {
    // paddingHorizontal: 15,
  },

  priceTextView: {flexDirection: 'row', alignItems: 'center'},
  discountPrice: {
    fontSize: 12,
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.Black,
    textDecorationLine: 'line-through',
  },
  brandImg: {
    height: hp('7%'),
    width: hp('7%'),
  },
  logoImg: {
    height: hp('10%'),
    width: hp('10%'),
  },
  thanksTxt: {
    fontSize: 16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.Black,
  },
  sellerSubView: {paddingVertical: hp('0.5%')},
  sellerSubView2:{paddingVertical: hp('1.8%')},
  thanksView: {alignItems: 'center', paddingVertical: 5},

  space:{
    paddingVertical:25
  },

  sellerImage:{ width: wp('90%'),
  height: hp('40%'),
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
 }

});
