import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import SearchBar from '../../components/SearchBar/searchBar';
import ImageUrl from '../../components/ImageUrl';
import Colors from '../../components/Colors/colors';
import Button from '../../components/Button/button';

const DeliveryAddress = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [stateCountry, setStateCountry] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChangeText = (item, type) => {
    if (type == 1) {
      setFirstName(item);
    } else if (type == 2) {
      setLastName(item);
    } else if (type == 4) {
      setPostCode(item);
    } else if (type == 5) {
      setAddressOne(item);
    } else if (type == 6) {
      setAddressTwo(item);
    } else if (type == 7) {
      setCity(item);
    } else if (type == 8) {
      setStateCountry(item);
    } else if (type == 9) {
      setPhoneCountryCode(item);
    } else {
      setPhoneNumber(item);
    }
  };

  return (
    <SafeAreaView>
    <ScrollView style={styles.inputMainView}>
      <Pressable style={styles.boxView}>
        <View style={styles.inputView}>
          <View style={styles.imgView}>
            <Image style={styles.accountImage} source={ImageUrl.User_Account} />
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
            <Image style={styles.userImage} source={ImageUrl.User} />
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
            <Image style={styles.userImage} source={ImageUrl.Country} />
          </View>
          <View style={styles.fieldView}>
          <TextInput
                style={styles.postinputBox}
                onChangeText={text => onChangeText(text, 4)}
                placeholderTextColor={Colors.Grey}
                placeholder="Country *"
                value={country}
              />
          </View>
        </View>
        <View style={styles.plusMainView}>
          <View style={styles.postView}>
            <View style={styles.imgView}>
              <Image style={styles.userImage} source={ImageUrl.Postcode} />
            </View>
            <View style={styles.postfieldView}>
              <TextInput
                style={styles.postinputBox}
                onChangeText={text => onChangeText(text, 4)}
                placeholderTextColor={Colors.Grey}
                placeholder="Postcode *"
                value={postCode}
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
              placeholder="   Address line 1 *"
              value={addressOne}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.fieldView}>
            <TextInput
              style={styles.inputBox}
              onChangeText={text => onChangeText(text, 6)}
              placeholderTextColor={Colors.Grey}
              placeholder="   Address line 2"
              value={addressTwo}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <View style={styles.fieldView}>
            <TextInput
              style={styles.inputBox}
              onChangeText={text => onChangeText(text, 7)}
              placeholderTextColor={Colors.Grey}
              placeholder="   City / Town *"
              value={city}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.fieldView}>
            <TextInput
              style={styles.inputBox}
              onChangeText={text => onChangeText(text, 8)}
              placeholderTextColor={Colors.Grey}
              placeholder="   Country / State *"
              value={stateCountry}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.imgView}>
            <Image style={styles.userImage} source={ImageUrl.Mobile} />
          </View>
          <View style={styles.fieldView}>
            <TextInput
              style={styles.inputBox}
              onChangeText={text => onChangeText(text)}
              placeholderTextColor={Colors.Grey}
              placeholder="Mobile *"
              maxLength={10}
              value={phoneNumber}
            />
          </View>
        </View>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
  );
};
export default DeliveryAddress;
