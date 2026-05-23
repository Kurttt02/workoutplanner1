const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let workouts = [
  {
    id: 1,
    name: "Push Day",
    exercises: []
  }
]

app.get("/api/workouts", (req, res) => {
  res.json(workouts)
})

app.post("/api/workouts", (req, res) => {
  const newWorkout = {
    id: Date.now(),
    name: req.body.name,
    exercises: []
  }

  workouts.push(newWorkout)

  res.json(newWorkout)
})

app.put("/api/workouts/:id", (req, res) => {
  const id = Number(req.params.id)

  workouts = workouts.map((w) =>
    w.id === id
      ? { ...w, name: req.body.name }
      : w
  )

  res.json({ message: "updated" })
})

app.delete("/api/workouts/:id", (req, res) => {
  const id = Number(req.params.id)

  workouts = workouts.filter((w) => w.id !== id)

  res.json({ message: "deleted" })
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})