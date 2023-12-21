import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from '@rneui/themed';
import Time from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import tw from 'twrnc';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {selectUser} from '../../slice/authSlice';
import {selectDestination, selectOrigin} from '../../slice/navSlice';

const DriverForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [formattedDateAndTime, setFormattedDateAndTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // ! TODO: redux
    try {
      if (!numberOfSeats || !selectedCategory || !formattedDateAndTime) {
        Alert.alert('Please fill the fields');
        return;
      }
      const {savedDriver} = await axios.post(
        'http://192.168.1.15:8080/api/driver/queue/createdriver',
        {
          userId: selectUser._id,
          origin: selectOrigin,
          destination: selectDestination,
          category,
          preferredDateTime: formattedDateAndTime,
          numberOfSeats,
        },
      );
      // dispatch();
    } catch (error) {
      console.log(error);
    }
  };

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
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  const handleTimeAndDateConfirm = selectedTime => {
    hideTimePicker();
    const formattedTime = moment.utc(selectedTime).format('HH:mm:ss');
    const combinedDateTime = moment
      .utc(`${date}T${formattedTime}`)
      .toISOString();
    const formattedDateAndTime = combinedDateTime.slice(0, -5) + 'Z';
    setFormattedDateAndTime(formattedDateAndTime);
  };

  const categories = [
    {label: 'None', value: 'none'},
    {label: 'Work', value: 'work'},
    {label: 'Shopping', value: 'shopping'},
    {label: 'Education', value: 'education'},
    {label: 'Movie', value: 'movie'},
  ];

  return (
    <KeyboardAwareScrollView>
      <View style={[styles.container, tw`m-4 my-32 rounded-lg bg-white`]}>
        <Text style={tw`text-red-600 font-bold text-center my-4 text-4xl`}>
          Create a Ride
        </Text>
        <Text style={styles.label}>Number of Seats</Text>
        <TextInput
          style={styles.inputContainer}
          value={numberOfSeats}
          onChangeText={text => setNumberOfSeats(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showDatePicker}>
          <Icon
            style={tw`p-2 bg-red-600 rounded-full w-10`}
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
            style={tw`p-2 bg-red-600 rounded-full`}
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
          style={[styles.button, tw`bg-red-600 font-bold py-4`]}
          onPress={() => {
            console.log('Form submitted:', {date, time, selectedCategory});
            handleTimeAndDateConfirm();
            handleSubmit();
          }}>
          <Text style={[styles.buttonText, tw`font-bold text-xl`]}>Submit</Text>
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
    borderColor: 'red',
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

export default DriverForm;
