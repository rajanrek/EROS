import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: 56,
    // paddingHorizontal: hp('0.5%'),
    paddingVertical: hp('0.5%'),
  },
  titleView: {flex: 6, justifyContent: 'center', alignItems: 'flex-start'},
  arrowView: {flex: 1},

  filterView: {flex: 3, flexDirection: 'row', justifyContent: 'flex-end'},

  filter: {paddingHorizontal: 10},
  arrowImg: {width: hp('1.8%'), height: hp('1.8%')},
  titleTxt: {
    fontSize: 16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.Black,
  },
  filterImg: {
    width: hp('3%'),
    height: hp('3%'),
  },
  filterTouch: {
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: hp('5%'),
    height: hp('4%'),
    paddingHorizontal: hp('2%'),
  },
  backBtn: {
    paddingVertical: hp('1.7%'),
    paddingHorizontal: hp('2%'),
  },
  filterView: {
    paddingRight: hp('1.5%'),
  },
});
