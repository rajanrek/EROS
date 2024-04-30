import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  accountView: {
    flex: 3,
    paddingHorizontal: '6%',
    paddingTop:'20%',
    justifyContent: 'flex-start',
  },
  accountText: {
    fontSize: 28,
    color:Colors.Black,
    fontFamily:Fonts.OpenSansBold
  },
  inputView: {
    flex: 5,
    paddingHorizontal: '5%',
    justifyContent: 'flex-end',
    backgroundColor:Colors.LightWhite,
    
  },
  inputBox: {
    flex:1,
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent:'center',
    paddingHorizontal:20
   
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailView: {
    flex:1,
    justifyContent:'center',
    paddingHorizontal:10,

  },
  emailInput: {
    fontSize:24,
  fontFamily:Fonts.OpenSansRegular,
    borderWidth:1,
    width:wp('15%'),
    borderColor:Colors.SemiGrey,
    borderRadius:5,
    backgroundColor:Colors.White,
    height:hp('7%')

  },
  keyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontFamily:Fonts.OpenSansSemiBold,
    fontSize: 14,
    color:Colors.LightGrey,
    alignSelf: 'center',
    paddingVertical: '2%',
    paddingRight: 5,
  },
  btnView: {
    flex:1,
    paddingHorizontal:'3%'
  },
  confirmBtn: {
    borderRadius: 5,
    backgroundColor: 'black',
    paddingVertical: 10,
    alignItems: 'center',
  },
  passwordView: {
    paddingRight: 10,
  },
  codeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  codeText: {
    fontFamily:Fonts.OpenSansBold,
    fontSize: 28,
    color: Colors.Black,
  },
  addressText: {
   fontFamily:Fonts.OpenSansRegular,
    fontSize: 13,
    color:Colors.DarkGrey,
    paddingTop: 9,
  },
  backView: {
    flex:1,
    // paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {fontSize: 14, fontFamily:Fonts.OpenSansBold, color:Colors.Black},

  sentView:{
    flexDirection:'row'
  },
  sentText:{
    fontFamily:Fonts.OpenSansRegular,
    fontSize: 13,
    color:Colors.DarkGrey,
  },

  mailText:{
    fontSize:13,fontFamily:Fonts.OpenSansSemiBold,color:Colors.Black
  },
  loginView:{
    flex:1
  }
});
