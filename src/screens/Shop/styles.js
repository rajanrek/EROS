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

  lenseView: {
    flex: 1,
    flexDirection: 'row',
    // paddingBottom: 20,
    // paddingVertical:15,
    paddingHorizontal: 15,
  },
  lensTxt: {fontFamily: Fonts.OpenSansBold, fontSize: 17, color: Colors.Black},

  shopView: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },

  shopView1: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingBottom: 20,
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

  shopTxtView: {paddingHorizontal: 15, paddingVertical: hp('3%')},

  shopTxtView1: {paddingHorizontal: 15, paddingVertical: hp('4%')},
  // shopview:{
  //   paddingHorizontal: 15, paddingVertical: hp('1.5%')
  // },
  shopTxt: {color: Colors.Black, fontSize: 24, fontFamily: Fonts.OpenSansBold},

  findTxt: {color: Colors.Black, fontSize: 20, fontFamily: Fonts.OpenSansBold},

  // orderTxt: {flex: 6, paddingHorizontal: hp('2%')},
  orderTxt: {flex: 6},

  shop: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },

  previousOrderView: {
    flexDirection: 'row',
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  previousTxt: {
    fontSize: 16,
    paddingRight: 7,
    fontFamily: Fonts.OpenSansBold,
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

  price: {fontSize: 14, fontFamily: Fonts.PoppinsBold, color: Colors.Red},

  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.OpenSansSemiBold,
    color: Colors.Black,
  },

  buttonView: {paddingVertical: 10, alignItems: 'center'},

  lenseTxtView: {flex: 7},

  brandTitle: {padding: 4},

  titleTouch: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingLeft: 10,
  },
  titleTxt: {fontFamily: Fonts.OpenSansBold, fontSize: 18, color: Colors.Black},
  brandList: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  brandTouch: {
    borderWidth: 0.5,
    paddingHorizontal: hp('0.1%'),
    borderRadius: 10,
    height: hp('13%'),
    width: hp('21%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
    color: Colors.Black,
    fontWeight: '600',
  },

  commonView: {
    paddingHorizontal: 10,
  },

  priceTextView: {flexDirection: 'row', alignItems: 'center'},
  discountPrice: {
    fontSize: 12,
    fontFamily: Fonts.PoppinsBold,
    color: Colors.Black,
    padding: 5,
    textDecorationLine: 'line-through',
  },

  sellerSubView: {paddingVertical: hp('2%')},
  IndicatorView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
