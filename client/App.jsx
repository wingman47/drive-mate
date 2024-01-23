import {store} from './store';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './screens/map/HomeScreen';
import MapScreen from './screens/map/MapScreen';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import {KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScheduledScreen from './screens/scheduled/ScheduledScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DriverForm from './screens/Form/DriverForm';
import RiderForm from './screens/Form/RiderForm';
import ProfileScreen from './screens/profile/ProfileScreen';
import NoDriverScreen from './screens/rider/NoDirverScreen';
import DriverCreatedConfirm from './screens/driver/DriverCreatedConfirm';
import DriverOptionsScreen from './screens/rider/DriverOptionsScreen';
import ConfirmationScreen from './screens/request/ConfirmationScreen';
import RequestList from './screens/request/AcceptRequest';

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
      <Tab.Screen name="Drive" component={HomeScreen} />
      <Tab.Screen name="Scheduled" component={ScheduledScreen} />
      <Tab.Screen name="Requests" component={RequestList} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
            <Stack.Navigator initialRouteName="Login">
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
                name="Register"
                component={Register}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
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
                name="DriverForm"
                component={DriverForm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RiderForm"
                component={RiderForm}
                options={{headerShown: false}}
              />
              {/* routing done after submition of the driver form  */}
              <Stack.Screen
                name="DriverCreated"
                component={DriverCreatedConfirm}
                options={{headerShown: false}}
              />
              {/* routing done to handle submition of the Rider form */}
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
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
