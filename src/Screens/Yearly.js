import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ExpenseContext } from '../Context/ExpenseContext';

const YearlyOverview = () => {
  const { getYearlyExpenses, incomes, yearlyRemainingBalance , totalBalance} = useContext(ExpenseContext);
  console.log("incomes",incomes);
  const yearlyExpenses = getYearlyExpenses();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Yearly Overview</Text>
      {Object.keys(yearlyExpenses).length === 0 ? (
        <Text>No data available for the year.</Text>
      ) : (
        Object.keys(yearlyExpenses).map((month) => (
          <View key={month} style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>{month}:</Text>
              <Text >Total Income: ${totalBalance ? totalBalance : ''}</Text>
            <Text>
              Total Expenses: $
              {yearlyExpenses[month].reduce((sum, item) => sum + (item.amount || 0), 0)}
            </Text>
          </View>
        ))
      )}
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Yearly Remaining Balance: ${yearlyRemainingBalance}
      </Text>
    </View>
  );
};

export default YearlyOverview;
