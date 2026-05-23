const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(
    "mongodb+srv://kurt:workout123@kurts-workout-planner.wkignqq.mongodb.net/?appName=kurts-workout-planner"
  )
  .then(() => {
    console.log("MongoDB connected")
  })
  .catch((error) => {
    console.log(error)
  })

const WorkoutSchema = new mongoose.Schema({
  name: String,
  exercises: Array
})

const Workout = mongoose.model(
  "Workout",
  WorkoutSchema
)

app.get("/api/workouts", async (req, res) => {
  const workouts = await Workout.find()

  res.json(workouts)
})

app.post("/api/workouts", async (req, res) => {
  const newWorkout = new Workout({
    name: req.body.name,
    exercises: []
  })

  await newWorkout.save()

  res.json(newWorkout)
})

app.put("/api/workouts/:id", async (req, res) => {
  await Workout.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    }
  )

  res.json({ message: "updated" })
})

app.delete(
  "/api/workouts/:id",
  async (req, res) => {
    await Workout.findByIdAndDelete(
      req.params.id
    )

    res.json({ message: "deleted" })
  }
)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})