import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import InputBox from '../../components/Form/InputBox';
import SubmitButton from '../../components/Form/SubmitButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setLogin } from '../../slice/authSlice';
import { useNavigation } from '@react-navigation/native';
import ipconfig from '../../ipconfig';

const sportCar = require('../../assets/sport-car.png');

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
        Alert.alert('Please fill the fields');
        setLoading(false)
        return;
      }
      const response = await axios.post(`${ipconfig}/api/v1/auth/login`, {
        email,
        password,
      });

      dispatch(
        setLogin({
          user: response.data.user,
        })
      );
      setLoading(false);
      console.log('user logged ', user);
    } catch (error) {
      Alert.alert(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  // Redirection to the New page.
  useEffect(() => {
    if (!user) return;

    navigation.navigate('Home');
  }, [user]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={tw`flex-1`}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#00008b" />
          </View>
        ) : (
          <KeyboardAwareScrollView contentContainerStyle={tw`pt-48`}>
            <View style={tw`px-8`}>
              <View style={tw`mb-8`}>
                <Text style={tw`text-3xl font-bold text-center text-blue-700`}>
                  Login Here
                </Text>
                <Text style={tw`text-xl font-semibold text-center text-black my-4 `}>
                  Welcode back we missed you!
                </Text>
              </View>
              <InputBox
                inputTitle={'Email ID'}
                placeholder={'Enter your email address'}
                keyboardType={'email-address'}
                value={email}
                setValue={setEmail}
                icon={'faEnvelope'}
              />
              <InputBox
                inputTitle={'Password'}
                placeholder={'Enter your password'}
                secureTextEntry={true}
                value={password}
                setValue={setPassword}
                icon={'faLock'}
              />
              <View style={tw`mt-4`}>
                <SubmitButton
                  btnTitle={'Login'}
                  handleSubmit={handleSubmit}
                  color={'blue-700'}
                />
                <Text
                  onPress={() => navigation.navigate('Register')}
                  style={tw`text-center text-blue-700 mt-8`}
                >
                  Not registered?{' '}
                  <Text style={tw`font-semibold`}>Sign Up</Text>
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
