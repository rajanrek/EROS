import {StyleSheet} from 'react-native';

import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  left: {
    flex: 0.5,
    paddingHorizontal: 10,
    paddingVertical: hp('0.5%'),
    backgroundColor: Colors.newGrey,
  },

  editTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 16,
    color: Colors.Black,
  },

  mainView: {flex: 5, flexDirection: 'row', paddingVertical: 3},

  subView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: hp('2%'),
    paddingVertical: hp('1.3%'),
  },
  tittleTxt: {
    justifyContent: 'center',
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    color: Colors.Black,
  },
  subTittleView: {
    flex: 6,
    paddingHorizontal: hp('2%'),
    justifyContent: 'center',
  },
  numberView: {
    flex: 1,
    backgroundColor: Colors.newGrey,
    paddingVertical: hp('0.6%'),
    borderRadius: 10,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal: 10,
    flexDirection:'row'
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.LightGrey,
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
  },

  subTouchable: {flex: 1, justifyContent: 'center', alignItems: 'flex-end'},

  dropDownTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 11,
    color: Colors.Black,
  },

  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },

  image: {height: 10, width: 10},

  stockView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  stockTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    color: Colors.Red,
    paddingVertical: 6,
  },
  btnView: {paddingBottom: 10},

  estimatedTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 13,
    color: Colors.Black,
    right:4
  },
  instockTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 13,
    color: Colors.Green,
    right:4
  },

  tommorrowTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.Green,
  },
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
  arrowImg: {height: 10, width: 10},

});
