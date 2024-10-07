// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'monthlyData';

export const loadMonthlyData = async () => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    console.log("object",storedData);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('Failed to load data from AsyncStorage', error);
    return {};
  }
};

export const saveMonthlyData = async (data) => {
    console.log("data", data);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to AsyncStorage', error);
  }
};
