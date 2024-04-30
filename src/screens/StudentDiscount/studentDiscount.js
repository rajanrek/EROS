import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import Colors from '../../components/Colors/colors';
import Fonts from '../../components/CustomsFonts/customFonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageUrl from '../../components/ImageUrl';
import FgcHeader from '../../components/Header/FgcHeader';
import CommonHeader from '../../components/CommonHeader/commonHeader';
import {useNavigation} from '@react-navigation/native';
import ConfigUrl from '../../ConfigUrl/configUrl';

const StudentDiscount = () => {
  const navigation = useNavigation();
  const [manuName, setMenuName] = useState(null);

  const navigateToWebview = url => {
    navigation.navigate('fgcWebView', url);
  };
  const uniDay =
    'https://www.myunidays.com/GB/en-GB/partners/129951f0-9703-41d3-8dce-9f9f5f7369b4/view';
  const studentDiscount =
    'https://connect.studentbeans.com/v4/hosted/feel-good-contacts/uk';
  const graduate =
    'https://connect.studentbeans.com/v4/hosted/feel-good-contacts-graduate/uk';

  const EndPoint =
    manuName === 'Contact Lens'
      ? 'contactlenses'
      : manuName === 'Solutions'
      ? 'Solutions'
      : manuName === 'Eye Care'
      ? 'eyecares'
      : manuName === 'Sunglasses'
      ? 'Sunglasses'
      : manuName === 'Glasses'
      ? 'EyeFrames'
      : manuName === 'Prescription Sunglasses'
      ? 'EyeFrames'
      : manuName === 'Clearance'
      ? 'Clearance'
      : null;

  const isBrandSet = manuName === 'Contact Lens' ? null : 'allbrands';

  const navigateToListing = params => {
    setMenuName(params);
    navigation.navigate('shop', {
      type: EndPoint,
      manuName: manuName,
      isSeeAll: params,
      typeCat: params,
      isBrand: params,
    });
    console.log('params---', params);
  };

  return (
    <ScrollView style={{flex: 1,paddingHorizontal:10}}>
      <View style={Platform.OS === 'ios' ? {paddingTop: hp('7%')} : {paddingTop: hp('1%')} }>
        <CommonHeader />
      </View>

      <Text style={styles.titleView}>
        Feel Good Contacts Student & Graduate Discount
      </Text>

      <View style={styles.subTitleView}>
        <Text style={styles.subTitleTxt}>
          We know it is difficult to manage your independent finances as a
          student and we believe that every little helps. Feel Good Contacts
          offer up to 20.15% off to students who are still in full time
          education. Please select your student discount provider and you will
          be redirected to a new page.
        </Text>
      </View>

      <View style={styles.uniDayView}>
        <Image
          resizeMode="contain"
          style={styles.uniDayImg}
          source={ImageUrl.UniDays}
        />

        <View style={styles.uniDayBtn}>
          <TouchableOpacity
            onPress={() => navigateToWebview(ConfigUrl.UNIDAY)}
            style={styles.BtnTouch}>
            <Text style={styles.BtnTxt}> Redeem Student Discount</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.beansView}>
        <Image
          resizeMode="contain"
          style={styles.beansImg}
          source={ImageUrl.StudentBeans}
        />

        <View style={styles.beansBtnView}>
          <View style={styles.beansBtn}>
            <TouchableOpacity
              onPress={() => navigateToWebview(ConfigUrl.STUDENT_DISCOUNT)}
              style={styles.beansBtnTouch}>
              <Text style={styles.BtnTxt}> Redeem Student Discount</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigateToWebview(ConfigUrl.GRADUATE)}
            style={styles.beansBtnTouch}>
            <Text style={styles.BtnTxt}> Redeem Graduate Discount</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.thirdTitleView}>
        <View style={styles.GradView}>
          <Text style={styles.commonTxt}>
            If you’re a graduate (graduated within 5 years), you can benefit
            from
            <Text style={styles.boldTxt}> GradBeans discount, </Text>
            enjoy up to <Text style={styles.boldTxt}>10% off </Text> your order!{' '}
          </Text>
        </View>
        <View style={styles.GradView}>
          <Text style={styles.commonTxt}>
            Save on{' '}
            <Text
              onPress={() => navigateToListing('contactlenses', isBrandSet)}
              style={styles.underLineTxt}>
              contact lenses
            </Text>
            ,{' '}
            <Text
              onPress={() => navigateToListing('Glasses', isBrandSet)}
              style={styles.underLineTxt}>
              glasses
            </Text>
            ,{' '}
            <Text
              onPress={() => navigateToListing('Solutions', isBrandSet)}
              style={styles.underLineTxt}>
              contact lens solutions
            </Text>
            ,{' '}
            <Text
              onPress={() => navigateToListing('Eye Care', isBrandSet)}
              style={styles.underLineTxt}>
              eye care
            </Text>{' '}
            and{' '}
            <Text
              onPress={() => navigateToListing('Sunglasses', isBrandSet)}
              style={styles.underLineTxt}>
              designer sunglasses.
            </Text>
          </Text>
        </View>
        <View style={styles.GradView}>
          <Text style={styles.commonTxt}>
            Our student offer is only open to new customers, however, if you opt
            in to our <Text style={styles.underLineTxt}>marketing emails</Text>{' '}
            you can receive further discounts and offers on your eye care
            essentials.{' '}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentDiscount;
