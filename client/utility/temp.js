import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  notificationListener,
  requestUserPermission,
  getToken,
} from './commonUtils.js';

async function sendNotification(token) {
  const message = {
    to: 'cH0Gz1MdThm9mLv3Xa08CA:APA91bFE_5OGjHLWe9SjZFeA6Tk_FfXTproP9RXG4vSx0--k3NzDkJ9KaPjgcqUm4EeB1xOhBTs6La0sX3-6P58rn5bjpWRCDeBGLnE0wXPGmWr61voZeWlvFFTRYasvyonMhpEYstIb',
    notification: {
      title: 'Sending from FCM',
      body: 'Sending from the function',
    },
  };

  const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAAX8szGhg:APA91bE9L2mkO_4MQXYNaGPJxwlRGhGVD2mmIc6wRZwbgmIqysr_ONCBbhe7lU5yafTwKRqMJc6dKb3H5bTmkjTJ9defyQi6VB4ROzTLBT1ArGE7HFW01z9Q8y2CZyMyXLwXTRgO6-EV',
    },
    body: JSON.stringify(message),
  });

  const data = await response.json();
  console.log(data);
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // For handling foreground messages
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
    <SafeAreaView>
      <>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Hello, Welcome to Notify</Text>
          <Button
            onPress={() => sendNotification('fksm')}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

export default App;
