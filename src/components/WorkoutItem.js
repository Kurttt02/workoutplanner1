import { useState } from "react"
// WorkoutItem component that represents a single workout item in the workout list, allowing users to view, edit, delete, and manage exercises within the workout using the provided functions for each action
function WorkoutItem({
  workout,
  deleteWorkout,
  editWorkout,
  addExercise,
  toggleExercise
}) {// State variables for managing edit mode, edited workout name, and new exercise details
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(workout.name)

  const [exerciseName, setExerciseName] = useState("")
  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")
// Handle saving the edited workout name by validating the input and calling the editWorkout function with the workout ID and new name. After saving, it exits edit mode.
  function handleSave() {
    if (editedName.trim() === "") return
    editWorkout(workout._id, editedName)
    setIsEditing(false)
  }
// Handle adding a new exercise to the workout by validating the input fields and calling the addExercise function with the workout ID and new exercise details. After adding the exercise, it clears the input fields.
  function handleAddExercise() {
    if (!exerciseName || !sets || !reps) return
// Validate that sets and reps are positive integers
    addExercise(workout._id, {
      name: exerciseName,
      sets,
      reps,
      completed: false
    })
// Clear input fields after adding the exercise
    setExerciseName("")
    setSets("")
    setReps("")
  }
// Calculate the number of completed exercises in the workout for display purposes
  const completedExercises = workout.exercises.filter(
    (ex) => ex.completed
  ).length

  return (
    <div style={styles.card}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          {isEditing ? (
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              style={styles.input}
            />
          ) : (
            <>
              <h2 style={styles.title}>{workout.name}</h2>
              <p style={styles.subtitle}>
                {completedExercises} / {workout.exercises.length} completed
              </p>
            </>
          )}
        </div>
// Action buttons for editing and deleting the workout, with conditional rendering based on the edit mode
        <div style={styles.actions}>
          {isEditing ? (
            <button style={styles.button} onClick={handleSave}>
              Save
            </button>
          ) : (
            <button style={styles.button} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
// Delete button to remove the workout, calling the deleteWorkout function with the workout ID
          <button
            style={styles.danger}
            onClick={() => deleteWorkout(workout._id)}
          >
            Delete
          </button>
        </div>
      </div>
// Section for adding a new exercise to the workout, including input fields for exercise name, sets, and reps, and a button to add the exercise using the handleAddExercise function
      {/* ADD EXERCISE */}
      <div style={styles.addBox}>
        <input
          placeholder="Exercise"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          style={styles.input}
        />
// Input fields for sets and reps with validation to ensure they are positive integers before adding the exercise
        <input
          placeholder="Sets"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          style={styles.inputSmall}
        />
// Input field for reps with validation to ensure it is a positive integer before adding the exercise
        <input
          placeholder="Reps"
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          style={styles.inputSmall}
        />
// Button to add the exercise, which calls the handleAddExercise function when clicked
        <button style={styles.button} onClick={handleAddExercise}>
          Add
        </button>
      </div>
// Section for displaying the list of exercises in the workout, with conditional rendering to show a message if there are no exercises, and buttons to toggle the completion status of each exercise
      {/* EXERCISES */}
      <div style={styles.list}>
        {workout.exercises.length === 0 ? (
          <p style={styles.empty}>No exercises yet.</p>
        ) : (
          workout.exercises.map((ex, i) => (
            <div key={i} style={styles.exercise}>
              <div>
                <p
                  style={{
                    ...styles.exerciseName,
                    textDecoration: ex.completed ? "line-through" : "none"
                  }}
                >
                  {ex.name}
                </p>
                <p style={styles.exerciseMeta}>
                  {ex.sets} × {ex.reps}
                </p>
              </div>

              <button
                style={styles.smallButton}
                onClick={() => toggleExercise(workout._id, i)}
              >
                {ex.completed ? "Done" : "Mark"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "#111111",
    border: "1px solid #262626",
    borderRadius: "14px",
    padding: "18px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "16px"
  },

  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700"
  },

  subtitle: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#a3a3a3"
  },

  actions: {
    display: "flex",
    gap: "8px"
  },

  addBox: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "16px"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  exercise: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #262626",
    borderRadius: "10px"
  },

  exerciseName: {
    margin: 0,
    fontWeight: "600"
  },

  exerciseMeta: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#a3a3a3"
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #262626",
    backgroundColor: "#0f0f0f",
    color: "#ffffff",
    flex: 1,
    minWidth: "180px"
  },

  inputSmall: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #262626",
    backgroundColor: "#0f0f0f",
    color: "#ffffff",
    width: "90px"
  },

  button: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #2a2a2a",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    cursor: "pointer"
  },

  danger: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #3a1a1a",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    cursor: "pointer"
  },

  smallButton: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #2a2a2a",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px"
  },

  empty: {
    color: "#a3a3a3",
    fontSize: "13px"
  }
}

export default WorkoutItem