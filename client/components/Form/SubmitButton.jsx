import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const SubmitButton = ({handleSubmit, btnTitle, loading,color}) => {
  return (
    <TouchableOpacity onPress={handleSubmit} style={tw`bg-${color} h-12 rounded-lg mt-2 mx-auto px-12`}>
      <Text style={tw`text-white font-bold mx-auto my-auto text-xl`}>
        {loading ? "Spinner" : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
