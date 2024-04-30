import {StyleSheet} from 'react-native';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: '6%',
    backgroundColor:Colors.White
  },
  accountView: {
    flex: 2,
    justifyContent: 'center',


  },
  accountText: {
    color:Colors.Black,
    fontSize: 28,
  fontFamily:Fonts.OpenSansSemiBold
  },
  contentView: {
    flex: 8,

    // paddingHorizontal:'7%'
  },
  scrollView: {
    flex: 1,
  },
  codeView: {
    flex: 5,
    paddingVertical: 10,
  },
  inputView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor:Colors.SemiGrey,
    fontFamily:Fonts.OpenSansSemiLight,
    borderRadius: 5,
    marginVertical: 10,
    alignItems:'center'

  },
  imgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldView: {
    flex: 9,
  },
  inputBox: {
    fontSize:14,
    fontFamily:Fonts.OpenSansSemiBold,
    color:Colors.Black,
    height:hp('6%'),
    
  },
  plusView: {
    flex: 1,
    flexDirection:'row',
    paddingTop: 10,
  },

  receiveView: {
    flexDirection: 'row',
    paddingRight:25,
    // paddingHorizontal:10,
    alignContent:'center',
    alignItems:'flex-start',
  },
  receiveText: {
    paddingLeft:5,
    color: Colors.Grey,
    fontFamily:Fonts.OpenSansRegular,
    fontSize: 12,
  },
  orderText: {
    color:Colors.Grey,
  fontFamily:Fonts.OpenSansRegular,
    fontSize: 12,
  },
  useCodeText: {
    color:Colors.Red,
    fontFamily:Fonts.OpenSansBold,
    fontSize: 12,
  },
  btnView: {
    flex: 3,
    paddingVertical:'10%',
    // justifyContent: 'center',
    alignItems:'center'
  },
  btnTouch: {
    borderRadius: 5,
    backgroundColor:Colors.Black,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },

  agreeView:{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingVertical: 20,
      right:wp('3%')
    
  },
  plusTouch:{
      backgroundColor: 'black',
      borderRadius: 5,
      height: 19,
      width: 19,
      justifyContent: 'center',
      alignItems: 'center',
    
  },
  plusText:{
    color: 'white', fontSize: 14
  },
  agreeText:{
      paddingLeft: 5,
      color:Colors.DarkGrey,
      fontFamily:Fonts.OpenSansSemiLight,
      fontSize: 12,
    
  },
  memberView:{
    flexDirection: 'row', justifyContent: 'center', 
    paddingVertical:hp('4%')
  },
  memberText:{
    fontSize: 14,
    fontFamily:Fonts.OpenSansSemiBold,
    color:Colors.DarkGrey
  },
  loginText:{
    color: Colors.Black,
    fontFamily:Fonts.OpenSansBold,
    fontSize: 14,
    left: 5, 
},
  passwordView:{
    paddingRight:10,
  },

  accountImage:{
    height:wp('5.6%'),
    width:wp('5.6%')
  },

  userImage:{
    height:wp('5.6%'),
    width:wp('5.6%')
  },
  mailImage:{
    height:wp('5.5%'),
    width:wp('5.5%')
  },
  keyImage:{
    height:wp('5.6%'),
    width:wp('5.6%')
  },
  
  passwordImage:{   height:wp('5.6%'),
  width:wp('5.6%')},

  percentText: {
    paddingLeft: 10,
    color: Colors.DarkGrey,
    fontFamily:Fonts.OpenSansSemiBold,
    fontSize: 12,
  },

  boxImage:{
    height:wp('5.6%'),
    width:wp('5.6%')
  },

  dropdownButtonStyle: {
    height: hp('6%'),
    // backgroundColor: Colors.Common,
    borderWidth: 1,
    borderColor:Colors.SemiGrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    // flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Black,
    textAlign: 'center',
  },

  dropdownButtonTxtStyle2: {
    // flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Grey,
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: Colors.newGrey,
    borderRadius: 8,
    height: hp('8.2%'),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor:Colors.SemiGrey,
  },
  dropdownItemTxtStyle: {
    // flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
    textAlign: 'center',
  },

});
