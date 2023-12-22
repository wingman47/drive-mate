import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import tw from 'twrnc';
import DriverCard from './DriverCard';
import {
  selectCategory,
  selectSameDestination,
} from '../../slice/availableDriversSlice';
import {useSelector} from 'react-redux';
import {log} from 'console';

const DriverOptions = () => {
  const sameDestination = useSelector(selectSameDestination);
  const sameCategory = useSelector(selectCategory);
  return (
    <ScrollView>
      <Text style={tw`text-center py-5 text-xl font-semibold text-stone-700`}>
        Choose Your Driver
      </Text>
      {/* idr redux se driver ke options ko utha ke unpe loop kar dunga aur prop pass kar dunga */}
      <View>{sameDestination ? <>{sameDestination}</> : <></>}</View>
      {sameDestination ? (
        sameDestination.map(driver => {
          const t = driver.preferredDateTime;
          console.log('driver information ', driver);
          console.log(driver._id);
          console.log(driver.user.name);
          console.log(driver.destinationAddress);
          console.log(driver.numberOfSeats);
          console.log(driver.category);
          const separated = t.split('T');
          const date = separated[0];
          const time = separated[1].slice(0, -8);
          console.log(date);
          console.log(time);
          return (
            <DriverCard
              key={driver._id}
              name={driver.user.name}
              destination={driver.destinationAddress}
              seats={driver.numberOfSeats}
              date={date}
              time={time}
              category={driver.category}
            />
          );
        })
      ) : (
        <></>
      )}
      <View>{sameCategory ? <>{sameCategory}</> : <></>}</View>
      {sameCategory ? (
        sameCategory.map(driver => {
          const t = driver.preferredDateTime;

          const separated = t.split('T');
          const date = separated[0];
          const time = separated[1].slice(0, -8);
          return (
            <DriverCard
              key={driver._id}
              name={driver.user.name}
              destination={driver.destinationAddress}
              seats={driver.numberOfSeats}
              date={date}
              time={time}
              category={driver.category}
            />
          );
        })
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default DriverOptions;
