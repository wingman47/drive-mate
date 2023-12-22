import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../../components/Map/Map';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NaviagateCard from '../../components/Map/NaviagateCard';
import RideOptionsCard from '../../components/Map/RideOptionsCard';
import DriverOptions from '../../components/Rider/DriverOptions';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2 rounded-t-xl shadow-xl`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NaviagateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DiverOptions"
            component={DriverOptions}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;