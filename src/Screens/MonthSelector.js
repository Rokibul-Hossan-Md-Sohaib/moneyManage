import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { ExpenseContext } from '../Context/ExpenseContext';
import { Picker } from '@react-native-picker/picker';

const MonthSelector = () => {
  const { setIncome, addExpense, getIncome, getMonthlyExpenses, calculateRemainingBalance } = useContext(ExpenseContext);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [income, setIncomeInput] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleSetIncome = () => {
    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      alert('Please enter a valid income.');
      return;
    }
    console.log(`Setting income for ${selectedMonth}: $${incomeValue}`);
    setIncome(selectedMonth, incomeValue);
    setIncomeInput(''); // Clear the input after setting income
  };

  const handleAddExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (!expenseDescription || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    if (amount > calculateRemainingBalance(selectedMonth)) {
      alert('Expense exceeds the remaining balance!');
      return;
    }

    const newExpense = {
      id: Math.random().toString(),
      description: expenseDescription,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
    };

    addExpense(selectedMonth, newExpense);
    setExpenseDescription('');
    setExpenseAmount('');
  };

  const monthlyIncome = getIncome(selectedMonth);
  console.log(`Monthly income for ${selectedMonth}:`, monthlyIncome); // Log the monthly income

  const remainingBalance = calculateRemainingBalance(selectedMonth);
  const monthlyExpenses = getMonthlyExpenses(selectedMonth);

  return (
    <View style={{ padding: 20 }}>
      <Text>Select Month:</Text>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
      >
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
      </Picker>

      <Text style={styles.header}>Income for {selectedMonth}:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncomeInput}
      />
      <Button title="Set Income" onPress={handleSetIncome} />

      <Text style={styles.header}>Total Balance: ${monthlyIncome}</Text>
      <Text style={styles.header}>Remaining Balance: ${remainingBalance}</Text>

      <Text style={styles.header}>Add Daily Expense:</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense Description"
        value={expenseDescription}
        onChangeText={setExpenseDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />

      <FlatList
        data={monthlyExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.description} - {item.date}</Text>
            <Text style={styles.amount}>${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MonthSelector;
