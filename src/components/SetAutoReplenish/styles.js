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
    paddingHorizontal: 15,
    paddingVertical: hp('1%'),
    justifyContent: 'center',
    backgroundColor: Colors.newGrey,
  },

  editTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  oftenTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },

  selectTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 11,
    color: Colors.Black,
  },

  oftenView: {
    flex: 1.2,
    paddingVertical: hp('1%'),
    justifyContent: 'space-between',
  },
  lenseView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
  },
  selectView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hp('13%'),
    paddingTop: hp('1%'),
  },
  selectTouch: {
    borderRadius: 10,
    borderColor: Colors.Grey,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    alignItems: 'center',
  },
  selectsubView: {flex: 8, paddingLeft: hp('4%'), alignItems: 'center'},

  imgView: {flex: 2, alignItems: 'flex-end', paddingRight: hp('2%')},

  img: {
    height: hp('1.5%'),
    width: hp('1.5%'),
    resizeMode: 'contain',
  },
  satView: {
    flex: 1.5,
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
  },
  satsubView: {
    flex: 2,
    paddingVertical: hp('2%'),
    alignItems: 'center',
    backgroundColor: Colors.newGrey,
    borderRadius: 10,
  },
  satTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
    paddingVertical: hp('1%'),
  },
  everyView: {flexDirection: 'row', alignItems: 'center'},

  everyTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  TxtInput: {
    paddingVertical: hp('0.55%'),
    paddingHorizontal: hp('1.2%'),
    borderColor: Colors.Grey,
    borderWidth: 1,
    backgroundColor: Colors.White,
    borderRadius: 8,
    fontFamily:Fonts.OpenSansSemiBold,
    fontSize:14,

  },

  Inputinterval: {
    paddingVertical: hp('0.55%'),
    paddingHorizontal: hp('1.2%'),
    borderColor: Colors.Grey,
    borderWidth: 1,
    backgroundColor: Colors.White,
    borderRadius: 8,
    fontFamily:Fonts.OpenSansSemiBold,
    fontSize:14,
    color:Colors.Black
  },

  daysTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  calendarView: {
    flex: 5,
    alignItems: 'center',
    paddingHorizontal: hp('2%'),
  },
  calendarSubView: {},

  calendar: {
    width: wp('90%'),
    borderRadius: 10,
    backgroundColor: Colors.newGrey,
    height: 360,
  },
  btnView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('2%'),
  },
  cancelBtn: {paddingVertical: hp('1%')},

  cancelTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    color: Colors.Black,
  },

  reorderDate: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },
});
