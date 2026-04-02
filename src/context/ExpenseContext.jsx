import React, { createContext, useState, useEffect } from 'react';

export const ExpenseContext = createContext();

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'NPR', symbol: 'रू', name: 'Nepalese Rupee' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
];

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [capital, setCapital] = useState(() => {
    const saved = localStorage.getItem('capital');
    return saved ? parseFloat(saved) : 0;
  });

  // New Currency State
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('currency');
    return saved ? JSON.parse(saved) : CURRENCIES[0]; // Defaults to USD
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('capital', capital.toString());
  }, [capital]);

  // Save currency to localStorage
  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency));
  }, [currency]);

  const addExpense = (expense) => setExpenses([expense, ...expenses]);
  const deleteExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));
  const updateCapital = (amount) => setCapital(parseFloat(amount));

  return (
    <ExpenseContext.Provider value={{ 
      expenses, addExpense, deleteExpense, 
      capital, updateCapital, 
      currency, setCurrency, CURRENCIES 
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}