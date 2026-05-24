function Profile() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>

        <div style={styles.card}>
          <h2 style={styles.name}>Kurt</h2>

          <p style={styles.text}>
            Fitness tracking dashboard user profile.
          </p>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Account</p>
              <p style={styles.statValue}>Active</p>
            </div>

            <div style={styles.statBox}>
              <p style={styles.statLabel}>Plan</p>
              <p style={styles.statValue}>Free</p>
            </div>

            <div style={styles.statBox}>
              <p style={styles.statLabel}>Workouts</p>
              <p style={styles.statValue}>--</p>
            </div>
          </div>
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
    maxWidth: "900px",
    margin: "0 auto"
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#ffffff"
  },

  card: {
    backgroundColor: "#111111",
    border: "1px solid #262626",
    borderRadius: "14px",
    padding: "25px"
  },

  name: {
    fontSize: "22px",
    marginBottom: "8px"
  },

  text: {
    color: "#a3a3a3",
    marginBottom: "20px",
    fontSize: "14px"
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px"
  },

  statBox: {
    backgroundColor: "#0f0f0f",
    border: "1px solid #262626",
    padding: "15px",
    borderRadius: "10px"
  },

  statLabel: {
    fontSize: "12px",
    color: "#a3a3a3",
    marginBottom: "5px"
  },

  statValue: {
    fontSize: "16px",
    fontWeight: "600"
  }
}

export default Profile