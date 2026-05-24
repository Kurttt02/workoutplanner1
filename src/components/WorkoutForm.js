import { useState } from "react"

function WorkoutForm({ addWorkout }) {
  const [workoutName, setWorkoutName] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    if (workoutName.trim() === "") return

    addWorkout(workoutName)
    setWorkoutName("")
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Enter workout name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        Add Workout
      </button>
    </form>
  )
}

const styles = {
  form: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center"
  },

  input: {
    flex: 1,
    minWidth: "240px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #2a2a2a",
    backgroundColor: "#0f0f0f",
    color: "#ffffff",
    fontSize: "14px"
  },

  button: {
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid #2a2a2a",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer"
  }
}

export default WorkoutForm