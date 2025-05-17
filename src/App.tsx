import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import OverView from "./components/pages/overview";
import "./App.css";
import { Transaction } from "./components/pages/transaction";
import Budget from "./components/pages/budget";
import Pots from "./components/pages/pots";
import RecurringBill from "./components/pages/recurring-bill";

const App = () => {
  return (
    <Router>
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: "#ffcccc",
              color: "#fe0808",
            },
          },
          success: {
            style: {
              background: "#d8ffc5",
              color: "#1e5b00",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/overview" />} />
        <Route path="/overview" element={<OverView />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/budgets" element={<Budget />} />
        <Route path="pots" element={<Pots />} />
        <Route path="recurring-bills" element={<RecurringBill />} />
      </Routes>
    </Router>
  );
};

export default App;
