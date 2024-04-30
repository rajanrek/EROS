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
  mainView: {flex: 1, paddingHorizontal: hp('1.7%')},

  distanceView: {
    flex: 1,
    // paddingVertical: hp('3.5%'),
    paddingHorizontal: hp('0.7%'),
  },
  distanceSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },

  continueTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
    flexWrap:'wrap'
  },

  subTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  readingView: {
    flex: 1,
    paddingVertical: hp('1.6%'),
    paddingHorizontal: hp('0.7%'),
  },

  readingSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  armView: {
    flex: 1,
    paddingVertical: hp('2.5%'),
    paddingHorizontal: hp('0.7%'),
  },

  confirmView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: hp('1%'),
  },

  armSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confirmSubView: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: hp('2%'),
  },
  freeView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prescriptionView: {
    flex: 1,
    paddingVertical: hp('2.5%'),
    paddingHorizontal: hp('0.7%'),
  },
  prescriptionSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  radioBtn: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: hp('3%'),
  },
  checkboxSubView: {
    flex: 6,
  },
  checkboxContainer: {
    paddingVertical: hp('1.5%'),
    marginVertical: 10,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.LightGrey,
  },
  checkboxContainerColors: {
    paddingVertical: hp('1.5%'),
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.SemiGrey,
    backgroundColor: Colors.White,
  },
  imageView: {
    height: hp('7%'),
    width: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgs: {
    height: hp('6%'),
    width: hp('6%'),
    resizeMode: 'contain',
  },
  colorImg: {
    height: hp('13%'),
    width: hp('13%'),
    resizeMode: 'contain',
    position: 'absolute',
    top: hp('1.8%'),
    left: hp('4'),
  },
  checkBoxView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  DescriptionView: {
    paddingTop: hp('1.5%'),
  },
  cardImg: {
    height: hp('10%'),
    width: hp('20%'),
    resizeMode: 'contain',
  },
  cardImg2: {
    height: hp('5%'),
    width: hp('5%'),
    resizeMode: 'contain',
  },
  shadowimg: {
    height: 34,
    width: 171,
    // resizeMode: 'contain',
  },
  cardImgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop:10,
  },
  cardImgView2: {
    height: hp('14%'),
    width: hp('14%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 70,
  },
  ImgWrapper: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgWrapper2: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: hp('9'),
    top: hp('7'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    
    elevation: 19,
  },

  mainGlassCard: {
    backgroundColor: '#daebf9',
    borderRadius: 10,
    marginHorizontal: 10,
    width: hp('32%'),
    height:Platform.OS =='android' ? hp('62%') : hp('57%'),
    borderWidth: 1,
    borderColor: '#97c8f0',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
  mainGlassCardCoatin: {
    backgroundColor: '#daebf9',
    borderRadius: 10,
    marginHorizontal: 10,
    width: hp('32%'),
    height: hp('62%'),
    borderWidth: 1,
    borderColor: '#97c8f0',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
  mainGlassCardSelected: {
    backgroundColor: '#daebf9',
    borderRadius: 10,
    marginHorizontal: 10,
    width: hp('32%'),
    height:Platform.OS =='android' ? hp('62%') : hp('57%'),
    borderWidth: 2,
    borderColor: 'green',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
  mainGlassCardCoatinPres: {
    backgroundColor: '#daebf9',
    borderRadius: 10,
    marginHorizontal: 6,
    width: hp('37%'),
    height: hp('55%'),
    borderWidth: 1,
    borderColor: '#97c8f0',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
  freeTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 15,
    color: Colors.Black,
  },
  
});
