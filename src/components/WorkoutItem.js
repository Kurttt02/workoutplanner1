import { useState } from "react"

function WorkoutItem({
  workout,
  index,
  deleteWorkout,
  editWorkout,
  addExercise
}) {
  const [isEditing, setIsEditing] = useState(false)

  const [editedName, setEditedName] = useState(
    workout.name
  )

  const [exerciseName, setExerciseName] =
    useState("")

  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")

  function handleSave() {
    if (editedName.trim() === "") return

    editWorkout(index, editedName)

    setIsEditing(false)
  }

  function handleAddExercise() {
    if (
      exerciseName.trim() === "" ||
      sets === "" ||
      reps === ""
    )
      return

    const newExercise = {
      name: exerciseName,
      sets,
      reps
    }

    addExercise(index, newExercise)

    setExerciseName("")
    setSets("")
    setReps("")
  }

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(event) =>
              setEditedName(event.target.value)
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none"
            }}
          />
        ) : (
          <h2>{workout.name}</h2>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >
          {isEditing ? (
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>
          )}

          <button
            onClick={() => deleteWorkout(index)}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        style={{
          marginBottom: "20px"
        }}
      >
        <input
          type="text"
          placeholder="Exercise name"
          value={exerciseName}
          onChange={(event) =>
            setExerciseName(event.target.value)
          }
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(event) =>
            setSets(event.target.value)
          }
          style={{
            padding: "10px",
            width: "80px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(event) =>
            setReps(event.target.value)
          }
          style={{
            padding: "10px",
            width: "80px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <button
          onClick={handleAddExercise}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Add Exercise
        </button>
      </div>

      <div>
        {workout.exercises.length === 0 ? (
          <p>No exercises added yet.</p>
        ) : (
          workout.exercises.map((exercise, exerciseIndex) => (
            <div
              key={exerciseIndex}
              style={{
                backgroundColor: "#2c2c2c",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            >
              <h4>{exercise.name}</h4>

              <p>
                {exercise.sets} sets ×{" "}
                {exercise.reps} reps
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default WorkoutItem