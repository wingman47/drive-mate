import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, useColorScheme, View} from 'react-native';
import tw from 'twrnc';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import InputBox from '../../components/Form/InputBox';
import SubmitButton from '../../components/Form/SubmitButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setLogin} from '../../slice/authSlice';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        setLoading(false);
        Alert.alert('Please fill the fields');
        return;
      }
      setLoading(false);
      const user = await axios.post(
        'http://192.168.1.15:8080/api/v1/auth/login',
        {email, password},
      );
      dispatch(
        setLogin({
          user: user.data.user,
        }),
      );
      // Alert.alert(user && user.message);
    } catch (error) {
      Alert.alert(error);
      setLoading(false);
      console.log(error);
    }
  };

  // Redirection to the New page.
  useEffect(()=>{
    if(!user)  return;

    else 
    navigation.navigate('Home');
  },[user]);

  return (
    <KeyboardAwareScrollView>
      <Header />
      {/* <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?q=80&w=448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={tw`h-1/3`}
      /> */}
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <View style={tw`my-20 px-8 gap-3`}>
          <InputBox
            inputTitle={'Email ID'}
            placeholder={'Enter your email address'}
            keyboardType={'email-address'}
            value={email}
            setValue={setEmail}
          />
          <InputBox
            inputTitle={'Password'}
            placeholder={'Enter your password'}
            secureTextEntry={true}
            value={password}
            setValue={setPassword}
          />
          <SubmitButton
            btnTitle={'Login'}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <View style={tw`mx-auto`}>
            <Text onPress={() => navigation.navigate('Register')}>
              Not registered?{' '}
              <Text style={tw`font-semibold text-black`}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
