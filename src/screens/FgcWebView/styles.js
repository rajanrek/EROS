import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';

export default StyleSheet.create({
  IndicatorView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
mainView:{
  paddingVertical: Platform.OS === 'ios' ? hp('5%') : null,
  backgroundColor: Colors.White,
},
  arrowView: {justifyContent: 'center', alignItems: 'flex-start'},
  image: {height: hp('2.1%'), width: hp('2.1%')},
  imageTouch: {flex: 1, paddingVertical: hp('2%'), paddingHorizontal: hp('1%')},
  web: {justifyContent: 'center', alignItems: 'center'},
  webView: {
    height: hp('100%'),
    width: wp('100%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('1.5%'),
  },
});
