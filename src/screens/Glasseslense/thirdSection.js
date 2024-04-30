import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import {useNavigation} from '@react-navigation/native';
import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
import ImageUrl from '../../components/ImageUrl';
import {useSelector} from 'react-redux';
import Globals from '../../utils/constant';
import {getPackages} from '../glassPrescription/PrescriptionError';
import {
  HTMLContentModel,
  HTMLElementModel,
  RenderHTML,
} from 'react-native-render-html';
import {SkypeIndicator} from 'react-native-indicators';

const ThirdSection = props => {
  const [SelectedCoat, setSelectedCoat] = useState('');
  const [packages, setPackage] = useState('');
  const navigation = useNavigation();
  const {SecondSectionData} = useSelector(
    state => state.choooseSecond.chooseSecondSection,
  );
  const {width} = useWindowDimensions();
  const param = props.route.params;

  const {IsLoading} = useSelector(state => ({
      IsLoading:
      state.secondList.SecondListSection.IsLoading,
  }));
  const handleCheckboxToggle = (id, checkbox) => {
    setSelectedCoat(prevSelectedSection =>
      prevSelectedSection === id ? '' : id,
    );
    if (id == 2 || id == 3) {
      getPackages(checkbox, Globals.sendLater);

      navigation.navigate('glassBasket', {
        ProductId: param.ProductId,
        item: checkbox,
        lastParams: param,
        packages: checkbox,
      });
    } else {
      setPackage(checkbox);
      getPackages(checkbox, Globals.sendLater);

      navigation.navigate('SectionForth', {
        ProductId: param.ProductId,
        item: checkbox,
        prescriptionData: param?.prescriptionData,
        selectedData5: param,
        packages: checkbox,
      });
    }
  };

  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black'
    },
    a: {
      color: 'black'
    }
  }
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader title={'Choose your lenses'} />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainView}>
          <Text style={styles.headingTxt}>
            What type of lenses do you want?
          </Text>

          {SecondSectionData?.ResultData?.length > 0 &&
            SecondSectionData?.ResultData[0].Children.map(checkbox => (
              <View
                key={checkbox.EyeGlassTypeId}
                style={styles.checkboxContainer}>
                <View style={{flex: 2}}>
                  <View style={styles.imageView}>
                    <Image
                      style={styles.imgs}
                      source={{uri: checkbox.ImageUrl1}}
                    />
                  </View>
                </View>
                <View style={styles.checkboxSubView}>
                  <Text style={styles.headingTxt}>{checkbox.EyeGlassType}</Text>
                  <View style={{paddingVertical: hp('0.5%')}}>
                    {checkbox.UnitPriceText == '' && (
                      <Text style={styles.freeTxt}>FREE</Text>
                    )}
                    <RenderHTML
                      contentWidth={width}
                      customHTMLElementModels={customHTMLElementModels}
                      source={{html: checkbox.UnitPriceText}}
                      tagsStyles={tagsStyles}
                    />
                  </View>

                  <View style={styles.DescriptionView}>
                    <Text style={styles.subTxt}>{checkbox.Description}</Text>
                  </View>
                </View>
                <View style={styles.checkboxView}>
                  <CommonCheckBox
                    imageSource={ImageUrl.UncheckRing}
                    onToggle={() =>
                      handleCheckboxToggle(checkbox.EyeGlassTypeId, checkbox)
                    }
                    isChecked={SelectedCoat != checkbox.EyeGlassTypeId}
                    uncheckedImage={ImageUrl.CheckRing}
                  />
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      {IsLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};

export default ThirdSection;
