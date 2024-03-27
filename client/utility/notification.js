import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import ipconfig from '../ipconfig';

export const notificationListener = () => {
  // For gackground state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state: ',
      remoteMessage.notification,
    );
  });

  // For opened sate.
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export const getDeviceToken = async ({userId, token}) => {
  await messaging().registerDeviceForRemoteMessages();
  const deviceToken = await messaging().getToken();

  await axios.post(
    `${ipconfig}/api/v1/auth/registertoken`,
    {userId, deviceToken},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  console.log('================TOKEN=================');
  console.log(token);
  console.log(typeof token);
  console.log('======================================');
};
// save the token to the db

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
