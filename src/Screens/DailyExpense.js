import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ExpenseContext } from '../Context/ExpenseContext';

const DailyExpense = ({ selectedMonth }) => {
  const { addExpense, calculateRemainingBalance, getMonthlyExpenses } = useContext(ExpenseContext);
  
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

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

  const monthlyExpenses = getMonthlyExpenses(selectedMonth);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Daily Expense for {selectedMonth}</Text>
      
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
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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

export default DailyExpense;
