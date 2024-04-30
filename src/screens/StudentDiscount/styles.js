import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';


export default StyleSheet.create({
mainView:{
    
        flex: 1,
        backgroundColor: Colors.White,
        paddingVertical: hp('1.9%'),
        paddingHorizontal:hp('1.5%'),
      
},
titleView:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 17,
    color: Colors.Black,
  },
  subTitleView:{
    paddingVertical: 15
  },
  subTitleTxt:{
    fontFamily: Fonts.OpenSansSemiLight,
    fontSize: 15,
    color: Colors.Black,
  },
  uniDayView:{alignItems: 'center', paddingVertical: 15},

  uniDayImg:{height: hp('5%'), width: wp('50%')},

  uniDayBtn:{paddingVertical: hp('3%')},

  BtnTouch:{
    backgroundColor: Colors.Black,
    borderColor: Colors.White,
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('5.5%'),
  },
  BtnTxt:{
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    color: Colors.White,
  },
beansView:{alignItems: 'center', paddingVertical: 15},

beansImg:{height: hp('6%'), width: wp('53%')},
beansBtnView:{paddingVertical: hp('3%'),paddingTop:hp('0.3%')},
beansBtn:{paddingVertical: hp('2%')},

beansBtnTouch:{
    backgroundColor: Colors.Black,
    borderColor: Colors.White,
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('5.5%'),
  },
  thirdTitleView:{alignItems:'center'},

  commonTxt:{
    fontFamily: Fonts.OpenSansSemiLight,
    fontSize: 15,
    color: Colors.Black,
  },
  GradView:{paddingVertical:7},

  boldTxt:{
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 15,
    color: Colors.Black,
  },
  underLineTxt:{
    fontFamily: Fonts.OpenSansSemiLight,
    fontSize: 15,
    color: Colors.Black,
    textDecorationLine: 'underline',
  }


});
