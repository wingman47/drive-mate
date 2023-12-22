import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image source={{uri: "https://i.pinimg.com/originals/ae/d6/75/aed6756579d2b828d638964d89c107e9.gif"}} style={styles.logo} />
      <Text style={styles.loadingText}>Loading...</Text>
      <ActivityIndicator size="large" color="#4CAF50" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Text color
  },
  spinner: {
    marginTop: 20,
  },
});

export default Loader;
