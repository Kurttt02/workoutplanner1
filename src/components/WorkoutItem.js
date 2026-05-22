import { useState } from "react"

function WorkoutItem({
  workout,
  index,
  deleteWorkout,
  editWorkout,
  addExercise,
  toggleExerciseComplete
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
      reps,
      completed: false
    }

    addExercise(index, newExercise)

    setExerciseName("")
    setSets("")
    setReps("")
  }

  const completedExercises =
    workout.exercises.filter(
      (exercise) => exercise.completed
    ).length

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "25px",
        borderRadius: "16px",
        marginBottom: "25px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >
        <div>
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
            <>
              <h2>{workout.name}</h2>

              <p
                style={{
                  color: "#aaa"
                }}
              >
                {completedExercises} /{" "}
                {workout.exercises.length} completed
              </p>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >
          {isEditing ? (
            <button
              onClick={handleSave}
              style={buttonStyle("#4CAF50")}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={buttonStyle("#3498db")}
            >
              Edit
            </button>
          )}

          <button
            onClick={() => deleteWorkout(index)}
            style={buttonStyle("#ff4d4d")}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
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
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(event) =>
            setSets(event.target.value)
          }
          style={{
            ...inputStyle,
            width: "90px"
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
            ...inputStyle,
            width: "90px"
          }}
        />

        <button
          onClick={handleAddExercise}
          style={buttonStyle("#4CAF50")}
        >
          Add Exercise
        </button>
      </div>

      <div>
        {workout.exercises.length === 0 ? (
          <p
            style={{
              color: "#888"
            }}
          >
            No exercises added yet.
          </p>
        ) : (
          workout.exercises.map(
            (exercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                style={{
                  backgroundColor:
                    exercise.completed
                      ? "#234d20"
                      : "#2c2c2c",
                  padding: "18px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px"
                }}
              >
                <div>
                  <h4
                    style={{
                      textDecoration:
                        exercise.completed
                          ? "line-through"
                          : "none"
                    }}
                  >
                    {exercise.name}
                  </h4>

                  <p>
                    {exercise.sets} sets ×{" "}
                    {exercise.reps} reps
                  </p>
                </div>

                <button
                  onClick={() =>
                    toggleExerciseComplete(
                      index,
                      exerciseIndex
                    )
                  }
                  style={buttonStyle(
                    exercise.completed
                      ? "#777"
                      : "#4CAF50"
                  )}
                >
                  {exercise.completed
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}

const buttonStyle = (backgroundColor) => ({
  backgroundColor,
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
})

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "none"
}

export default WorkoutItem