import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const { expenses, deleteExpense, capital, updateCapital, currency } = useContext(ExpenseContext);
  const [isEditingCapital, setIsEditingCapital] = useState(false);
  const [capitalInput, setCapitalInput] = useState(capital);

  // --- Date & Time Utilities ---
  const todayDate = new Date();
  const todayStr = todayDate.toISOString().split('T')[0];
  
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  // --- Calculations ---
  // 1. This Month's Spending
  const thisMonthTotal = expenses
    .filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === todayDate.getMonth() && d.getFullYear() === todayDate.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  // 2. Remaining Balance
  const remainingBalance = capital - thisMonthTotal;

  // 3. Day-to-Day Comparison
  const todaySpent = expenses.filter(e => e.date === todayStr).reduce((s, e) => s + e.amount, 0);
  const yesterdaySpent = expenses.filter(e => e.date === yesterdayStr).reduce((s, e) => s + e.amount, 0);
  
  let dailyChangePct = 0;
  if (yesterdaySpent > 0) {
    dailyChangePct = ((todaySpent - yesterdaySpent) / yesterdaySpent) * 100;
  } else if (todaySpent > 0) {
    dailyChangePct = 100;
  }

  // 4. Chart Data (Last 7 Days)
  const chartData = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const amount = expenses.filter(e => e.date === dateStr).reduce((s, e) => s + e.amount, 0);
    return { 
      name: d.toLocaleDateString('en-US', { weekday: 'short' }), 
      amount 
    };
  }).reverse();

  const recentExpenses = expenses.slice(0, 4);

  const handleCapitalSubmit = (e) => {
    e.preventDefault();
    updateCapital(capitalInput);
    setIsEditingCapital(false);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h2>Financial Overview</h2>
          <p className="dashboard-date">{todayDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        {/* Capital Setter */}
        <div className="capital-widget">
          {isEditingCapital ? (
            <form onSubmit={handleCapitalSubmit} className="capital-form">
              <input 
                type="number" 
                value={capitalInput} 
                onChange={(e) => setCapitalInput(e.target.value)} 
                placeholder="Set Monthly Capital"
                autoFocus
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div className="capital-display" onClick={() => setIsEditingCapital(true)}>
              <span className="capital-label">Monthly Capital</span>
              {/* Added space between symbol and amount */}
              <span className="capital-value">{currency.symbol}{" "}{capital.toFixed(2)} ✎</span>
            </div>
          )}
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="stat-grid premium-grid">
        <div className={`stat-card ${remainingBalance < 0 ? 'deficit' : 'surplus'}`}>
          <span className="stat-label">Remaining Balance</span>
          <span className="stat-value">{currency.symbol}{" "}{remainingBalance.toFixed(2)}</span>
          <span className="stat-sub">
            {remainingBalance < 0 ? "You've exceeded your capital!" : "Safe to spend"}
          </span>
        </div>
        
        <div className="stat-card">
          <span className="stat-label">Spent This Month</span>
          <span className="stat-value">{currency.symbol}{" "}{thisMonthTotal.toFixed(2)}</span>
          <span className="stat-sub">Total deductions</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Today vs Yesterday</span>
          <span className={`stat-value ${dailyChangePct > 0 ? 'deficit-text' : 'surplus-text'}`}>
            {dailyChangePct > 0 ? '↑' : '↓'} {Math.abs(dailyChangePct).toFixed(1)}%
          </span>
          <span className="stat-sub">
            Today: {currency.symbol}{" "}{todaySpent.toFixed(2)} | Yest: {currency.symbol}{" "}{yesterdaySpent.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="section-card chart-card">
        <div className="section-card__header">
          <h3>Spending Trend (Last 7 Days)</h3>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                // Added space in the tooltip formatter
                formatter={(value) => [`${currency.symbol} ${value}`, 'Spent']}
              />
              <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section-card">
        <div className="section-card__header">
          <h3>Recent Transactions</h3>
          {expenses.length > 4 && (
            <Link to="/history" className="view-all-link">View all history →</Link>
          )}
        </div>
        {recentExpenses.length === 0 ? (
          <p className="no-expenses">No recent activity.</p>
        ) : (
          <ul className="expense-list">
            {recentExpenses.map(expense => (
              <ExpenseItem key={expense.id} expense={expense} onDelete={deleteExpense} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;