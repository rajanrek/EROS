import {StyleSheet, Platform} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:Colors.White,
    justifyContent:'center',
    alignItems:'center'
  },
  accountView: {
    flex: 2,
    paddingHorizontal: '6%',
    justifyContent: 'flex-end',
  },
  accountText: {
    fontSize: 28,
    color:Colors.Black,
    fontFamily:Fonts.OpenSansBold
  },
  inputView: {
    flex: 8,
    paddingHorizontal: '6%',
    justifyContent: 'flex-end',
  },
  inputBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.SemiGrey,
    borderRadius: 5,
    marginVertical: 10,
    alignItems:'center'
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailView: {
    flex: 9,
  },
  emailInput: {
    height:hp('6%'),
    // color:'red'
  },
  emailInputError: {
    height: 47,
    // color:'red'
  },
  keyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 14,
    color:Colors.DarkGrey,
    fontFamily:Fonts.OpenSansSemiBold,
    alignSelf: 'center',
    paddingVertical: '2%',
  },
  btnView: {
    paddingVertical: 25,
  },
  LoginBtn: {
    borderRadius: 5,
    backgroundColor: 'black',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  passwordView:{
    paddingRight:10
  },
  memberView:{
    flexDirection: 'row', justifyContent: 'center',paddingVertical:20,  paddingBottom:hp('4%')
  },
  memberText:{
    fontSize: 14,fontFamily:Fonts.OpenSansSemiBold,color:Colors.DarkGrey
  },
  loginText:{
    
    color: Colors.Black,
    fontFamily:Fonts.OpenSansBold,
    fontSize: 14,
    left: 5, 
},

mailImage:{
  height:18,width:18
},
keyImage:{
  height:22,width:22
},

passwordImage:{height:24,width:24}
});
