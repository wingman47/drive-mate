import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSameDestination,
  selectCategory,
  selectRadius,
  setSameCategory,
  setSameDestination,
} from '../../slice/availableDriversSlice';
import {selectDestination} from '../../slice/navSlice';
import axios from 'axios';
import ipconfig from '../../ipconfig';
import {getToken} from '../../slice/authSlice';

const RiderForm = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [formattedDateAndTime, setFormattedDateAndTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log('formattedDateAndTime ', formattedDateAndTime);
      console.log(destination.location.lat, destination.location.lng);
      if (!selectedCategory || !formattedDateAndTime) {
        Alert.alert('Press Again to Confirm !');
        setLoading(false);
        return;
      }
      console.log('data sent ', {
        destination: {
          type: 'Point',
          coordinates: [destination.location.lat, destination.location.lng],
        },
        category: selectedCategory,
        preferredDateTime: formattedDateAndTime,
      });
      const response = await axios.post(
        `${ipconfig}/api/rider/finddrivers`,
        {
          destination: {
            type: 'Point',
            coordinates: [destination.location.lat, destination.location.lng],
          },
          category: selectedCategory,
          preferredDateTime: formattedDateAndTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const {data} = response;
      console.log('response received ', data.data.matchesDestination);
      if (data.status === 'success') {
        dispatch(setSameDestination(data.data.matchesDestination));
        dispatch(setSameCategory(data.data.matchesCategory));
        navigation.navigate('DriverOptions');
      } else {
        console.log('No matching drivers found.');
        navigation.navigate('NoDriverScreen');
      }

      setLoading(false); // Stop loading
      // ! TODO: radius
    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading
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
    console.log(date);
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

  const handleTimeAndDateConfirm = async (time, date) => {
    return new Promise(resolve => {
      hideTimePicker();
      const formattedDateAndTime = `${date}T${time}Z`;
      console.log(formattedDateAndTime);
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
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#00008b" />
          </View>
        ) : (
          <View style={[styles.container, tw`m-4 my-32 rounded-lg bg-white`]}>
            <Text
              style={tw`text-green-600 font-bold text-center my-4 text-4xl`}>
              Find a Ride
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
    marginTop: 10,
    fontWeight: '600',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
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
    backgroundColor: '#ED3B3B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RiderForm;
