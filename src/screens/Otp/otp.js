import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/button';
import {useSelector, useDispatch} from 'react-redux';
import {GetOtp} from '../../redux/action/actions';
import Colors from '../../components/Colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Otp = props => {
  const [otp, setOtp] = useState([]);

  const dispatch = useDispatch();
  const {data, isLoading} = useSelector(state => state.getOtp.otpDetails);
  const postJson = {EmailId: props.email, OTP: otp.join('')};
  const refInput1 = React.createRef();
  const refInput2 = React.createRef();
  const refInput3 = React.createRef();
  const refInput4 = React.createRef();
  useEffect(() =>{
    if(data?.StatusCode === 1){
    props.onClose();
      props.navigation.navigate('newPassword',{EmailId:props.email})
    }
  },[data,confirmBtn])
  const confirmBtn = () => {
    dispatch(GetOtp(postJson));
  };
  const handleOtpChange = (text, inputRef, inputIndex) => {
    const updatedOtpValues = [...otp];
    updatedOtpValues[inputIndex] = text;
    setOtp(updatedOtpValues);
    if (text.length === 1) {
      if (inputRef === refInput1.current) {
        refInput2.current.focus();
      } else if (inputRef === refInput2.current) {
        refInput3.current.focus();
      } else if (inputRef === refInput3.current) {
        refInput4.current.focus();
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>

      <View style={styles.inputView}>
        <View style={styles.codeView}>
          <Text style={styles.codeText}>Enter Your Code</Text>

          <Text style={styles.addressText}>
            Please enter the 4 digit code that
          </Text>
          <View style={styles.sentView}>
            <Text style={styles.sentText}> sent to: </Text>
            <Text style={styles.mailText}>{props.email}</Text>
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.emailView}>
            <TextInput
              ref={refInput1}
              onChangeText={text => handleOtpChange(text, refInput1.current, 0)}
              maxLength={1}
              textAlign="center"
              cursorColor={Colors.Black}
              style={styles.emailInput}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.emailView}>
            <TextInput
              maxLength={1}
              ref={refInput2}
              onChangeText={text => handleOtpChange(text, refInput2.current, 1)}
              textAlign="center"
              cursorColor={Colors.Black}
              style={styles.emailInput}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.emailView}>
            <TextInput
              maxLength={1}
              ref={refInput3}
              onChangeText={text => handleOtpChange(text, refInput3.current, 2)}
              textAlign="center"
              cursorColor={Colors.Black}
              style={styles.emailInput}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.emailView}>
            <TextInput
              maxLength={1}
              ref={refInput4}
              onChangeText={text => handleOtpChange(text, refInput4.current, 3)}
              textAlign="center"
              cursorColor={Colors.Black}
              style={styles.emailInput}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.loginView}>
          <View style={styles.backView}>
            <Text style={styles.backText}>Back to</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('login')}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnView}>
            <Button
              onPress={() => confirmBtn()}
              title={'Confirm Code'}
              color={Colors.Black}
              txtColor={Colors.White}
            />
          </View>
        </View>
      </View>
      </SafeAreaView>

    </View>
  );
};

export default Otp;
