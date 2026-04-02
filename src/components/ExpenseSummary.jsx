import React from 'react';

function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  return (
    <div className="expense-summary">
      <h2>Total Balance</h2>
      <h3>${total.toFixed(2)}</h3>
    </div>
  );
}

export default ExpenseSummary;