import { useState } from "react"

function WorkoutItem({
  workout,
  deleteWorkout,
  editWorkout,
  addExercise,
  toggleExercise
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(workout.name)

  const [exerciseName, setExerciseName] = useState("")
  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")

  function handleSave() {
    if (editedName.trim() === "") return

    editWorkout(workout._id, editedName)
    setIsEditing(false)
  }

  function handleAddExercise() {
    if (exerciseName.trim() === "" || sets === "" || reps === "") return

    const newExercise = {
      name: exerciseName,
      sets,
      reps,
      completed: false
    }

    addExercise(workout._id, newExercise)

    setExerciseName("")
    setSets("")
    setReps("")
  }

  const completedExercises = workout.exercises.filter(
    (ex) => ex.completed
  ).length

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "25px",
        borderRadius: "16px",
        marginBottom: "25px"
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {isEditing ? (
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <>
              <h2>{workout.name}</h2>
              <p>
                {completedExercises} / {workout.exercises.length} completed
              </p>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}

          <button onClick={() => deleteWorkout(workout._id)}>
            Delete
          </button>
        </div>
      </div>

      {/* ADD EXERCISE */}
      <div style={{ marginTop: "15px" }}>
        <input
          placeholder="Exercise"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />

        <input
          placeholder="Sets"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />

        <input
          placeholder="Reps"
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <button onClick={handleAddExercise}>Add</button>
      </div>

      {/* EXERCISES */}
      <div style={{ marginTop: "20px" }}>
        {workout.exercises.length === 0 ? (
          <p>No exercises yet.</p>
        ) : (
          workout.exercises.map((ex, i) => (
            <div
              key={i}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: ex.completed ? "#234d20" : "#2c2c2c",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>
                <h4
                  style={{
                    textDecoration: ex.completed ? "line-through" : "none"
                  }}
                >
                  {ex.name}
                </h4>
                <p>
                  {ex.sets} x {ex.reps}
                </p>
              </div>

              <button
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


export default WorkoutItem