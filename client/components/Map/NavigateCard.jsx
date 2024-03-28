import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GOOGLE_MAPS_APIkEY from '../../config/index';
import {setDestination} from '../../slice/navSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import NavFavourites from './NavFavourites';
import {Icon} from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl font-semibold text-stone-700`}>
        Select Destination
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink rounded-md`}>
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
            navigation.navigate('RideOptionsCard');
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          returnKeyType={'search'}
          onFail={error => console.error(error)}
        />
        {/* <NavFavourites /> */}
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          style={tw`flex-row justify-between bg-blue-600 w-24 px-4 py-3 rounded-full`}
          handleSubmit={() => navigation.navigate('RiderForm')}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white px-2 text-center`}>Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row justify-between bg-gray-100 w-24 px-4 py-3 rounded-full`}
          handleSubmit={() => navigation.navigate('DriverForm')}>
          <Icon name="car" type="ionicon" color="black" size={16} />
          <Text style={tw`text-center`}>Drive</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

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
