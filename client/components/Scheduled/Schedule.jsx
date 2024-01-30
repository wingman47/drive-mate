import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const Schedule = ({preferredDateTime, destination, status}) => {
  const seprated = preferredDateTime.split('T');
  const date = seprated[0];
  const time = seprated[1].slice(0, -8);
  console.log(destination);

  return (
    <>
      <View style={tw`bg-white mx-4 my-4 rounded-md shadow-xl`}>
        <View style={tw`px-5 py-4`}>
          <Text style={tw`text-sm font-normal text-black`}>{date}</Text>
          <View style={tw`flex-row items-center`}>
            <MaterialCommunityIcons name="car-side" size={35} color="green" />
            <Text style={tw`text-green-800 font-normal text-lg ml-2`}>
              {'destination'}
            </Text>
          </View>
        </View>
        <View style={tw`py-3 border-t border-slate-400 px-5`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`text-green-800 font-light text-6xl`}>{time}</Text>
            <Text style={tw`text-green-800 font-light text-4xl`}>AM</Text>
          </View>
        </View>
        <View style={tw`bg-green-800 h-14 px-5 rounded-b-md`}>
          <Text style={tw`text-xl font-normal my-auto text-white`}>
            {capitalizeFirstLetter(status)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Schedule;
