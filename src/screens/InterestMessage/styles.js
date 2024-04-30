import {StyleSheet} from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';

export default StyleSheet.create({
 
    mainContainer:{ backgroundColor: 'black', flex: 1, paddingHorizontal: '6%' },

    titleView:{ flex: 3, paddingTop: 30, },

    historytxt:{ fontSize: 28,fontFamily:Fonts.OpenSansSemiBold, color:Colors.LightGrey },
     
btnView:{ flex: 1, alignItems: 'center', justifyContent: 'center' },

skipTxt: { fontSize: 16, fontFamily:Fonts.OpenSansSemiLight, textDecorationLine: 'underline', color:Colors.White, paddingTop: 20 }

});