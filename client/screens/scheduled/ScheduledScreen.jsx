import Schedule from '../../components/Scheduled/Schedule';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '../../slice/authSlice';
import ipconfig from '../../ipconfig';

export default ScheduledScreen = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const fetchSchedules = async () => {
    try {
      const {data} = await axios.post(`${ipconfig}/api/v1/auth/schedules`, {
        userId: user._id,
      });
      console.log('scheduled data', data.data);
      if (data) {
        setSchedules(data.data);
        setLoading(false); // Set loading to true when fetch is successful
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      // Handle error as needed
      setLoading(true); // Set loading to true even on error
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <View>
      {!loading &&
        schedules.map(schedule => {
          return (
            <Schedule
              key={schedule._id}
              destination={schedule.destination}
              status={schedule.status}
              preferredDateTime={schedule.preferredDateTime}
            />
          );
        })}
    </View>
  );
};
