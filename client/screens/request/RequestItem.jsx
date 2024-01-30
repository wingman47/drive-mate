import {View} from 'react-native';
import RequestCard from '../../components/Requests/RequestCard';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../../slice/authSlice';
import ipconfig from '../../ipconfig';

export const RequestItem = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const fetchRequests = async () => {
    try {
      const {data} = await axios.post(`${ipconfig}/api/v1/auth/incoming-req`, {
        userId: user._id,
      });
      console.log('Requests data', data.data);
      if (data) {
        setRequests(data.data);
        setLoading(false); // Set loading to true when fetch is successful
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Handle error as needed
      setLoading(true); // Set loading to true even on error
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View>
      {!loading &&
        requests.map(request => {
          return (
            <RequestCard
              name="Hard Coded"
              category={request.category}
              preferredDateTime={request.preferredDateTime}
            />
          );
        })}
    </View>
  );
};

export default RequestItem;
