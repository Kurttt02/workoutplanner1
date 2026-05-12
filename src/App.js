import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Workouts from "./pages/Workouts"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: "#121212",
          minHeight: "100vh"
        }}
      >
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/workouts"
            element={<Workouts />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App