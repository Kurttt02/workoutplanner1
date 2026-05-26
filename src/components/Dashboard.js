// Dashboard component that displays workout statistics and achievements based on the provided workouts data
function Dashboard({ workouts }) {
  const totalWorkouts = workouts.length

  let totalExercises = 0
  let completedExercises = 0
  let allAchievements = []
// Iterate through each workout to calculate total exercises, completed exercises, and collect all achievements
  workouts.forEach(w => {
    if (w.exercises) {
      totalExercises += w.exercises.length
// Count completed exercises in the workout
      w.exercises.forEach(ex => {
        if (ex.completed) completedExercises++
      })
    }// Collect achievements from the workout
    if (w.achievements) {
      allAchievements.push(...w.achievements)
    }
  })
// Calculate the completion rate as a percentage of completed exercises out of total exercises
  const completionRate =
    totalExercises === 0
      ? 0
      : Math.round((completedExercises / totalExercises) * 100)
// Create a unique list of achievements by removing duplicates using a Set
  const uniqueAchievements = [...new Set(allAchievements)]

  return (
    <div style={styles.grid}>
      <div style={styles.card}>
        <h3>Workouts</h3>
        <p>{totalWorkouts}</p>
      </div>

      <div style={styles.card}>
        <h3>Exercises</h3>
        <p>{totalExercises}</p>
      </div>

      <div style={styles.card}>
        <h3>Completed</h3>
        <p>{completedExercises}</p>
      </div>

      <div style={styles.card}>
        <h3>Completion Rate</h3>
        <p>{completionRate}%</p>
      </div>


      <div style={styles.card}>
        <h3>Achievements</h3>
        <p>{uniqueAchievements.length}</p>
      </div>

      <div style={styles.achievements}>
        {uniqueAchievements.map((a, i) => (
          <div key={i} style={styles.badge}>
            {a}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginBottom: "25px"
  },

  card: {
    backgroundColor: "#111",
    border: "1px solid #222",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center"
  },

  achievements: {
    gridColumn: "1 / -1",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  badge: {
    backgroundColor: "#1f1f1f",
    border: "1px solid #333",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "12px"
  }
}

export default Dashboard