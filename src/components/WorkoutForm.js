import { useState } from "react"

function WorkoutForm({ addWorkout }) {
  const [workoutName, setWorkoutName] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    if (workoutName.trim() === "") return

    const newWorkout = {
      name: workoutName,
      exercises: []
    }

    addWorkout(newWorkout)

    setWorkoutName("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "30px"
      }}
    >
      <input
        type="text"
        placeholder="Workout name"
        value={workoutName}
        onChange={(event) =>
          setWorkoutName(event.target.value)
        }
        style={{
          padding: "12px",
          width: "300px",
          marginRight: "10px",
          borderRadius: "8px",
          border: "none"
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Add Workout
      </button>
    </form>
  )
}

export default WorkoutForm