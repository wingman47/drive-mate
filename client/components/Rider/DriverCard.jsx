import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ipconfig from '../../ipconfig';
import {useNavigation} from '@react-navigation/native';
import {getToken, selectUser} from '../../slice/authSlice';
import {useSelector} from 'react-redux';
import axios from 'axios';

const categoryIconMap = new Map([
  ['Work', {color: '#FF2442', icon: 'home'}],
  ['Shopping', {color: '#FFB830', icon: 'shopping-bag'}],
  ['Education', {color: '#A084E8', icon: 'graduation-cap'}],
  ['Movie', {color: '#3DB2FF', icon: 'film'}],
  ['None', {color: '#000', icon: 'circle'}],
]);

const DriverCard = ({
  name,
  destination,
  seats,
  date,
  time,
  category,
  driverId,
  preferredDateTime,
}) => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const token = useSelector(getToken);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${ipconfig}/api/rider/requestdriver`,
        {
          riderId: user._id,
          driverId: driverId,
          preferredDateTime: preferredDateTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response) {
        navigation.navigate('ConfirmationScreen', {
          heading: 'Request Send',
          msg: 'Waiting for the driver to accept',
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Request again');
    }
  };

  const {color, icon} = categoryIconMap.get(category);

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
    <TouchableOpacity
      style={tw`mt-2 mx-2 p-4 bg-white shadow-md rounded-lg flex-row items-center`}
      onPress={handleSubmit}>
      <View
        style={[
          tw`bg-blue-500 rounded-full p-3 mr-3`,
          {backgroundColor: color},
        ]}>
        {getIconComponent()}
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-xl font-bold`}>{name}</Text>
        <Text style={tw`text-gray-600`}>{destination}</Text>
      </View>
      <View style={tw`flex-row mt-3`}>
        <View style={tw`flex items-center mr-4`}>
          <Text style={{fontWeight: 'bold'}}>Seats</Text>
          <Text style={{color, fontWeight: 'bold'}}>{seats}</Text>
        </View>
        <View style={tw`flex items-center`}>
          <Text style={tw`font-bold`}>Date</Text>
          <Text style={tw`text-gray-600 ml-2`}>
            {date}, {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
