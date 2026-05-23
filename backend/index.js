const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect("mongodb+srv://kurt:workout123@kurts-workout-planner.wkignqq.mongodb.net/?appName=kurts-workout-planner")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      completed: {
        type: Boolean,
        default: false
      }
    }
  ]
})

const Workout = mongoose.model("Workout", WorkoutSchema)

app.get("/api/workouts", async (req, res) => {
  const workouts = await Workout.find()
  res.json(workouts)
})

app.post("/api/workouts", async (req, res) => {
   console.log("BODY RECEIVED:", req.body)
  const workout = new Workout({
    name: req.body.name,
    exercises: []
  })

  await workout.save()
  res.json(workout)
})

app.put("/api/workouts/:id", async (req, res) => {
  const updated = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(updated)
})

app.delete("/api/workouts/:id", async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id)
  res.json({ message: "deleted" })
})

app.post("/api/workouts/:id/exercises", async (req, res) => {
  const workout = await Workout.findById(req.params.id)

  workout.exercises.push(req.body)

  await workout.save()

  res.json(workout)
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})