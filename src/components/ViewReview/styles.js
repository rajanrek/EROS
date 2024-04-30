import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:Colors.White
  },

  flatlistView:{paddingVertical: hp('1%')},
  subView:{
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: hp('2%'),
  },
  userView:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  userTxt:{
    fontFamily: Fonts.OpenSansBold,

    color: 'black',
    fontSize: 15,
  },
  reviewView:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dateTxt:{
    fontFamily: Fonts.OpenSansSemiBold,
    color: 'black',
    fontSize: 15,
  },
  ratingView:{
    flex: 1,
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('1%'),
  },
  commentView:{
    flex: 1,
    paddingHorizontal: hp('1.7%'),
    paddingVertical: hp('0.5%'),
  },
  commentTxt:{
    fontFamily: Fonts.OpenSansSemiBold,
    color: Colors.DarkGrey,
    fontSize: 15,
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
  }



});
