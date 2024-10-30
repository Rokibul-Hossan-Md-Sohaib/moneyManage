import messaging from '@react-native-firebase/messaging';

// Request user permission for notifications
export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Permission denied');
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
}

// Listen for notifications and handle navigation
export const notificationListener = (navigation) => {
  // Handle notification opened from background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    if (remoteMessage.data && remoteMessage.data.type) {
      navigation.navigate(remoteMessage.data.type); // Navigate based on the notification type
    }
  });

  // Check for an initial notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        if (remoteMessage.data && remoteMessage.data.type) {
          // Set initial route or navigate to the relevant screen
          navigation.navigate(remoteMessage.data.type); // e.g. "Settings"
        }
      }
    });
};

// Get the device token for push notifications
export const getToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages(); // Register the device for remote messages
    const token = await messaging().getToken();
    console.log("Device token:", token);
  } catch (error) {
    console.error('Error getting token:', error);
  }
};
