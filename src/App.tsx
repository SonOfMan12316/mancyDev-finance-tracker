import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverView from "./components/pages/overview";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OverView />} />
      </Routes>
    </Router>
  );
};

export default App;
