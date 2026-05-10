function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "220px"
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  )
}

export default DashboardCard