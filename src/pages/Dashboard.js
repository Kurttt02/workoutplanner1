import DashboardCard from "../components/DashboardCard"

function Dashboard() {
  return (
    <main
      style={{
        padding: "30px"
      }}
    >
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
    </main>
  )
}

export default Dashboard