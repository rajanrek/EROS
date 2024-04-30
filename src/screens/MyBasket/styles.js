import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    //  paddingHorizontal: 2,
    paddingVertical: 15,
    backgroundColor: Colors.White,
  },
  basketView: {flex: 1, paddingHorizontal: 10},

  basket: {flex: 1, paddingHorizontal: 10, paddingVertical: 15},

  basketTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 24,
    color: Colors.Black,
  },

  deliveryView: {paddingHorizontal: 12},

  estimatedTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 16,
    color: Colors.Black,
  },

  dateTxt: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 16,
    color: Colors.Green,
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  totalTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
    color: Colors.Black,
  },

  priceTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 20,
    color: Colors.Black,
  },
  rewardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  rewardTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    color: Colors.Black,
  },

  // basketView:{paddingHorizontal: 10, paddingVertical: 10},

  lineView: {borderColor: Colors.Grey, borderWidth: 1},
  rewardPriceTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    color: Colors.goldYellow,
  },
  addView: {paddingHorizontal: 5, paddingVertical: 25},
  addTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  subView: {
    paddingVertical: hp('2.5%'),
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  trash: {
    height: 25,
    width: 25,
  },

  line: {
    paddingHorizontal: 10,
    paddingVertical: 10,
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

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: 'black',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    // backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    // backgroundColor: 'red',
    right: 0,
  },
});
