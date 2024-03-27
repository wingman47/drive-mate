import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import InputBox from '../../components/Form/InputBox';
import SubmitButton from '../../components/Form/SubmitButton';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../slice/authSlice';
import ipconfig from '../../ipconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!name || !email || !password) {
        Alert.alert('Please fill the fields');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${ipconfig}/api/v1/auth/register`, {
        name,
        email,
        password,
      });

      dispatch(
        setLogin({
          user: response.data.user,
          token: response.data.token,
        }),
      );
      AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user));
      AsyncStorage.setItem('token', JSON.stringify(response.data.token));
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
      // Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={tw`flex-1`}>
        {loading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#00008b" />
          </View>
        ) : (
          <KeyboardAwareScrollView contentContainerStyle={tw`pt-30`}>
            <View style={tw`px-8`}>
              <View style={tw`mb-8`}>
                <Text style={tw`text-3xl font-bold text-center text-blue-700`}>
                  Create Account
                </Text>
                <Text
                  style={tw`text-xl font-semibold text-center text-black my-4 `}>
                  Create your account to find your Drive mate
                </Text>
              </View>
              <InputBox
                inputTitle={'Name'}
                placeholder={'Enter your name'}
                value={name}
                setValue={setName}
              />
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
              <View style={tw`mt-6`}>
                <SubmitButton
                  btnTitle={'Sign Up'}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  color={'blue-700'}
                />
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={tw`text-center text-blue-700 mt-4`}>
                  Already a user? <Text style={tw`font-semibold`}>Login</Text>
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
