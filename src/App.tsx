import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OverView from "./components/pages/overview";
import "./App.css";
import { Transaction } from "./components/pages/transaction";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" />} />
        <Route path="/overview" element={<OverView />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
};

export default App;
