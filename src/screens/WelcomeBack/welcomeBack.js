import react, {useState,useEffect} from 'react';
import {View, Text, ImageBackground, Image, ScrollView, SafeAreaView} from 'react-native';
import ImageUrl from '../../components/ImageUrl';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const WelcomeBack = props => {
  const {data, isLoading, errors} = useSelector((state) => state.loginuser.user);

  const [name, setName] =useState('')
  const [color, setColor] = useState('')


useEffect(() => {
  setTimeout(() => {
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Shop'}],
    });
  },2000);

},[])
   
  return (
    <ImageBackground
      source={ImageUrl.BackgroundImage}
      style={styles.backgroundImage}>
        <SafeAreaView style={{flex:1}}>

      <View
        style={styles.logoView}>
        <Image
        style={styles.logoImage}
        source={ImageUrl.Logo} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.nameView}>

          <Text style={styles.nameText}>Welcome Back {data?.FirstName}</Text>
        </View>
        <Text  style={styles.thankText}>Thanks for being with us....</Text>
      </View>
</SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomeBack

