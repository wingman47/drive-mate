import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image source={{uri: "https://i.pinimg.com/originals/60/09/40/600940788e5bd17890ffc7978541a979.gif"}} style={styles.logo} />
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
