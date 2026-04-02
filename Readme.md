````markdown
# 💸 SpendTracker

A modern, fully responsive React application designed to help you track expenses, manage your monthly capital, and visualize your spending habits. 

![SpendTracker Preview](link-to-your-screenshot-or-gif.gif)

## ✨ Features

* **📊 Interactive Dashboard:** Get real-time financial overviews, including your remaining balance, daily spending comparisons (Today vs. Yesterday), and a 7-day visual spending trend using Recharts.
* **💱 Multi-Currency Support:** Seamlessly switch between different currencies globally from the navbar. The entire app (dashboards, forms, histories) updates instantly.
* **💰 Monthly Capital Management:** Set and edit your monthly budget. The app dynamically alerts you if you are in a safe surplus or have exceeded your capital (deficit).
* **📅 Smart History Grouping:** Expenses are automatically grouped by month and year. Browse your history through beautifully animated, expandable dropdown cards.
* **📱 Premium Responsive UI:** Built from the ground up with custom CSS. Features glassmorphism, soft mesh gradients, and a mobile-friendly navbar with a sliding hamburger drawer.

## 🛠️ Tech Stack

* **Frontend Framework:** React.js
* **State Management:** React Context API
* **Routing:** React Router v6 (`react-router-dom`)
* **Charting:** Recharts
* **Styling:** Custom CSS (CSS Variables, Flexbox/Grid, Responsive Media Queries)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/spendtracker.git](https://github.com/yourusername/spendtracker.git)
````

2.  **Navigate to the project directory:**

    ```bash
    cd spendtracker
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Start the development server:**

    ```bash
    npm start 
    ```

5.  **Open the app:**
    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or the port provided in your terminal) to view it in your browser.

## 📁 Project Structure

```text
src/
├── components/
│   ├── ExpenseForm.jsx      # Form to add new expenses
│   ├── ExpenseItem.jsx      # Individual expense list item
│   └── Navbar.jsx           # Responsive navigation & currency selector
├── context/
│   └── ExpenseContext.jsx   # Global state for expenses, capital, and currency
├── pages/
│   ├── Dashboard.jsx        # Main overview, stats, and charts
│   └── HistoryPage.jsx      # Monthly grouped expense history
├── App.js                   # Main application routing
├── App.css                  # Global styles & responsive rules
└── Nav.css                  # Navbar specific styles
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome\! Feel free to check the issues page.

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```
```
