import { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function ExpenseForm({ onAddExpense }) {
  // Pull the global currency from our Context
  const { currency } = useContext(ExpenseContext);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!description || !amount || !date) {
      alert('Please fill out all fields');
      return;
    }

    const newExpense = {
      id: crypto.randomUUID(), // Generates a unique ID
      description,
      amount: parseFloat(amount),
      date
    };

    onAddExpense(newExpense);

    // Clear form
    setDescription('');
    setAmount('');
    setDate('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Description</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Item name"
        />
      </div>
      <div className="form-group">
        {/* Dynamically display the selected currency symbol */}
        <label>Amount ({currency.symbol})</label>
        <input 
          type="number" 
          step="0.01"
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="50.00"
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <button type="submit" className="add-btn">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;