import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setLogout} from '../../slice/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubmitButton from '../../components/Form/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setDestination,
  setOrigin,
  setTravelTimeInformation,
} from '../../slice/navSlice';
import {
  setRadius,
  setSameCategory,
  setSameDestination,
} from '../../slice/availableDriversSlice';
import tw from 'twrnc';
import axios from 'axios';
import ipconfig from '../../ipconfig';
const avatar = require('../../assets/avatar.png');

const clearToken = async () => {
  await axios.post(
    `${ipconfig}/api/v1/auth/cleartoken`,
    {userId: response.data.user._id},
    {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
        'Content-Type': 'application/json',
      },
    },
  );
};
const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={avatar} style={styles.profileImage} />
        <Text style={styles.username}>{user.name}</Text>
      </View>

      <View style={[styles.infoContainer, tw`mx-4`]}>
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
        <View style={tw`mt-4`}>
          <SubmitButton
            btnTitle={'Logout'}
            handleSubmit={() => {
              dispatch(setLogout());
              dispatch(setOrigin(null));
              dispatch(setDestination(null));
              dispatch(setTravelTimeInformation(null));
              dispatch(setSameDestination(null));
              dispatch(setSameCategory(null));
              dispatch(setRadius(null));
              clearToken();
              AsyncStorage.removeItem('userInfo');
            }}
            loading={false}
            color={'red-600'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1035',
  },
  header: {
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#0F1035',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
  },
  username: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#fff',
  },
  infoContainer: {
    borderRadius: 20,
    padding: 44,
    backgroundColor: '#F5F7F8',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#333',
  },
});

export default ProfileScreen;
