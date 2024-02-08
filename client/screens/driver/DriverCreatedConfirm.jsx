import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

function formetDateTimeAndAddress(preferredDateTime,destinationAddress){
  const t = preferredDateTime;
  const seprated = t.split('T');
  const date = seprated[0];
  const time = seprated[1].slice(0, -8);
  const address = destinationAddress;
  let temp = address.split(' ');
  let newAdd = ' ';
  for (let i = 0; i <= 3; i++) {
    newAdd = newAdd + temp[i] + ' ';
  }
  return {date,time,newAdd};
}

  const DriverCreatedConfirm = ({ route }) => {
    console.log(route.params);
    const {destination,seats,dateTime} = route.params;

    const {date,time,newAdd: address} = formetDateTimeAndAddress(dateTime,destination)
    return (
      <View style={styles.container}>
        <View style={[styles.cardContainer, tw`mt-8 text-center`]}>
        <View style={[styles.header,tw`my-4`]}>
          <Text style={tw`text-2xl my-4 font-bold text-white`}>Your Request is Successful!</Text>
        </View>
          <View style={styles.card}>
            <View style={[styles.cardHeader,tw`mx-auto`]}>
              <Icon name="check" size={24} color="#28a745" />
              <Text style={tw`text-2xl font-bold ml-2`}>Ride created</Text>
            </View>

            <Text style={tw`text-gray-600 mb-4 mx-auto`}>{address}</Text>

            <View style={[styles.infoRow,tw`mx-6`]}>
              <View style={tw`flex items-center`}>
                <Icon name="users" size={20} color="#333" /> 
                <Text style={styles.infoLabel}>Seats</Text>
                <Text style={styles.infoText}>{seats}</Text>
              </View>

              <View style={tw`flex items-center`}>
                <Icon name="calendar" size={20} color="#333" />
                <Text style={styles.infoLabel}>{date}</Text>
                <Text style={styles.infoText}>{time}</Text>
              </View>
            </View>

            <TouchableOpacity style={[tw`bg-green-500 rounded-lg p-3 mt-4`, styles.button]}>
              <Text style={tw`text-white mx-auto font-bold text-lg`}>Yo Boy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  button: {
    marginTop: 30,
  },
});

export default DriverCreatedConfirm;