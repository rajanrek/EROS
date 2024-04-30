import react, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Image, ScrollView} from 'react-native';
import ImageUrl from '../../components/ImageUrl';
import Button from '../../components/Button/button';
import styles from './styles';
import Colors from '../../components/Colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainScreen = props => {
  const [Token, setToken] = useState(null);
  const [focusMainpage, setMainPage] = useState(false);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
     let jsonValue = value != null ? JSON.parse(value) : null;
      if (jsonValue && jsonValue?.ResultData !== null || jsonValue !== null) {
        // value previously stored
        setToken(jsonValue.ResultData)
        console.log("prev----", Token)
      await props.navigation.replace('Shop')
        return jsonValue
      }
    } catch (e) {
      // error reading value
      console.log("err token----", e)
      return e

    }
  };
  useEffect(()=>{
    getToken()
    setMainPage(!focusMainpage)
  },[])

  return (
    <ImageBackground
      source={ImageUrl.ScreenImage}
      style={styles.backgroundImage}>
      <View
        style={styles.logoView}>
        <Image 
        style={styles.logoImage}
        source={ImageUrl.Logo} />
        <View style={styles.textView}>
        <Text style={styles.orderTxt}>
      Your one-stop shop for affordable eye care. Order by 11:59pm to get your contact lenses tomorrow.
      </Text>
        </View>
    
      </View>
   
      <View style={styles.buttonView}>
      <View style={[styles.btn,styles.loginBtn]}>
        <Button  
        onPress={() => props.navigation.navigate('login')}
        title={'Log in'} txtColor={Colors.DarkGrey} color={Colors.LightWhite}/>
      </View>

      <View style={styles.btn}>
        <Button 
        onPress={() => props.navigation.navigate('register')}
        title={'Create an account'} txtColor={Colors.White} color={Colors.Black}/>
      </View>
      </View>
    </ImageBackground>
  );
};

export default MainScreen;
