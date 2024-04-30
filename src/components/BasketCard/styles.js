import {StyleSheet} from 'react-native';
import Colors from '../Colors/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fonts from '../CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {flex: 1, flexDirection: 'row', paddingVertical: 12},

  imgView: {
    flex: 3,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  productTitle: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    color: Colors.Black,
  },

  subTitleView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  polysubTitleView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.White,
  },

  polygonView: {flexDirection:'row',alignItems:'center',paddingVertical: 9},

  polygonSubView:{
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent:'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },

  arrowView: {flexDirection: 'row', alignItems: 'center', paddingVertical: 9},

  arrow: {paddingLeft: 4},
  
  contentView: {flex: 4, justifyContent: 'flex-start'},

  powerTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 12,
    color: Colors.Black,
  },
  numberTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 12,
    color: Colors.Black,
  },

  arrowImg: {height: 10, width: 10},
  glassView: {
    height: hp('23%'),
    width: wp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconView: {
    flexDirection: 'row',
    paddingVertical: 10,
    // paddingHorizontal:30,
   alignItems:'center',
    // justifyContent: 'flex-start',
  },

  iconImg: {
    height: 20,
    width: 20,
  },

  boxTxt: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 10,
    color: Colors.Black,
    flexWrap:'wrap',

  },

  editView: {flex: 3, paddingHorizontal: 13, justifyContent: 'space-between'},

  editBtn:{
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 5,
   
  },
  editTxt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },

  priceView:{alignItems:'flex-end',paddingVertical:15},

  priceTxt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },
  glassImg: {height: hp('23%'), width: wp('50%'), borderRadius: 10},

  deliveryView:{paddingHorizontal:10,paddingVertical:6,flexDirection:'row'},

  renderTxt:{paddingHorizontal:5}
});
