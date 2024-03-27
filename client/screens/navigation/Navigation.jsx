import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from '../../screens/map/HomeScreen';
import MapScreen from '../../screens/map/MapScreen';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import {KeyboardAvoidingView, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScheduledScreen from '../../screens/scheduled/ScheduledScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DriverForm from '../../screens/Form/DriverForm';
import RiderForm from '../../screens/Form/RiderForm';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import NoDriverScreen from '../../screens/rider/NoDirverScreen';
import DriverCreatedConfirm from '../../screens/driver/DriverCreatedConfirm';
import DriverOptionsScreen from '../../screens/rider/DriverOptionsScreen';
import ConfirmationScreen from '../../screens/request/ConfirmationScreen';
import RequestItem from '../../screens/request/RequestItem';
import LaunchingSoon from '../../screens/tripplanner/LaunchingSoon';
import {selectUser, setLogin} from '../../slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Drive') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Scheduled') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Requests') {
            iconName = focused ? 'arrow-collapse' : 'arrow-expand';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Drive"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Scheduled" component={ScheduledScreen} />
      <Tab.Screen name="Requests" component={RequestItem} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const isLoggedIn = async () => {
    try {
      setLoading(true);
      const getInfo = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(getInfo);

      if (userInfo) {
        dispatch(
          setLogin({
            user: userInfo,
            token: response.data.token,
          }),
        );
        console.log('###################################', userInfo);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
          <Stack.Navigator initialRouteName="Login">
            {!loading && !user ? (
              <>
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{headerShown: false}}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ConfirmationScreen"
                  component={ConfirmationScreen}
                  options={{headerShown: false}}
                />

                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Launchingsoon"
                  component={LaunchingSoon}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="DriverForm"
                  component={DriverForm}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="RiderForm"
                  component={RiderForm}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="DriverCreated"
                  component={DriverCreatedConfirm}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="NoDriverScreen"
                  component={NoDriverScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="DriverOptions"
                  component={DriverOptionsScreen}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Navigation;
