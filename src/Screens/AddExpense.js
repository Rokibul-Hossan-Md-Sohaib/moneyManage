import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { ExpenseContext } from '../Context/ExpenseContext';

const AddExpense = ({ route }) => {
  const { selectedMonth } = route.params; // Get the selected month passed from Home
  console.log(selectedMonth)
  const { addExpense } = useContext(ExpenseContext);
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleAddExpense = () => {
    // Validate the expense amount
    const amount = Number(expenseAmount);
    if (!expenseAmount || isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid expense amount.");
      return;
    }

    // Add the expense
    addExpense(selectedMonth, amount);
    setExpenseAmount(''); // Clear the input after adding
    Alert.alert("Success", "Expense added successfully!"); // Optional: Notify the user
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Add Expense for: {selectedMonth}</Text>

      <TextInput
        value={expenseAmount}
        onChangeText={setExpenseAmount}
        placeholder="Expense Amount"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

export default AddExpense;
