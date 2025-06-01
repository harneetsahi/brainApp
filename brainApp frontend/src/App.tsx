import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import SharedBrain from "./pages/SharedBrain";
import { useCheckAuth } from "./hooks/useAuthQueries";
import { LoaderIcon } from "./icons/LoaderIcon";

function App() {
  const { data: authUser, isPending, isSuccess } = useCheckAuth();

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-50">
        {/* <LoaderIcon /> */}
      </div>
    );
  }

  return (
    <div className="bg-zinc-100/50 dark:bg-zinc-900  text-gray-800 dark:text-gray-300">
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/brain/share/:hash" element={<SharedBrain />}></Route>
          <Route
            path="/"
            element={isSuccess ? <Dashboard /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/dashboard"
            element={isSuccess ? <Dashboard /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={!isSuccess ? <Login /> : <Navigate to="/dashboard" />}
          ></Route>
          <Route
            path="/signup"
            element={!isSuccess ? <Signup /> : <Navigate to="/dashboard" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
