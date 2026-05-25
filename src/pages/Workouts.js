import { useEffect, useState } from "react"
import WorkoutForm from "../components/WorkoutForm"
import WorkoutItem from "../components/WorkoutItem"
import Dashboard from "../components/Dashboard"
import { primaryButton } from "../styles/buttons"

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loadingWorkout, setLoadingWorkout] = useState(false)

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then(res => res.json())
      .then(data => setWorkouts(data))
  }, [])

  function addWorkout(name) {
    fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(data => setWorkouts(prev => [...prev, data]))
  }

  function deleteWorkout(id) {
    fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE"
    }).then(() => {
      setWorkouts(prev => prev.filter(w => w._id !== id))
    })
  }

  function editWorkout(id, newName) {
    fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    })
      .then(res => res.json())
      .then(updated => {
        setWorkouts(prev =>
          prev.map(w => (w._id === id ? updated : w))
        )
      })
  }

  function addExercise(workoutId, exercise) {
    fetch(`http://localhost:5000/api/workouts/${workoutId}/exercises`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise)
    })
      .then(res => res.json())
      .then(updatedWorkout => {
        setWorkouts(prev =>
          prev.map(w =>
            w._id === workoutId ? updatedWorkout : w
          )
        )
      })
  }

  function generateWorkout(goal) {
    setLoadingWorkout(true)

    fetch("http://localhost:5000/api/generate-workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal })
    })
      .then(res => res.json())
      .then(aiWorkout => {
        return fetch("http://localhost:5000/api/workouts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aiWorkout)
        })
      })
      .then(res => res.json())
      .then(savedWorkout => {
        setWorkouts(prev => [...prev, savedWorkout])
      })
      .finally(() => {
        setLoadingWorkout(false)
      })
  }

  function toggleExercise(workoutId, exerciseIndex) {
    setWorkouts(prev => {
      const updated = prev.map(workout => {
        if (workout._id !== workoutId) return workout

        return {
          ...workout,
          exercises: workout.exercises.map((ex, i) =>
            i === exerciseIndex
              ? { ...ex, completed: !ex.completed }
              : ex
          )
        }
      })

      const changed = updated.find(w => w._id === workoutId)

      fetch(`http://localhost:5000/api/workouts/${workoutId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changed)
      })

      return updated
    })
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Workout Planner</h1>

      <Dashboard workouts={workouts} />

      <WorkoutForm addWorkout={addWorkout} />

      <div style={styles.buttonRow}>
        <button
          style={primaryButton}
          disabled={loadingWorkout}
          onClick={() => generateWorkout("muscle")}
        >
          {loadingWorkout ? "Generating..." : "Build Muscle"}
        </button>

        <button
          style={primaryButton}
          disabled={loadingWorkout}
          onClick={() => generateWorkout("fat loss")}
        >
          {loadingWorkout ? "Generating..." : "Burn Fat"}
        </button>

        <button
          style={primaryButton}
          disabled={loadingWorkout}
          onClick={() => generateWorkout("strength")}
        >
          {loadingWorkout ? "Generating..." : "Get Strong"}
        </button>
      </div>

      {workouts.map(workout => (
        <WorkoutItem
          key={workout._id}
          workout={workout}
          deleteWorkout={deleteWorkout}
          editWorkout={editWorkout}
          addExercise={addExercise}
          toggleExercise={toggleExercise}
        />
      ))}
    </main>
  )
}

const styles = {
  page: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    color: "white"
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px"
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    margin: "20px 0",
    flexWrap: "wrap"
  }
}

export default Workouts