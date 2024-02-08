import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LaunchingSoon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Launching Soon!</Text>
      <Text style={styles.description}>Trip planner will be available soon. Stay tuned!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LaunchingSoon;
