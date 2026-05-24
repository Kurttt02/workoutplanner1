import { useEffect, useState } from "react"
import WorkoutForm from "../components/WorkoutForm"
import WorkoutItem from "../components/WorkoutItem"
import Dashboard from "../components/Dashboard"

function Workouts() {
  const [workouts, setWorkouts] = useState([])

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
    <main style={{ padding: "30px", color: "white" }}>
      <h1>Kurt's Workout Planner</h1>

      <Dashboard workouts={workouts} />

      <WorkoutForm addWorkout={addWorkout} />
<div style={styles.buttonRow}>
  <button
    onClick={() => generateWorkout("muscle")}
    style={{ ...styles.button, backgroundColor: "#1f1f1f", color: "#ffffff" }}
  >
     Muscle Build
  </button>

  <button
    onClick={() => generateWorkout("fat loss")}
    style={{ ...styles.button, backgroundColor: "#1f1f1f", color: "#ffffff" }}
  >
     Fat Burn
  </button>

  <button
    onClick={() => generateWorkout("strength")}
    style={{ ...styles.button, backgroundColor: "#1f1f1f", color: "#ffffff" }}
  >
     Strength
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
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #000000, #000000)",
    padding: "40px",
    color: "white"
  },

  header: {
    textAlign: "center",
    marginBottom: "35px"
  },

  title: {
    fontSize: "54px",
    fontWeight: "800",
    marginBottom: "10px",
    background:
      "linear-gradient(to right, #fcfcfc, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  buttonRow: {
  display: "flex",
  gap: "12px",
  margin: "20px 0",
  flexWrap: "wrap"
},

button: {
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
  border: "1px solid #2a2a2a",
  padding: "12px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s ease"
},

  subtitle: {
    color: "#94a3b8",
    fontSize: "18px"
  },

  formBox: {
    maxWidth: "850px",
    margin: "0 auto 35px auto",
    background:
      "linear-gradient(180deg, #000000, #000000)",
    padding: "30px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
  },

  workoutList: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },

  emptyCard: {
    background:
      "linear-gradient(145deg, #000000, #000000)",
    padding: "45px",
    borderRadius: "24px",
    textAlign: "center",
    color: "#94a3b8",
    border: "1px solid rgba(255,255,255,0.08)"
  }
}


export default Workouts