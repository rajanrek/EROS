import {StyleSheet} from 'react-native';
import Fonts from '../CustomsFonts/customFonts';
import Colors from '../Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.White,
    margin: 6,
    flex: 0.5,
    borderRadius: 8,
    paddingHorizontal: 5,
    borderColor: Colors.newGrey,
    borderRadius: 10,
    borderWidth: 2,
  },

  heartView: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  heartImg: {height: hp('7%'), width: wp('10%'), resizeMode: 'contain'},
  glassView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },

  glassImg: {height: hp('9%'), width: wp('45%')},

  titleView: {
    flex: 3,
  },
  title: {fontSize: 12, fontFamily: Fonts.OpenSansRegular, color: Colors.Black},

  subTitle: {
    fontSize: 10,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.Grey,
  },

  discountPrice: {
    fontSize: 12,
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.Black,
    paddingRight: 5,
    textDecorationLine: 'line-through',
  },
  MainPrice: {
    fontSize: 12,
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.Black,
    paddingRight: 5,
  },

  price: {fontSize: 14, fontFamily: Fonts.PoppinsSemiBold, color: Colors.Red},

  touchable: {flex: 8},

  brandView: {
    flex: 1,
  },

  priceView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  starSubView: {
    flex: 1,
    paddingBottom:5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  numTxt: {color: Colors.Black, fontSize: 11, fontFamily: Fonts.PoppinsLight},
});
