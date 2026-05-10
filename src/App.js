import Navbar from "./components/Navbar"
import DashboardCard from "./components/DashboardCard"

function App() {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh"
      }}
    >
      <Navbar />

      <main style={{ padding: "30px" }}>
        <h1
          style={{
            color: "white",
            marginBottom: "30px"
          }}
        >
          Dashboard
        </h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          <DashboardCard
            title="Workouts This Week"
            value="0"
          />

          <DashboardCard
            title="Current Streak"
            value="0 Days"
          />

          <DashboardCard
            title="Calories Burned"
            value="0"
          />
        </div>
      </main>
    </div>
  )
}

export default App