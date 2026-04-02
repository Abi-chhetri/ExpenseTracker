import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function ExpenseItem({ expense, onDelete }) {
  const { currency } = useContext(ExpenseContext); // Get global currency

  return (
    <li className="expense-item">
      <div className="expense-info">
        <span className="expense-desc">{expense.description}</span>
        <span className="expense-date">{expense.date}</span>
      </div>
      <div className="expense-actions">
        {/* Use dynamic currency symbol */}
        <span className="expense-amount">-{currency.symbol}{" "}{expense.amount.toFixed(2)}</span>
        <button className="delete-btn" onClick={() => onDelete(expense.id)}>✖</button>
      </div>
    </li>
  );
}

export default ExpenseItem;