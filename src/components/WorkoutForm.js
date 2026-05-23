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
    <form onSubmit={handleSubmit}>
      <input
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        placeholder="Workout name"
      />

      <button type="submit">
        Add Workout
      </button>
    </form>
  )
}

export default WorkoutForm