import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  FlatList,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import FgcHeader from '../../components/Header/FgcHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../components/Colors/colors';
import ImageUrl from '../../components/ImageUrl';
import Fonts from '../../components/CustomsFonts/customFonts';
import Button from '../../components/Button/button';
import {useDispatch, useSelector} from 'react-redux';
import {
  getContactDetails,
  postCustomerFeedback,
} from '../../redux/action/actions';
import HTMLRender from 'react-native-render-html';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SkypeIndicator} from 'react-native-indicators';

const CustomerServices = props => {
  const {contactDetailsData, contactDetailsisLoading} = useSelector(
    state => state.customerDetails.contactDetails,
  );

  const {CustomerFeedbackData, CustomerFeedbackisLoading} = useSelector(
    state => state.feedbackDetails.customerFeedback,
  );
  const refRBSheet = useRef();

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [comment, setComment] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [entercaptcha, setEnterCaptcha] = useState('');

  const dispatch = useDispatch();

  const onChangeText = (item, type) => {
    if (type == 1) {
      setEmail(item);
    } else if (type == 2) {
      setSubject(item);
    } else {
      setComment(item);
    }
  };

  const validateFields = () => {
    if (
      email === '' &&
      subject === '' &&
      enquiry === '' &&
      comment === '' &&
      entercaptcha === ''
    ) {
      Alert.alert('All field is required');
      return false;
    }
    if (email === '') {
      Alert.alert('Enter your email address');
      return false;
    }
    if (subject === '') {
      Alert.alert('Enter the Subject');
      return false;
    }
    if (enquiry === '' || enquiry === '--Select--') {
      Alert.alert('Please Select the Enquiry');
      return false;
    }
    if (comment === '') {
      Alert.alert('Enter the comment');
      return false;
    }

    if (entercaptcha === '') {
      Alert.alert('Enter the captcha');
      return false;
    }
    // Email validation using a basic regular expression
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email id is not valid');
      return false;
    }

    if (captcha === entercaptcha) {
    } else {
      Alert.alert('Invalid captcha');
      return false;
    }

    return true;
  };

  useEffect(() => {
    reloadCaptcha();
    dispatch(getContactDetails());
  }, []);

  useEffect(() => {
    if (CustomerFeedbackData?.StatusCode === 1) {
      setEmail(''),
        setEnquiry(''),
        setSubject(''),
        setComment(''),
        setEnterCaptcha('');
    }
  }, [CustomerFeedbackData]);

  const handleEnquiry = item => {
    setEnquiry(item);
    refRBSheet.current.close();
  };

  const ContactNumber =
    contactDetailsData?.ResultData?.ContactService?.ContactNumber;
  const Email = contactDetailsData?.ResultData?.ContactService?.Email;
  const WhatsApp =
    contactDetailsData?.ResultData?.ContactService?.WhatsAppNumber;

  const handleOpenRBSheet = () => {
    refRBSheet.current.open();
  };

  const handleSubmitFeedback = () => {
    let isvalid = validateFields();
    if (isvalid) {
      const feedbackJson = {
        Email: email,
        RequestType: enquiry,
        Subject: subject,
        Comments: comment,
      };

      dispatch(postCustomerFeedback(feedbackJson));
    }
  };

  const reloadCaptcha = () => {
    let tempValue = (Math.random() + 1).toString(36).substring(7);
    setCaptcha(tempValue);
  };

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
    },
    a: {
      color: 'black',
    },
  };

  console.log('Feedback', CustomerFeedbackData);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView
        style={{height: Platform.OS === 'android' ? hp('7.5%') : hp('14.5%')}}>
        <FgcHeader isSearch={true} title={'Customer Services'} />
      </SafeAreaView>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.mainView}>
          <View style={styles.phoneView}>
            <View style={styles.phoneSubView}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${'0800 458 2090'}`)}
                style={styles.numberTouchable}>
                <Image style={styles.phoneImg} source={ImageUrl.Phone} />

                <Text style={styles.numberTxt}>{ContactNumber}</Text>
                <Text style={styles.freeTxt}>Free Phone</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.whatsView}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://web.whatsapp.com/send?phone=447810004929',
                  )
                }
                style={styles.whatsAppTouch}>
                <Image
                  resizeMode="contain"
                  style={styles.whatsAppImg}
                  source={ImageUrl.WhatsApp}
                />

                <Text style={styles.whatsppnumberTxt}>{WhatsApp}</Text>
                <Text style={styles.whatsApp}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:cs@feelgoodcontacts.com')}
            style={styles.mailTouch}>
            <View style={styles.mailTouchSubview}>
              <Image
                resizeMode="contain"
                style={styles.emailImg}
                source={ImageUrl.Email}
              />
            </View>
            <View style={styles.mailIdView}>
              <Text style={styles.mailIdTxt}>{Email}</Text>

              <Text style={styles.pleaseTxt}>
                For any enquiries please contact us via the email address
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.watchView}>
            <View style={styles.watchSubView}>
              <View style={styles.watch}>
                <Image style={styles.watchImg} source={ImageUrl.Watch} />
                <Text style={styles.workingView}> Working Hours</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <HTMLRender
                  source={{
                    html: contactDetailsData?.ResultData?.ContactService
                      ?.TimingHtml,
                  }}
                  tagsStyles={tagsStyles}
                />
              </View>

              <View style={styles.christmasView}>
                <Text style={styles.christmasTxt}>
                  * We are closed on Christmas Day
                </Text>
              </View>
              {contactDetailsisLoading && (
                <View style={styles.IndicatorView}>
                  <SkypeIndicator size={100} animationDuration={800} />
                </View>
              )}

              {CustomerFeedbackisLoading && (
                <View style={styles.IndicatorView}>
                  <SkypeIndicator size={100} animationDuration={800} />
                </View>
              )}
            </View>
          </View>
          <View style={styles.returnView}>
            <View style={styles.imageView}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={ImageUrl.Return}
              />
            </View>
            <View style={styles.returnSubView}>
              <Text style={styles.returnTxt}>Return Address</Text>

              <HTMLRender
                source={{
                  html: contactDetailsData?.ResultData?.ReturnAddress?.Address,

                }}
                tagsStyles={tagsStyles}
              />
            </View>
          </View>

          <View style={styles.clickView}>
            <View style={styles.clickSubView}>
              <View style={styles.collectView}>
                <View style={styles.collect}>
                  <Image
                    resizeMode="contain"
                    style={styles.collectImg}
                    source={ImageUrl.Return}
                  />
                </View>
                <View style={styles.collectFreeView}>
                  <Text style={styles.freeCollect}>
                    Click & Collect...{' '}
                    <Text style={styles.itsFree}>It’s Free</Text>
                  </Text>

                  <Text style={styles.feelGoodView}>
                    Feel Good Contacts {'\n'}
                    <Text style={styles.return}>
                      {' '}
                      6-7 Towers Business Park,{'\n'}
                      Carey Way {'\n'}Wembley{'\n'}HA9 0LQ
                    </Text>
                  </Text>
                  <Text style={styles.openingTxt}>Opening Times</Text>
                  <Text style={styles.monTxt}>Mon - Fri</Text>
                  <Text style={styles.pmTxt}>8:00am - 8:45pm</Text>

                  <Text style={styles.monTxt}>Sat - Sun</Text>
                  <Text style={styles.pmTxt}>9:00am - 5:15pm</Text>

                  <Text style={styles.monTxt}>Bank Holidays</Text>
                  <Text style={styles.pmTxt}>9:00am - 5:15pm</Text>
                </View>
              </View>

              <View style={styles.addressImg}>
                <Image
                  resizeMode="contain"
                  style={styles.addressImg}
                  source={ImageUrl.Address}
                />
              </View>
            </View>
          </View>
          <View style={styles.quiryView}>
            <Text style={styles.quiryTxt}>Quick Enquire Form</Text>

            <View style={styles.emailTxt}>
              <TextInput
                style={styles.emailTxtInput}
                onChangeText={text => onChangeText(text, 1)}
                placeholder="Email*"
                value={email}
                placeholderTextColor={'grey'}
              />

              <View style={styles.inputView}>
                <TouchableOpacity
                  onPress={() => handleOpenRBSheet()}
                  style={styles.enquireTouch}>
                  <Text
                    style={
                      enquiry ? styles.enquireTxt : styles.enquireplaceTxt
                    }>
                    {enquiry ? enquiry : 'Enquiry For'}
                  </Text>

                  <Image
                    resizeMode="contain"
                    style={styles.arrowImg}
                    source={ImageUrl.DropArrow}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.entrySubView}
                onChangeText={text => onChangeText(text, 2)}
                placeholder="Enter Subject"
                value={subject}
                placeholderTextColor={'grey'}
              />
              <View style={styles.commentView}>
                <TextInput
                  numberOfLines={6}
                  onChangeText={text => onChangeText(text)}
                  textAlignVertical="top"
                  multiline={true}
                  style={styles.commentTxtInput}
                  placeholderTextColor={'grey'}
                  placeholder="Comment..."
                  value={comment}
                />
              </View>

              <View style={styles.captchaView}>
                <View style={styles.captchaimgView}>
                  <Text
                    style={{
                      fontFamily: Fonts.OpenSansBold,
                      fontSize: 22,
                      color: Colors.White,
                      fontWeight: '600',
                      backgroundColor: Colors.Black,
                      paddingHorizontal: hp('1.5%'),
                      paddingVertical: hp('0.7%'),
                    }}>
                    {captcha}
                  </Text>
                  <TouchableOpacity onPress={reloadCaptcha}>
                    <Image
                      resizeMode="contain"
                      style={styles.refereshImg}
                      source={ImageUrl.Refresh}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.enterView}>
                  <TextInput
                    onChangeText={text => setEnterCaptcha(text)}
                    value={entercaptcha}
                    style={
                      entercaptcha
                        ? styles.enterCaptchView
                        : styles.enterplaceCaptchView
                    }
                    placeholderTextColor={Colors.Grey}
                    placeholder="Enter captcha"
                    maxLength={7}
                  />
                </View>
              </View>
              <View style={styles.btnView}>
                <Button
                  onPress={() => handleSubmitFeedback()}
                  title={'Submit'}
                  color={Colors.Black}
                  txtColor={Colors.White}
                />
              </View>
            </View>
          </View>
          {CustomerFeedbackisLoading && (
            <View style={styles.IndicatorView}>
              <SkypeIndicator size={100} animationDuration={800} />
            </View>
          )}
          <RBSheet
            ref={refRBSheet}
            height={hp('30%')}
            openDuration={250}
            closeOnDragDown={true}
            animationType="fade"
            customStyles={{
              container: {
                backgroundColor: Colors.White,
              },
            }}>
            <View style={{flex: 1}}>
              <FlatList
                data={contactDetailsData?.ResultData?.RequestTypes}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleEnquiry(item)}
                    style={{
                      marginVertical: 5,
                      backgroundColor: Colors.newGrey,
                      alignItems: 'center',
                      paddingVertical: hp('0.5%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.OpenSansSemiBold,
                        fontSize: 17,
                        color: Colors.Black,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </RBSheet>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default CustomerServices;
