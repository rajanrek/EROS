import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSuccessAction } from '../../redux/slices/userSlice';
import ImageUrl from '../../components/ImageUrl';

export default function SplashScreen(props) {
  const {data, isLoading} = useSelector((state) => state.loginuser.user);
  const {registerData} = useSelector((state) => state.newuser.user);
  const [token, setToken]=React.useState(null)
  const [loading, setLoding]=React.useState(false)
console.log("reg---", registerData, "logindata--",data)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    getData()
  },[token])
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token');
      let parsvalue = jsonValue != null ? JSON.parse(jsonValue) : null;
      await setToken(parsvalue.EmailId)
      console.log("splash async----", parsvalue.EmailId)
      await props.navigation.replace(token === null ? 'Auth' : 'Shop')

    } catch (e) {
      await props.navigation.navigate('Auth')
      // error reading value
      console.log("data err splas", e)

    }
  };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={ImageUrl.Logo}/>
        <Text>Feel Good Contacts</Text>
        <ActivityIndicator color={'blue'} isLoading={loading} size="large" />
      </View>
    );
  }
  