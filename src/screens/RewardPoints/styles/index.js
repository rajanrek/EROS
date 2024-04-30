import { PixelRatio, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../../components/CustomsFonts/customFonts';
import Colors from '../../../components/Colors/colors';

// import Colors from '../../components/Colors/colors';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  footerStyle: {
    borderWidth: 0,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.Grey,
    height: PixelRatio.get() + 42,
    width: PixelRatio.get() + 342,
    borderRadius: PixelRatio.get() + 8,
  },
  loadMoreText: {
    fontFamily:Fonts.OpenSansRegular,
    fontWeight:'700',
    fontSize: 16,
    color: '#FFFFFF'
  },
  arrowView: {
    borderWidth: 0,
    flexDirection: 'row',
    // alignItems:'flex-start',
    width: wp('90%'),
    height: hp('5%'),
    // justifyContent:'space-evenly'
  },
  rewardTextStyle: {
    fontFamily:Fonts.OpenSansRegular,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
    color:'#121212'
  },
  image: {
    height: hp('2.1%'),
    width: hp('2.1%')
  },
  imageTouch: {
    padding: 5
  },

  // Button Component stayle

  mainVieww: {
    // top:10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: PixelRatio.get() + 342,
    height: PixelRatio.get() + 68,
    borderRadius: PixelRatio.get() + 8,
    border: PixelRatio.get() + 1,
    borderWidth: 1,
    borderColor: '#EFEEEE',
    backgroundColor: '#FFFFFF'
  },
  buttonActiveView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: PixelRatio.get() + 8,
    paddingLeft: 0,
    height: '100%',
    width: '50%',
    backgroundColor: '#121212'
  },
  buttonNonActiveView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: PixelRatio.get() + 8,
    paddingLeft: 0,
    height: '100%',
    width: '50%',
    backgroundColor: '#FFFFFF'
  },
  activeTitleTextStyle: {
    color: Colors.White,
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    fontWeight:'700'
  },
  nonActiveTitleTextStyle:{
    color: '#121212',
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    fontWeight:'700'
  },
  activePointsTextMainContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  nonActivePointsTextStyle:{
    color: Colors.Black,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    fontWeight:'300'
  },
  activePointsTextStyle: {
    color: Colors.White,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    fontWeight:'300'
  },


});
