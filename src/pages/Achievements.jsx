import { useState, useEffect, useMemo } from "react"
import { ACHIEVEMENTS } from "../data/achievements"

export default function Achievements() {
  const [popup, setPopup] = useState(null)

  const [unlocked, setUnlocked] = useState(() => {
    return JSON.parse(localStorage.getItem("unlockedAchievements")) || []
  })

  const workouts = useMemo(() => {
    return JSON.parse(localStorage.getItem("workouts")) || []
  }, [])

  const stats = useMemo(() => {
    return {
      totalExercises: workouts.length,
      streak: 0
    }
  }, [workouts])

  useEffect(() => {
    const storedUnlocked =
      JSON.parse(localStorage.getItem("unlockedAchievements")) || []

    const newlyUnlocked = []

    ACHIEVEMENTS.forEach((a) => {
      const isCompleted = a.check(stats)
      const wasUnlocked = storedUnlocked.includes(a.name)

      if (isCompleted && !wasUnlocked) {
        newlyUnlocked.push(a.name)
      }
    })

    if (newlyUnlocked.length > 0) {
      const updated = [...storedUnlocked, ...newlyUnlocked]

      setUnlocked(updated)
      localStorage.setItem(
        "unlockedAchievements",
        JSON.stringify(updated)
      )

      newlyUnlocked.forEach((name) => {
        setPopup(name)
        setTimeout(() => setPopup(null), 2000)
      })
    }
  }, [stats])

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Achievements</h1>

      {popup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#1f1f1f",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #4ade80",
            zIndex: 9999
          }}
        >
          🏆 {popup} unlocked!
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {ACHIEVEMENTS.map((a) => {
          const completed = a.check(stats)
          const isUnlocked = unlocked.includes(a.name)

          const active = completed || isUnlocked

          return (
            <div
              key={a.name}
              style={{
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "10px",
                backgroundColor: active ? "#163d22" : "#1a1a1a",
                border: active ? "1px solid #4ade80" : "1px solid #333"
              }}
            >
              <h3 style={{ margin: 0 }}>
                {a.name} {active ? "✅" : "⏳"}
              </h3>

              <p style={{ margin: "5px 0 0", color: "#aaa" }}>
                {a.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}