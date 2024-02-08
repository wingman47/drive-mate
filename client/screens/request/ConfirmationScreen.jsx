import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


// Use same component for rider and driver with different massages.

const ConfirmationScreen = ({ route }) => {
  const { heading,msg } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.confirmationCard}>
        <Icon name="check-circle" style={styles.successIcon} />
        <Text style={styles.successText}>{heading}</Text>
        <Text style={styles.waitingText}>{msg}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13161F',
  },
  confirmationCard: {
    width: 300,
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#2C3039',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 96,
    color: '#4CAF50', 
    marginBottom: 24,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: 16,
  },
  waitingText: {
    fontSize: 18,
    color: '#B0B3C1',
    textAlign: 'center',
  },
});

export default ConfirmationScreen;