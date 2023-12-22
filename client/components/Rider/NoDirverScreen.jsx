import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const NoDriverScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://www.clipartmax.com/png/full/318-3180067_free-download-car-crash-flat-design-clipart-car-traffic-drinking-and-driving.png"
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.message}>No drivers available nearby.</Text>
      <Text style={styles.subMessage}>We're looking for drivers, try again soon!</Text>
      <View style={tw`p-8 flex justify-center items-center`}>
        <TouchableOpacity
          style={tw`m-4 bg-green-500 rounded-lg p-3`}
          onPress={() => console.log("Schedule for Later")}
        >
          <Text style={tw`text-white font-bold text-lg`}>Schedule for Later</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`m-4 bg-gray-200 rounded-lg p-3`}
          onPress={() => console.log("Contact Support")}
        >
          <Text style={tw`text-gray-700 font-bold text-lg`}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoDriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 100,
    borderRadius: 15,
    tintColor: '#a0a0a0',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subMessage: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
});
