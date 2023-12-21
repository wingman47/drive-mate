import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>User name</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.infoText}>example@gmail.com</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.infoText}>+91 8294579845</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.infoText}>City, Country</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#007bff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  username: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    padding: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#666'
  }
})

export default ProfileScreen;