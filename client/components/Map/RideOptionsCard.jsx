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
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

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
        {/* <TouchableOpacity style={tw`absolute top- z-50 3 left-5 rounded-full`}>
                <Icon name="chevron-left" type="fontawesome" 
                onPress={()=>navigation.navigate('NavigateCard')}/>
            </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.Text}</Text>
        </View>
        <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item: { id, title, multiplier, image }, item }) => (
        <TouchableOpacity
            style={tw`flex-row justify-between m-2 items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
            onPress={() => setSelected(item)}
        >
            <Image
                style={{
                    width: 80,
                    height: 70,
                    resizeMode: "contain",
                }}
                source={{
                    uri: image,
                }}
            />
            <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-xl`}>$239</Text>
        </TouchableOpacity>
    )}
/>
    <View>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 rounded-lg ${!selected && "bg-gray-300"}`}>
            <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
