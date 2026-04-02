import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return <p className="no-expenses">No expenses recorded yet.</p>;
  }

  return (
    <div className="expense-list-container">
      <h3>History</h3>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem 
            key={expense.id} 
            expense={expense} 
            onDelete={onDeleteExpense} 
          />
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;