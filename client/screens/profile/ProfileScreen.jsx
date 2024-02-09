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
const avatar = require('../../assets/avatar.png');

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={avatar} style={styles.profileImage} />
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
        <SubmitButton
          // style={tw`bg-green-600`}
          btnTitle={'Logout'}
          handleSubmit={() => {
            dispatch(setLogout());
            dispatch(setOrigin(null));
            dispatch(setDestination(null));
            dispatch(setTravelTimeInformation(null));
            dispatch(setSameDestination(null));
            dispatch(setSameCategory(null));
            dispatch(setRadius(null));
            AsyncStorage.removeItem('userInfo');
          }}
          loading={false}
          color={'blue-600'}
        />
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderRadius: 30,
    height: 400,
    // marginVertical: 20,
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
