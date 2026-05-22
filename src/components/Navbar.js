import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#111",
        color: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h2>Workout Planner</h2>

      <div
        style={{
          display: "flex",
          gap: "20px"
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/workouts"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Workouts
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Profile
        </Link>
      </div>
    </nav>
  )
}

export default Navbar