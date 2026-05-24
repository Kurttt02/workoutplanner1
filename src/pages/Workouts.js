import { useEffect, useState } from "react"

import WorkoutForm from "../components/WorkoutForm"
import WorkoutItem from "../components/WorkoutItem"
import Dashboard from "../components/Dashboard"

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
    fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE"
    }).then(() => {
      setWorkouts(
        workouts.filter((w) => w._id !== id)
      )
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
      .then((res) => res.json())
      .then((updated) => {
        setWorkouts(
          workouts.map((w) =>
            w._id === id ? updated : w
          )
        )
      })
  }

  function addExercise(workoutId, exercise) {
    fetch(
      `http://localhost:5000/api/workouts/${workoutId}/exercises`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exercise)
      }
    )
      .then((res) => res.json())
      .then((updatedWorkout) => {
        setWorkouts(
          workouts.map((w) =>
            w._id === workoutId
              ? updatedWorkout
              : w
          )
        )
      })
  }

  function toggleExercise(workoutId, exerciseIndex) {
    const workout = workouts.find(
      (w) => w._id === workoutId
    )

    workout.exercises[exerciseIndex].completed =
      !workout.exercises[exerciseIndex].completed

    fetch(
      `http://localhost:5000/api/workouts/${workoutId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workout)
      }
    )
      .then((res) => res.json())
      .then((updated) => {
        setWorkouts(
          workouts.map((w) =>
            w._id === workoutId ? updated : w
          )
        )
      })
  }

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Kurt's Workout Planner
        </h1>

        <p style={styles.subtitle}>
          Track workouts and monitor progress
        </p>
      </div>

      <Dashboard workouts={workouts} />

      <div style={styles.formBox}>
        <WorkoutForm addWorkout={addWorkout} />
      </div>

      <div style={styles.workoutList}>
        {workouts.length === 0 ? (
          <div style={styles.emptyCard}>
            <h3>No workouts yet</h3>

            <p>
              Create your first workout above.
            </p>
          </div>
        ) : (
          workouts.map((workout) => (
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
      </div>
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