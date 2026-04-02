import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';

function AddExpensePage() {
  const { addExpense } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const handleAdd = (expense) => {
    addExpense(expense);
    navigate('/'); // Redirect back to dashboard
  };

  return (
    <div className="full-page-container">
      <div className="page-content-wrapper centered-form-wrapper">
        <h2 className="page-title">Record a New Expense</h2>
        <div className="form-card">
          <ExpenseForm onAddExpense={handleAdd} />
        </div>
      </div>
    </div>
  );
}

export default AddExpensePage;