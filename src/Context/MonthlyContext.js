// MonthlyContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MonthlyContext = createContext();

export const MonthlyProvider = ({ children }) => {
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const loadMonthlyData = async () => {
      const storedData = await AsyncStorage.getItem('monthlyData');
      if (storedData) setMonthlyData(JSON.parse(storedData));
    };

    loadMonthlyData();
  }, []);

  const saveMonthlyData = async (data) => {
    const updatedData = { ...monthlyData, ...data };
    setMonthlyData(updatedData);
    await AsyncStorage.setItem('monthlyData', JSON.stringify(updatedData));
  };

  return (
    <MonthlyContext.Provider value={{ monthlyData, saveMonthlyData }}>
      {children}
    </MonthlyContext.Provider>
  );
};

export const useMonthlyContext = () => useContext(MonthlyContext);
