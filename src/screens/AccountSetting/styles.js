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

  subView: {flex: 1, paddingVertical: 10, paddingHorizontal: 14},
  TxtView: {flex: 9, paddingVertical: hp('1%'), paddingHorizontal: hp('3%')},

  commonTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.DarkGrey,
  },

  headingTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },

  inputTxt: {
    height: hp('6%'),
    paddingHorizontal: hp('1.7%'),
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
    borderRadius: 8,
  },
  scrollView: {flex: 1},
  personView: {
    flex: 1,
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  btnTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.White,
  },
  cancelbtnTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 13,
    color: Colors.Black,
  },
  passwordImage: {height: 24, width: 24},
  personSubView: {
    flex: 2,
    backgroundColor: Colors.newGrey,
    paddingHorizontal: hp('3%'),
    paddingVertical: hp('3%'),
    borderRadius: 10,
  },

  inputView: {flex: 8, paddingVertical: 15},

  btnView: {alignItems: 'center', paddingVertical: hp('0.7%')},

  changeView: {
    flex: 1,
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  changeSubView: {
    flex: 2,
    backgroundColor: Colors.newGrey,
    paddingHorizontal: hp('3%'),
    paddingVertical: hp('3%'),
    borderRadius: 10,
  },
  changeInput: {flex: 8, paddingVertical: 15,paddingHorizontal:18},

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
  passwordView: {
    paddingRight: 10,
  },

  inputBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
    borderRadius: 8,
    marginVertical: 8,


    alignItems:'center'
  },

  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  keyImage:{
    height:22,width:22
  },
  emailView: {
    flex: 9
  },
  emailInput: {
    fontSize:13,
    fontFamily:Fonts.OpenSansSemiBold,
    fontWeight:'700',
    height:hp('6%'),
    // color:'red'
  },
});
