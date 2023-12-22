import React, { useState } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const categoryIconMap = new Map([
  ['Work', { color: '#FF2442', icon: 'home' }],
  ['Shopping', { color: '#FFB830', icon: 'shopping-bag' }],
  ['Education', { color: '#AC0D0D', icon: 'graduation-cap' }],
  ['Movie', { color: '#3DB2FF', icon: 'film' }],
  ['None', { color: '#000', icon: 'circle' }],
]);

const DriverCard = ({name, destination, seats, date, time, category}) => {
  const { color, icon } = categoryIconMap.get(category);

  const getIconComponent = () => {
    switch (icon) {
      case 'shopping-bag':
        return <FontAwesome name={icon} size={24} color="white" />;
      case 'home':
        return <AntDesign name={icon} size={24} color="white" />;
      case 'graduation-cap':
        return <FontAwesome name={icon} size={26} color="white" />;
      case 'film':
        return <FontAwesome name={icon} size={24} color="white" />;
      default:
        return <FontAwesome name={icon} size={24} color="white" />;
    }
  };

  return (
    <View style={tw`mt-2 mx-2 p-4 bg-white shadow-md rounded-lg flex-row items-center`}>
      <View style={[tw`bg-blue-500 rounded-full p-3 mr-3`, { backgroundColor: color }]}>
        {getIconComponent()}
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-xl font-bold`}>{name}</Text>
        <Text style={tw`text-gray-600`}>{destination}</Text>
      </View>
      <View style={tw`flex-row mt-3`}>
        <View style={tw`flex items-center mr-4`}>
          <Text style={{ fontWeight: 'bold' }}>Seats</Text>
          <Text style={{ color, fontWeight: 'bold' }}>{seats}</Text>
        </View>
        <View style={tw`flex items-center`}>
          <Text style={tw`font-bold`}>Date</Text>
          <Text style={tw`text-gray-600 ml-2`}>{date}, {time}</Text>
        </View>
      </View>
    </View>
  );
};

export default DriverCard;