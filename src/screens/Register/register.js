import react, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import ImageUrl from '../../components/ImageUrl';
import styles from './styles';
import Button from '../../components/Button/button';
import {useSelector, useDispatch} from 'react-redux';
import {registerNewUser} from '../../redux/action/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectDropdown from 'react-native-select-dropdown';

import {
  getUserRegisterAction,
  getUserSuccessAction,
} from '../../redux/slices/userSlice';
import Colors from '../../components/Colors/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

// import CustomHeader from '../../components/header/CustomHeader';

const Register = props => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const [term, setTerm] = useState(false);
  const [termcondition, setTermCondition] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);
  const [IsEvent, setIsEvent] = useState(true);

  const [showPwd, setShowPWD] = useState(true);
  const [LoginBtnTrigger, setLoginBtnPress] = useState(false);

  const dispatch = useDispatch();
  const {data, registerData, isLoading} = useSelector(
    state => state.newuser.user,
  );
  const postJson = {
    FirstName: fname,
    LastName: lname,
    Email: email,
    Password: password,
    Website: location,
  };

  console.log('RegisterUser-41--', registerData?.StatusCode);
  useEffect(() => {
    if (LoginBtnTrigger) {
      registerSuccess();
    }
  }, [data]);
  const RegisterBtn = () => {
    setLoginBtnPress(true);
    let isvalid = validateFields();
    console.log('ErrorMsg- register--', isvalid);
    if (isvalid) {
      dispatch(registerNewUser(postJson));
    }
  };

  const registerSuccess = () => {
    console.log('inside registerSuccess reg');
    if (data?.StatusCode === 1) {
      console.log('inside success reg60', data);
      //  await dispatch(getUserRegisterAction(parsvalue));
      // dispatch(getUserSuccessAction(data));
      // props.navigation.reset({
      //   index: 0,
      //   routes: [{name: 'Welcome'}],
      // });
      props.navigation.navigate("Welcome")

      setLoginBtnPress(false);
    } else if (registerData?.StatusCode === 101) {
      Alert.alert('Email already registered');
    } else {
      console.log('registerfailed--');
    }
  };

  const handleTerms = () => {
    setTerm(!term);
  };

  const conditionTerms = () => {
    setTermCondition(!termcondition);
  };
  const YourCustomTransition = (animValue, position = 'top') => {
    const opacity = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const translateX = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [360, 0],
    });

    return {
      transform: [{translateX}],
      opacity,
    };
  };
  const validateFields = () => {
    if (fname === '' && lname === '' && email === '' && password === '') {
      Alert.alert('All fields are required');
      return false;
    }
    if (fname === '') {
      Alert.alert('First Name is required');
      return false;
    }
    if (lname === '') {
      Alert.alert('Last Name is required');
      return false;
    }
    if (email === '') {
      Alert.alert('Email is required');
      return false;
    }
    if (password === '') {
      Alert.alert('Password is required');
      return false;
    }

    if (location === '') {
      Alert.alert('Location is required');
      return false;
    }
    // Email validation using a basic regular expression
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email address');
      return false;
    }

    // Password validation (you can set your own criteria)
    if (password.length < 4) {
      Alert.alert('Length should be greater than 4');
      setErrorMsg(true);
      return false;
    }
    if (!termcondition) {
      Alert.alert('Please select terms & condition');
      return false;
    }
    setErrorMsg(false);
    // console.log("email---", ErrorMsg)
    return true;
  };

  const locationData = ['UK', 'IE'];

  console.log('location',location)
  return (
    <View style={styles.mainView}>
      {/* <SafeAreaView style={styles.mainView}> */}
        {/* <CustomHeader /> */}
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}> */}
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.accountView}>
            <Text style={styles.accountText}>Create an account</Text>
          </View>

          <FlashMessage position="top" />
          <View style={styles.contentView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}>
              <View style={styles.codeView}>
                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image
                      style={styles.accountImage}
                      source={ImageUrl.User_Account}
                    />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      autoCorrect={false}
                      onChangeText={text => setFname(text)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="First Name"
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image style={styles.userImage} source={ImageUrl.User} />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      autoCorrect={false}
                      onChangeText={text => setLname(text)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="Last Name"
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image style={styles.mailImage} source={ImageUrl.Mail} />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => setEmail(text)}
                      placeholderTextColor={Colors.Grey}
                      placeholder="Enter Email address"
                      autoCorrect={false}
                      keyboardType='email-address'
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.imgView}>
                    <Image style={styles.keyImage} source={ImageUrl.Key} />
                  </View>
                  <View style={styles.fieldView}>
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={text => setPassword(text)}
                      placeholderTextColor={Colors.Grey}
                      secureTextEntry={showPwd}
                      placeholder="Enter Password"
                      autoCorrect={false}
                    />
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

                <View style={{paddingVertical: 5}}>
                  <SelectDropdown
                    data={locationData}
                    onSelect={(selectedItem, index) => {
                      console.log('Select Data--1522--', selectedItem, index);
                      setLocation(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpen) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text
                            style={
                              selectedItem
                                ? styles.dropdownButtonTxtStyle
                                : styles.dropdownButtonTxtStyle2
                            }>
                            {selectedItem || 'Select Location'}
                          </Text>
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View
                          style={{
                            ...styles.dropdownItemStyle,
                            ...(isSelected && {
                              backgroundColor: '#D2D9DF',
                            }),
                          }}>
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item}
                          </Text>
                        </View>
                      );
                    }}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                </View>
                {IsEvent ? (
                  <View style={styles.plusView}>
                    {!term ? (
                      <TouchableOpacity onPress={() => handleTerms()}>
                        <Image
                          style={styles.boxImage}
                          source={ImageUrl.SquareBox}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => handleTerms()}>
                        <Image
                          style={styles.boxImage}
                          source={ImageUrl.TickBox}
                        />
                      </TouchableOpacity>
                    )}
                    <View style={styles.receiveView}>
                      <Text style={styles.receiveText}>
                        I’d like to receive{' '}
                        <Text style={styles.percentText}>10% off </Text>my first
                        order
                        <Text style={styles.useCodeText}>
                          {' '}
                          (Use Code: order10)
                        </Text>
                        <Text style={styles.orderText}>
                          {' '}
                          as well as additional offers, promotions, re-{'\n'}
                          order reminders, health advice & tips
                        </Text>
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* </ScrollView> */}
              </View>
              <View style={styles.agreeView}>
                {!termcondition ? (
                  <TouchableOpacity onPress={() => conditionTerms()}>
                    <Image
                      style={styles.boxImage}
                      source={ImageUrl.SquareBox}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => conditionTerms()}>
                    <Image style={styles.boxImage} source={ImageUrl.TickBox} />
                  </TouchableOpacity>
                )}
                <Text style={styles.agreeText}>
                  I agree to terms & conditions
                </Text>
              </View>
              <View style={styles.btnView}>
                <Button
                  onPress={() => RegisterBtn()}
                  // disable={!termcondition}
                  title={'Create my account'}
                  txtColor={Colors.White}
                  color={Colors.Black}
                />

                <View style={styles.memberView}>
                  <TouchableOpacity>
                    <Text style={styles.memberText}>Already a member?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('login')}>
                    <Text style={styles.loginText}>Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      {/* </SafeAreaView> */}
    </View>
  );
};
export default Register;
