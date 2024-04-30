import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    paddingTop:hp('22%'),
    paddingHorizontal: '4%',
    // justifyContent: 'flex-end',
    
  },
  inputBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor:Colors.SemiGrey,
    borderRadius: 5,
    // marginVertical: 10,

    alignItems: 'center',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailView: {
    flex: 9,
    // backgroundColor:'red'
  },
  emailInput: {
    height:hp('6%'),
    color:Colors.Black
  },
  keyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontFamily:Fonts.OpenSansSemiLight,
    fontSize: 14,
    color: Colors.DarkGrey,
    alignSelf: 'center',
    // paddingVertical: '2%',
    paddingRight: 5,
  },
  btnView: {
    flex:3,
    alignItems: 'center',
    justifyContent:'center'

  },
  confirmBtn: {
    borderRadius: 5,
    backgroundColor: 'black',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  passwordView: {
    paddingRight: 10,
  },
  forgotView: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal:9,
  },
  passwordText: {
    fontSize: 28,
    color:Colors.Black,
    fontFamily:Fonts.OpenSansBold
  },
  addressText: {
    fontSize: 13,
    color:Colors.DarkGrey,
    paddingTop: 10,
    textAlign:'center'
  },
  backView: {
    flex:1,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {fontSize: 14, fontFamily:Fonts.InterRegular, color:Colors.Black},

  forgotInput:{
    alignItems: 'center', paddingBottom:17
  },
  mailImage:{
    height:18,width:18
  },

});
