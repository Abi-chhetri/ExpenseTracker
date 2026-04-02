import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';
import '../Nav.css';

function Navbar() {
  const { currency, setCurrency, CURRENCIES } = useContext(ExpenseContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const handleCurrencyChange = (e) => {
    const selected = CURRENCIES.find(c => c.code === e.target.value);
    setCurrency(selected);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    // Added a wrapper to keep the dropdown positioned correctly
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="nav-brand">💸 SpendTracker</div>
        
        {/* Desktop Links */}
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? "active-link" : ""}>Add Expense</NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? "active-link" : ""}>History</NavLink>
          
          {/* Desktop Currency Dropdown */}
          <select 
            className="currency-select" 
            value={currency.code} 
            onChange={handleCurrencyChange}
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="nav-hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
        <NavLink to="/add" onClick={closeMenu} className={({ isActive }) => isActive ? "active-link" : ""}>Add Expense</NavLink>
        <NavLink to="/history" onClick={closeMenu} className={({ isActive }) => isActive ? "active-link" : ""}>History</NavLink>
        
        {/* Mobile Currency Dropdown */}
        <select 
          className="currency-select mobile-currency" 
          value={currency.code} 
          onChange={handleCurrencyChange}
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>
              {c.code} ({c.symbol})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Navbar;