import {StyleSheet, Platform} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';

export default StyleSheet.create({
  backgroundImage: {
    height: '100%',
  },

  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,

  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textView: {paddingTop:20},

logoImage:{
    height:75,
    width:212,
},
btn:{
    paddingVertical:10,

},

loginBtn:{paddingTop:30},
orderTxt:{color:Colors.SemiGrey,fontFamily:Fonts.InterRegular,fontSize:13,textAlign:'center'}
});
