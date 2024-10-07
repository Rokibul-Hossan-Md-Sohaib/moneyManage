import React, { useState, useContext } from 'react';
import { View, Text, Button, Picker, StyleSheet } from 'react-native';
import { ExpenseContext } from '../Context/ExpenseContext';

const MonthSelector = ({ navigation }) => {
  const { setIncome, getIncome, calculateRemainingBalance } = useContext(ExpenseContext);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [income, setIncomeInput] = useState('');

  const handleSetIncome = () => {
    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      alert('Please enter a valid income.');
      return;
    }
    setIncome(selectedMonth, incomeValue);
    setIncomeInput('');
  };

  const monthlyIncome = getIncome(selectedMonth);
  const remainingBalance = calculateRemainingBalance(selectedMonth);

  return (
    <View style={styles.container}>
      <Text>Select Month:</Text>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
      >
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
      </Picker>

      <Text>Monthly Income for {selectedMonth}: ${monthlyIncome}</Text>
      <Text>Remaining Balance: ${remainingBalance}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncomeInput}
      />
      <Button title="Set Income" onPress={handleSetIncome} />

      <Button 
        title="Add Daily Expense"
        onPress={() => navigation.navigate('DailyExpenseScreen', { selectedMonth })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default MonthSelector;
