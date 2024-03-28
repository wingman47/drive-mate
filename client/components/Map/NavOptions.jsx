import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../../slice/navSlice';
const tripPlanner = require('../../assets/travelPlanner.png');
const rideCar = require('../../assets/getRideCar.jpg');

// const newLink = "https://www.pngall.com/wp-content/uploads/8/Vector-Travel-PNG-Free-Download.png"

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: rideCar,
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Plan Trip',
    image: tripPlanner,
    screen: 'Launchingsoon',
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pt-4 pb-8 bg-gray-200 m-2 w-40 mt-16 rounded-md`}>
          <View>
            <Image
              style={{width: 120, height: 120, resizeMode: 'contain'}}
              source={item.image}
            />
            <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-slate-950 rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
