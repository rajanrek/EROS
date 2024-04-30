import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 15,
    backgroundColor: Colors.White,
  },

  view:{
      flex: 1,
      // paddingHorizontal: 2,
      // paddingVertical: 15,
      backgroundColor: Colors.White,

  
  },
  cancelbtnTxt: {
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 13,
    color: Colors.Black,
  },
  btnTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.White,
  },
  shopTxt: {color: Colors.Black, fontSize: 24, fontFamily: Fonts.OpenSansBold},

  shop: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical:15,
    justifyContent: 'space-between',
  },
  editBtn:{
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: hp('1%'),
   
  },
  editTxt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },
  profileView:{flex: 1, flexDirection: 'row', paddingVertical: 10,paddingHorizontal:11},

  View:{
    flex: 2,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileImage:{height: 70, width: 70},

  nameView:{flex: 6, justifyContent: 'center'},
  nameTxt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
    color: Colors.Black,
  },
  mailTxt:{
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    color: Colors.Black,
  },
  editView:{flex: 4, justifyContent: 'center'},

  pointsView:{flex: 1, paddingHorizontal: 14, paddingVertical: 10},

  Txt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    color: Colors.Black,
  },

  rewardView:{
    flex:1,
  flexDirection: 'row',
  paddingVertical: 20,
 
},

commonView:{
    flex: 1,
    backgroundColor: Colors.Common,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 20

  },
  imageView:{paddingVertical: 5},
  FAQTxt:{fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    color: Colors.Grey,},

  image:{height: 22, width: 22},

  numberTxt:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: 12,
    color: Colors.Black,
  },

  pointTxt:{
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 10,
    color: Colors.Black,
  },

  friendView:{
    flex: 1,
    backgroundColor: Colors.Common,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal:10,
    paddingVertical: 20,
  },
  creditView:{
    flex: 1,
    backgroundColor: Colors.Common,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 25,
  },
  offerView:{flex:1},

  offersubView:{flex:1,paddingHorizontal: 14, paddingVertical: 10},

  flatlistView:{paddingVertical:7,},

  dataView:{paddingHorizontal:10,paddingVertical:12},

banner:{height:hp('20%'),width:hp('20%'),borderRadius:8,marginHorizontal:7},

subTabView:{backgroundColor:Colors.Common,paddingVertical:18,paddingHorizontal:15},

subTabTxt:{fontFamily:Fonts.OpenSansBold,
fontSize: 16,
color: Colors.Black,
},

fAQView:{paddingHorizontal:10,paddingVertical:5},

btnView:{alignItems:'center',paddingVertical:10},

TxtView:{paddingVertical: 10},
IndicatorView:{
  position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'center',
}

  
});
