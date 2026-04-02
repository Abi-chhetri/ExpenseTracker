import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Nav';
import UserDashboard from "./pages/UserDashboard.jsx";
import AddExpensePage from './pages/AddExpensePage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<UserDashboard/>} />
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