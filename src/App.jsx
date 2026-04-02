import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Nav';
import Dashboard from './Pages/UserDashboard.jsx'
import AddExpensePage from "./Pages/AddExpensePage.jsx";
import HistoryPage from "./Pages/HistoryPage.jsx";
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/add" element={<AddExpensePage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;