import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Switch,
  Alert,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import Colors from '../../components/Colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FgcHeader from '../../components/Header/FgcHeader';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {communication} from '../../redux/action/actions';
import Button from '../../components/Button/button';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';

const Communication = props => {
  const [contactLense, setContactLense] = useState();
  const [sunGlasses, setSunGlasses] = useState();
  const {width} = useWindowDimensions();
  const [glasses, setGlasses] = useState();
  const [health, setHealth] = useState();
  const {registerData} = useSelector(state => state.newuser.user);
  const {data} = useSelector(state => state.loginuser.user);
  const {communicationData, communicationisLoading} = useSelector(
    state => state.communicationPreference.communication,
  );

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  const dispatch = useDispatch();

  const toggleSwitch = param => {
    if (param == 1) {
      setContactLense(!contactLense);
    } else if (param == 2) {
      setSunGlasses(!sunGlasses);
    } else if (param == 3) {
      setGlasses(!glasses);
    } else if (param == 4) {
      setHealth(!health);
    }
  };

  const handleSave = () => {
    const postJson = {
      Newsletters: health,
      Promotions: contactLense,
      SunglassesOffer: sunGlasses,
      GlassesOffer: glasses,
    };

    dispatch(communication(postJson, apiData?.CustomerId));
  };

  useEffect(() => {
    setContactLense(
      contactLense ? contactLense : communicationData?.ResultData?.Promotions,
    );
    setSunGlasses(
      sunGlasses ? sunGlasses : communicationData?.ResultData?.SunglassesOffer,
    );
    setGlasses(glasses ? glasses : communicationData?.ResultData?.GlassesOffer);
    setHealth(health ? health : communicationData?.ResultData?.Newsletters);
  }, []);

  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.textual,
    }),
  };

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
    },
    a: {
      color: 'black',
    },
    b: {
      color: Colors.Green,
    }
  };
  console.log('Text',communicationData?.ResultData?.PromotionText)
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader isSearch={true} title={'Communication Preference'} />
      </SafeAreaView>
      <View style={styles.contentView}>
        <View style={styles.subContentView}>
          <View style={styles.offerView}>
            <Text style={styles.offerTxt}>
              {communicationData?.ResultData?.PromotionBoxTitle}
            </Text>
            <RenderHtml
             contentWidth={width}
             customHTMLElementModels={customHTMLElementModels}
              source={{html: communicationData?.ResultData?.PromotionText}}
              tagsStyles={tagsStyles}
            />
          </View>
          <View style={styles.lenseView}>
            <Text style={styles.lenseTxt}>
              {communicationData?.ResultData?.PromotionHeader}
            </Text>

            <Switch
              trackColor={{false: Colors.LightGrey, true: Colors.Switch}}
              thumbColor={contactLense ? Colors.White : Colors.newGrey}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(1)}
              value={contactLense}
            />
          </View>
          <View style={styles.lineView}></View>
          <View style={styles.sunglass}>
            <Text style={styles.sunglassTxt}>
              {communicationData?.ResultData?.SunglassesOfferHeader}
            </Text>

            <Switch
              trackColor={{false: Colors.LightGrey, true: Colors.Switch}}
              thumbColor={sunGlasses ? Colors.White : Colors.newGrey}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(2)}
              value={sunGlasses}
            />
          </View>
          <View style={styles.lineView}></View>
          <View style={styles.glassView}>
            <Text style={styles.glassTxt}>
              {communicationData?.ResultData?.GlassesOfferHeader}
            </Text>
            <Switch
              trackColor={{false: Colors.LightGrey, true: Colors.Switch}}
              thumbColor={glasses ? Colors.White : Colors.newGrey}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(3)}
              value={glasses}
            />
          </View>
        </View>
        <View style={styles.healthView}>
          <View style={styles.adviceView}>
            <View style={styles.tipsView}>
              <Text style={styles.healthTxt}>
                {communicationData?.ResultData?.NewsletterHeader}
              </Text>
              <RenderHtml
               contentWidth={width}
               customHTMLElementModels={customHTMLElementModels}
                source={{html: communicationData?.ResultData?.NewsletterText}}
                tagsStyles={tagsStyles}

              />
            </View>
            <View style={styles.healthAdviceView}>
              <Text style={styles.lenseTxt}>
                {communicationData?.ResultData?.NewsletterHeader}
              </Text>

              <Switch
                trackColor={{false: Colors.LightGrey, true: Colors.Switch}}
                thumbColor={health ? Colors.White : Colors.newGrey}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch(4)}
                value={health}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 2}}>
          <View style={styles.btnView}>
            <Button
              onPress={handleSave}
              color={Colors.Black}
              txtColor={Colors.White}
              title={'Save my choices'}
            />
          </View>
          <View style={styles.policyView}>
            <RenderHtml
              contentWidth={width}
              customHTMLElementModels={customHTMLElementModels}
              source={{html: communicationData?.ResultData?.InformationText}}
              tagsStyles={tagsStyles}

            />
          </View>
        </View>
      </View>
      {communicationisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};

export default Communication;
