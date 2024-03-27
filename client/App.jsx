import {store} from './store';
import {Provider} from 'react-redux';
import Navigation from './screens/navigation/Navigation';
import { getToken, notificationListener, requestUserPermission } from './utility/notification';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const App = () => {
   useEffect(() => {
     const unsubscribe = messaging().onMessage(async remoteMessage => {
       Alert.alert('Data!', JSON.stringify(remoteMessage));
     });
     return unsubscribe;
   }, []);

   useEffect(() => {
     requestUserPermission();
     notificationListener();
     getToken();
   });
   
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
