function DashboardCard({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.title}>{title}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "#111111",
    border: "1px solid #262626",
    borderRadius: "14px",
    padding: "18px 20px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minHeight: "90px"
  },

  title: {
    margin: 0,
    fontSize: "13px",
    color: "#a3a3a3",
    fontWeight: "500"
  },

  value: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "-0.5px"
  }
}

export default DashboardCard