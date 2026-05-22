import { useEffect, useState } from "react"

import WorkoutForm from "../components/WorkoutForm"
import WorkoutItem from "../components/WorkoutItem"

function Workouts() {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts =
      localStorage.getItem("workouts")

    return savedWorkouts
      ? JSON.parse(savedWorkouts)
      : []
  })

  useEffect(() => {
    localStorage.setItem(
      "workouts",
      JSON.stringify(workouts)
    )
  }, [workouts])

  function addWorkout(newWorkout) {
    setWorkouts([...workouts, newWorkout])
  }

  function deleteWorkout(indexToDelete) {
    const updatedWorkouts = workouts.filter(
      (_, index) => index !== indexToDelete
    )

    setWorkouts(updatedWorkouts)
  }

  function editWorkout(indexToEdit, newName) {
    const updatedWorkouts = [...workouts]

    updatedWorkouts[indexToEdit].name = newName

    setWorkouts(updatedWorkouts)
  }

  function addExercise(workoutIndex, exercise) {
    const updatedWorkouts = [...workouts]

    updatedWorkouts[
      workoutIndex
    ].exercises.push(exercise)

    setWorkouts(updatedWorkouts)
  }

  function toggleExerciseComplete(
    workoutIndex,
    exerciseIndex
  ) {
    const updatedWorkouts = [...workouts]

    const exercise =
      updatedWorkouts[workoutIndex].exercises[
        exerciseIndex
      ]

    exercise.completed = !exercise.completed

    setWorkouts(updatedWorkouts)
  }

  return (
    <main
      style={{
        padding: "30px",
        color: "white",
        maxWidth: "1000px",
        margin: "0 auto"
      }}
    >
      <h1
        style={{
          marginBottom: "30px"
        }}
      >
        Workouts
      </h1>

      <WorkoutForm addWorkout={addWorkout} />

      {workouts.length === 0 ? (
        <p>No workouts added yet.</p>
      ) : (
        workouts.map((workout, index) => (
          <WorkoutItem
            key={index}
            workout={workout}
            index={index}
            deleteWorkout={deleteWorkout}
            editWorkout={editWorkout}
            addExercise={addExercise}
            toggleExerciseComplete={
              toggleExerciseComplete
            }
          />
        ))
      )}
    </main>
  )
}

export default Workouts