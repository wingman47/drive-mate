import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../../components/Map/Map';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverOptions from '../../components/Rider/DriverOptions';

const DriverOptionsScreen = () => {
//   const Stack = createNativeStackNavigator();

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <DriverOptions/>
    </View>
    </View>
);
};

export default DriverOptionsScreen;