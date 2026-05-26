// Load environment variables from .env file (API keys, DB URI, etc.)
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const User = require("./models/User")
const app = express()

// Allow cross-origin requests (needed for frontend on a different port/domain)
app.use(cors())
// Parse incoming JSON request bodies
app.use(express.json())
// Start the Gemini AI client using the API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
//Connects to MongoDB using the URI from .env and logs success or error
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))
// Define a Mongoose schema and model for workouts, which includes a name and an array of exercises
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
// Create the Workout model from the schema
const Workout = mongoose.model("Workout", WorkoutSchema)
// API endpoint for user registration. It checks if the username already exists and creates a new user if not.
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body
// Check if a user with the same username already exists in the database
  const existingUser = await User.findOne({ username })
// If a user is found, return a 400 error with a message indicating the user already exists
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    })
  }
// If no existing user is found, create a new user with the provided username and password
  const user = await User.create({
    username,
    password
  })

  res.json(user)
})
// API endpoint for user login. It checks if the provided username and password match a user in the database and returns the user if valid.
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body
// Find a user in the database that matches the provided username and password
  const user = await User.findOne({
    username,
    password
  })
// If no matching user is found, return a 400 error with a message indicating invalid credentials
  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  res.json(user)
})
// API endpoint for the AI coach. It takes a message from the request body, constructs a prompt for the Gemini model, and returns the generated response. The prompt instructs the model to provide a short answer and key points in a specific format.
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

// API endpoints for managing workouts. These include getting all workouts, creating a new workout, updating an existing workout, deleting a workout, and adding exercises to a workout.
app.get("/api/workouts", async (req, res) => {
  const workouts = await Workout.find()
  res.json(workouts)
})
// Create a new workout with the provided name and exercises (if any) and return the created workout as JSON
app.post("/api/workouts", async (req, res) => {
  const workout = await Workout.create({
    name: req.body.name,
    exercises: req.body.exercises || []
  })
  res.json(workout)
})
//
app.put("/api/workouts/:id", async (req, res) => {
  const updated = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(updated)
})
// Delete a workout by its ID and return a JSON message confirming deletion
app.delete("/api/workouts/:id", async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id)
  res.json({ message: "deleted" })
})
// Add a new exercise to an existing workout by its ID. The exercise details are provided in the request body. After adding the exercise, the updated workout is returned as JSON.
app.post("/api/workouts/:id/exercises", async (req, res) => {
  const workout = await Workout.findById(req.params.id)
  workout.exercises.push(req.body)
  await workout.save()
  res.json(workout)
})
// API endpoint for generating a workout based on a user's goal. It constructs a prompt for the Gemini model, processes the response to extract workout details, and returns the generated workout as JSON.
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


// Start the Express server on port 5000 and log a message to the console when it's running                                       
app.listen(5000, () => console.log("Server running on 5000"))