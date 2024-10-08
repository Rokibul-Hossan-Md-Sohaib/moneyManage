import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { loadMonthlyData, saveMonthlyData } from '../utils/storage'; // Adjust the import path if necessary
import CustomButton from '../Components/CustomButton';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
    const [income, setIncome] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [monthlyData, setMonthlyData] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await loadMonthlyData();
        setMonthlyData(data);
      };
      fetchData();
    }, []);
  
    const handleIncomeSave = () => {
      const existingIncome = monthlyData[selectedMonth]?.income || 0;
  
      // Check if income is already set, alert user for confirmation
      if (existingIncome > 0) {
        Alert.alert(
          'Income Already Set',
          `Your current income for ${selectedMonth} is $${existingIncome.toFixed(2)}. Do you want to add the new income to this amount?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => saveIncome(true) }, // Sum the income
          ]
        );
      } else {
        saveIncome(false); // First time setting income
      }
    };
  
    const saveIncome = async (addToExisting) => {
      const currentIncome = monthlyData[selectedMonth]?.income || 0;
      const newIncome = addToExisting ? currentIncome + parseFloat(income) : parseFloat(income);
  
      const monthData = { income: newIncome, expenses: monthlyData[selectedMonth]?.expenses || [] };
      const updatedData = { ...monthlyData, [selectedMonth]: monthData };
      setMonthlyData(updatedData);
      await saveMonthlyData(updatedData);
      setIncome('');
    };
  
    const saveExpense = async () => {
      if (!description || !amount) {
        alert('Please enter both description and amount');
        return;
      }
  
      const newExpense = {
        id: Date.now().toString(),
        description,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(),
      };
  
      const monthExpenses = monthlyData[selectedMonth]?.expenses || [];
      monthExpenses.push(newExpense);
  
      const updatedData = {
        ...monthlyData,
        [selectedMonth]: {
          ...monthlyData[selectedMonth],
          expenses: monthExpenses,
        },
      };
  
      setMonthlyData(updatedData);
      await saveMonthlyData(updatedData);
      setDescription('');
      setAmount('');
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
      await saveMonthlyData(updatedData);
    };
  
    const getTotalExpenses = () => {
      return (monthlyData[selectedMonth]?.expenses || []).reduce((total, expense) => total + expense.amount, 0).toFixed(2);
    };
  
    const getRemainingBalance = () => {
      const incomeValue = monthlyData[selectedMonth]?.income || 0;
      const expenseValue = getTotalExpenses();
      return (incomeValue - expenseValue).toFixed(2);
    };
  
    const navigateToMonthlyScreen = () => {
      navigation.navigate('Monthly'); // Assuming you have a MonthlyScreen in the navigator
    };
  
    const navigateToYearlyScreen = () => {
      navigation.navigate('Yearly'); // Assuming you have a YearlyScreen in the navigator
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Money Management</Text>

      <Text style={styles.subtitle}>Select Month:</Text>
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

      <Text style={styles.subtitle}>Monthly Income:</Text>
      <TextInput
        placeholder="Income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
        style={styles.input}
      />
      <Button title="Save Income" onPress={handleIncomeSave} />

      <Text style={styles.subtitle}>Add your daily expense</Text>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Add Expense" onPress={saveExpense} />

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
            <Button title="Delete" onPress={() => deleteExpense(item.id)} color="red" />
          </View>
        )}
      />

      <View style={styles.navigationButtons}>
       
 <CustomButton
        title="Monthly Expenses"
        onPress={navigateToMonthlyScreen}
        backgroundColor=""
        textColor="black" 
      />

<CustomButton
        title="Yearly Expenses"
        onPress={navigateToYearlyScreen}
        backgroundColor=""
        textColor="black" 
      />
      </View>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
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
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  navButtonText: {
    textAlign: 'center',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export default HomeScreen;