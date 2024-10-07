import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExpenseProvider } from './src/Context/ExpenseContext';
import Home from './src/Screens/Home';
import MonthSelector from './src/Screens/MonthSelector';
import YearlyOverview from './src/Screens/Yearly';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MonthSelector" component={MonthSelector} options={{ title: 'Select Month & Add Expense' }} />
          <Stack.Screen name="YearlyOverview" component={YearlyOverview} options={{ title: 'Yearly Overview' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
}

export default App;
