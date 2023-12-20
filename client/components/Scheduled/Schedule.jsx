import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

const Schedule = () => {
  return (
    <View style={tw`bg-white mx-4 my-4 rounded-md`}>
      <View style={tw`px-5 py-4`}>
        <Text style={tw`text-sm font-base text-black`}>Fri, Nov 29</Text>
        <View style={tw`flex-row items-center`}>
          <MaterialCommunityIcons name="car-side" size={35} color="green" />
          <Text style={tw`text-green-800 font-base text-lg ml-2`}>
            Scuba Diving
          </Text>
        </View>
      </View>
      <View style={tw`py-3 border-t border-slate-400 px-5`}>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`text-green-800 font-light text-6xl`}>9:30</Text>
          <Text style={tw`text-green-800 font-light text-4xl`}>AM</Text>
        </View>
      </View>
      <View style={tw`bg-green-800 h-14 px-5 rounded-b-md`}>
        <Text style={tw`text-xl font-base my-auto text-white`}>Brian is driving</Text>
      </View>
    </View>
  );
};

export default Schedule;
