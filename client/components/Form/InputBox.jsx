import React from 'react';
import {View, Text, TextInput, Keyboard} from 'react-native';
import tw from 'twrnc';

const InputBox= ({
  inputTitle,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  value,
  setValue,
  icon
}) => {
  return (
    <View>
      <Text style={tw`py-2 text-xl font-bold text-black`}>{inputTitle}</Text>
      <TextInput
        style={tw`bg-gray-100 border-b-2 text-gray-900 text-sm rounded-t-lg w-full p-2.5`}
        placeholder={placeholder}
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

export default InputBox;
