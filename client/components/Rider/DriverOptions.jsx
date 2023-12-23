import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import tw from 'twrnc';
import DriverCard from './DriverCard';
import {
  selectCategory,
  selectSameDestination,
} from '../../slice/availableDriversSlice';
import {useSelector} from 'react-redux';

const renderDriverCards = drivers => {
  return drivers.map(driver => {
    console.log(driver);
    const t = driver.preferredDateTime;
    const seprated = t.split('T');
    const date = seprated[0];
    const time = seprated[1].slice(0, -8);

    const address = driver.destinationAddress;
    let temp = address.split(' ');
    let newAdd = ' ';
    for (let i = 0; i < 3; i++) {
      newAdd = newAdd + temp[i] + ' ';
    }

    return (
      <DriverCard
        key={driver._id}
        name={driver.user.name}
        destination={newAdd}
        seats={driver.numberOfSeats}
        date={date}
        time={time}
        category={driver.category}
      />
    );
  });
};

const DriverOptions = () => {
  const sameDestination = useSelector(selectSameDestination);
  const sameCategory = useSelector(selectCategory);

  return (
    <View style={tw`p-2 `}>
      <Text
        style={tw`text-center text-xl my-3 font-semibold text-black bg-blue-200 p-3 mx-10 rounded-lg`}>
        Choose Your Drive Mate
      </Text>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {/* Render DriverCards for sameDestination */}
        {sameDestination && renderDriverCards(sameDestination)}

        {/* Render DriverCards for sameCategory */}
        {sameCategory && renderDriverCards(sameCategory)}
      </ScrollView>
    </View>
  );
};

export default DriverOptions;
