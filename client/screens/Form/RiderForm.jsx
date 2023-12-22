import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from '@rneui/themed';
import Time from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import tw from 'twrnc';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  selectSameDestination,
  selectCategory,
  selectRadius,
  setSameCategory,
  setSameDestination,
} from '../../slice/availableDriversSlice';
import {selectDestination} from '../../slice/navSlice';
import axios from 'axios';

const RiderForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [formattedDateAndTime, setFormattedDateAndTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const matchedByDestination = useSelector(selectDestination);
  const matchedByCategory = useSelector(selectCategory);
  const matchedByRadius = useSelector(selectRadius);
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  const handleSubmit = async () => {
    try {
      if (!selectedCategory || !formattedDateAndTime) {
        Alert.alert('Please fill the fields');
        return;
      }
      const {response} = await axios.post(`${ipconfig}/api/rider/joindriver`, {
        destination: {
          type: 'Point',
          coordinates: [destination.location.lat, destination.location.lng],
        },
        category: selectedCategory,
        preferredDateTime: formattedDateAndTime,
      });
      console.log('response recieved ', response);
      dispatch(setSameDestination(response.matchesDestination));
      dispatch(setSameCategory(response.matchesCategory));
      // ! TODO: radius
    } catch (error) {
      console.log(error);
    }
  };

  // Redirection to the Diver Options page.
  useEffect(() => {
    // ! Todo : no Diver found page
    if (!matchedByDestination && !matchedByCategory && !matchedByRadius) return;
    else navigation.navigate('Home');
  }, [matchedByDestination, matchedByCategory, matchedByRadius]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = selectedDate => {
    hideDatePicker();
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setDate(formattedDate);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = selectedTime => {
    hideTimePicker();
    const formattedTime = moment(selectedTime).format('HH:mm:ss');
    const t = formattedTime.split('.');
    setTime(t[0]);
    console.log(time);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  const handleTimeAndDateConfirm = async selectedTime => {
    return new Promise(resolve => {
      hideTimePicker();
      const formattedTime = moment.utc(selectedTime).format('HH:mm:ss');
      const combinedDateTime = moment
        .utc(`${date}T${formattedTime}`)
        .toISOString();
      const formattedDateAndTime = combinedDateTime.slice(0, -5) + 'Z';
      setFormattedDateAndTime(formattedDateAndTime);
      resolve(formattedDateAndTime);
    });
  };

  const categories = [
    {label: 'Work', value: 'work'},
    {label: 'Shopping', value: 'shopping'},
    {label: 'Education', value: 'education'},
    {label: 'Movie', value: 'movie'},
  ];

  return (
    <KeyboardAwareScrollView>
      <View style={[styles.container, tw`m-4 my-32 rounded-lg bg-white`]}>
        <Text style={tw`text-green-600 font-bold text-center my-4 text-4xl`}>
          Create a Ride
        </Text>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showDatePicker}>
          <Icon
            style={tw`p-2 bg-green-600 rounded-full w-10`}
            name="calendar"
            color="white"
            type="antdesign"
          />
          <Text style={styles.inputText}>{date || 'Select Date'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showTimePicker}>
          <Time
            style={tw`p-2 bg-green-600 rounded-full`}
            name="clockcircleo"
            color="white"
            size={24}
            type="antdesign"
          />
          <Text style={styles.inputText}>{time || 'Select Time'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        <Text style={styles.label}>Category</Text>
        <RNPickerSelect
          items={categories}
          onValueChange={handleCategoryChange}
          value={selectedCategory}
          placeholder={{label: 'Select a category', value: null}}
        />

        <TouchableOpacity
          style={[styles.button, tw`bg-green-600 font-bold py-4`]}
          onPress={async () => {
            console.log('Form submitted:', {date, time, selectedCategory});
            await handleTimeAndDateConfirm();
            handleSubmit();
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputText: {
    marginLeft: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ED3B3B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RiderForm;
