import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen';
import MonthlyScreen from './src/Screens/MonthlyScreen';
import YearlyScreen from './src/Screens/YearlyScreen';

import { PermissionsAndroid, Linking, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import  firebase  from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';

import DeviceInfo from 'react-native-device-info';
import { notificationListener, requestUserPermission } from './src/utils/commonUtils';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    const getDeviceId = async () => {
      let deviceId = await AsyncStorage.getItem('deviceId');
      if (!deviceId) {
        // Use getUniqueId directly, as it returns a string
        deviceId = DeviceInfo.getUniqueId();
        // Store the device ID in AsyncStorage
        await AsyncStorage.setItem('deviceId', deviceId);
      }
const deviceMainId = JSON.parse(deviceId)._j
      console.log('Device ID:', deviceMainId);
    };


    getDeviceId();


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => unsubscribe();
  }, []);


  // rest of your component


  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("token", token);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  }
  useEffect(() => {
 
    const fetchData = async () => {
      await requestUserPermission();
      await notificationListener()
  
      // ... other logic
    };
  
    fetchData();
    getToken() 
  }, []);
  

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Monthly" component={MonthlyScreen} />
        <Stack.Screen name="Settings" component={YearlyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
