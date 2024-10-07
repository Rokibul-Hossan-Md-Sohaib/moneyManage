import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const MonthlyScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    loadMonthlyData();
  }, []);

  const loadMonthlyData = async () => {
    const storedData = await AsyncStorage.getItem('monthlyData');
    if (storedData) setMonthlyData(JSON.parse(storedData));
  };

  const getTotalExpenses = () => {
    return (monthlyData[selectedMonth]?.expenses || []).reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  };

  const getRemainingBalance = () => {
    const incomeValue = monthlyData[selectedMonth]?.income || 0;
    const expenseValue = getTotalExpenses();
    return (incomeValue - expenseValue).toFixed(2);
  };

  const deleteExpense = async (id) => {
    const monthExpenses = monthlyData[selectedMonth]?.expenses || [];
    const updatedExpenses = monthExpenses.filter(expense => expense.id !== id);

    const updatedData = {
      ...monthlyData,
      [selectedMonth]: {
        ...monthlyData[selectedMonth],
        expenses: updatedExpenses,
      },
    };

    setMonthlyData(updatedData);
    await AsyncStorage.setItem('monthlyData', JSON.stringify(updatedData));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Report for {selectedMonth}</Text>

      <Picker
        selectedValue={selectedMonth}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
      >
        {[...Array(12)].map((_, i) => {
          const month = new Date(0, i).toLocaleString('default', { month: 'long' });
          const year = new Date().getFullYear();
          return <Picker.Item key={i} label={`${month} ${year}`} value={`${month} ${year}`} />;
        })}
      </Picker>

      <Text style={styles.report}>
        Total Income: ${monthlyData[selectedMonth]?.income ? monthlyData[selectedMonth].income.toFixed(2) : '0.00'}
      </Text>
      <Text style={styles.report}>
        Total Expenses: ${getTotalExpenses()}
      </Text>
      <Text style={styles.report}>
        Remaining Balance: ${getRemainingBalance()}
      </Text>

      <FlatList
        data={monthlyData[selectedMonth]?.expenses || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.date}</Text>
            <Text>{item.description}</Text>
            <Text>${item.amount.toFixed(2)}</Text>
            {/* <Button title="Delete" onPress={() => deleteExpense(item.id)} color="red" /> */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  report: {
    fontSize: 16,
    marginVertical: 5,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export default MonthlyScreen;
