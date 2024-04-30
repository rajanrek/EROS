import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import ImageUrl from '../../components/ImageUrl';
import styles from './styles';
import Button from '../../components/Button/button';
import {useSelector, useDispatch} from 'react-redux';
import {ForgotPass} from '../../redux/action/actions';
import Colors from '../../components/Colors/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import Otp from '../Otp/otp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {showMessage} from 'react-native-flash-message';

const ForgotPassword = props => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const {data, isLoading} = useSelector(state => state.forgotPass.status);
  const refRBSheet = useRef();

  useEffect(() => {
    if (data) {
      // props.navigation.navigate('otp', {email});
    }
  }, [data, handleReset]);
  const handleReset = () => {
    if (email === '') {
      Alert.alert('Enter your email id');
      return false;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email id');
      return false;
    }

    dispatch(ForgotPass({EmailId: email}));
    refRBSheet.current.open();
    console.log('Data----27', data);
  };

  const goToLogin = () => {
    props.navigation.navigate('login');
  };
  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };
  return (
    <View style={styles.mainContainer}>
<KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputView}>
          <View style={styles.forgotView}>
            <View style={styles.forgotInput}>
              <Text style={styles.passwordText}>Forgot Password</Text>

              <Text style={styles.addressText}>
                Enter your email address, if there is an account
                {'\n'}associated with this email ID, you’ll receive a link to
                {'\n'}
                change your password. Don't forget to check your spam folder.
              </Text>
            </View>

            <View style={styles.inputBox}>
              <View style={styles.imageView}>
                <Image style={styles.mailImage} source={ImageUrl.Mail} />
              </View>
              <View style={styles.emailView}>
                <TextInput
                  onChangeText={text => setEmail(text)}
                  style={styles.emailInput}
                  placeholderTextColor={Colors.Grey}
                  placeholder="Enter email address"
                />
              </View>
            </View>
          </View>
          <View style={{flex: 3}}>
            <View style={styles.btnView}>
              <Button
                onPress={() => handleReset()}
                title={'Reset password'}
                color={Colors.Black}
                txtColor={Colors.White}
              />
            </View>
            <View style={styles.backView}>
              <Text style={styles.backText}>Back to</Text>
              <TouchableOpacity onPress={() => goToLogin()}>
                <Text style={styles.loginText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          height={hp('52%')}
          openDuration={250}
          closeOnDragDown={true}
          animationType="fade"
          customStyles={{
            container: {
              backgroundColor: Colors.LightWhite,
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <Otp
            onClose={handleCloseRBSheet}
            email={email}
            navigation={props.navigation}
          />
        </RBSheet>
</KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
