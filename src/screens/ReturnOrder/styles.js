import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';


export default StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // paddingVertical: 12,
    // // marginVertical: 10,
    // backgroundColor: Colors.newGrey,
  },
  returnlenseImg: {resizeMode: 'contain', height: 150, width: 200},

  btnMainView: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'red',
    // paddingVertical: hp('2%'),
  },

  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  dropdownButtonStyle: {
    width: hp('30%'),
    height: hp('5%'),
    backgroundColor: Colors.Common,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    // flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Black,
    textAlign: 'center',
  },
  dropdownButtonTxtStyle2: {
    // flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Black,
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: Colors.newGrey,
    borderRadius: 8,
    height: hp('15%'),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
  },
  dropdownItemTxtStyle: {
    // flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
    textAlign: 'center',
  },
  returnimageView: {
    paddingHorizontal: 10,
    height: 150,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Commentinput: {
    alignSelf: 'center',
    height: hp('6%'),
    width: hp('40%'),
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: hp('1.5%'),
  },
});
