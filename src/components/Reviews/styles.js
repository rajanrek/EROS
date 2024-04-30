import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainView: {
    backgroundColor: Colors.White,
  },
  shopTxt: {
    color: Colors.Black,
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
  },

  subView: {
    paddingVertical: hp('2%'),
  },
  starView: {
    flex: 1,

    flexDirection: 'row',
    backgroundColor: Colors.newGrey,
    borderRadius: 12,
  },
  starSubView: {
    flex: 1,

    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // left: wp('2.5%'),
  },
  ratingView: {paddingVertical: 15},

  allReviews: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',

    paddingHorizontal: hp('1%'),
    // paddingVertical: hp('1%'),
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: hp('2%'),
  },

  writeView: {paddingVertical: hp('1.8%')},
  writeSubView: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    backgroundColor: Colors.newGrey,
    borderRadius: 12,
  },

  txtView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1%'),
  },
  txtInput: {
    flexDirection: 'row',
    alignItems: 'center',
    color: Colors.Black,
    fontSize: 12,
  },
  arrowImg: {
    height: hp('1.4%'),
    width: hp('2.5%'),
  },

  numTxt: {color: Colors.Black, fontSize: 13, fontFamily: Fonts.PoppinsLight},

  reviewTxt: {
    color: Colors.Black,
    fontSize: 12,
    fontFamily: Fonts.PoppinsLight,
  },
  reviewImg: {height: hp('13%'), width: hp('13%'), resizeMode: 'contain'},

  flex:{
    flex: 1
  }
});
