import {StyleSheet} from 'react-native';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,

  },
  passwordView:{
    flex:1,justifyContent:'flex-end',paddingLeft:'5%',paddingHorizontal:10,top:'3%'
  },
passwordText:{

  fontSize:28,fontFamily:Fonts.OpenSansBold,color:Colors.Black
},

accountText:{
  fontFamily:Fonts.InterRegular,fontSize:13,color:Colors.DarkGrey,top:8,paddingLeft:4
},
  inputView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: 5,
    marginVertical: 10,
  },
  fieldView: {
    flex:9,
    paddingLeft:10
  },
  codeView: {
    top:'10%',
    flex: 5,
    paddingVertical: 10,
    paddingHorizontal:'5%'
  },
  btnView: {flex:1,    justifyContent: 'center',
  paddingHorizontal:'5%'},

  btnTouch: {
    borderRadius: 5,
    backgroundColor: Colors.Black,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  emailInput: {
    height: 47,
    fontSize:14,
    color:Colors.Black
  },
 
});
