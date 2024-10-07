import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ExpenseContext } from '../Context/ExpenseContext';

const Home = ({ navigation }) => {
  const { totalBalance, remainingBalance, getIncome, selectedMonth } = useContext(ExpenseContext);
  console.log(remainingBalance);
  // Fetch the monthly income based on the selected month
  const monthlyIncome = getIncome(selectedMonth);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Total Balance: ${totalBalance}</Text>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Remaining Balance: ${remainingBalance}</Text>

      {/* Display monthly income */}
      {/* <Text style={{ fontSize: 24, marginBottom: 20 }}>Monthly Income for {getIncome}</Text> */}

      <Button title="Select Month" onPress={() => navigation.navigate('MonthSelector')} />
      <Button title="Yearly Overview" onPress={() => navigation.navigate('YearlyOverview')} />
    </View>
  );
};

export default Home;
