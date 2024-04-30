import react, {useState, useEffect} from 'react';
import {View, Text, ImageBackground,SafeAreaView, Image, ScrollView} from 'react-native';
import ImageUrl from '../../components/ImageUrl';
import Button from '../../components/Button/button';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
// import { getUserSuccessAction } from '../../redux/slices/userSlice';
import Colors from '../../components/Colors/colors';
import { getLoginUserSuccessAction } from '../../redux/slices/loginUserSlice';
import { getRegisterUserSuccessAction } from '../../redux/slices/registerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = props => {
  const [name, setName] =useState('Copy Code')
  const [color, setColor] = useState('white')
  const [copiedCode, setCopiedCode] = useState('')
   const [isCopy, setCopyBtn] = useState(false)
  const [IsEvent, setIsEvent]=useState(true)

  // const {data, isLoading} = useSelector((state) => state.users.user);
  const { data, registerData, isLoading } = useSelector((state) => state.newuser.user);
  
  const dispatch = useDispatch();
  
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      let jsonValue = value != null ? JSON.parse(value) : null;
      if (jsonValue !== null) {
        // value previously stored
        console.log('token in welcom----', jsonValue);
    dispatch(getLoginUserSuccessAction(jsonValue))
    dispatch(getRegisterUserSuccessAction(jsonValue))
        // setToken(jsonValue);
        return jsonValue;
      }else{
        console.log('token in else-welcome---', jsonValue);

        // props.navigation.reset({
        //   index: 0,
        //   routes: [{name: 'Auth'}],
        // });
      }
    } catch (e) {
      // error reading value
      console.log('err token----', e);
      return e;
    }
  };
  useEffect(()=>{
    // isLoggedIn();
    getToken()
console.log("data in welcome-------", registerData)

  
  },[])
  const handleCopy =(code)=>{
    setCopiedCode(code)
    setCopyBtn(true)
    setTimeout(() => {
    // props.navigation.navigate("interestScreen")
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'interestScreen' }],
  })
    setCopyBtn(false)
      
    }, 1500);
  }


  return (
    <ImageBackground
      source={ImageUrl.BackgroundImage}
      style={styles.backgroundImage}>
      <View
        style={styles.logoView}>
        <Image 
        style={styles.logoImage}
        source={ImageUrl.Logo} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.nameView}>

          <Text style={styles.nameText}>Hi, {data?.ResultData?.loginResponse?.UserName}</Text>
        </View>
        <Text style={styles.thankText}>Thanks for choosing us.</Text>
        <View style={styles.textView}>
          <Text style={styles.enjoyText}>Enjoy the <Text style={styles.offText}>10% OFF </Text>on your first order.</Text>
        <Text style={styles.orderText}>Use code: FEELGOOD10</Text>
        </View> 
      </View>

      <View style={styles.buttonView}>
        <Button onPress={handleCopy} disable={isCopy}  title={isCopy === true ? 'Copied' : name} color={color} txtColor={Colors.Black}/>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
