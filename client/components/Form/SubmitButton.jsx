import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const SubmitButton = ({handleSubmit, btnTitle, loading}) => {
  return (
    <TouchableOpacity onPress={handleSubmit} style={tw`bg-slate-900 h-12 rounded-lg mt-2`}>
      <Text style={tw`text-white font-bold mx-auto my-auto text-xl`}>
        {loading ? "Spinner" : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
