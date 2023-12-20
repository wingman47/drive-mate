import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/map/HomeScreen';
import MapScreen from './screens/map/MapScreen';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import ScheduledScreen from './screens/scheduled/ScheduledScreen';
import ProfileScreen from './screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Fontisto name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="search"
          component={ScheduledScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="plus"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="plus-square" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;