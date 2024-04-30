import { StyleSheet, PixelRatio } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
    mainView: {
       
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width: PixelRatio.get()+342,
        height: PixelRatio.get()+73,
        borderRadius: PixelRatio.get()+8,
        border: PixelRatio.get()+1,
        borderWidth:1,
        borderColor:'#EFEEEE',
        backgroundColor:'#F8F5F5'
    },
    innerView:{
        borderWidth:1,
        borderColor:'#F8F5F5',
        justifyContent:'space-around',
        alignItems:'flex-start',
        backgroundColor:'#FFFFFF',
        borderTopLeftRadius:PixelRatio.get()+8,
        borderBottomLeftRadius:PixelRatio.get()+8,
        padding:5,
        paddingLeft:10,
        height:'100%',
        width:wp('54%')
    },

    nextView:{
        justifyContent:'center',
        alignItems:'center',
        width:wp('33%')
    },
    TextStyle:{
        fontFamily:Fonts.BrandingMedium,
        fontWeight:'600',
        fontSize:12,
        color:'#AAAAAA'
    },
    DateText:{
        fontFamily:Fonts.BrandingMedium,
        fontSize:12,
        fontWeight:'500',
        color:'#AAAAAA'
    },
    pointsText:{
        fontFamily:Fonts.OpenSansRegular,
        fontWeight:'600',
        fontSize:14,
        color:'#121212' 
    },
    RewardNameText:{
        fontFamily:Fonts.OpenSansRegular,
        fontWeight:'500',
        fontSize:14,
        color:'#121212'
    },
    OrderRefText:{
        fontFamily:Fonts.OpenSansRegular,
        fontSize:12,
        color:'#121212',
        fontWeight:'400'
    },
   

});
