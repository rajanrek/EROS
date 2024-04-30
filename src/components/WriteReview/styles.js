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
    backgroundColor: Colors.White,
  },
  left: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 15,
    // paddingVertical: hp('2%'),
    backgroundColor: Colors.newGrey,
  },

  editTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },

  ratingTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },
  btnView: {flex: 2, backgroundColor: 'white', paddingVertical: 10},
  btnsubView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: hp('2.5%'),
  },
  writeBtn: {
    borderColor: Colors.Black,
    borderWidth: 1,
    backgroundColor: Colors.White,
    borderRadius: 8,
    alignItems: 'center',
    height: 41,
    width: 160,
    justifyContent: 'center',
  },
  btnTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 14,
    color: Colors.White,
  },
  cancelTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 14,
    color: Colors.Black,
  },
  reorderView: {
    backgroundColor: Colors.Black,
    borderRadius: 8,
    alignItems: 'center',
    height: 41,
    width: 160,
    justifyContent: 'center',
  },

  disablereorderView: {
    backgroundColor: Colors.LightGrey,
    borderRadius: 8,
    alignItems: 'center',
    height: 41,
    width: 160,
    justifyContent: 'center',
  },
  rating: {
    flex: 6,
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('4%'),
  },
  ratingsubView: {flexDirection: 'row', alignItems: 'center'},
  txtInput: {paddingVertical: hp('2%')},

  input: {
    height:hp('6%'),
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: hp('1.5%'),
  },
});
