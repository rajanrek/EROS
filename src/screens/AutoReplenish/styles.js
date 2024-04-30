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


scrollView:{flex: 1},
  pointsView:{paddingVertical:hp('0.5%'),paddingHorizontal: 14},

  Txt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  IndicatorView:{
    position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: Colors.White,
          alignItems: 'center',
          justifyContent: 'center',
  },
  addressContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },

  left: {
    // flex: 0.5,
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('2%'),
    justifyContent: 'center',
    backgroundColor: Colors.newGrey,
  },
  newTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },

  inputMainView: {flex: 8},
  boxView: {flex: 8, paddingHorizontal: hp('2%')},

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

  flexStyle:{
    flex: 8.5
  },

  ActiveflexStyle:{
    flex: 8.5,
    // paddingBottom: hp('12%')
  },
  btnTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.White,
  },









 
  
});
