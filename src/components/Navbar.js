function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        backgroundColor: "#111",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h2>Kurts Workout Planner</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <p>Dashboard</p>
        <p>Workouts</p>
        <p>Profile</p>
      </div>
    </nav>
  )
}

export default Navbar