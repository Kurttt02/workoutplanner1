import DashboardCard from "../components/DashboardCard"

function Dashboard() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>
            Track your fitness progress
          </p>
        </div>

        <div style={styles.grid}>
          <DashboardCard
            title="Workouts This Week"
            value="4"
          />

          <DashboardCard
            title="Current Streak"
            value="12 Days"
          />

          <DashboardCard
            title="Calories Burned"
            value="3200"
          />
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    padding: "40px 20px",
    color: "#ffffff"
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto"
  },

  header: {
    marginBottom: "25px"
  },

  title: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "700",
    color: "#ffffff"
  },

  subtitle: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#a3a3a3"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px"
  }
}

export default Dashboard