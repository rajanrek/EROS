import { StyleSheet } from 'react-native';
import Fonts from '../../components/CustomsFonts/customFonts';
import Colors from '../../components/Colors/colors';

export default StyleSheet.create({

    mainContainer: { backgroundColor: 'black', flex: 1, paddingHorizontal: '7%' },

    titleView: { flex: 3, paddingTop: 30},

    quesTxt: { fontSize: 28, fontFamily:Fonts.OpenSansSemiBold, color: Colors.LightGrey},

    subTitleView: { flex: 1, justifyContent: 'center', alignItems: 'flex-start' },

    interestedText: { fontFamily:Fonts.OpenSansSemiBold, fontSize: 16, color:Colors.LightGrey },

    checkBoxView: { flex:6,marginLeft:-5 },
    btnView: {
        flex: 1, alignItems: 'center', justifyContent: 'center',paddingBottom:40
    },

    boxView:{ flex: 5 },
personView:{paddingRight:10,},
    skipTxt: { fontSize: 16, fontFamily:Fonts.OpenSansSemiLight, textDecorationLine: 'underline', color:Colors.White, paddingTop: 20 }

});
