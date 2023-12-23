import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slice/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const user = useSelector(selectUser);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placekitten.com/300/300' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoItem}>
          <Icon name="email" size={24} color="#2196f3" />
          <Text style={styles.infoText}>{user.email}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Icon name="phone" size={24} color="#4caf50" />
          <Text style={styles.infoText}>+91 8294579845</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Icon name="map-marker" size={24} color="#ffc107" />
          <Text style={styles.infoText}>City, India</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fafafa',
  },
  header: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#2196f3',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#fff',
  },
  username: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    padding: 30,
    // backgroundColor: '#f0f0f0'
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
  },
});

export default ProfileScreen;
