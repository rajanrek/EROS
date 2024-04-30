import {StyleSheet} from 'react-native';
import Colors from '../Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  subContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    paddingVertical: 15,
  },

  sizeImageView: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  txtView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2%'),
  },
  sizeSubView: {
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },

  sizeTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 16,
    color: Colors.Black,
  },

  Txt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 15,
    color: Colors.LightGrey,
    paddingHorizontal: hp('0.5%'),
  },
  flatlistView: {flex: 8},

  otherView: {height: hp('5%')},

  otherTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 16,
    color: Colors.Black,
  },
  image: {
    height: hp('4%'),
    width: wp('15%'),
  },

  checkImage: {
    height: hp('3.5%'),
    width: wp('6.5%'),
  },
  checkImageView: {paddingVertical: 1},

  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: hp('2%'),
  },

  frameTouch: {
    height: 40,
    width: 170,
    borderRadius: 8,
    backgroundColor: Colors.White,
    borderColor: Colors.Black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 12,
    color: Colors.Black,
  },

  lenseTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 12,
    color: Colors.White,
  },

  uspView: {paddingVertical: 15, paddingHorizontal: 12},

  uspTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    color: Colors.Black,
  },
  btnTouchable: {
    height: 40,
    width: 170,
    borderRadius: 8,
    backgroundColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MeasorViewInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  measerImg: {
    height: hp('3%'),
    width: hp('3%'),
  },
  mainMeasurInner: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: hp('2%'),
  },
   checkboxStyle:{
    height:hp('3%'),
    width:hp('3%'),

  },
});
