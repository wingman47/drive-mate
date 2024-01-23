import Schedule from '../../components/Scheduled/Schedule';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '../../slice/authSlice';

export default ScheduledScreen = () => {
  const [schedules, setSchedules] = useState([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const user = useSelector(selectUser);
  const fetchSchedules = async () => {
    try {
      const {data} = await axios.get('/api/v1/auth/schedules', {
        userId: user._id,
      });
      if (data) {
        setSchedules(data);
        setFetchCompleted(true); // Set fetchCompleted to true when fetch is successful
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      // Handle error as needed
      setFetchCompleted(true); // Set fetchCompleted to true even on error
    }
  };
  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <View>
      {fetchCompleted &&
        schedules.map(schedule => (
          <Schedule
            destination={schedule.destination}
            status={schedule.status}
            preferredDateTime={schedule.preferredDateTime}
          />
        ))}
    </View>
  );
};
