import { useEffect, useState } from "react"

import WorkoutForm from "../components/WorkoutForm"
import WorkoutItem from "../components/WorkoutItem"

function Workouts() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
  }, [])

  function addWorkout(name) {
    fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkouts([...workouts, data])
      })
  }

 function deleteWorkout(id) {
  console.log("DELETE ID:", id)

  fetch(`http://localhost:5000/api/workouts/${id}`, {
    method: "DELETE"
  }).then(() => {
    setWorkouts(workouts.filter(w => w._id !== id))
  })
}

  function editWorkout(id, newName) {
    fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName })
    })
      .then(res => res.json())
      .then(updated => {
        setWorkouts(
          workouts.map(w =>
            w._id === id ? updated : w
          )
        )
      })
  }

  function addExercise(workoutId, exercise) {
    fetch(`http://localhost:5000/api/workouts/${workoutId}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exercise)
    })
      .then(res => res.json())
      .then(updatedWorkout => {
        setWorkouts(
          workouts.map(w =>
            w._id === workoutId ? updatedWorkout : w
          )
        )
      })
  }

  function toggleExercise(workoutId, exerciseIndex) {
    const workout = workouts.find(w => w._id === workoutId)

    workout.exercises[exerciseIndex].completed =
      !workout.exercises[exerciseIndex].completed

    fetch(`http://localhost:5000/api/workouts/${workoutId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workout)
    })
      .then(res => res.json())
      .then(updated => {
        setWorkouts(
          workouts.map(w =>
            w._id === workoutId ? updated : w
          )
        )
      })
  }

  return (
    <main style={{ padding: "30px", color: "white" }}>
      <h1>Kurt's Workout Planner</h1>

      <WorkoutForm addWorkout={addWorkout} />

      {workouts.length === 0 ? (
        <p>No workouts yet.</p>
      ) : (
        workouts.map(workout => (
          <WorkoutItem
            key={workout._id}
            workout={workout}
            deleteWorkout={deleteWorkout}
            editWorkout={editWorkout}
            addExercise={addExercise}
            toggleExercise={toggleExercise}
          />
        ))
      )}
    </main>
  )
}

export default Workouts