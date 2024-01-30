import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {capitalizeFirstLetter} from '../Scheduled/Schedule';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import ipconfig from '../../ipconfig';
import {useNavigation} from '@react-navigation/native';

const RequestCard = ({
  name,
  category,
  preferredDateTime,
  queueDriverId,
  requestId,
  riderId,
}) => {
  const navigation = useNavigation();
  const acceptRequest = async () => { 
    try {
      const data = await axios.patch(`${ipconfig}/api/driver/acceptrequest`, {
        queueDriverId,
        requestId,
        riderId,
      });
      console.log('Data Recieved', data.data);
      navigation.navigate('ConfirmationScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Request again');
    }
  };

  const seprated = preferredDateTime.split('T');
  const date = seprated[0];
  const time = seprated[1].slice(0, -8);
  return (
    <View style={styles.item}>
      <View style={styles.infoColumn}>
        <Text style={styles.boldText}>Name: {name}</Text>
        <Text style={styles.infoText}>Category: {category}</Text>
        <Text style={styles.infoText}>Time: {`${time} | ${date}`}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => acceptRequest()}>
          <Icon name="check" size={34} color="#ffffff" />
          <Text style={styles.iconLabel}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          //   onPress={() => onReject(id)}
        >
          <Icon name="close" size={34} color="#ffffff" />
          <Text style={styles.iconLabel}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    paddingTop: 40,
    paddingHorizontal: 6,
    backgroundColor: '#13161F',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingVertical: 20,
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  infoColumn: {
    flexDirection: 'column',
  },
  infoText: {
    color: '#333333',
    marginVertical: 5,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
  },
  buttonColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#219653',
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
    alignItems: 'center',
    shadowColor: '#78d08c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  rejectButton: {
    backgroundColor: '#d32f2f',
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
    marginLeft: 6,
    alignItems: 'center',
    shadowColor: '#f7695c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  iconLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
    opacity: 1,
    textTransform: 'uppercase',
  },
});

export default RequestCard;
