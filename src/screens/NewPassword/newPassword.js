import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/button';
import {useSelector, useDispatch} from 'react-redux';
import {NewPass} from '../../redux/action/actions';
import Colors from '../../components/Colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewPassword = props => {
  const [newPass, setNewPass] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  let emailId = props?.route?.params?.EmailId;
  const dispatch = useDispatch();
  const {data, isLoading} = useSelector(state => state.newPass.status);
  const postJson = {
    NewPassword: newPass,
    ConfirmPassword: ConfirmPass,
    EmailId: emailId,
  };

  useEffect(() => {
    if (data?.StatusCode === 1) {
      props.navigation.navigate('login');
    }
  }, [data, handleReset]);

  const handleReset = () => {
    isValidate();
    dispatch(NewPass(postJson));
    console.log('Data----27', data);
  };
  const isValidate = () => {
    if (newPass.length < 4) {
      Alert.alert('New password length should be more than 4');
      return false;
    } else if (!ConfirmPass) {
      Alert.alert('Please enter a confirm password');
      return false;
    } else if (newPass !== ConfirmPass) {
      Alert.alert('Confirm Password did not match');
      return false;
    }
  };
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>

      <View style={styles.passwordView}>
        <Text style={styles.passwordText}>Create New Password</Text>
        <Text style={styles.accountText}>
          Enter a new password for your account.
        </Text>
      </View>
      <View style={styles.codeView}>
        <View style={styles.inputView}>
          <View style={styles.fieldView}>
            <TextInput
              onChangeText={text => setNewPass(text)}
              style={styles.emailInput}
              placeholderTextColor={Colors.Grey}
              secureTextEntry={true}
              placeholder="Enter New Password"
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.fieldView}>
            <TextInput
              onChangeText={text => setConfirmPass(text)}
              style={styles.emailInput}
              secureTextEntry={true}
              placeholderTextColor={Colors.Grey}
              placeholder="Confirm Password"
            />
          </View>
        </View>
      </View>

      <View style={styles.btnView}>
        <Button
          onPress={() =>
            // props.navigation.navigate('login')
            handleReset()
          }
          title={'Reset Password'}
          color={Colors.Black}
          txtColor={Colors.White}
        />
      </View>
      </SafeAreaView>

    </View>
  );
};

export default NewPassword;
