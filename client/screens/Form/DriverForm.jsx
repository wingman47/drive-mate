import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from '@rneui/themed';
import Time from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import tw from 'twrnc';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {getToken, selectUser} from '../../slice/authSlice';
import {selectDestination, selectOrigin} from '../../slice/navSlice';
import axios from 'axios';
import ipconfig from '../../ipconfig';
import {useNavigation} from '@react-navigation/native';

const DriverForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [formattedDateAndTime, setFormattedDateAndTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const navigation = useNavigation();
  const [res, setRes] = useState({});
  const token = useSelector(getToken);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!numberOfSeats || !selectedCategory || !formattedDateAndTime) {
        Alert.alert('Press Again To confirm !');
        setLoading(false);
        return;
      }
      const savedDriver = await axios.post(
        `${ipconfig}/api/driver/queue/createdriver`,
        {
          user: user._id,
          origin: {
            type: 'Point',
            coordinates: [origin.location.lat, origin.location.lng],
          },
          destination: {
            type: 'Point',
            coordinates: [destination.location.lat, destination.location.lng],
          },
          category: selectedCategory,
          preferredDateTime: formattedDateAndTime,
          numberOfSeats,
          originAddress: origin.description,
          destinationAddress: destination.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const {data} = savedDriver;
      if (data.user) {
        console.log('Coming data: ', data);
        setLoading(false);
        navigation.navigate('DriverCreated', {
          destination: data.destinationAddress,
          seats: data.numberOfSeats,
          dateTime: data.preferredDateTime,
        });
      } else {
        setLoading(false);
        Alert.alert('Enter form again');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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

  const handleTimeAndDateConfirm = async (time, date) => {
    return new Promise(resolve => {
      hideTimePicker();
      const formattedDateAndTime = `${date}T${time}Z`;
      setFormattedDateAndTime(formattedDateAndTime);
      resolve(formattedDateAndTime);
    });
  };

  const categories = [
    {label: 'Work', value: 'Work'},
    {label: 'Shopping', value: 'Shopping'},
    {label: 'Education', value: 'Education'},
    {label: 'Movie', value: 'Movie'},
    {label: 'None', value: 'None'},
  ];

  return (
    <KeyboardAwareScrollView>
      <View style={tw`flex-1`}>
        {loading ? (
          <View style={tw`flex-1 justify-center`}>
            <ActivityIndicator size="large" color="#00008b" />
          </View>
        ) : (
          <View style={[styles.container, tw`m-4 mt-16 rounded-lg bg-white`]}>
            <Text style={tw`text-blue-600 font-bold text-center my-4 text-4xl`}>
              Create a Drive
            </Text>
            <Text style={styles.label}>Number of Seats</Text>
            <TextInput
              style={styles.inputContainer}
              value={numberOfSeats}
              onChangeText={text =>
                setNumberOfSeats(text.replace(/[^0-9]/g, ''))
              }
              keyboardType="numeric"
            />

            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={showDatePicker}>
              <Icon
                style={tw`p-2 bg-blue-600 rounded-full w-10`}
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
                style={tw`p-2 bg-blue-600 rounded-full`}
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
              style={[styles.button, tw`bg-blue-600 font-bold py-4`]}
              onPress={async () => {
                await handleTimeAndDateConfirm(time, date);
                handleSubmit();
              }}>
              <Text style={[styles.buttonText, tw`font-bold text-xl`]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginTop: 8,
    fontWeight: '600',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
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
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DriverForm;
