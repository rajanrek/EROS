import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ImageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageView: {
    height: hp('8%'),
    width: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: hp('3%'),
    width: hp('10%'),
    borderRadius: 6,
    resizeMode:'contain'
  },
  titleContainer: {
    flex: 8,
    paddingLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
