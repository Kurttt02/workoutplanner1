import { useState } from "react"
// WorkoutForm component that provides a form for users to input a workout name and add it to the list of workouts using the provided addWorkout function
function WorkoutForm({ addWorkout }) {
  const [workoutName, setWorkoutName] = useState("")
// Handle form submission by preventing the default behavior, validating the workout name, and calling the addWorkout function with the provided workout name. After adding the workout, the input field is cleared.
  function handleSubmit(event) {
    event.preventDefault()
// Validate that the workout name is not empty after trimming whitespace. If it is empty, the function returns early without adding a workout.
    if (workoutName.trim() === "") return

    addWorkout(workoutName)
    setWorkoutName("")
  }
// Render a form with an input field for the workout name and a submit button. The input field is controlled by the workoutName state, and the form submission is handled by the handleSubmit function.
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