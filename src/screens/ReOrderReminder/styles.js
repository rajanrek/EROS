import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 15,
    backgroundColor: Colors.White,
  },

  safeContainer: {
    height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%'),

  },
  commonView: {flex: 1},

  codeView: {flex: 1},

  numberView:{
    flex:7
  },

  subView: {
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1.5%'),
  },
  reminderTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  reminderDateTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  dateView: {
    justifyContent: 'center',
    paddingHorizontal: hp('2%'),
  },
  dateSubView: {paddingVertical: hp('1%')},
  backgroundView: {
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
    borderRadius: 8,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: hp('1%'),
  },
  dateTxt: {
    fontFamily: Fonts.BrandingSemiBold,
    fontSize: 15,
    color: Colors.Grey,
  },
  btnView: {paddingVertical: hp('2.5%'), alignItems: 'center'},

  likeView: {
    flex: 1,
    paddingHorizontal: hp('2.5%'),
  },
  likeTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  tickTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  emailView: {flex: 1, paddingVertical: hp('1%')},

  emailSubView: {
    flex: 0.45,
    backgroundColor: Colors.newGrey,
    borderRadius: 8,
    paddingHorizontal: hp('2%'),
    marginVertical: 12,
  },
  emailTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    paddingVertical: hp('1%'),

    color: Colors.Black,
  },
  mailView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1%'),
  },
  mailTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    color: Colors.Black,
  },
  commonCheckView: {flex: 1, alignItems: 'flex-end'},

  checkView: {flex: 2, alignItems: 'flex-end'},

  smsView: {
    flex: 0.45,
    backgroundColor: Colors.newGrey,
    borderRadius: 8,
    paddingHorizontal: hp('2%'),
  },
  smsTxt:{
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 14,
    paddingVertical: hp('1%'),
    color: Colors.Black,
  },
  smsSubView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTxt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  btn:{
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
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
  
});
