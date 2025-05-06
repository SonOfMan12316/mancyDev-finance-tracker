import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OverView from "./components/pages/overview";
import "./App.css";
import { Transaction } from "./components/pages/transaction";
import Budget from "./components/pages/budget";
import Pots from "./components/pages/pots";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" />} />
        <Route path="/overview" element={<OverView />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/budgets" element={<Budget />} />
        <Route path="pots" element={<Pots />} />
      </Routes>
    </Router>
  );
};

export default App;
