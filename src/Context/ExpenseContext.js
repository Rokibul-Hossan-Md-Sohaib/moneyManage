import React, { createContext, useState, useEffect } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState({});
  const [incomes, setIncomes] = useState({});
  const [totalBalance, setTotalBalance] = useState(0); 
  const [yearlyRemainingBalance, setYearlyRemainingBalance] = useState(0); 

  // Function to add an expense for a specific month
  const addExpense = (month, expense) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [month]: [...(prevExpenses[month] || []), expense],
    }));
  };

  // Function to set the income for a specific month
  const setIncome = (month, income) => {
    setIncomes((prevIncomes) => ({
      ...prevIncomes,
      [month]: income,
    }));
  };

  // Function to get the expenses for a specific month
  const getMonthlyExpenses = (month) => expenses[month] || [];

  // Function to get the income for a specific month
  const getIncome = (month) => incomes[month] || 0;

  // Function to get the yearly expenses
  const getYearlyExpenses = () => expenses;

  // Function to calculate the remaining balance for a specific month
  const calculateRemainingBalance = (month) => {
    const income = getIncome(month);
    const totalExpenses = getMonthlyExpenses(month).reduce((sum, item) => sum + item.amount, 0);
    return income - totalExpenses;
  };

  // Function to calculate the remaining balance for the entire year
  const calculateYearlyRemainingBalance = () => {
    const totalIncome = Object.values(incomes).reduce((sum, income) => sum + income, 0);
    const totalExpenses = Object.values(expenses).flat().reduce((sum, item) => sum + item.amount, 0);
    return totalIncome - totalExpenses;
  };

  // Update the totalBalance and yearlyRemainingBalance whenever income or expenses change
  useEffect(() => {
    const totalIncome = Object.values(incomes).reduce((sum, income) => sum + income, 0);
    setTotalBalance(totalIncome);

    const remainingBalance = calculateYearlyRemainingBalance();
    setYearlyRemainingBalance(remainingBalance);
  }, [incomes, expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        totalBalance,
        yearlyRemainingBalance, // Pass the computed yearly balance to components
        addExpense,
        setIncome,
        getIncome,
        getMonthlyExpenses,
        getYearlyExpenses,
        calculateRemainingBalance,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

