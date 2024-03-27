import {View, ActivityIndicator} from 'react-native';
import RequestCard from '../../components/Requests/RequestCard';
import axios from 'axios';
import tw from 'twrnc';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getToken, selectUser} from '../../slice/authSlice';
import ipconfig from '../../ipconfig';

export const RequestItem = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const token = useSelector(getToken);
  
  const fetchRequests = async () => {
    try {
      const {data} = await axios.post(
        `${ipconfig}/api/v1/auth/incoming-req`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Requests data', data.data);
      if (data) {
        setRequests(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setLoading(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRequests();
    }, []),
  );

  return (
    <View style={tw`flex-1`}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        requests.map(request => (
          <RequestCard
            key={request._id}
            name={request.riderName}
            category={request.category}
            preferredDateTime={request.preferredDateTime}
            queueDriverId={request.queueDriverId}
            requestId={request._id}
            riderId={request.requestedByRider}
          />
        ))
      )}
    </View>
  );
};

export default RequestItem;
