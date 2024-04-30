import react, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  NativeModules,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView
} from 'react-native';

import ImageUrl from '../../components/ImageUrl';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {LoginUser} from '../../redux/action/actions';
import Button from '../../components/Button/button';
import Emarsys from 'react-native-emarsys-wrapper';
import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserSuccessAction} from '../../redux/slices/userSlice';
import Colors from '../../components/Colors/colors';

import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Global from '../../utils/Global';

const {RNEmarsysWrapper, RNEmarsysPushWrapper} = NativeModules;

const Login = props => {
  const [showPwd, setShowPWD] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(true);
  const [BtnPress, setBtnPress] = useState('');
  const [LoginBtnTrigger, setLoginBtnPress]=useState(false)

  const dispatch = useDispatch();

  const {data, isLoading, errors} = useSelector(state => state.loginuser.user);
  // const postJson = { Email: email.toLowerCase(), Password: password,DeliveryCountryId: 0, DeliveryOptionId: 0, BasketId: 'e5ddb5a3-c53d-4c09-bf45-a41db13b1b6a' };
  const postJson = {
    Email: email.trim().toLowerCase(),
    Password: password,
    DeliveryCountryId: 0,
    DeliveryOptionId: 0,
    BasketId: '',
  };
  


  useEffect(() => {
    if(LoginBtnTrigger && !errorMsg){
      loginSuccess();
    }
  }, [data, errorMsg, email, password, LoginBtnTrigger]);

  async function setContact() {
    if(Global.APP_PRODUCTION_STATUS == true){
      let customerId = data?.ResultData?.CustomerId.toString();
      try {
        let result = await Emarsys.setContact(Global.contactId, customerId);
        let contactFieldId = await Emarsys.getContactFieldId();
        let pushToken = await Emarsys.push.pushToken();
        let setPushToken = await Emarsys.push.setPushToken(pushToken);
      } catch (error) {
        console.log('Emarsys Event error', error);
      }
    }else{
      console.log("log login setContact not called ==> Staging user")
    }
  }

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        console.log('granted=====', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification Granted');
          setContact();
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }else if(Platform.OS === 'ios'){
      setContact();
    }
  };

  const loginBtn = async () => {
    console.log('login method', errorMsg);
    setLoginBtnPress(true)
    
    if (!isValidate()) {
      console.log('login inside if');
      dispatch(LoginUser(postJson));
      requestNotificationPermission();
    }
    setBtnPress(true);
  };
  const isValidate = () => {
    if (!email) {
     
      Alert.alert('Please enter a valid email id')
      setErrorMsg(true);
      return true
    } else if (!password) {
      // showMessage({
      //   message: 'Validation Error',
      //   description: 'Please enter a valid password id',
      //   type: 'danger',
      //   style: {borderRadius: 15},
      //   // transitionConfig: YourCustomTransition,
      //   icon: props => <Text style={{fontSize: 30}}>☹️</Text>,
      // });
      Alert.alert('Please enter a valid password id')
      setErrorMsg(true);
      return true

    }else{
      setErrorMsg(false)
      return false
    }
  };
  const loginSuccess = async () => {
    if (data?.StatusCode === 1) {
      // dispatch(getUserSuccessAction(data));
    setLoginBtnPress(false)
      props.navigation.navigate('WelcomeBack');
      setErrorMsg(false);
      setContact();
    }
    
  };
  const removeToken = () => {
    AsyncStorage.removeItem('token');
  };
  const handleForgotPass = () => {
    props.navigation.navigate('forgotPassword');
  };

  const handleError = () => {
    return <Text style={{color: 'red', fontSize: 12}}>{errorMsg}</Text>;
  };
  return (
    <View style={styles.mainContainer}>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <View style={styles.accountView}>
            <Text style={styles.accountText}>Log in...</Text>
          </View>

          <View style={styles.inputView}>
            <View style={styles.inputBox}>
              <View style={styles.imageView}>
                <Image style={styles.mailImage} source={ImageUrl.Mail} />
              </View>
              <View style={styles.emailView}>
                <TextInput
                  onChangeText={text => setEmail(text)}
                  value={email}
                  style={styles.emailInput}
                  placeholder="Enter email address"
                  placeholderTextColor={'grey'}
                  keyboardType='email-address'
                  autoCorrect={false}
                />

                {handleError}
              </View>
            </View>

            <View style={styles.inputBox}>
              <View style={styles.imageView}>
                <Image style={styles.keyImage} source={ImageUrl.Key} />
              </View>
              <View style={styles.emailView}>
                <TextInput
                  style={styles.emailInput}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={showPwd}
                  value={password}
                  placeholder="Enter Password"
                  placeholderTextColor={'grey'}
                  autoCorrect={false}
                />
                {handleError}
              </View>

              <View style={styles.passwordView}>
                {showPwd ? (
                  <TouchableOpacity onPress={() => setShowPWD(!showPwd)}>
                    <Image
                      style={styles.passwordImage}
                      source={ImageUrl.CloseEye}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setShowPWD(true)}>
                    <Image
                      style={styles.passwordImage}
                      source={ImageUrl.OpenEye}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => handleForgotPass()}>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
            <View style={styles.btnView}>
              <Button
                onPress={() => loginBtn()}
                title={'Log in'}
                txtColor={Colors.White}
                color={Colors.Black}
              />
            </View>
          </View>
        {/* </ScrollView> */}

          <View style={styles.memberView}>
            <TouchableOpacity>
              <Text style={styles.memberText}>Become a member |</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('register')}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>

      </View>
  );
};

export default Login;
