import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import {
  Budget,
  Pots,
  OverView,
  Transaction,
  RecurringBill,
} from "./components/pages"
import SignIn from "./components/onboarding/sign-in";
import SignUp from "./components/onboarding/sign-up";
import ForgotPassword from "./components/onboarding/forgot-password";
import { ProtectedRoute } from "./components/global";
import ResetPassword from "./components/onboarding/reset-password";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
