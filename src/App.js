import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Workouts from "./pages/Workouts"
import Profile from "./pages/Profile"
import Coach from "./pages/Coach"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <nav style={styles.navbar}>
          <h2 style={styles.logo}>
            Kurt's Workout Planner
          </h2>

          <div style={styles.links}>
            <Link to="/" style={styles.link}>
              Workouts
            </Link>

            <Link to="/coach" style={styles.link}>
              AI Coach
            </Link>

            <Link to="/profile" style={styles.link}>
              Profile
            </Link>

            <Link to="/login" style={styles.link}>
              Login
            </Link>

            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Workouts />} />

          <Route path="/coach" element={<Coach />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a"
  },

  navbar: {
    height: "70px",
    borderBottom: "1px solid #1f1f1f",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    backgroundColor: "#111"
  },

  logo: {
    color: "white",
    margin: 0,
    fontSize: "22px"
  },

  links: {
    display: "flex",
    gap: "20px"
  },

  link: {
    color: "#d4d4d4",
    textDecoration: "none",
    fontSize: "14px"
  }
}

export default App