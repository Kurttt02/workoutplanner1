import { Link } from "react-router-dom"
import { ACHIEVEMENTS } from "../data/achievements"
// Navbar component that displays the app title, navigation links, and a list of achievements with visual indicators for unlocked achievements based on the provided workouts data
function Navbar({ workouts }) {
  const unlocked = new Set()
// Iterate through the workouts and their achievements to populate the set of unlocked achievements
  workouts?.forEach(w => {
    (w.achievements || []).forEach(a => {
      unlocked.add(a)
    })
  })
// Render the navigation bar with the app title, links to different pages, and a list of achievement badges that visually indicate whether each achievement is unlocked or not
  return (
    <nav style={styles.nav}>
      <h2>Workout Planner</h2>

      <div style={styles.centerLinks}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/workouts" style={styles.link}>Workouts</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>
// Section for displaying achievement badges, with styling that changes based on whether the achievement is unlocked or not
      <div style={styles.achBox}>
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = unlocked.has(a.name)

          return (
            <div
              key={i}
              title={a.description}
              style={{
                ...styles.badge,
                backgroundColor: isUnlocked
                  ? "#1f3b2c"
                  : "#1a1a1a",
                borderColor: isUnlocked
                  ? "#22c55e"
                  : "#333",
                opacity: isUnlocked ? 1 : 0.4
              }}
            >
              {a.name}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: "#111",
    color: "white",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  centerLinks: {
    display: "flex",
    gap: "20px"
  },

  link: {
    color: "white",
    textDecoration: "none"
  },

  achBox: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    maxWidth: "400px",
    justifyContent: "flex-end"
  },

  badge: {
    fontSize: "11px",
    padding: "6px 10px",
    borderRadius: "20px",
    border: "1px solid #333",
    cursor: "default"
  }
}

export default Navbar