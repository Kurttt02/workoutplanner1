import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom"

import Workouts from "./pages/Workouts"
import Profile from "./pages/Profile"
import Coach from "./pages/Coach"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Achievements from "./pages/Achievements"
// Main App component that sets up routing and navigation for the workout planner application, including a navbar with links to different pages and a logout button. It also defines styles for the app and its components.
function App() {
  const user = JSON.parse(
    localStorage.getItem("user")
  )
// Render the app with a BrowserRouter to handle routing, and conditionally display the navbar and routes based on whether the user is logged in or not. If the user is not logged in, they are redirected to the login page.
  return (
    <BrowserRouter>
      <div style={styles.app}>
        {user && (
          <nav style={styles.navbar}>
            <h2 style={styles.logo}>
              Kurt's AI Workout Planner
            </h2>

            <div style={styles.links}>
              <Link to="/" style={styles.link}>
                Workouts
              </Link>

              <Link to="/coach" style={styles.link}>
                AI Coach
              </Link>

              <Link to="/achievements" style={styles.link}>
               Achievements
              </Link>

              <Link to="/profile" style={styles.link}>
                Profile
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("user")
                  window.location.href = "/login"
                }}
                style={styles.logoutButton}
              >
                Logout
              </button>
            </div>
          </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Workouts />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/coach"
            element={
              user ? (
                <Coach />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={
              user ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/achievements"
            element={
              user ? <Achievements /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
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
  padding: "0 40px",
  backgroundColor: "#111",
  position: "sticky",
  top: 0,
  zIndex: 100
},

  logo: {
    color: "white",
    margin: 0
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  link: {
  color: "#d4d4d4",
  textDecoration: "none",
  fontSize: "15px"
},

  logoutButton: {
    backgroundColor: "#1f1f1f",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer"
  }
}

export default App