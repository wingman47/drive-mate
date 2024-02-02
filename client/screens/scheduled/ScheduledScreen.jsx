import Schedule from '../../components/Scheduled/Schedule';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { selectUser } from '../../slice/authSlice';
import ipconfig from '../../ipconfig';
import tw from 'twrnc'

const ScheduledScreen = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const fetchSchedules = async () => {
    try {
      const { data } = await axios.post(`${ipconfig}/api/v1/auth/schedules`, {
        userId: user._id,
      });
      console.log('scheduled data', data.data);
      if (data) {
        setSchedules(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setLoading(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Run the fetchSchedules function every time the screen comes into focus
      fetchSchedules();
    }, [])
  );

  return (
    <View style={tw`flex-1`}>
      <View>
        { loading ?  <View style={{flex: 1,
        justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#00008b" />
     </View> :
          <ScrollView>
            {
              schedules.map(schedule => (
                <Schedule
                  key={schedule._id}
                  destination={schedule.destination}
                  status={schedule.status}
                  preferredDateTime={schedule.preferredDateTime}
                />
              ))
            }
            </ScrollView>}
      </View>
    </View>
  );
};

export default ScheduledScreen;