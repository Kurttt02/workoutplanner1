require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const User = require("./models/User")

const app = express()

app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

mongoose
  .connect("mongodb+srv://kurt:workout123@kurts-workout-planner.wkignqq.mongodb.net/?appName=kurts-workout-planner")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      completed: { type: Boolean, default: false }
    }
  ]
})

const Workout = mongoose.model("Workout", WorkoutSchema)

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    })
  }

  const user = await User.create({
    username,
    password
  })

  res.json(user)
})

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    username,
    password
  })

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  res.json(user)
})

app.post("/api/coach", async (req, res) => {
  const { message } = req.body

  try {
    const prompt = `
You are a fitness coach.

Return answers in this format ONLY:

Short answer:
- 2 to 4 sentences max

Key points:
- 3 to 5 bullet points only

No long paragraphs.
No essays.
Keep it simple, clear, and easy to read.


Answer this question:
${message}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    res.json({ reply: text })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: "Coach failed"
    })
  }
})


app.get("/api/workouts", async (req, res) => {
  const workouts = await Workout.find()
  res.json(workouts)
})

app.post("/api/workouts", async (req, res) => {
  const workout = await Workout.create({
    name: req.body.name,
    exercises: req.body.exercises || []
  })
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

app.post("/api/generate-workout", async (req, res) => {
  const { goal } = req.body

  try {
    const prompt = `
Create a workout for goal: ${goal}.

Return ONLY valid JSON:

{
  "name": "Workout",
  "exercises": [
    { "name": "Exercise", "sets": 3, "reps": 10 }
  ]
}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    let workout = JSON.parse(cleanedText)

    workout = {
      name: workout.name || "AI Workout",
      exercises: Array.isArray(workout.exercises)
        ? workout.exercises.map(ex => ({
            name: ex.name || "Exercise",
            sets: Number(ex.sets) || 3,
            reps: Number(ex.reps) || 10,
            completed: false
          }))
        : []
    }

    res.json(workout)
  } catch (err) {
    res.status(500).json({ error: "AI generation failed" })
  }
})



app.listen(5000, () => console.log("Server running on 5000"))