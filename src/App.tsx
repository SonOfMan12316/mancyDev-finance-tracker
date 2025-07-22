import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import OverView from "./components/pages/overview";
import "./App.css";
import { Transaction } from "./components/pages/transaction";
import Budget from "./components/pages/budget";
import Pots from "./components/pages/pots";
import RecurringBill from "./components/pages/recurring-bill";
import SignIn from "./components/onboarding/sign-in";
import SignUp from "./components/onboarding/sign-up";
import { ProtectedRoute } from "./components/global";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/overview" element={<OverView />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/budgets" element={<Budget />} />
            <Route path="/pots" element={<Pots />} />
            <Route path="/recurring-bills" element={<RecurringBill />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
