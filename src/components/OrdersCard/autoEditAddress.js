import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import {Colors, ImageUrl} from '../constants';
import {useDispatch} from 'react-redux';
import {getBasketAction} from '../redux/basketSlice'; // Import your Redux action here

const AutoEditAddress = () => {
  const [isVisible, setIsVisible] = useState(false); // State to control modal visibility

  const dispatch = useDispatch(); // Redux dispatch function

  // Function to handle address update
  const handleAddressUpdate = item => {
    // Dispatch Redux action to update basket
    dispatch(getBasketAction({}));
    // You can add more logic here
    // Close the modal
    setIsVisible(false);
  };

  const validateFields = () => {
    if (
      firstName === '' &&
      lastName === '' &&
      addressOne === '' &&
      postCode === '' &&
      city === '' &&
      state === '' &&
      postCode === '' &&
      phoneNumber === ''
    ) {
      Alert.alert('All field is required');
      return false;
    }
    if (firstName === '') {
      Alert.alert('Enter your first name');
      return false;
    }
    if (lastName === '') {
      Alert.alert('Enter your last name');
      return false;
    }
    if (addressOne === '') {
      Alert.alert('Enter your address Line 1');
      return false;
    }
    if (postCode === '') {
      Alert.alert('Please find your address by post code');
      return false;
    }

    if (city === '') {
      Alert.alert('Enter your city');
      return false;
    }

    if (state === '') {
      Alert.alert('Enter your state');
      return false;
    }
    if (country === '') {
      Alert.alert('Select your country');
      return false;
    }

    if (phoneNumber === '') {
      Alert.alert('Enter your phone number');
      return false;
    }

    return true;
  };

  
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {isVisible && (
        <View style={styles.addressContainer}>
          {/* Your address input fields */}
          <ScrollView style={styles.inputMainView}>
                    <Pressable style={styles.boxView}>
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
                            onChangeText={text => onChangeText(text, 1)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="First Name *"
                            value={firstName}
                          />
                        </View>
                      </View>

                      <View style={styles.inputView}>
                        <View style={styles.imgView}>
                          <Image
                            style={styles.userImage}
                            source={ImageUrl.User}
                          />
                        </View>
                        <View style={styles.fieldView}>
                          <TextInput
                            style={styles.inputBox}
                            onChangeText={text => onChangeText(text, 2)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="Last Name *"
                            value={lastName}
                          />
                        </View>
                      </View>

                      <View style={styles.inputView}>
                        <View style={styles.imgView}>
                          <Image
                            style={styles.userImage}
                            source={ImageUrl.Country}
                          />
                        </View>
                        <View style={styles.fieldView}>
                          <TextInput
                            style={styles.inputBox}
                            onChangeText={text => onChangeText(text, 3)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="Address Line 1*"
                            value={addressOne}
                          />
                        </View>
                      </View>
                      <View style={styles.plusMainView}>
                        <View style={styles.postView}>
                          <View style={styles.imgView}>
                            <Image
                              style={styles.userImage}
                              source={ImageUrl.Postcode}
                            />
                          </View>
                          <View style={styles.postfieldView}>
                            <TextInput
                              style={styles.postinputBox}
                              onChangeText={text => onChangeText(text, 4)}
                              placeholderTextColor={Colors.Grey}
                              placeholder="Address Line 2*"
                              value={addressTwo}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.inputView}>
                        <View style={styles.fieldView}>
                          <TextInput
                            style={styles.inputBox}
                            onChangeText={text => onChangeText(text, 5)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="   City/Town *"
                            value={city}
                          />
                        </View>
                      </View>

                      <View style={styles.inputView}>
                        <View style={styles.fieldView}>
                          <TextInput
                            style={styles.inputBox}
                            onChangeText={text => onChangeText(text, 6)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="   State"
                            value={state}
                          />
                        </View>
                      </View>
                      <View style={styles.inputView}>
                        <View style={styles.fieldView}>
                          <TextInput
                            style={styles.inputBox}
                            onChangeText={text => onChangeText(text, 7)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="   Postcode *"
                            value={postCode}
                          />
                        </View>
                      </View>

                      <View style={styles.inputView}>
                        <View style={styles.fieldView}>
                          <TextInput
                            style={styles.inputBox}
                            onChangeText={text => onChangeText(text, 8)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="   Country *"
                            value={country}
                          />
                        </View>
                      </View>

                      <View style={styles.inputView}>
                        <View style={styles.imgView}>
                          <Image
                            style={styles.userImage}
                            source={ImageUrl.Mobile}
                          />
                        </View>
                        <View style={styles.fieldView}>
                          <TextInput
                            style={styles.inputBox}
                            onChangeText={text => onChangeText(text)}
                            placeholderTextColor={Colors.Grey}
                            placeholder="Mobile *"
                            maxLength={12}
                            value={phoneNumber}
                          />
                        </View>
                      </View>
                    </Pressable>
                  </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: hp('2%'),
              paddingHorizontal: hp('1%'),
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setIsVisible(false)} // Close the modal
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.Black,
                  paddingHorizontal: hp('8.5%'),
                  paddingVertical: hp('2%'),
                  alignItems: 'center',
                }}>
                <Text style={styles.btnTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleAddressUpdate(item)} // Call function to handle address update
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.Black,
                  paddingHorizontal: hp('8.5%'),
                  paddingVertical: hp('2%'),
                  alignItems: 'center',
                }}>
                <Text style={styles.btnTxt}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default AutoEditAddress;
