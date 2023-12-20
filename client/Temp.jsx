import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons';

import HomeScreen from './screens/map/HomeScreen';
import MapScreen from './screens/map/MapScreen';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import ScheduledScreen from './screens/scheduled/ScheduledScreen';
import ProfileScreen from './screens/profile/ProfileScreen';

const homeName = 'Home';
const scheduledName = 'Scheduled';
const profileName = 'Profile';

const Tab = createBottomNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={{
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === scheduledName) {
              iconName = focused ? 'list' : 'list-outline';
            } else {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={scheduledName} component={ScheduledScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
