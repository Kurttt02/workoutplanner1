import { useState } from "react"

import WorkoutForm from "../components/WorkoutForm"
import WorkoutItem from "../components/WorkoutItem"

function Workouts() {
  const [workouts, setWorkouts] = useState([
    "Push Day",
    "Pull Day"
  ])

  function addWorkout(workoutName) {
    setWorkouts([...workouts, workoutName])
  }

  return (
    <main
      style={{
        padding: "30px",
        color: "white"
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

      <div>
        {workouts.map((workout, index) => (
          <WorkoutItem
            key={index}
            name={workout}
          />
        ))}
      </div>
    </main>
  )
}

export default Workouts