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
    // paddingVertical: 15,
    backgroundColor: Colors.White,
  },

  pointsView: {flex: 2, paddingHorizontal: 14},

  Txt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },

  rewardView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },

  commonView: {
    flex: 1,
    backgroundColor: Colors.Common,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageView: {paddingVertical: 5},

  image: {height: 22, width: 22},

  numberTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },

  pointTxt: {
    fontFamily: Fonts.OpenSansSemiLight,
    fontSize: 9,
    color: Colors.Black,
  },

  friendView: {
    flex: 1,
    backgroundColor: Colors.Common,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 20,
  },
  creditView: {
    flex: 1,
    backgroundColor: Colors.Common,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 20,
  },
  scrollView: {flex: 1},

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
  nextView: {
    flex: 1,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BtnNext: {
    // paddingVertical: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: hp('20%'),
    height:hp('5.5%')
  },
});
