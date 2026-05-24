function Dashboard({ workouts }) {
  const totalWorkouts = workouts.length

  const totalExercises = workouts.reduce(
    (total, workout) =>
      total + workout.exercises.length,
    0
  )

  const completedExercises = workouts.reduce(
    (total, workout) =>
      total +
      workout.exercises.filter(
        (exercise) => exercise.completed
      ).length,
    0
  )

  const completionRate =
    totalExercises === 0
      ? 0
      : Math.round(
          (completedExercises / totalExercises) * 100
        )

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{totalWorkouts}</h2>
        <p>Total Workouts</p>
      </div>

      <div style={styles.card}>
        <h2>{totalExercises}</h2>
        <p>Total Exercises</p>
      </div>

      <div style={styles.card}>
        <h2>{completedExercises}</h2>
        <p>Completed</p>
      </div>

      <div style={styles.card}>
        <h2>{completionRate}%</h2>
        <p>Completion Rate</p>

        <div style={styles.progressBackground}>
          <div
            style={{
              ...styles.progressFill,
              width: `${completionRate}%`
            }}
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "35px"
  },

  card: {
    background:
      "linear-gradient(145deg, #000000, #0f172a)",
    padding: "28px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
    textAlign: "center"
  },

  progressBackground: {
    width: "100%",
    height: "10px",
    backgroundColor: "#334155",
    borderRadius: "999px",
    marginTop: "12px",
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    background:
      "linear-gradient(to right, #22c55e, #4ade80)",
    borderRadius: "999px"
  }
}

export default Dashboard