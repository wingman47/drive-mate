import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import tw from 'twrnc';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../../slice/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import GOOGLE_MAPS_APIkEY from '../../config';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    const timeoutId = setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [origin, destination]);

  // Calculating the travel time

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json
      ?destinations=${destination.description}
      &origins=${origin.description}
      &key=${GOOGLE_MAPS_APIkEY}`)
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elemets[0]));
          console.log(data);
        });
    };
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: origin?.location?.lat || 28.7041,
          longitude: origin?.location?.lng || 77.1025,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}>
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIkEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin?.location?.lat,
              longitude: origin?.location?.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination?.location?.lat,
              longitude: destination?.location?.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
