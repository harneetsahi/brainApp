import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useCheckAuth } from "./hooks/useAuthQueries";
import { LoaderIcon } from "./icons/LoaderIcon";
import { UpdatePassword } from "./pages/UpdatePassword";
import { Settings } from "./pages/Settings";
import Home from "./pages/Home";
import SharedNotes from "./pages/SharedNotes";

function App() {
  const { isPending, isSuccess } = useCheckAuth();

  if (isPending) {
    return (
      <div className="flex justify-center items-center bg-zinc-100/50 dark:bg-zinc-900  text-gray-800 dark:text-gray-300 min-h-screen">
        <LoaderIcon />
      </div>
    );
  }

  return (
    <div className="bg-zinc-100/50 dark:bg-zinc-900  text-gray-800 dark:text-gray-300 min-h-screen">
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/notes/share/:hash" element={<SharedNotes />}></Route>
          <Route
            path="/"
            element={!isSuccess ? <Home /> : <Navigate to="/dashboard" />}
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
          <Route
            path="/settings/updatePassword"
            element={isSuccess ? <UpdatePassword /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/settings"
            element={isSuccess ? <Settings /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
