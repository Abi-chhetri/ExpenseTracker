import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';

// Sub-component to handle the dropdown logic for each month
function MonthDropdown({ month, data, onDelete, isDefaultOpen, currency }) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  return (
    <div className="month-group">
      <div 
        className="month-header dropdown-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="month-header-title">
          <span className={`chevron ${isOpen ? 'open' : ''}`}>▼</span>
          <h3>{month}</h3>
        </div>
        {/* Dynamically display the selected currency symbol */}
        <span className="month-total">-{currency.symbol}{data.total.toFixed(2)}</span>
      </div>
      
      {/* Only render the expenses if the dropdown is open */}
      {isOpen && (
        <div className="dropdown-content">
          <ul className="expense-list">
            {data.expenses.map(expense => (
              <ExpenseItem 
                key={expense.id} 
                expense={expense} 
                onDelete={onDelete} 
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function HistoryPage() {
  // Pull currency from context alongside expenses and deleteExpense
  const { expenses, deleteExpense, currency } = useContext(ExpenseContext);

  // Group expenses by Month and Year
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = { 
        expenses: [], 
        total: 0, 
        dateRef: date 
      };
    }
    
    acc[monthYear].expenses.push(expense);
    acc[monthYear].total += expense.amount;
    return acc;
  }, {});

  // Sort the groups so the most recent month is at the top
  const sortedMonths = Object.keys(groupedExpenses).sort((a, b) => {
    return groupedExpenses[b].dateRef - groupedExpenses[a].dateRef;
  });

  return (
    <div className="full-page-container">
      <div className="page-content-wrapper">
        <h2 className="page-title">Expense History</h2>
        
        {sortedMonths.length === 0 ? (
          <p className="no-expenses">No expenses recorded yet.</p>
        ) : (
          <div className="history-timeline">
            {sortedMonths.map((month, index) => (
              <MonthDropdown 
                key={month} 
                month={month} 
                data={groupedExpenses[month]} 
                onDelete={deleteExpense}
                isDefaultOpen={index === 0} // Opens the first (most recent) month automatically
                currency={currency} // Pass the currency down as a prop
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;