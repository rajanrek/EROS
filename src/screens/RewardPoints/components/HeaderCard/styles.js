import { StyleSheet, PixelRatio } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../../../components/CustomsFonts/customFonts';
// import Colors from '../../components/Colors/colors';

export default StyleSheet.create({
    mainView: {
        // flex:1/1.4,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: PixelRatio.get() + 260.75,
        width: PixelRatio.get() + 346,
        // top: PixelRatio.get() + 87.25,
        // left: PixelRatio.get() + 22,
        borderRadius: PixelRatio.get() + 8,
        border: PixelRatio.get() + 1,
        backgroundColor: '#EFEEEE'
    },
    storeCreditMainScreen:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding:15,
        height: PixelRatio.get() + 145,
        width: PixelRatio.get() + 342,
        // top: PixelRatio.get() + 87.25,
        // left: PixelRatio.get() + 22,
        borderRadius: PixelRatio.get() + 8,
        border: PixelRatio.get() + 1,
        backgroundColor: '#EFEEEE'
    },
    creditScoreText:{
        fontSize:PixelRatio.get()+24,
        fontWeight:'700'
    },
    creditText:{
        fontWeight:'300',
        fontSize:PixelRatio.get()+12,
    },
    img: {
        width: PixelRatio.get() + 70,
        height: PixelRatio.get() + 53.2
    },
    storeCreditImage: {
        borderWidth:0,
        width: PixelRatio.get() + 86,
        height: PixelRatio.get() + 86
       
    },
    containerView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '80%',
        height: '15%'
    },
    image: {
        height: hp('3.5%'), 
        width: hp('30.1%')
      },
    normalText:{
        fontFamily:Fonts.OpenSansRegular,
        fontWeight:'300',
        fontSize:9,
        color:'#000000'
    },
    normalTextMainContainer:{
        // borderWidth:1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
