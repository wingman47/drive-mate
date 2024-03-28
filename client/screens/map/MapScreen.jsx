import {StyleSheet, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../../components/Map/Map';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigateCard from '../../components/Map/NavigateCard';
import RideOptionsCard from '../../components/Map/RideOptionsCard';
import DriverOptions from '../../components/Rider/DriverOptions';
import {Text} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GOOGLE_MAPS_APIkEY from '../../config/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
} from '../../slice/navSlice';
import {useNavigation} from '@react-navigation/native';

const MapScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2 bg-white rounded-t-xl shadow-xl`}>
        <Text style={tw`font-bold mt-4 mx-auto text-xl text-black`}>
          Enter your location
        </Text>
        <GooglePlacesAutocomplete
          placeholder='Where From'
          value={origin ? origin.description : undefined}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              }),
            );
            dispatch(setDestination(null));
          }}
          styles={toInputBoxStyles}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          debounce={400}
          style={tw`my-8 z-50`}
          query={{
            key: GOOGLE_MAPS_APIkEY,
            language: 'en',
          }}
          onFail={error => console.error(error)}
        />
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          debounce={400}
          styles={toInputBoxStyles}
          nearbyPlacesAPI="GooglePlacesSearch"
          query={{
            key: GOOGLE_MAPS_APIkEY,
            language: 'en',
          }}
          style={tw`mx-4`}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              }),
            );
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          returnKeyType={'search'}
          onFail={error => console.error(error)}
        />
        <RideOptionsCard />
        {/* <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
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
        </Stack.Navigator> */}
      </View>
    </View>
  );
};

export default MapScreen;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
