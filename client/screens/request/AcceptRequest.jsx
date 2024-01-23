// src/RequestList.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dummyData = [
  { id: 1, name: 'John Doe', category: 'General', time: '10:00 AM' },
  { id: 2, name: 'Jane Smith', category: 'Urgent', time: '12:30 PM' },
  { id: 3, name: 'Bob Johnson', category: 'Emergency', time: '3:45 PM' },
  // Add more dummy data as needed
];

const RequestItem = ({ item, onAccept, onReject }) => {
  return (
    <View style={styles.item}>
      <View style={styles.infoColumn}>
        <Text style={styles.boldText}>Name: {item.name}</Text>
        <Text style={styles.infoText}>Category: {item.category}</Text>
        <Text style={styles.infoText}>Time: {item.time}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => onAccept(item.id)}>
        <Icon name="check" size={34} color="#ffffff" />
        <Text style={styles.iconLabel}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton} onPress={() => onReject(item.id)}>
        <Icon name="close" size={34} color="#ffffff"/>
        <Text style={styles.iconLabel}>Reject</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const RequestList = () => {
  const [requests, setRequests] = useState(dummyData);

  const handleAccept = (requestId) => {
    // Handle accept logic with dummy data
    console.log(`Accept request with id: ${requestId}`);
  };

  const handleReject = (requestId) => {
    // Handle reject logic with dummy data
    console.log(`Reject request with id: ${requestId}`);
  };

  const renderItem = ({ item }) => (
    <RequestItem
      item={item}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
    shadowOffset: { width: 0, height: 1 },
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
    shadowOffset: { width: 0, height: 1 },
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
    shadowOffset: { width: 0, height: 1 },
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

export default RequestList;