import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../../components/Map/NavOptions';
import GOOGLE_MAPS_APIkEY from '../../config/index';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../../slice/navSlice';
import NavFavourites from '../../components/Map/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`h-full text-black`}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={tw`p-5`}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
            source={{
              uri: 'https://static.thenounproject.com/png/5356141-200.png',
            }}
          />
          <Text style={tw`text-black text-xl font-bold m-2`}>Drive Mate</Text>
          <GooglePlacesAutocomplete
            placeholder="Where From?"
            nearbyPlacesAPI="GooglePlacesSearch"
            minLength={2}
            onPress={(data,details = null) =>{
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
              }))
              dispatch(setDestination(null))
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            debounce={400}
            style={tw`my-8 z-50`}
            query={{
              key: GOOGLE_MAPS_APIkEY,
              language: 'en',
            }}
            onFail={(error) => console.error(error)}
          />
          <NavOptions/>
          <NavFavourites/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;