import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTravelTimeInformation} from '../../slice/navSlice';
import SubmitButton from '../Form/SubmitButton';

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    mutiplier: 1,
    image:
      'https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-67409.jpg?w=900&t=st=1702929471~exp=1702930071~hmac=6b4d0c220347835c91fa7e62d0b9fcfbfb023941683d153c731fb980546a1c2f',
  },
  {
    id: 'Uber-XL-123',
    title: 'Uber XL',
    mutiplier: 1.2,
    image:
      'https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-67409.jpg?w=900&t=st=1702929471~exp=1702930071~hmac=6b4d0c220347835c91fa7e62d0b9fcfbfb023941683d153c731fb980546a1c2f',
  },
  {
    id: 'Uber-LUX-123',
    title: 'Uber LUX',
    mutiplier: 1.8,
    image:
      'https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-67409.jpg?w=900&t=st=1702929471~exp=1702930071~hmac=6b4d0c220347835c91fa7e62d0b9fcfbfb023941683d153c731fb980546a1c2f',
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`m-6 p-6`}>
        <SubmitButton
          btnTitle={'Ride'}
          handleSubmit={() => navigation.navigate('RiderForm')}
          loading={false}
        />
        <SubmitButton
          btnTitle={'Drive'}
          handleSubmit={() => navigation.navigate('DriverForm')}
          loading={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
